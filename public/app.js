'use strict';

const uiText = {
  ru: {
    lessons: 'уроков', xp: 'XP', completed: 'Пройдено', locked: 'Сначала закончи предыдущий урок',
    start: 'Начать урок', continue: 'Продолжить', complete: 'Урок завершён',
    emptyLeaders: 'Рейтинг появится, когда ученики начнут проходить уроки.',
    emptyCourses: 'Курсы пока недоступны.', correct: 'Верно! Ты заработал {xp} XP.',
    alreadyCorrect: 'Верно! Этот урок уже засчитан.', incorrect: 'Пока неверно. Перечитай материал и попробуй ещё раз.',
    chooseAnswer: 'Сначала выбери вариант ответа.', loadError: 'Не удалось загрузить данные.',
    place: 'Место', student: 'Ученик', date: 'Дата регистрации', noUsers: 'Пока никто не начал учиться.',
    progress: 'Прогресс', retry: 'Повторить урок', loadingError: 'Ошибка загрузки: '
  },
  en: {
    lessons: 'lessons', xp: 'XP', completed: 'Completed', locked: 'Finish the previous lesson first',
    start: 'Start lesson', continue: 'Continue', complete: 'Lesson completed',
    emptyLeaders: 'The leaderboard will appear when students start completing lessons.',
    emptyCourses: 'Courses are not available yet.', correct: 'Correct! You earned {xp} XP.',
    alreadyCorrect: 'Correct! This lesson was already completed.', incorrect: 'Not quite. Review the lesson and try again.',
    chooseAnswer: 'Choose an answer first.', loadError: 'Could not load data.',
    place: 'Rank', student: 'Student', date: 'Joined', noUsers: 'No one has started learning yet.',
    progress: 'Progress', retry: 'Review lesson', loadingError: 'Loading error: '
  },
  tg: {
    lessons: 'дарс', xp: 'XP', completed: 'Анҷом ёфт', locked: 'Аввал дарси пешинаро анҷом диҳед',
    start: 'Оғози дарс', continue: 'Идома додан', complete: 'Дарс анҷом ёфт',
    emptyLeaders: 'Пас аз оғози дарсҳо рейтинг пайдо мешавад.',
    emptyCourses: 'Ҳоло курсҳо дастрас нестанд.', correct: 'Дуруст! Шумо {xp} XP гирифтед.',
    alreadyCorrect: 'Дуруст! Ин дарс аллакай анҷом ёфта буд.', incorrect: 'Ҳоло нодуруст аст. Маводро хонда, бори дигар кӯшиш кунед.',
    chooseAnswer: 'Аввал як ҷавобро интихоб кунед.', loadError: 'Маълумот бор нашуд.',
    place: 'Ҷой', student: 'Донишҷӯ', date: 'Санаи сабти ном', noUsers: 'Ҳоло касе омӯзишро оғоз накардааст.',
    progress: 'Пешрафт', retry: 'Такрори дарс', loadingError: 'Хатои боргирӣ: '
  }
};

function currentLang() {
  const saved = localStorage.getItem('sheyx-proger-lang') || 'ru';
  return uiText[saved] ? saved : 'ru';
}

function text(key) {
  return uiText[currentLang()][key] || uiText.ru[key] || key;
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || text('loadError'));
    error.status = response.status;
    throw error;
  }
  return result;
}

function showMessage(element, message, isError = false) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('error', isError);
}

function formatDate(value) {
  return new Intl.DateTimeFormat(currentLang(), { dateStyle: 'medium' }).format(new Date(value));
}

function appendCell(row, value, strong = false) {
  const cell = document.createElement('td');
  if (strong) {
    const label = document.createElement('strong');
    label.textContent = value || '—';
    cell.append(label);
  } else {
    cell.textContent = value || '—';
  }
  row.append(cell);
  return cell;
}

