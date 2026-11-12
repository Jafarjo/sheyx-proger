'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const { Pool } = require('pg');
const { curriculum, getLesson } = require('./curriculum');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || 3000);
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const SESSION_COOKIE = IS_PRODUCTION ? '__Host-sheyx-session' : 'sheyx-session';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: IS_PRODUCTION ? { rejectUnauthorized: false } : undefined,
  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', IS_PRODUCTION ? 1 : false);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      frameSrc: ["'self'", 'https://www.youtube-nocookie.com'],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      upgradeInsecureRequests: IS_PRODUCTION ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false
}));
app.use(express.json({ limit: '20kb', strict: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Слишком много попыток. Попробуйте позже.' }
});
function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function isValidEmail(email) {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

function setSessionCookie(res, token) {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_MS
  });
}

function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/'
  });
}

function requestToken(req) {
  const cookie = req.headers.cookie || '';
  const prefix = `${SESSION_COOKIE}=`;
  const part = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(prefix));
  if (!part) return null;

  try {
    return decodeURIComponent(part.slice(prefix.length));
  } catch {
    return null;
  }
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function requireSameOrigin(req, res, next) {
  const origin = req.get('origin');
  if (!origin) return next();

  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    return next(httpError(403, 'Запрос отклонён.'));
  }

  if (originHost !== req.get('host')) {
    return next(httpError(403, 'Запрос отклонён.'));
  }
  return next();
}

async function requireUser(req, res, next) {
  try {
    const token = requestToken(req);
    if (!token || token.length > 200) {
      return res.status(401).json({ error: 'Требуется войти в аккаунт.' });
    }

    const tokenHash = hashToken(token);
    const result = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
      [tokenHash]
    );

    if (result.rowCount === 0) {
      clearSessionCookie(res);
      return res.status(401).json({ error: 'Сессия истекла. Войдите снова.' });
    }

    req.user = result.rows[0];
    return next();
  } catch (error) {
    return next(error);
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ только для администратора.' });
  }
  return next();
}

async function createSession(user, res) {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await pool.query(
    'INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)',
    [hashToken(token), user.id, expiresAt]
  );
  setSessionCookie(res, token);
}

app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/register', authLimiter, requireSameOrigin, async (req, res, next) => {
  try {
    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = normalizeEmail(body.email);
    const password = typeof body.password === 'string' ? body.password : '';

    if (name.length < 2 || name.length > 80 || !isValidEmail(email)
      || password.length < 10 || password.length > 128) {
      throw httpError(400, 'Укажите имя, корректный email и пароль длиной от 10 до 128 символов.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, passwordHash]
    );

    await createSession(result.rows[0], res);
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Аккаунт с таким email уже существует.' });
    }
    next(error);
  }
});

