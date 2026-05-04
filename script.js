// =============================================
//  SeaElle Travel — Main Script
// =============================================

// --- Header scroll effect ---
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// --- Burger menu ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mmClose = document.getElementById('mmClose');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', 'Закрыть меню');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  burger.classList.contains('is-open') ? closeMenu() : openMenu();
});

mmClose.addEventListener('click', closeMenu);

// Close on overlay click (outside mm-inner)
mobileMenu.addEventListener('click', (e) => {
  if (!e.target.closest('.mm-inner')) closeMenu();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// --- Country modal ---
const countryData = {
  maldives: {
    eyebrow: 'Индийский океан · Пляжный отдых',
    title: 'Мальдивы',
    tagline: 'Рай, существующий на самом деле',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=85',
    desc: 'Мальдивы — архипелаг из 1200 коралловых островов. Частные виллы над водой, кристальный океан, коралловые рифы и полное уединение. Здесь нет массовых курортов: каждый отель занимает отдельный остров. Это место, где время замедляется, а реальность оказывается лучше любого фото.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Тропический, +28…+32°C круглый год' },
      { icon: '☀', label: 'Лучший сезон', val: 'Ноябрь–апрель (сухой сезон)' },
      { icon: '✈', label: 'Перелёт', val: '~8–10 часов с пересадкой' },
      { icon: '🌊', label: 'Океан', val: 'Индийский, температура воды +29°C' }
    ]
  },
  italy: {
    eyebrow: 'Европа · Культурный туризм',
    title: 'Италия',
    tagline: 'Страна, в которую влюбляются навсегда',
    img: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=1200&q=85',
    desc: 'Италия — бесконечное путешествие по эпохам: античный Рим, Возрождение во Флоренции, романтичная Венеция, побережье Амальфи и Сицилия. Здесь каждый город — отдельная вселенная. Высокая кухня, мода, архитектура, виноградники Тосканы — всё это Италия, которую невозможно почувствовать в шаблонном туре.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Средиземноморский, летом +28…+34°C' },
      { icon: '☀', label: 'Лучший сезон', val: 'Май–июнь, сентябрь–октябрь' },
      { icon: '✈', label: 'Перелёт', val: '~5–7 часов с пересадкой' },
      { icon: '🍷', label: 'Регионы', val: 'Рим, Тоскана, Амальфи, Сицилия, Венеция' }
    ]
  },
  thailand: {
    eyebrow: 'Юго-Восточная Азия · Экзотика',
    title: 'Таиланд',
    tagline: 'Тысяча улыбок и бесконечное лето',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=85',
    desc: 'Таиланд — удивительное сочетание духовности и тропического блаженства. Буддийские храмы, джунгли, острова Пхукет и Самуи, базары Бангкока, роскошные спа-курорты. Таиланд умеет угодить каждому — от тех, кто ищет приключений, до ценителей тихого luxury-отдыха.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Тропический, +28…+35°C' },
      { icon: '☀', label: 'Лучший сезон', val: 'Ноябрь–февраль (сухой и прохладный)' },
      { icon: '✈', label: 'Перелёт', val: '~5–7 часов с пересадкой' },
      { icon: '🏝', label: 'Острова', val: 'Пхукет, Самуи, Пхи-Пхи, Краби' }
    ]
  },
  uae: {
    eyebrow: 'Ближний Восток · Luxury',
    title: 'ОАЭ · Дубай',
    tagline: 'Роскошь без границ',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
    desc: 'ОАЭ — страна, где амбиции воплощаются в архитектуре. Бурдж-Халифа, пустынные сафари, яхты Дубай Марины, лучшие рестораны мира и торговые моллы размером с город. Дубай живёт на опережение — здесь всегда что-то удивляет. Для тех, кто хочет luxury без компромиссов.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Жаркий: лето до +45°C, зима +20…+28°C' },
      { icon: '☀', label: 'Лучший сезон', val: 'Октябрь–апрель' },
      { icon: '✈', label: 'Перелёт', val: '~4–5 часов, есть прямые рейсы' },
      { icon: '🏙', label: 'Города', val: 'Дубай, Абу-Даби, Шарджа' }
    ]
  },
  switzerland: {
    eyebrow: 'Европа · Горный отдых',
    title: 'Швейцария',
    tagline: 'Альпийское совершенство',
    img: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=85',
    desc: 'Швейцария — страна, где природа достигает абсолютного совершенства. Заснеженные Альпы, изумрудные озёра, Давос, Санкт-Мориц, Церматт — каждый курорт живёт по своим правилам роскоши. Зимой — горнолыжный отдых высшего класса, летом — треккинг и полное единение с природой.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Умеренный: зима −5…−15°C в горах, лето +20…+26°C' },
      { icon: '⛷', label: 'Лыжный сезон', val: 'Декабрь–апрель' },
      { icon: '✈', label: 'Перелёт', val: '~6–8 часов с пересадкой' },
      { icon: '🏔', label: 'Курорты', val: 'Давос, Санкт-Мориц, Церматт, Интерлакен' }
    ]
  },
  japan: {
    eyebrow: 'Азия · Культурный туризм',
    title: 'Япония',
    tagline: 'Страна контрастов, которая завораживает',
    img: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=85',
    desc: 'Япония — место, где древние традиции живут рядом с технологиями будущего. Токио с неоновыми кварталами и мишленовскими ресторанами, Киото с храмами и чайными церемониями, сезон сакуры — один из самых красивых природных феноменов на планете. Япония навсегда меняет представление о путешествиях.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Умеренный: весна +15…+22°C, лето жаркое' },
      { icon: '🌸', label: 'Сакура', val: 'Конец марта — начало мая' },
      { icon: '✈', label: 'Перелёт', val: '~8–10 часов с пересадкой' },
      { icon: '🗾', label: 'Города', val: 'Токио, Киото, Осака, Нара, Хиросима' }
    ]
  },
  seychelles: {
    eyebrow: 'Индийский океан · Уединение',
    title: 'Сейшельские острова',
    tagline: 'Рай, существующий на самом деле',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85',
    desc: 'Архипелаг из 115 островов — одно из самых уединённых мест на Земле. Здесь нет массового туризма: только гранитные скалы, белоснежный песок, бирюзовая вода и тишина. Уникальная флора и фауна, роскошные частные резорты — Сейшелы для тех, кто ищет идеальный отдых без компромиссов.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Тропический, +26…+32°C круглый год' },
      { icon: '☀', label: 'Лучший сезон', val: 'Апрель–май, октябрь–ноябрь' },
      { icon: '✈', label: 'Перелёт', val: '~8–10 часов с пересадкой' },
      { icon: '🌊', label: 'Океан', val: 'Индийский, температура воды +28°C' }
    ]
  },
  tanzania: {
    eyebrow: 'Восточная Африка · Сафари',
    title: 'Танзания',
    tagline: 'Сердце Африки, которое невозможно забыть',
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85',
    desc: 'Танзания меняет восприятие мира. Серенгети с великой миграцией животных, кратер Нгоронгоро, Килиманджаро — высочайшая вершина Африки, и Занзибар с пряными базарами и кристальным океаном. Сафари здесь — встреча с первозданной природой один на один. Каждый закат в саванне остаётся в памяти навсегда.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Тропический, +25…+32°C, два сезона дождей' },
      { icon: '🦁', label: 'Лучший сезон сафари', val: 'Июнь–октябрь (сухой сезон)' },
      { icon: '✈', label: 'Перелёт', val: '~9–12 часов с пересадкой' },
      { icon: '🏕', label: 'Маршруты', val: 'Серенгети, Занзибар, Килиманджаро, Нгоронгоро' }
    ]
  },
  greece: {
    eyebrow: 'Средиземноморье · Культура и отдых',
    title: 'Греция',
    tagline: 'Птамица закатов и мраморных вилл',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=85',
    desc: 'Греция — это белоснежные стены Санторини, закаты над кальдерой вулкана, венецианские переулки Миконоса и античные руины Афин. Каждый греческий остров — своя вселенная. Голубее Адриатика, оливковые рощи, свежайшая кухня и теплый приём греков — путешествие, после которого не хочется никуда уезжать.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Средиземноморский, летом +28…+35°C' },
      { icon: '☀', label: 'Лучший сезон', val: 'Май–июнь, сентябрь–октябрь' },
      { icon: '✈', label: 'Перелёт', val: '~5–7 часов с пересадкой' },
      { icon: '🛑', label: 'Острова', val: 'Санторини, Миконос, Крит, Миконос, Родос' }
    ]
  }
};