async function handleAuthForm(form, mode) {
  const message = form.querySelector('.form-message');
  const submitButton = form.querySelector('button[type="submit"]');
  showMessage(message, '');
  submitButton.disabled = true;
  try {
    const values = Object.fromEntries(new FormData(form).entries());
    const result = await api(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify(values) });
    window.location.assign(result.user.role === 'admin' ? '/admin.html' : '/dashboard.html');
  } catch (error) {
    showMessage(message, error.message, true);
  } finally {
    submitButton.disabled = false;
  }
}

async function logout() {
  try {
    await api('/api/auth/logout', { method: 'POST' });
    window.location.assign('/login.html');
  } catch (error) {
    showMessage(document.querySelector('[data-page-message]'), error.message, true);
  }
}

function renderLeaderboard(target, leaders) {
  target.replaceChildren();
  if (leaders.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'leaderboard-empty';
    empty.textContent = text('emptyLeaders');
    target.append(empty);
    return;
  }

  leaders.forEach((leader, index) => {
    const row = document.createElement('li');
    row.className = `leaderboard-row${index < 3 ? ' top-leader' : ''}`;
    const rank = document.createElement('span');
    rank.className = 'leader-rank';
    rank.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('strong');
    name.className = 'leader-name';
    name.textContent = leader.name;
    const lessons = document.createElement('span');
    lessons.className = 'leader-lessons';
    lessons.textContent = `${leader.completed_lessons} ${text('lessons')}`;
    const xp = document.createElement('span');
    xp.className = 'leader-xp';
    xp.textContent = `${leader.xp} XP`;
    row.append(rank, name, lessons, xp);
    target.append(row);
  });
}

async function initializeHomeLeaderboard() {
  const list = document.getElementById('homeLeaderboard');
  if (!list) return;
  try {
    const { leaders } = await api('/api/leaderboard');
    renderLeaderboard(list, leaders);
  } catch (error) {
    list.replaceChildren();
    const empty = document.createElement('li');
    empty.className = 'leaderboard-empty';
    empty.textContent = error.message;
    list.append(empty);
  }
}

function buildCourseCard(course, compact = false) {
  const card = document.createElement('article');
  card.className = 'dashboard-course-card';
  const title = document.createElement('h3');
  title.textContent = course.title;
  const description = document.createElement('p');
  description.className = 'course-description';
  description.textContent = course.description;
  const count = document.createElement('p');
  count.className = 'course-progress-label';
  const doneCount = course.lessons.filter((lesson) => lesson.completed).length;
  count.textContent = `${text('progress')}: ${doneCount} / ${course.lessons.length} ${text('lessons')}`;
  const progress = document.createElement('progress');
  progress.className = 'course-progress';
  progress.value = doneCount;
  progress.max = course.lessons.length;
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-valuenow', String(doneCount));
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(course.lessons.length));
  const lessons = document.createElement('ol');
  lessons.className = 'course-lesson-list';

  course.lessons.forEach((lesson) => {
    const item = document.createElement('li');
    item.classList.toggle('lesson-locked', !lesson.unlocked);
    const link = document.createElement(lesson.unlocked ? 'a' : 'span');
    link.className = 'lesson-list-link';
    if (lesson.unlocked) {
      link.href = `/lesson.html?course=${encodeURIComponent(course.id)}&lesson=${encodeURIComponent(lesson.id)}`;
    } else {
      link.title = text('locked');
      link.setAttribute('aria-disabled', 'true');
    }
    const label = document.createElement('span');
    label.textContent = lesson.title;
    const state = document.createElement('span');
    state.className = lesson.completed ? 'lesson-status completed' : 'lesson-status';
    state.textContent = lesson.completed ? `✓ ${text('completed')}` : `${lesson.xp} XP`;
    link.append(label, state);
    item.append(link);
    lessons.append(item);
  });

  card.append(title, description, count, progress, lessons);
  if (compact) {
    const firstAvailable = course.lessons.find((lesson) => lesson.unlocked && !lesson.completed);
    const lastCompleted = [...course.lessons].reverse().find((lesson) => lesson.completed);
    const nextLesson = firstAvailable || (lastCompleted
      ? course.lessons.find((lesson) => lesson.id === lastCompleted.id)
      : course.lessons[0]);
    if (nextLesson) {
      const link = document.createElement('a');
      link.className = 'btn btn-primary small course-continue';
      link.href = `/lesson.html?course=${encodeURIComponent(course.id)}&lesson=${encodeURIComponent(nextLesson.id)}`;
      link.textContent = firstAvailable ? text('continue') : text('retry');
      card.append(link);
    }
  }
  return card;
}