app.post('/api/auth/login', authLimiter, requireSameOrigin, async (req, res, next) => {
  try {
    const body = req.body || {};
    const email = normalizeEmail(body.email);
    const password = typeof body.password === 'string' ? body.password : '';
    if (!isValidEmail(email) || password.length === 0 || password.length > 128) {
      throw httpError(400, 'Введите корректный email и пароль.');
    }

    const result = await pool.query(
      'SELECT id, name, email, role, password_hash FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    const hashToCompare = user ? user.password_hash : req.app.locals.dummyPasswordHash;
    const passwordMatches = await bcrypt.compare(password, hashToCompare);

    if (!user || !passwordMatches) {
      return res.status(401).json({ error: 'Неверный email или пароль.' });
    }

    await createSession(user, res);
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/logout', requireSameOrigin, async (req, res, next) => {
  try {
    const token = requestToken(req);
    if (token) {
      await pool.query('DELETE FROM sessions WHERE token_hash = $1', [hashToken(token)]);
    }
    clearSessionCookie(res);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/me', requireUser, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/leaderboard', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.name,
              COALESCE(SUM(lp.xp_earned), 0)::INTEGER AS xp,
              COUNT(lp.lesson_id)::INTEGER AS completed_lessons
       FROM users u
       LEFT JOIN lesson_progress lp ON lp.user_id = u.id
       WHERE u.role = 'student'
       GROUP BY u.id, u.name
       ORDER BY xp DESC, completed_lessons DESC, u.created_at ASC, u.id ASC
       LIMIT 20`
    );
    res.json({ leaders: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get('/api/courses', requireUser, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT course_id, lesson_id FROM lesson_progress WHERE user_id = $1',
      [req.user.id]
    );
    const completedLessons = new Set(result.rows.map((row) => row.lesson_id));
    const lang = ['ru', 'en', 'tg'].includes(req.query.lang) ? req.query.lang : 'ru';
    const courses = curriculum.map((course) => ({
      id: course.id,
      title: course.title[lang],
      description: course.description[lang],
      lessons: course.lessons.map((lesson, index) => ({
        id: lesson.id,
        title: lesson.title[lang],
        xp: lesson.xp,
        completed: completedLessons.has(lesson.id),
        unlocked: index === 0 || completedLessons.has(course.lessons[index - 1].id)
      }))
    }));
    res.json({ courses });
  } catch (error) {
    next(error);
  }
});

app.get('/api/courses/:courseId/lessons/:lessonId', requireUser, async (req, res, next) => {
  try {
    const record = getLesson(req.params.lessonId);
    if (!record || record.course.id !== req.params.courseId) {
      throw httpError(404, 'Урок не найден.');
    }

    if (record.index > 0) {
      const previous = record.course.lessons[record.index - 1];
      const result = await pool.query(
        'SELECT 1 FROM lesson_progress WHERE user_id = $1 AND lesson_id = $2',
        [req.user.id, previous.id]
      );
      if (result.rowCount === 0) {
        throw httpError(403, 'Сначала заверши предыдущий урок.');
      }
    }

    const lang = ['ru', 'en', 'tg'].includes(req.query.lang) ? req.query.lang : 'ru';
    const completed = await pool.query(
      'SELECT 1 FROM lesson_progress WHERE user_id = $1 AND lesson_id = $2',
      [req.user.id, record.lesson.id]
    );
    const { correctOption, ...content } = record.lesson.content[lang];
    res.json({
      course: { id: record.course.id, title: record.course.title[lang] },
      lesson: {
        id: record.lesson.id,
        title: record.lesson.title[lang],
        xp: record.lesson.xp,
        video: { id: record.lesson.videoId, title: record.lesson.videoTitle },
        content,
        completed: completed.rowCount > 0,
        previousLessonId: record.course.lessons[record.index - 1]?.id || null,
        nextLessonId: record.course.lessons[record.index + 1]?.id || null
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/lessons/:lessonId/answer', requireSameOrigin, requireUser, async (req, res, next) => {
  try {
    const record = getLesson(req.params.lessonId);
    if (!record) {
      throw httpError(404, 'Урок не найден.');
    }
    const answerIndex = req.body?.answerIndex;
    if (!Number.isInteger(answerIndex)
      || answerIndex < 0
      || answerIndex >= record.lesson.content.ru.options.length) {
      throw httpError(400, 'Выбери один из вариантов ответа.');
    }

    if (record.index > 0) {
      const previous = record.course.lessons[record.index - 1];
      const prerequisite = await pool.query(
        'SELECT 1 FROM lesson_progress WHERE user_id = $1 AND lesson_id = $2',
        [req.user.id, previous.id]
      );
      if (prerequisite.rowCount === 0) {
        throw httpError(403, 'Сначала заверши предыдущий урок.');
      }
    }

    if (answerIndex !== record.lesson.content.ru.correctOption) {
      return res.json({ correct: false, xpAwarded: 0 });
    }

    const result = await pool.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, course_id, xp_earned)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, lesson_id) DO NOTHING
       RETURNING lesson_id`,
      [req.user.id, record.lesson.id, record.course.id, record.lesson.xp]
    );
    const total = await pool.query(
      'SELECT COALESCE(SUM(xp_earned), 0)::INTEGER AS xp FROM lesson_progress WHERE user_id = $1',
      [req.user.id]
    );
    res.json({
      correct: true,
      xpAwarded: result.rowCount > 0 ? record.lesson.xp : 0,
      totalXp: total.rows[0].xp,
      nextLessonId: record.course.lessons[record.index + 1]?.id || null
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/me/progress', requireUser, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT course_id, lesson_id, xp_earned
       FROM lesson_progress
       WHERE user_id = $1`,
      [req.user.id]
    );
    const completedLessons = new Set(result.rows.map((row) => row.lesson_id));
    const totalXp = result.rows.reduce((total, row) => total + row.xp_earned, 0);
    const rank = await pool.query(
      `WITH rankings AS (
         SELECT u.id,
                ROW_NUMBER() OVER (
                  ORDER BY COALESCE(SUM(lp.xp_earned), 0) DESC,
                           COUNT(lp.lesson_id) DESC,
                           u.created_at ASC,
                           u.id ASC
                ) AS position
         FROM users u
         LEFT JOIN lesson_progress lp ON lp.user_id = u.id
         WHERE u.role = 'student'
         GROUP BY u.id
       )
       SELECT position FROM rankings WHERE id = $1`,
      [req.user.id]
    );
    res.json({
      totalXp,
      rank: rank.rows[0]?.position || null,
      completedLessons: completedLessons.size,
      totalLessons: curriculum.reduce((total, course) => total + course.lessons.length, 0),
      courses: curriculum.map((course) => ({
        id: course.id,
        completedLessons: course.lessons.filter((lesson) => completedLessons.has(lesson.id)).length,
        totalLessons: course.lessons.length
      }))
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/users', requireUser, requireAdmin, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.created_at,
              COALESCE(SUM(lp.xp_earned), 0)::INTEGER AS xp,
              COUNT(lp.lesson_id)::INTEGER AS completed_lessons
       FROM users u
       LEFT JOIN lesson_progress lp ON lp.user_id = u.id
       GROUP BY u.id
       ORDER BY xp DESC, completed_lessons DESC, u.created_at ASC
       LIMIT 500`
    );
    res.json({ users: result.rows });
  } catch (error) {
    next(error);
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API маршрут не найден.' });
});

app.use(express.static(PUBLIC_DIR, {
  dotfiles: 'deny',
  index: 'index.html',
  maxAge: IS_PRODUCTION ? '1h' : 0
}));

app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'), (error) => {
    if (error && !res.headersSent) res.status(404).send('Страница не найдена.');
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Некорректный JSON.' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Слишком большой запрос.' });
  }

  if (error.status && error.status < 500) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error('Request failed:', error);
  return res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
});

