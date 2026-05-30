// =============================================
//  SeaElle Travel — Main Script
// =============================================

// --- Current language state ---
let currentLang = localStorage.getItem('seaelle-lang') || 'ru';

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
    img: 'images/maldives.jpg',
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
    img: 'images/italy.jpg',
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
    img: 'images/thailand.jpg',
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
    img: 'images/uae.jpg',
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
    img: 'images/switzerland.jpg',
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
    img: 'images/japan.jpg',
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
    img: 'images/seychelles.jpg',
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
    img: 'images/tanzania.jpg',
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
    tagline: 'Страна закатов и мраморных вилл',
    img: 'images/greece.jpg',
    desc: 'Греция — это белоснежные стены Санторини, закаты над кальдерой вулкана, венецианские переулки Миконоса и античные руины Афин. Каждый греческий остров — своя вселенная. Голубее Адриатика, оливковые рощи, свежайшая кухня и теплый приём греков — путешествие, после которого не хочется никуда уезжать.',
    facts: [
      { icon: '🌡', label: 'Климат', val: 'Средиземноморский, летом +28…+35°C' },
      { icon: '☀', label: 'Лучший сезон', val: 'Май–июнь, сентябрь–октябрь' },
      { icon: '✈', label: 'Перелёт', val: '~5–7 часов с пересадкой' },
      { icon: '🏝', label: 'Острова', val: 'Санторини, Миконос, Крит, Родос, Корфу' }
    ]
  }
};

const modal = document.getElementById('countryModal');
const modalClose = document.getElementById('modalClose');