async function initializeDashboard() {
  const loading = document.getElementById('dashboardLoading');
  const content = document.getElementById('dashboardContent');
  if (!content) return;

  try {
    const [{ user }, progress, { courses }, { leaders }] = await Promise.all([
      api('/api/me'),
      api('/api/me/progress'),
      api(`/api/courses?lang=${currentLang()}`),
      api('/api/leaderboard')
    ]);
    if (user.role === 'admin') {
      window.location.replace('/admin.html');
      return;
    }

    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileXp').textContent = progress.totalXp;
    document.getElementById('profileLessons').textContent = `${progress.completedLessons} / ${progress.totalLessons}`;
    document.getElementById('profileRank').textContent = progress.rank ? `#${progress.rank}` : '—';
    document.getElementById('dashboardCourses').replaceChildren(
      ...courses.map((course) => buildCourseCard(course, true))
    );
    renderLeaderboard(document.getElementById('dashboardLeaderboard'), leaders.slice(0, 5));
    loading.classList.add('hidden');
    content.classList.remove('hidden');
  } catch (error) {
    if (error.status === 401) {
      window.location.replace('/login.html');
      return;
    }
    loading.textContent = `${text('loadingError')}${error.message}`;
  }
}

async function initializeCourses() {
  const loading = document.getElementById('learnLoading');
  const content = document.getElementById('learnContent');
  if (!content) return;
  try {
    const { courses } = await api(`/api/courses?lang=${currentLang()}`);
    const list = document.getElementById('courseList');
    list.replaceChildren(...courses.map((course) => buildCourseCard(course)));
    if (courses.length === 0) list.textContent = text('emptyCourses');
    loading.classList.add('hidden');
    content.classList.remove('hidden');
  } catch (error) {
    if (error.status === 401) {
      window.location.replace('/login.html');
      return;
    }
    loading.textContent = `${text('loadingError')}${error.message}`;
  }
}

