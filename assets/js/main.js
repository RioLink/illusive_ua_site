const burger = document.querySelector('.burger');
const mobilePanel = document.querySelector('.mobile-panel');

if (burger && mobilePanel) {
  burger.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    mobilePanel.setAttribute('aria-hidden', String(!isOpen));
  });

  mobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobilePanel.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      mobilePanel.setAttribute('aria-hidden', 'true');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const button = item.querySelector('button');
  const icon = item.querySelector('span');
  button?.addEventListener('click', () => {
    const active = item.classList.toggle('active');
    if (icon) icon.textContent = active ? '−' : '+';
  });
});

const filterButtons = document.querySelectorAll('[data-filter]');
const portfolioItems = document.querySelectorAll('[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    portfolioItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
});

const form = document.querySelector('#contactForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Дякуємо. Заявка підготовлена до відправки, підключіть поштовий сервіс або CRM.';
    form.reset();
  });
}

const cookieBox = document.querySelector('#cookieBox');
const openCookies = document.querySelector('#openCookies');
function setCookieChoice(choice) {
  localStorage.setItem('illusive-cookie-choice', choice);
  cookieBox?.classList.remove('show');
}
if (cookieBox && !localStorage.getItem('illusive-cookie-choice')) {
  setTimeout(() => cookieBox.classList.add('show'), 900);
}
openCookies?.addEventListener('click', () => cookieBox?.classList.add('show'));
document.querySelector('#acceptCookies')?.addEventListener('click', () => setCookieChoice('accepted'));
document.querySelector('#rejectCookies')?.addEventListener('click', () => setCookieChoice('rejected'));