function openModal(countryKey) {
  const dataset = currentLang === 'en' ? countryDataEn : countryData;
  const d = dataset[countryKey];
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

// --- Strip marquee builder ---
function buildStrip(lang) {
  const strip = document.getElementById('strip');
  if (!strip) return;
  strip.innerHTML = '';
  const items = i18n[lang].stripItems;
  function makeInner() {
    const inner = document.createElement('div');
    inner.className = 'strip-inner';
    items.forEach(item => {
      const span = document.createElement('span');
      span.textContent = item;
      inner.appendChild(span);
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.textContent = '✦';
      inner.appendChild(dot);
    });
    return inner;
  }
  strip.appendChild(makeInner());
  strip.appendChild(makeInner());
}

// =============================================
//  TRANSLATIONS
// =============================================
const i18n = {
  ru: {
    navAbout: 'О нас',
    navServices: 'Услуги',
    navDestinations: 'Направления',
    navContact: 'Контакты',
    navCta: 'Связаться',
    mmSlogan: '«Мы продаём не путешествия —<br/>а состояние, которое вдохновляет»',
    heroEyebrow: 'Ташкент · Узбекистан',
    heroTitle: 'Путешествие,<br /><em>которое вдохновляет</em>',
    heroSlogan: 'Мы продаём не путешествия — а состояние, которое вдохновляет',
    heroBtnPrimary: 'Получить персональный подбор',
    heroBtnOutline: 'Запросить доступ',
    heroScroll: 'Прокрутите вниз',
    stripItems: ['Индивидуальный подход', 'Частные самолёты', 'VIP & CIP залы', 'Высококвалифицированные гиды', '5+ лет опыта'],
    aboutEyebrow: 'О компании',
    aboutBadge: 'Ограниченное количество клиентов',
    aboutTitle: 'Отдых так, как делали бы<br /><em>это для себя</em>',
    aboutP1: 'SeaElle — это история, созданная не из продаж, а из личного опыта путешествий. Мы пришли в туризм не просто как специалисты, а как люди, которые сами прошли путь поиска идеального отдыха.',
    aboutP2: 'Мы видели разницу между «красиво на фото» и действительно качественным сервисом. Знаем, какие детали могут испортить поездку и что на самом деле делает её особенной.',
    aboutP3: 'Именно поэтому мы не работаем как классическое агентство. Мы не продаём туры. Мы подбираем отдых так, как делали бы это для себя — фильтруя, сравнивая и оставляя только те варианты, которые соответствуют уровню и ожиданиям наших клиентов.',
    aboutHighlight: 'SeaElle — для тех, кто не хочет тратить время на выбор и не готов идти на компромиссы в качестве.',
    servicesEyebrow: 'Что мы делаем',
    servicesTitle: 'Наши <em>услуги</em>',
    servicesSub: 'Полный спектр туристических услуг — от семейного отдыха до эксклюзивных VIP-туров',
    destinationsEyebrow: 'Куда поехать',
    destinationsTitle: 'Популярные <em>направления</em>',
    destinationsSub: 'Нажмите «Подробнее», чтобы узнать о климате, лучшем сезоне и особенностях страны',
    destMaldivesTitle: 'Мальдивы',
    destMaldivesDesc: 'Частные виллы над водой, кристальный океан и полное уединение в тропическом раю.',
    destItalyTitle: 'Италия',
    destItalyDesc: 'Рим, Флоренция, Амальфи — великая история, высокая кухня и непередаваемая атмосфера.',
    destThailandTitle: 'Таиланд',
    destThailandDesc: 'Буддийские храмы, джунгли, острова — удивительное сочетание духовности и тропического отдыха.',
    destUaeTitle: 'ОАЭ · Дубай',
    destUaeDesc: 'Роскошь на каждом шагу: небоскрёбы, пустыня, яхты и лучшие отели мира.',
    destSwitzerlandTitle: 'Швейцария',
    destSwitzerlandDesc: 'Альпийские курорты, Давос, Санкт-Мориц — горнолыжный отдых высшего класса.',
    destJapanTitle: 'Япония',
    destJapanDesc: 'Токио, Киото, сезон сакуры — страна контрастов, традиций и ультрасовременного комфорта.',
    destSeychellesTitle: 'Сейшелы',
    destSeychellesDesc: 'Гранитные скалы, белоснежный песок, бирюзовый океан и полная тишина — рай без компромиссов.',
    destTanzaniaTitle: 'Танзания',
    destTanzaniaDesc: 'Серенгети, Занзибар, Килиманджаро — сафари и океан в одном незабываемом путешествии.',
    destGreeceTitle: 'Греция',
    destGreeceDesc: 'Санторини, Миконос, Афины — белоснежные виллы над лазурным морем и закаты, завораживающие весь мир.',
    destMoreBtn: 'Подробнее о стране →',
    modalCta: 'Узнать стоимость',
    vipEyebrow: 'Эксклюзивно',
    vipTitle: 'VIP · Сервис<br /><em>без компромиссов</em>',
    vipDesc: 'Для тех, кто ценит время и комфорт на каждом этапе путешествия',
    vipCard1Title: 'Частные самолёты',
    vipCard1Text: 'Чартерные рейсы и аренда частных джетов. Ваш маршрут, ваше расписание, ваш уровень комфорта.',
    vipCard2Title: 'CIP & VIP залы',
    vipCard2Text: 'Доступ в эксклюзивные залы ожидания по всему миру. Полная приватность и сервис премиум-класса.',
    vipCard3Title: 'Персональный гид',
    vipCard3Text: 'Высококвалифицированные частные гиды, говорящие на вашем языке и знающие страну изнутри.',
    vipCard4Title: 'Консьерж-сервис',
    vipCard4Text: 'Персональный менеджер доступен 24/7 — бронирование ресторанов, трансферы, любые запросы.',
    whyEyebrow: 'Почему SeaElle',
    whyTitle: 'Разница в <em>деталях</em>',
    whyItem1Title: 'Личный опыт',
    whyItem1Text: 'Мы рекомендуем только то, что сами проверили и в чём уверены',
    whyItem2Title: 'Никаких компромиссов',
    whyItem2Text: 'Строгий отбор партнёров, отелей и программ по вашим стандартам',
    whyItem3Title: 'Полное сопровождение',
    whyItem3Text: 'От первого звонка до возвращения домой — мы рядом на каждом шагу',
    whyItem4Title: 'Индивидуально',
    whyItem4Text: 'Никаких шаблонных туров. Каждая поездка создаётся под вас лично',
    contactEyebrow: 'Свяжитесь с нами',
    contactTitle: 'Начнём<br /><em>планировать</em><br />вашу поездку',
    contactSub: 'Напишите нам или позвоните — расскажите, о каком путешествии мечтаете, и мы подберём идеальный вариант.',
    contactLabelDirector: 'Директор',
    contactLabelHours: 'Часы работы',
    contactLabelHoursVal: 'Пн–Вс: 10:00 — 19:00',
    contactLabelOffice: 'Офис',
    contactLabelOfficeVal: 'Ташкент, Узбекистан',
    footerSlogan: '«Мы продаём не путешествия,<br />а состояние, которое вдохновляет»',
    footerCity: 'Ташкент · Узбекистан',
    footerNavHeading: 'Навигация',
    footerServicesHeading: 'Услуги',
    footerContactHeading: 'Контакты',
    footerDirectorLabel: 'Директор',
    footerDirectorValue: 'Ekaterina Skrileva',
    footerLicenseLabel: 'Лицензия',
    footerLicenseValue: '[укажем позже]',
    footerNavAbout: 'О компании',
    footerNavServices: 'Услуги',
    footerNavDestinations: 'Направления',
    footerNavVip: 'VIP сервис',
    footerNavContact: 'Контакты',
    footerCopy: '© 2026 SeaElle Travel. Все права защищены.',
    navPayment: 'Оплата',
  },
  en: {
    navAbout: 'About',
    navServices: 'Services',
    navDestinations: 'Destinations',
    navContact: 'Contact',
    navCta: 'Get in Touch',
    mmSlogan: 'We design refined travel experiences tailored to your lifestyle, preferences, and expectations.',
    heroEyebrow: 'Tashkent · Uzbekistan',
    heroTitle: 'Bespoke journeys<br /><em>shaped around your world</em>',
    heroSlogan: 'We design refined travel experiences tailored to your lifestyle, preferences, and expectations.',
    heroBtnPrimary: 'Start Your Journey',
    heroBtnOutline: 'Partner With Us',
    heroScroll: 'Scroll down',
    stripItems: ['Private Aviation', 'VIP Airport Assistance', 'Bespoke Itineraries', 'Luxury Retreats', 'Global Concierge', 'Exclusive Access'],
    aboutEyebrow: 'About Us',
    aboutBadge: 'By Private Request',
    aboutTitle: 'Travel designed the way we would<br /><em>choose it for ourselves</em>',
    aboutP1: 'SeaElle is a boutique travel studio created from personal experience and a deep understanding of refined travel.',
    aboutP2: 'We believe luxury is not defined by excess, but by precision, comfort, discretion, and meaningful details.',
    aboutP3: 'Rather than offering standard packages, we curate journeys individually — selecting only experiences, hotels, and partners that meet the expectations of our clients. From private island escapes and safari expeditions to wellness retreats and business travel, every itinerary is thoughtfully tailored with care and attention to detail.',
    aboutHighlight: 'SeaElle is created for travellers who value time, privacy, aesthetics, and exceptional service.',
    servicesEyebrow: 'What We Do',
    servicesTitle: 'Our <em>Services</em>',
    servicesSub: 'Bespoke travel solutions for private and corporate clients worldwide',
    destinationsEyebrow: 'Where to Travel',
    destinationsTitle: 'Featured <em>Destinations</em>',
    destinationsSub: 'Select a destination to explore the best season, climate, and what makes each journey exceptional',
    destMaldivesTitle: 'Maldives',
    destMaldivesDesc: 'Overwater villas, crystalline lagoons, and absolute seclusion in a tropical paradise.',
    destItalyTitle: 'Italy',
    destItalyDesc: 'Rome, Florence, Amalfi — timeless history, haute cuisine, and an unparalleled atmosphere.',
    destThailandTitle: 'Thailand',
    destThailandDesc: 'Buddhist temples, lush jungles, and island retreats — a harmonious blend of spirit and tropical luxury.',
    destUaeTitle: 'UAE · Dubai',
    destUaeDesc: 'World-class luxury at every turn: architecture, desert safaris, yachts, and the finest hotels on earth.',
    destSwitzerlandTitle: 'Switzerland',
    destSwitzerlandDesc: 'Alpine perfection — Davos, St. Moritz, Zermatt — exceptional ski resorts and world-class hospitality.',
    destJapanTitle: 'Japan',
    destJapanDesc: 'Tokyo, Kyoto, cherry blossom season — where ancient tradition meets ultra-modern sophistication.',
    destSeychellesTitle: 'Seychelles',
    destSeychellesDesc: 'Granite boulders, white sands, turquoise waters, and complete serenity — paradise without compromise.',
    destTanzaniaTitle: 'Tanzania',
    destTanzaniaDesc: 'Serengeti, Zanzibar, Kilimanjaro — safari and ocean in one extraordinary East African journey.',
    destGreeceTitle: 'Greece',
    destGreeceDesc: 'Santorini, Mykonos, Athens — whitewashed villas above cerulean waters and sunsets that captivate the world.',
    destMoreBtn: 'Explore →',
    modalCta: 'Start Planning',
    vipEyebrow: 'Exclusively',
    vipTitle: 'Elevated Travel Services',
    vipDesc: 'For those who value time, privacy, and exceptional comfort at every stage of the journey',
    vipCard1Title: 'Private Aviation',
    vipCard1Text: 'Charter flights and private jet arrangements tailored to your schedule, destinations, and level of comfort.',
    vipCard2Title: 'VIP Airport Assistance',
    vipCard2Text: 'Exclusive access to premium lounges and VIP airport services worldwide — seamless from arrival to departure.',
    vipCard3Title: 'Expert Private Guides',
    vipCard3Text: 'Highly experienced private guides with deep local knowledge, fluent in your language and attuned to your interests.',
    vipCard4Title: 'Global Concierge',
    vipCard4Text: 'A dedicated personal manager available around the clock — reservations, transfers, and bespoke requests handled discreetly.',
    whyEyebrow: 'Why SeaElle',
    whyTitle: 'The Difference is in the <em>Details</em>',
    whyItem1Title: 'Curated Firsthand',
    whyItem1Text: 'We recommend only what we have personally experienced and stand behind with confidence.',
    whyItem2Title: 'No Compromises',
    whyItem2Text: 'Rigorous selection of partners, hotels, and programmes aligned with the highest standards.',
    whyItem3Title: 'End-to-End Support',
    whyItem3Text: 'From initial consultation to your return home — seamless support at every stage of the journey.',
    whyItem4Title: 'Truly Individual',
    whyItem4Text: 'No templates, no off-the-shelf packages. Every itinerary is thoughtfully crafted around you.',
    contactEyebrow: 'Contact Us',
    contactTitle: 'Let\'s begin<br /><em>crafting</em><br />your journey',
    contactSub: 'Share your vision with us — we will design a thoughtfully curated experience tailored to your expectations.',
    contactLabelDirector: 'Director',
    contactLabelHours: 'Working Hours',
    contactLabelHoursVal: 'Mon–Sun: 10:00 — 19:00',
    contactLabelOffice: 'Office',
    contactLabelOfficeVal: 'Tashkent, Uzbekistan',
    footerSlogan: 'We design refined travel experiences<br />tailored to your lifestyle, preferences, and expectations.',
    footerCity: 'Tashkent · Uzbekistan',
    footerNavHeading: 'Navigation',
    footerServicesHeading: 'Services',
    footerContactHeading: 'Contact',
    footerDirectorLabel: 'Director',
    footerDirectorValue: 'Ekaterina Skrileva',
    footerLicenseLabel: 'License',
    footerLicenseValue: '[to be added later]',
    footerNavAbout: 'About Us',
    footerNavServices: 'Services',
    footerNavDestinations: 'Destinations',
    footerNavVip: 'VIP Service',
    footerNavContact: 'Contact',
    footerCopy: '© 2026 SeaElle Travel. All rights reserved.',
    navPayment: 'Payment',
  }
};

// =============================================
//  ENGLISH COUNTRY MODAL DATA
// =============================================
const countryDataEn = {
  maldives: {
    eyebrow: 'Indian Ocean · Private Retreats',
    title: 'Maldives',
    tagline: 'A paradise that surpasses every expectation',
    img: 'images/maldives.jpg',
    desc: 'The Maldives — an archipelago of over 1,200 coral islands. Overwater villas, crystalline lagoons, pristine reefs, and absolute seclusion. No mass tourism — each resort occupies its own island. Time slows, the horizon is boundless, and reality surpasses every expectation.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Tropical, 28–32°C year-round' },
      { icon: '—', label: 'Best Season', val: 'November – April (dry season)' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 8–10 hours with connection' },
      { icon: '—', label: 'Ocean', val: 'Indian Ocean, water temperature +29°C' }
    ]
  },
  italy: {
    eyebrow: 'Europe · Culture & Gastronomy',
    title: 'Italy',
    tagline: 'A country to fall in love with, forever',
    img: 'images/italy.jpg',
    desc: 'Italy is an endless journey through centuries — ancient Rome, Renaissance Florence, romantic Venice, the Amalfi Coast, and Sicily. Each Italian city is its own universe. Haute cuisine, fashion, architecture, and Tuscan vineyards — experiences that cannot be replicated in any standard package tour.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Mediterranean, summer 28–34°C' },
      { icon: '—', label: 'Best Season', val: 'May–June, September–October' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 5–7 hours with connection' },
      { icon: '—', label: 'Regions', val: 'Rome, Tuscany, Amalfi, Sicily, Venice' }
    ]
  },
  thailand: {
    eyebrow: 'Southeast Asia · Tropical Escapes',
    title: 'Thailand',
    tagline: 'A thousand smiles and endless summer',
    img: 'images/thailand.jpg',
    desc: 'Thailand is a remarkable blend of spirituality and tropical luxury. Buddhist temples, jungle interiors, the islands of Phuket and Samui, the markets of Bangkok, and world-class spa resorts. Thailand offers something for everyone — from adventurers to those seeking a refined, private retreat.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Tropical, 28–35°C' },
      { icon: '—', label: 'Best Season', val: 'November – February (dry and mild)' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 5–7 hours with connection' },
      { icon: '—', label: 'Islands', val: 'Phuket, Koh Samui, Phi Phi, Krabi' }
    ]
  },
  uae: {
    eyebrow: 'Middle East · Luxury & Design',
    title: 'UAE · Dubai',
    tagline: 'Luxury without limits',
    img: 'images/uae.jpg',
    desc: 'The UAE is a country where ambition is embodied in architecture. Burj Khalifa, desert safaris, the yachts of Dubai Marina, world-class restaurants, and hotels that redefine excellence. Dubai consistently surpasses expectation — ideal for those who seek luxury with no compromise.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Hot: summer up to 45°C, winter 20–28°C' },
      { icon: '—', label: 'Best Season', val: 'October – April' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 4–5 hours, direct flights available' },
      { icon: '—', label: 'Cities', val: 'Dubai, Abu Dhabi, Sharjah' }
    ]
  },
  switzerland: {
    eyebrow: 'Europe · Alpine Excellence',
    title: 'Switzerland',
    tagline: 'Alpine perfection',
    img: 'images/switzerland.jpg',
    desc: 'Switzerland — where nature achieves absolute perfection. Snow-capped Alps, emerald lakes, Davos, St. Moritz, Zermatt — each resort operates by its own codes of luxury. In winter, world-class skiing; in summer, trekking and total immersion in untouched Alpine nature.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Temperate: winter −5 to −15°C in mountains, summer +20–26°C' },
      { icon: '—', label: 'Ski Season', val: 'December – April' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 6–8 hours with connection' },
      { icon: '—', label: 'Resorts', val: 'Davos, St. Moritz, Zermatt, Interlaken' }
    ]
  },
  japan: {
    eyebrow: 'Asia · Culture & Refinement',
    title: 'Japan',
    tagline: 'A country of contrasts that captivates',
    img: 'images/japan.jpg',
    desc: 'Japan — where ancient tradition coexists with the technology of tomorrow. Tokyo\'s neon districts and Michelin-starred restaurants, Kyoto\'s temples and tea ceremonies, and the cherry blossom season — one of the most breathtaking natural phenomena on earth. Japan permanently transforms one\'s understanding of travel.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Temperate: spring 15–22°C, summer warm and humid' },
      { icon: '—', label: 'Cherry Blossom', val: 'Late March – Early May' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 8–10 hours with connection' },
      { icon: '—', label: 'Cities', val: 'Tokyo, Kyoto, Osaka, Nara, Hiroshima' }
    ]
  },
  seychelles: {
    eyebrow: 'Indian Ocean · Private Islands',
    title: 'Seychelles',
    tagline: 'Paradise — as it was meant to be',
    img: 'images/seychelles.jpg',
    desc: 'An archipelago of 115 islands — among the most private destinations on earth. No mass tourism: only granite boulders, white sand, turquoise water, and silence. Unique flora and fauna, exclusive private resorts — the Seychelles for those who seek perfection without compromise.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Tropical, 26–32°C year-round' },
      { icon: '—', label: 'Best Season', val: 'April–May, October–November' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 8–10 hours with connection' },
      { icon: '—', label: 'Ocean', val: 'Indian Ocean, water temperature +28°C' }
    ]
  },
  tanzania: {
    eyebrow: 'East Africa · Safari & Ocean',
    title: 'Tanzania',
    tagline: 'The heart of Africa — impossible to forget',
    img: 'images/tanzania.jpg',
    desc: 'Tanzania transforms one\'s perception of the world. The Serengeti\'s great migration, the Ngorongoro Crater, Kilimanjaro — Africa\'s highest peak — and Zanzibar with its spice markets and crystalline ocean. Safari here is an encounter with nature in its most primal form.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Tropical, 25–32°C, two rainy seasons' },
      { icon: '—', label: 'Best Safari Season', val: 'June – October (dry season)' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 9–12 hours with connection' },
      { icon: '—', label: 'Routes', val: 'Serengeti, Zanzibar, Kilimanjaro, Ngorongoro' }
    ]
  },
  greece: {
    eyebrow: 'Mediterranean · Culture & Coast',
    title: 'Greece',
    tagline: 'A country of sunsets and marble villas',
    img: 'images/greece.jpg',
    desc: 'Greece — whitewashed Santorini, caldera sunsets, Venetian streets of Mykonos, and the ancient ruins of Athens. Each Greek island is its own world. Deep blue Aegean waters, olive groves, exceptional cuisine, and the warmth of Greek hospitality — a journey one never wishes to leave.',
    facts: [
      { icon: '—', label: 'Climate', val: 'Mediterranean, summer 28–35°C' },
      { icon: '—', label: 'Best Season', val: 'May–June, September–October' },
      { icon: '—', label: 'Flight Time', val: 'Approx. 5–7 hours with connection' },
      { icon: '—', label: 'Islands', val: 'Santorini, Mykonos, Crete, Rhodes, Corfu' }
    ]
  }
};