const modal = document.getElementById('countryModal');
const modalClose = document.getElementById('modalClose');

function openModal(countryKey) {
  const d = countryData[countryKey];
  if (!d) return;

  document.getElementById('modalImg').src = d.img;
  document.getElementById('modalImg').alt = d.title;
  document.getElementById('modalCountryBadge').textContent = d.title;
  document.getElementById('modalEyebrow').textContent = d.eyebrow;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalTagline').textContent = d.tagline;
  document.getElementById('modalDesc').textContent = d.desc;

  const factsEl = document.getElementById('modalFacts');
  factsEl.innerHTML = d.facts.map(f => `
    <div class="modal-fact">
      <span class="modal-fact-icon">${f.icon}</span>
      <div>
        <p class="modal-fact-label">${f.label}</p>
        <p class="modal-fact-val">${f.val}</p>
      </div>
    </div>`).join('');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.dest-more-btn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.country));
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- Scroll-triggered fade-in animations ---
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation class and observe
document.querySelectorAll(
  '.service-card, .dest-card, .vip-card, .why-item, .about-grid'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  observer.observe(el);
});

// in-view class triggers animation
const style = document.createElement('style');
style.textContent = `.in-view { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Strip marquee duplicate for seamless loop ---
const stripInner = document.querySelector('.strip-inner');
if (stripInner) {
  const clone = stripInner.cloneNode(true);
  stripInner.parentElement.appendChild(clone);
}
