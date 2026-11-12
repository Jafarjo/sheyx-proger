# sheyx-proger

An original trilingual (Russian, English, Tajik) programming-learning platform. It focuses on self-paced learning paths, interactive checks, per-student progress, XP, and a leaderboard.

## Learning features

- Nine beginner lessons each for web development (HTML, CSS, JavaScript) and Python.
- Each lesson explains a concept, shows code, offers a small task, and checks an answer.
- Lessons include optional privacy-enhanced YouTube embeds from freeCodeCamp.org's beginner courses.
- Lessons unlock in order. Progress is stored per account in PostgreSQL.
- Correct answers award XP once per lesson; the leaderboard ranks students by XP and completed lessons.
- Three short programming mini-games reinforce output prediction, debugging, and HTML basics. Game scores are practice-only and do not affect leaderboard XP.
- Students have individual dashboards. The protected admin page shows student progress and rankings.
- Public home page, lessons, account pages, and course content are available in Russian, English, and Tajik.

## Run locally

Requirements: Node.js 20+ and a PostgreSQL database.

1. Copy `.env.example` to `.env` (PowerShell: `Copy-Item .env.example .env`) and set `DATABASE_URL`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` with at least 14 characters.
2. Install and start the app:

   ```bash
   npm ci
   npm start
   ```

3. Visit `http://localhost:3000`, register a student account, and begin a course. The database creates its tables when the server starts.
4. Open `/admin.html` and sign in using the administrator credentials set in `.env`.

There is no default admin or test account. Never commit `.env` or share credentials.

## Free deployment (Render + Supabase)

The app server and database are separate services. Render's free web service has an ephemeral filesystem, so PostgreSQL is used for persistent accounts, sessions, and learning progress.

1. Create a PostgreSQL project with Supabase and copy its connection string. Use SSL; a session-pooler URI may be needed when the direct database host is not reachable over IPv4.
2. Push this repository to GitHub.
3. In Render, create a **Blueprint** using `render.yaml`, or create a free **Web Service** with:
   - Build command: `npm ci`
   - Start command: `npm start`
   - Health check path: `/api/health`
4. Set `NODE_ENV=production`, `DATABASE_URL`, `ADMIN_EMAIL`, and a new unique `ADMIN_PASSWORD` (14–128 characters) in the Render service environment.
5. Deploy. Visit `/`, register a student, and use `/admin.html` with the configured admin email and password.

Free-plan limits and availability can change. Render may sleep while idle, and database providers may have storage, compute, or inactivity limits. Review provider terms and arrange backups before storing real student data. Provider accounts and secrets must be configured by the site owner.

## Main routes

- `/` — public introduction, courses, and live student leaderboard
- `/register.html`, `/login.html` — accounts
- `/learn.html` — course paths and ordered lessons
- `/lesson.html?course=web&lesson=web-html` — lesson content and knowledge check
- `/games.html` — programming mini-games
- `/dashboard.html` — student's XP and saved progress
- `/admin.html` — protected student progress and ranking
- `/api/health` — deployment health check
