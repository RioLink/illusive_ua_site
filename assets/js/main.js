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

const homeServiceData = {
  branding: {
    word: 'Branding',
    image: 'assets/images/service/Brand Design.png',
    alt: 'Branding service',
    text: 'Будуємо ідентичність, яка має характер: логіка бренду, візуальна система, носії та правила використання.',
    tags: ['Ідентичність', 'Brand guide', 'Launch kit']
  },
  web: {
    word: 'Website',
    image: 'assets/images/service/Web Design.png',
    alt: 'Website service',
    text: 'Проєктуємо сайти, які пояснюють продукт і ведуть користувача до заявки: структура, UI, адаптив і підготовка до запуску.',
    tags: ['UX structure', 'UI design', 'Адаптив']
  },
  visual: {
    word: 'Visuals',
    image: 'assets/images/service/Materiale Vizuale.png',
    alt: 'Visual materials service',
    text: 'Створюємо презентації, банери, обкладинки, промо-матеріали й digital-набори, які тримають бренд у єдиному стилі.',
    tags: ['Презентації', 'Банери', 'Promo kit']
  }
};

const homeTabs = document.querySelectorAll('[data-home-service]');
const serviceStage = document.querySelector('.service-stage');
const serviceImage = document.querySelector('#homeServiceImage');
const serviceGiant = document.querySelector('#homeServiceGiant');
const serviceText = document.querySelector('#homeServiceText');
const homeServiceTags = document.querySelector('#homeServiceTags');
const motionLabelWords = document.querySelectorAll('.service-motion-label span');

homeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const data = homeServiceData[tab.dataset.homeService];
    if (!data || !serviceImage || !serviceGiant || !serviceText || !homeServiceTags) return;
    homeTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    serviceStage?.classList.add('is-changing');
    window.setTimeout(() => {
      serviceGiant.textContent = data.word;
      motionLabelWords.forEach((word) => {
        word.textContent = data.word;
      });
      serviceImage.src = data.image;
      serviceImage.alt = data.alt;
      serviceText.textContent = data.text;
      homeServiceTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
      serviceStage?.classList.remove('is-changing');
    }, 180);
  });
});

const homeHeroInner = document.querySelector('.home-hero-inner');
const carousel = document.querySelector('.photo-carousel');
if (homeHeroInner || carousel) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (homeHeroInner) homeHeroInner.style.transform = `translateY(${Math.min(y * 0.08, 34)}px)`;
  }, { passive: true });
}