// =============================================
//  LANGUAGE SWITCHING
// =============================================
function applyLang(lang) {
  const t = i18n[lang];

  // Update plain text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update HTML nodes (elements containing tags like <em>, <br>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Rebuild strip marquee
  buildStrip(lang);

  // Show/hide lang-specific elements (service cards etc.)
  document.querySelectorAll('[data-lang-show]').forEach(el => {
    el.style.display = el.dataset.langShow === lang ? '' : 'none';
  });

  // Ensure newly visible animated elements are in-view
  document.querySelectorAll(`[data-lang-show="${lang}"].service-card`).forEach(el => {
    el.classList.add('in-view');
  });

  // Update lang button states (both desktop + mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Set html[lang] attribute
  document.documentElement.lang = lang;

  // Persist preference
  localStorage.setItem('seaelle-lang', lang);
  currentLang = lang;
}

// Attach click handlers to all lang buttons (desktop + mobile)
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Initialize on load
applyLang(currentLang);

// =============================================
//  CLICK PAYMENT INTEGRATION
//  Все ключи хранятся в myconfig.php (уровнем выше) и используются
//  только в PHP (pay-init.php, click-handler.php).
//  Фронтенд ключей не содержит.
// =============================================

let currentPaymentMethod = 'click';

const paymentModal    = document.getElementById('paymentModal');
const paymentModalClose = document.getElementById('paymentModalClose');
const paymentModalTitle = document.getElementById('paymentModalTitle');
const paymentModalEyebrow = document.getElementById('paymentModalEyebrow');
const paymentAmountInput = document.getElementById('paymentAmountInput');
const paymentRefInput   = document.getElementById('paymentRefInput');
const paymentFormNote   = document.getElementById('paymentFormNote');
const paymentSubmitBtn  = document.getElementById('paymentSubmitBtn');

