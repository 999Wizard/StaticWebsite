"use strict";
// Each feature checks for its elements, so this single script works on every page.
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function updateThemeButton() {
  if (!themeButton) return;
  const dark = root.classList.contains('dark');
  themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.setAttribute('aria-pressed', String(dark));
}
updateThemeButton();
themeButton?.addEventListener('click', () => {
  root.classList.toggle('dark');
  try { localStorage.setItem('portfolio-theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) { /* Continue without persistence. */ }
  updateThemeButton();
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
function closeMenu() {
  nav?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation menu');
}
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const filters = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.project-card[data-category]');
const filterStatus = document.querySelector('#filter-status');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let visible = 0;
  cards.forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible++;
  });
  if (filterStatus) filterStatus.textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}.`;
}));

const form = document.querySelector('#contact-form');
if (form) {
  const fields = [
    {input: form.querySelector('#full-name'), error: form.querySelector('#name-error'), label: 'Full name'},
    {input: form.querySelector('#email'), error: form.querySelector('#email-error'), label: 'Email address'},
    {input: form.querySelector('#message'), error: form.querySelector('#message-error'), label: 'Message'}
  ];
  function validate(field) {
    const value = field.input.value.trim();
    let message = '';
    if (!value) message = `${field.label} is required.`;
    else if (field.input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address.';
    field.error.textContent = message;
    if (message) field.input.setAttribute('aria-invalid', 'true');
    else field.input.removeAttribute('aria-invalid');
    return !message;
  }
  fields.forEach(field => {
    field.input.addEventListener('blur', () => validate(field));
    field.input.addEventListener('input', () => {
      if (field.input.hasAttribute('aria-invalid')) validate(field);
      form.querySelector('#form-status').textContent = '';
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const results = fields.map(validate);
    const status = form.querySelector('#form-status');
    if (results.every(Boolean)) status.textContent = 'Success: your entries are valid. This is a demonstration; no message was sent.';
    else {
      status.textContent = 'Please correct the errors listed below the form fields.';
      fields[results.indexOf(false)].input.focus();
    }
  });
}
