'use strict';

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
    const error = new Error(result.error || 'Не удалось выполнить запрос.');
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

function userHome(user) {
  return user.role === 'admin' ? '/admin.html' : '/dashboard.html';
}

function formatDate(value) {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function appendCell(row, value, options = {}) {
  const cell = document.createElement('td');
  if (options.strong) {
    const strong = document.createElement('strong');
    strong.textContent = value || '—';
    cell.append(strong);
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
    const result = await api(`/api/auth/${mode}`, {
      method: 'POST',
      body: JSON.stringify(values)
    });
    window.location.assign(userHome(result.user));
  } catch (error) {
    showMessage(message, error.message, true);
  } finally {
    submitButton.disabled = false;
  }
}

async function handleInquiryForm(form) {
  const message = document.getElementById('inquiryMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  showMessage(message, '');
  submitButton.disabled = true;

  try {
    const values = Object.fromEntries(new FormData(form).entries());
    await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    form.reset();
    showMessage(message, 'Заявка отправлена. Спасибо! Мы скоро с вами свяжемся.');
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
    const message = document.querySelector('[data-page-message]');
    showMessage(message, error.message, true);
  }
}

async function initializeLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAuthForm(form, 'login');
  });
}

async function initializeRegisterPage() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAuthForm(form, 'register');
  });
}

async function initializeDashboard() {
  const loading = document.getElementById('dashboardLoading');
  const content = document.getElementById('dashboardContent');
  if (!content) return;

  try {
    const { user } = await api('/api/me');
    if (user.role === 'admin') {
      window.location.replace('/admin.html');
      return;
    }

    const { applications } = await api('/api/me/applications');
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileJoined').textContent = formatDate(user.created_at || Date.now());
    const tbody = document.getElementById('myApplications');
    applications.forEach((application) => {
      const row = document.createElement('tr');
      appendCell(row, application.course);
      appendCell(row, { new: 'Новая', contacted: 'Связались', closed: 'Закрыта' }[application.status] || application.status);
      appendCell(row, formatDate(application.created_at));
      tbody.append(row);
    });
    document.getElementById('noApplications').classList.toggle('hidden', applications.length > 0);
    loading.classList.add('hidden');
    content.classList.remove('hidden');
  } catch (error) {
    if (error.status === 401) {
      window.location.replace('/login.html');
      return;
    }
    loading.textContent = error.message;
  }
}

function createApplicationRow(application) {
  const row = document.createElement('tr');
  appendCell(row, formatDate(application.created_at));

  const person = document.createElement('td');
  const name = document.createElement('strong');
  name.textContent = application.name;
  const email = document.createElement('span');
  email.className = 'table-subtext';
  email.textContent = application.email;
  person.append(name, email);
  row.append(person);

  appendCell(row, application.phone);

  const details = document.createElement('td');
  const course = document.createElement('strong');
  course.textContent = application.course;
  const message = document.createElement('span');
  message.className = 'table-subtext';
  message.textContent = application.message || 'Без сообщения';
  details.append(course, message);
  row.append(details);

  const statusCell = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'status-select';
  select.setAttribute('aria-label', `Статус заявки ${application.id}`);
  [
    ['new', 'Новая'],
    ['contacted', 'Связались'],
    ['closed', 'Закрыта']
  ].forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    option.selected = value === application.status;
    select.append(option);
  });
  select.addEventListener('change', async () => {
    select.disabled = true;
    try {
      await api(`/api/admin/applications/${application.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: select.value })
      });
      application.status = select.value;
      const note = document.querySelector('[data-page-message]');
      showMessage(note, 'Статус заявки обновлён.');
    } catch (error) {
      select.value = application.status;
      showMessage(document.querySelector('[data-page-message]'), error.message, true);
    } finally {
      select.disabled = false;
    }
  });
  statusCell.append(select);
  row.append(statusCell);
  return row;
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

    const [{ applications }, { users }] = await Promise.all([
      api('/api/admin/applications'),
      api('/api/admin/users')
    ]);

    document.getElementById('adminEmail').textContent = user.email;
    document.getElementById('userCount').textContent = users.length;
    document.getElementById('applicationCount').textContent = applications.length;
    document.getElementById('newApplicationCount').textContent =
      applications.filter((application) => application.status === 'new').length;

    const applicationsBody = document.getElementById('adminApplications');
    applications.forEach((application) => {
      applicationsBody.append(createApplicationRow(application));
    });
    document.getElementById('noAdminApplications').classList.toggle('hidden', applications.length > 0);

    const usersBody = document.getElementById('adminUsers');
    users.forEach((userItem) => {
      const row = document.createElement('tr');
      appendCell(row, userItem.name);
      appendCell(row, userItem.email);
      appendCell(row, userItem.role === 'admin' ? 'Администратор' : 'Студент');
      appendCell(row, formatDate(userItem.created_at));
      usersBody.append(row);
    });

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
    loading.textContent = error.message;
  }
}

document.querySelectorAll('[data-logout]').forEach((button) => {
  button.addEventListener('click', logout);
});

const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleInquiryForm(inquiryForm);
  });
}

initializeLoginPage();
initializeRegisterPage();
initializeDashboard();
initializeAdminPage();