async function initializeLesson() {
  const loading = document.getElementById('lessonLoading');
  const content = document.getElementById('lessonContent');
  if (!content) return;

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');
  const lessonId = params.get('lesson');
  if (!courseId || !lessonId) {
    loading.textContent = text('loadError');
    return;
  }

  try {
    const { course, lesson } = await api(
      `/api/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}?lang=${currentLang()}`
    );
    document.title = `${lesson.title} — sheyx-proger`;
    document.getElementById('lessonCourse').textContent = course.title;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonXp').textContent = `+${lesson.xp} XP`;
    document.getElementById('lessonIntro').textContent = lesson.content.intro;
    document.getElementById('lessonExplanation').textContent = lesson.content.explanation;
    document.getElementById('lessonCode').textContent = lesson.content.code;
    document.getElementById('lessonTask').textContent = lesson.content.task;
    document.getElementById('quizQuestion').textContent = lesson.content.question;

    const options = document.getElementById('quizOptions');
    options.replaceChildren();
    lesson.content.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'answerIndex';
      radio.value = String(index);
      radio.required = true;
      const answer = document.createElement('span');
      answer.textContent = option;
      label.append(radio, answer);
      options.append(label);
    });

    const nextButton = document.getElementById('nextLessonButton');
    if (lesson.completed) {
      document.getElementById('quizFeedback').textContent = text('complete');
      document.querySelectorAll('#lessonQuiz input, #lessonQuiz button[type="submit"]').forEach((item) => {
        item.disabled = true;
      });
      if (lesson.nextLessonId) {
        nextButton.href = `/lesson.html?course=${encodeURIComponent(courseId)}&lesson=${encodeURIComponent(lesson.nextLessonId)}`;
        nextButton.classList.remove('hidden');
      }
    }

    const form = document.getElementById('lessonQuiz');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[name="answerIndex"]:checked');
      const feedback = document.getElementById('quizFeedback');
      const submit = form.querySelector('button[type="submit"]');
      if (!selected) {
        showMessage(feedback, text('chooseAnswer'), true);
        return;
      }
      submit.disabled = true;
      try {
        const result = await api(`/api/lessons/${encodeURIComponent(lesson.id)}/answer`, {
          method: 'POST',
          body: JSON.stringify({ answerIndex: Number(selected.value) })
        });
        if (!result.correct) {
          showMessage(feedback, text('incorrect'), true);
          submit.disabled = false;
          return;
        }
        lesson.completed = true;
        showMessage(feedback, result.xpAwarded
          ? text('correct').replace('{xp}', String(result.xpAwarded))
          : text('alreadyCorrect'));
        form.querySelectorAll('input, button[type="submit"]').forEach((item) => {
          item.disabled = true;
        });
        if (result.nextLessonId) {
          nextButton.href = `/lesson.html?course=${encodeURIComponent(courseId)}&lesson=${encodeURIComponent(result.nextLessonId)}`;
          nextButton.classList.remove('hidden');
        }
      } catch (error) {
        showMessage(feedback, error.message, true);
        submit.disabled = false;
      }
    });
    loading.classList.add('hidden');
    content.classList.remove('hidden');
  } catch (error) {
    if (error.status === 401) {
      window.location.assign('/login.html');
      return;
    }
    loading.textContent = `${text('loadingError')}${error.message}`;
  }
}

async function initializeAdminPage() {
  const loading = document.getElementById('adminLoading');
  const content = document.getElementById('adminContent');
  if (!content) return;
  try {
    const { user } = await api('/api/me');
    if (user.role !== 'admin') {
      window.location.replace('/dashboard.html');
      return;
    }
    const { users } = await api('/api/admin/users');
    const students = users.filter((item) => item.role === 'student');
    document.getElementById('adminEmail').textContent = user.email;
    document.getElementById('userCount').textContent = students.length;
    document.getElementById('lessonsCompletedCount').textContent =
      students.reduce((sum, item) => sum + Number(item.completed_lessons), 0);
    document.getElementById('totalXpCount').textContent =
      students.reduce((sum, item) => sum + Number(item.xp), 0);
    const tbody = document.getElementById('adminUsers');
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      appendCell(row, `#${index + 1}`);
      appendCell(row, student.name, true);
      appendCell(row, `${student.completed_lessons} ${text('lessons')}`);
      appendCell(row, `${student.xp} XP`);
      appendCell(row, formatDate(student.created_at));
      tbody.append(row);
    });
    document.getElementById('noAdminUsers').classList.toggle('hidden', students.length > 0);
    loading.classList.add('hidden');
    content.classList.remove('hidden');
  } catch (error) {
    if (error.status === 401) {
      window.location.replace('/login.html');
      return;
    }
    if (error.status === 403) {
      window.location.replace('/dashboard.html');
      return;
    }
    loading.textContent = `${text('loadingError')}${error.message}`;
  }
}

document.querySelectorAll('[data-logout]').forEach((button) => {
  button.addEventListener('click', logout);
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAuthForm(loginForm, 'login');
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAuthForm(registerForm, 'register');
  });
}

initializeHomeLeaderboard();
initializeDashboard();
initializeCourses();
initializeLesson();
initializeAdminPage();