async function initialize() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Configure a PostgreSQL database before starting.');
  }

  const schema = await fs.readFile(path.join(ROOT, 'db', 'schema.sql'), 'utf8');
  await pool.query(schema);
  app.locals.dummyPasswordHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12);

  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL is missing. Set it in this Render web service environment.');
  }
  if (!isValidEmail(adminEmail)) {
    throw new Error('ADMIN_EMAIL must be a valid email address (maximum 254 characters).');
  }
  if (adminPassword.length < 14) {
    throw new Error('ADMIN_PASSWORD must be set and contain at least 14 characters.');
  }
  if (adminPassword.length > 128) {
    throw new Error('ADMIN_PASSWORD must contain no more than 128 characters.');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  const admin = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ('Administrator', $1, $2, 'admin')
     ON CONFLICT (email) DO UPDATE
     SET password_hash = EXCLUDED.password_hash
     WHERE users.role = 'admin'
     RETURNING id`,
    [adminEmail, passwordHash]
  );
  if (admin.rowCount === 0) {
    throw new Error('ADMIN_EMAIL already belongs to a student account. Choose another admin email.');
  }

  await pool.query('DELETE FROM sessions WHERE expires_at <= NOW()');
  const cleanup = setInterval(() => {
    pool.query('DELETE FROM sessions WHERE expires_at <= NOW()')
      .catch((error) => console.error('Expired session cleanup failed:', error));
  }, 60 * 60 * 1000);
  cleanup.unref();

  const server = app.listen(PORT, () => {
    console.log(`sheyx-proger listening on port ${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      pool.end().then(() => process.exit(0)).catch((error) => {
        console.error('Database shutdown failed:', error);
        process.exit(1);
      });
    });
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

initialize().catch((error) => {
  console.error('Startup failed:', error);
  process.exitCode = 1;
});