const paymentTitles = {
  click: { ru: 'Оплата через CLICK', en: 'Pay via CLICK' },
  card:  { ru: 'Оплата с карты',     en: 'Pay by Card'  },
};

function openPaymentModal(method) {
  currentPaymentMethod = method;
  const lang = currentLang;
  paymentModalEyebrow.textContent = lang === 'en' ? 'Online Payment' : 'Онлайн-оплата';
  paymentModalTitle.textContent   = paymentTitles[method][lang];
  paymentFormNote.textContent = '';
  paymentAmountInput.value = '';
  paymentRefInput.value = '';
  paymentModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => paymentAmountInput.focus(), 200);
}

function closePaymentModal() {
  paymentModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.payment-open-btn').forEach(btn => {
  btn.addEventListener('click', () => openPaymentModal(btn.dataset.method));
});

paymentModalClose.addEventListener('click', closePaymentModal);

paymentModal.addEventListener('click', (e) => {
  if (e.target === paymentModal) closePaymentModal();
});

// Escape key is already handled globally — extend to close payment modal too
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && paymentModal.classList.contains('open')) closePaymentModal();
});

paymentSubmitBtn.addEventListener('click', () => {
  const lang   = currentLang;
  const amount = paymentAmountInput.value.trim();
  const ref    = paymentRefInput.value.trim();

  const errAmount = lang === 'en' ? 'Please enter the amount.'            : 'Введите сумму оплаты.';
  const errRef    = lang === 'en' ? 'Please enter the booking reference.' : 'Введите номер заявки.';
  const errMin    = lang === 'en' ? 'Minimum amount is 1,000 UZS.'        : 'Минимальная сумма — 1 000 сум.';
  const errNet    = lang === 'en' ? 'Connection error. Please try again.' : 'Ошибка соединения. Попробуйте снова.';
  const errSrv    = lang === 'en' ? 'Payment not configured on server.'   : 'Оплата не настроена на сервере.';

  if (!amount) { paymentFormNote.textContent = errAmount; return; }
  if (parseFloat(amount) < 1000) { paymentFormNote.textContent = errMin; return; }
  if (!ref)    { paymentFormNote.textContent = errRef; return; }

  paymentFormNote.textContent = '';
  paymentSubmitBtn.disabled = true;

  // Запрашиваем параметры у сервера — ключи остаются только в PHP
  fetch('pay-init.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method:     currentPaymentMethod,
      amount:     parseFloat(amount),
      ref:        ref,
      return_url: window.location.href,
    }),
  })
    .then(res => res.json())
    .then(data => {
      paymentSubmitBtn.disabled = false;

      if (!data.success) {
        paymentFormNote.textContent = data.error || errSrv;
        return;
      }

      if (currentPaymentMethod === 'click') {
        closePaymentModal();
        window.open(data.url, '_blank', 'noopener,noreferrer');

      } else {
        // Оплата по карте — checkout.js overlay
        if (typeof createPaymentRequest !== 'function') {
          paymentFormNote.textContent = lang === 'en'
            ? 'Card payment library failed to load. Please refresh the page.'
            : 'Библиотека оплаты не загрузилась. Обновите страницу.';
          return;
        }
        closePaymentModal();
        createPaymentRequest(
          {
            service_id:        data.service_id,
            merchant_id:       data.merchant_id,
            amount:            data.amount,
            transaction_param: data.transaction_param,
          },
          function (result) {
            if (result && result.status === 2) {
              console.log('CLICK payment completed successfully.');
            }
          }
        );
      }
    })
    .catch(() => {
      paymentSubmitBtn.disabled = false;
      paymentFormNote.textContent = errNet;
    });
});
