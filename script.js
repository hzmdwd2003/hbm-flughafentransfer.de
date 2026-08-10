const HBM = {
  whatsappNumber: '4915229547574',
  ga4Id: 'G-7REXSWTTEM',
  googleAdsId: 'AW-18239011094',
  googleAdsConversionLabel: '6d8ZCNG2qt8cEJbyhPlD'
};

const WHATSAPP_SOURCE_LABELS = {
  header: 'START-HEADER',
  hero_primary: 'START-HERO',
  hero_form: 'START-FORM',
  prices_cta: 'START-PREISE',
  footer_cta: 'START-FOOTER',
  footer_link: 'START-FOOTER-LINK',
  mobile_sticky: 'START-MOBILE',
  fra_header: 'FRA-HEADER',
  fra_page_form: 'FRA-FORM',
  fra_prices: 'FRA-PREISE',
  fra_footer: 'FRA-FOOTER',
  fra_footer_link: 'FRA-FOOTER-LINK',
  fra_mobile: 'FRA-MOBILE',
  hhn_header: 'HHN-HEADER',
  hhn_page_form: 'HHN-FORM',
  hhn_route_frankfurt: 'HHN-FRANKFURT',
  hhn_route_mainz: 'HHN-MAINZ',
  hhn_route_wiesbaden: 'HHN-WIESBADEN',
  hhn_route_offenbach: 'HHN-OFFENBACH',
  hhn_footer: 'HHN-FOOTER',
  hhn_footer_link: 'HHN-FOOTER-LINK',
  hhn_mobile: 'HHN-MOBILE',
  xl_header: 'XL-HEADER',
  xl_page_form: 'XL-FORM',
  xl_footer: 'XL-FOOTER',
  xl_footer_link: 'XL-FOOTER-LINK',
  xl_mobile: 'XL-MOBILE',
  imprint_header: 'IMPRESSUM-HEADER',
  imprint_mobile: 'IMPRESSUM-MOBILE',
  privacy_header: 'DATENSCHUTZ-HEADER',
  privacy_mobile: 'DATENSCHUTZ-MOBILE',
  en_header: 'EN-START-HEADER',
  en_hero: 'EN-START-HERO',
  en_form: 'EN-START-FORM',
  en_prices: 'EN-START-PRICES',
  en_footer: 'EN-START-FOOTER',
  en_footer_link: 'EN-START-FOOTER-LINK',
  en_mobile: 'EN-START-MOBILE',
  en_fra_header: 'EN-FRA-HEADER',
  en_fra_form: 'EN-FRA-FORM',
  en_fra_footer: 'EN-FRA-FOOTER',
  en_fra_mobile: 'EN-FRA-MOBILE',
  en_hhn_header: 'EN-HHN-HEADER',
  en_hhn_form: 'EN-HHN-FORM',
  en_hhn_route_frankfurt: 'EN-HHN-FRANKFURT',
  en_hhn_route_mainz: 'EN-HHN-MAINZ',
  en_hhn_route_wiesbaden: 'EN-HHN-WIESBADEN',
  en_hhn_route_offenbach: 'EN-HHN-OFFENBACH',
  en_hhn_footer: 'EN-HHN-FOOTER',
  en_hhn_mobile: 'EN-HHN-MOBILE',
  en_xl_header: 'EN-XL-HEADER',
  en_xl_form: 'EN-XL-FORM',
  en_xl_footer: 'EN-XL-FOOTER',
  en_xl_mobile: 'EN-XL-MOBILE'
};

window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = window.gtag || gtag;

gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

function currentLanguage() {
  return (document.documentElement.lang || 'de').toLowerCase().startsWith('en') ? 'en' : 'de';
}

function loadRefinementStyles() {
  if (document.querySelector('link[data-hbm-refinements]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.dataset.hbmRefinements = 'true';
  link.href = currentLanguage() === 'en' ? '../refinements.css' : 'refinements.css';
  document.head.appendChild(link);
}

function loadGoogleTag() {
  if (document.querySelector('script[data-hbm-google-tag]')) return;
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${HBM.ga4Id}`;
  tag.dataset.hbmGoogleTag = 'true';
  document.head.appendChild(tag);
  gtag('js', new Date());
  gtag('config', HBM.ga4Id);
  gtag('config', HBM.googleAdsId);
}

function grantConsent() {
  localStorage.setItem('hbm_consent', 'granted');
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });
  loadGoogleTag();
  document.querySelector('[data-consent-banner]')?.remove();
}

function denyConsent() {
  localStorage.setItem('hbm_consent', 'denied');
  document.querySelector('[data-consent-banner]')?.remove();
}

function initConsent() {
  const state = localStorage.getItem('hbm_consent');
  if (state === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    loadGoogleTag();
    document.querySelector('[data-consent-banner]')?.remove();
    return;
  }
  if (state === 'denied') {
    document.querySelector('[data-consent-banner]')?.remove();
    return;
  }
  const banner = document.querySelector('[data-consent-banner]');
  banner?.querySelector('[data-consent-accept]')?.addEventListener('click', grantConsent);
  banner?.querySelector('[data-consent-deny]')?.addEventListener('click', denyConsent);
}

function sourceReference(source = 'unknown') {
  return WHATSAPP_SOURCE_LABELS[source] || String(source).toUpperCase().replaceAll('_', '-');
}

function trackWhatsApp(source = 'unknown', intent = 'airport_transfer') {
  if (localStorage.getItem('hbm_consent') !== 'granted') return;
  gtag('event', 'whatsapp_click', {
    event_category: 'lead',
    lead_source: source,
    service_intent: intent
  });
  gtag('event', 'generate_lead', {
    lead_source: source,
    service_intent: intent
  });
  if (HBM.googleAdsConversionLabel) {
    gtag('event', 'conversion', {
      send_to: `${HBM.googleAdsId}/${HBM.googleAdsConversionLabel}`
    });
  }
}

function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(currentLanguage() === 'en' ? 'en-GB' : 'de-DE', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date);
}

function buildWhatsAppUrl(data) {
  const isEnglish = currentLanguage() === 'en';
  const lines = isEnglish ? [
    'Hello HBM, I would like to request an airport transfer.',
    `Service: ${data.service || 'Airport transfer'}`,
    `Pickup: ${data.pickup || ''}`,
    `Destination: ${data.destination || ''}`,
    `Date/time: ${formatDateTime(data.datetime)}`,
    `Passengers: ${data.passengers || ''}`,
    `Luggage: ${data.luggage || ''}`,
    `Flight number: ${data.flight || ''}`,
    `Ref: ${data.reference || 'WEB'}`
  ] : [
    'Hallo HBM, ich möchte einen Flughafentransfer anfragen.',
    `Service: ${data.service || 'Flughafentransfer'}`,
    `Abholort: ${data.pickup || ''}`,
    `Ziel: ${data.destination || ''}`,
    `Datum/Uhrzeit: ${formatDateTime(data.datetime)}`,
    `Personen: ${data.passengers || ''}`,
    `Gepäck: ${data.luggage || ''}`,
    `Flugnummer: ${data.flight || ''}`,
    `Ref: ${data.reference || 'WEB'}`
  ];
  return `https://wa.me/${HBM.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function initInquiryForms() {
  document.querySelectorAll('[data-inquiry-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const source = form.dataset.source || 'inquiry_form';
      const service = form.dataset.service || data.get('service') || (currentLanguage() === 'en' ? 'Airport transfer' : 'Flughafentransfer');
      const url = buildWhatsAppUrl({
        service,
        pickup: data.get('pickup'),
        destination: data.get('destination'),
        datetime: data.get('datetime'),
        passengers: data.get('passengers'),
        luggage: data.get('luggage'),
        flight: data.get('flight'),
        reference: sourceReference(source)
      });
      trackWhatsApp(source, form.dataset.intent || 'airport_transfer');
      window.open(url, '_blank', 'noopener');
    });
  });
}

function addReferenceToDirectLink(link, source) {
  try {
    const url = new URL(link.href);
    if (url.hostname !== 'wa.me') return;
    const fallback = currentLanguage() === 'en'
      ? 'Hello HBM, I would like to request an airport transfer.'
      : 'Hallo HBM, ich möchte einen Flughafentransfer anfragen.';
    const currentText = url.searchParams.get('text') || fallback;
    if (!currentText.includes('\nRef: ') && !currentText.startsWith('Ref: ')) {
      url.searchParams.set('text', `${currentText}\nRef: ${sourceReference(source)}`);
      link.href = url.toString();
    }
  } catch (_) {}
}

function initDirectWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const source = link.dataset.source || 'direct_link';
    addReferenceToDirectLink(link, source);
    link.addEventListener('click', () => {
      trackWhatsApp(source, link.dataset.intent || 'airport_transfer');
    });
  });
}

function initServiceCards() {
  document.querySelectorAll('.service-card').forEach((card) => {
    const link = card.querySelector('a[href]');
    if (!link) return;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      window.location.href = link.href;
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = link.href;
      }
    });
  });
}

function languageTarget() {
  const path = window.location.pathname;
  if (currentLanguage() === 'en') {
    if (path.includes('frankfurt-airport-transfer')) return '/flughafentransfer-frankfurt.html';
    if (path.includes('frankfurt-hahn-airport-transfer')) return '/flughafentransfer-frankfurt-hahn.html';
    if (path.includes('xl-airport-transfer')) return '/xl-flughafentransfer.html';
    return '/';
  }
  if (path.includes('flughafentransfer-frankfurt-hahn')) return '/en/frankfurt-hahn-airport-transfer.html';
  if (path.includes('flughafentransfer-frankfurt')) return '/en/frankfurt-airport-transfer.html';
  if (path.includes('xl-flughafentransfer')) return '/en/xl-airport-transfer.html';
  return '/en/';
}

function initGlobalNavigation() {
  const nav = document.querySelector('[data-nav]');
  const brand = document.querySelector('.brand');
  if (!nav) return;

  const isEnglish = currentLanguage() === 'en';
  const path = window.location.pathname;
  if (brand) brand.href = isEnglish ? '/en/' : '/';

  const items = isEnglish ? [
    ['/en/frankfurt-airport-transfer.html', 'Frankfurt Airport', 'frankfurt-airport-transfer'],
    ['/en/frankfurt-hahn-airport-transfer.html', 'Frankfurt-Hahn', 'frankfurt-hahn-airport-transfer'],
    ['/en/xl-airport-transfer.html', 'XL Transfer', 'xl-airport-transfer'],
    ['/en/#prices', 'Prices', ''],
    ['/en/#faq', 'FAQ', '']
  ] : [
    ['/flughafentransfer-frankfurt.html', 'Frankfurt Airport', 'flughafentransfer-frankfurt.html'],
    ['/flughafentransfer-frankfurt-hahn.html', 'Frankfurt-Hahn', 'flughafentransfer-frankfurt-hahn.html'],
    ['/xl-flughafentransfer.html', 'XL Transfer', 'xl-flughafentransfer.html'],
    ['/#preise', 'Preise', ''],
    ['/#faq', 'FAQ', '']
  ];

  nav.replaceChildren();
  items.forEach(([href, label, match]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (match && path.includes(match)) link.setAttribute('aria-current', 'page');
    nav.appendChild(link);
  });

  const languageLink = document.createElement('a');
  languageLink.href = languageTarget();
  languageLink.dataset.languageLink = 'true';
  languageLink.hreflang = isEnglish ? 'de' : 'en';
  languageLink.textContent = isEnglish ? 'DE' : 'EN';
  languageLink.setAttribute('aria-label', isEnglish ? 'Deutsche Version' : 'English version');
  nav.appendChild(languageLink);
}

function initSubpageHeroForm() {
  const hero = document.querySelector('.page-hero');
  if (!hero) return;
  const heroInner = hero.querySelector('.wrap');
  const form = document.querySelector('main .split > form.inquiry-card[data-inquiry-form]');
  if (!heroInner || !form) return;

  const copy = document.createElement('div');
  copy.className = 'page-hero-copy';
  [...heroInner.childNodes].forEach((node) => copy.appendChild(node));
  heroInner.appendChild(copy);
  heroInner.appendChild(form);
  heroInner.classList.add('subpage-hero-grid');

  const oldSplit = document.querySelector('main .split');
  if (oldSplit && oldSplit.children.length === 1) oldSplit.classList.add('split-single');
}

const HOME_PRICE_GROUPS = {
  de: [
    ['Offenbach / Neu-Isenburg / Bad Vilbel → FRA', 'ab 35 €', 'kurze Strecke aus dem östlichen Rhein-Main-Gebiet'],
    ['Taunus / Hofheim / Bad Soden / Kelkheim → FRA', 'ab 45 €', 'abhängig vom genauen Abholort'],
    ['Hanau / Bruchköbel / Wetterau / Aschaffenburg → FRA', 'ab 55 €', 'je nach Strecke und Uhrzeit'],
    ['Gießen / Marburg / Fulda → FRA', 'ab 69 €', 'längere Strecke zum Frankfurt Airport'],
    ['Mannheim / Heidelberg / Worms / Speyer → FRA', 'ab 89 €', 'direkter Flughafentransfer ohne Umsteigen'],
    ['Stuttgart / Karlsruhe / Heilbronn / Köln → FRA', 'ab 149 €', 'Fernstrecke je nach Abholort und Verfügbarkeit']
  ],
  en: [
    ['Offenbach / Neu-Isenburg / Bad Vilbel → FRA', 'from €35', 'short transfer from the eastern Rhine-Main area'],
    ['Taunus / Hofheim / Bad Soden / Kelkheim → FRA', 'from €45', 'depending on the exact pickup point'],
    ['Hanau / Bruchköbel / Wetterau / Aschaffenburg → FRA', 'from €55', 'depending on route and time'],
    ['Gießen / Marburg / Fulda → FRA', 'from €69', 'longer transfer to Frankfurt Airport'],
    ['Mannheim / Heidelberg / Worms / Speyer → FRA', 'from €89', 'direct airport transfer without changing'],
    ['Stuttgart / Karlsruhe / Heilbronn / Cologne → FRA', 'from €149', 'long-distance transfer depending on pickup point']
  ]
};

function createAreaSection() {
  const faq = document.querySelector('#faq');
  if (!faq || document.querySelector('[data-service-areas]')) return;

  const isEnglish = currentLanguage() === 'en';
  const section = document.createElement('section');
  section.className = 'section service-areas-section';
  section.id = isEnglish ? 'service-areas' : 'einsatzgebiet';
  section.dataset.serviceAreas = 'true';

  const groups = isEnglish ? [
    ['Frankfurt & Offenbach', 'Frankfurt, Offenbach, Bad Vilbel, Karben, Bruchköbel, Gelnhausen, Obertshausen, Seligenstadt', 'from €29'],
    ['Taunus & Main-Taunus', 'Bad Homburg, Friedrichsdorf, Hofheim, Kelkheim, Bad Soden, Kronberg', 'from €45'],
    ['Wetterau & Central Hesse', 'Bad Nauheim, Butzbach, Gießen, Marburg, Alsfeld, Bad Hersfeld, Fulda', 'from €55'],
    ['Darmstadt & South Hesse', 'Darmstadt, Seeheim-Jugenheim, Pfungstadt, Ober-Ramstadt, Dieburg, Groß-Umstadt, Aschaffenburg', 'from €39'],
    ['Rhine-Neckar & Palatinate', 'Mannheim, Heidelberg, Worms, Speyer, Kaiserslautern, Bad Kreuznach, Rüdesheim am Rhein, Idar-Oberstein', 'from €89'],
    ['Long-distance routes', 'Limburg, Koblenz, Neuwied, Heilbronn, Pforzheim, Karlsruhe, Stuttgart, Cologne', 'from €99']
  ] : [
    ['Frankfurt & Offenbach', 'Frankfurt, Offenbach, Bad Vilbel, Karben, Bruchköbel, Gelnhausen, Obertshausen, Seligenstadt', 'ab 29 €'],
    ['Taunus & Main-Taunus', 'Bad Homburg, Friedrichsdorf, Hofheim, Kelkheim, Bad Soden, Kronberg', 'ab 45 €'],
    ['Wetterau & Mittelhessen', 'Bad Nauheim, Butzbach, Gießen, Marburg, Alsfeld, Bad Hersfeld, Fulda', 'ab 55 €'],
    ['Darmstadt & Südhessen', 'Darmstadt, Seeheim-Jugenheim, Pfungstadt, Ober-Ramstadt, Dieburg, Groß-Umstadt, Aschaffenburg', 'ab 39 €'],
    ['Rhein-Neckar & Pfalz', 'Mannheim, Heidelberg, Worms, Speyer, Kaiserslautern, Bad Kreuznach, Rüdesheim am Rhein, Idar-Oberstein', 'ab 89 €'],
    ['Weitere Fernstrecken', 'Limburg, Koblenz, Neuwied, Heilbronn, Pforzheim, Karlsruhe, Stuttgart, Köln', 'ab 99 €']
  ];

  const cards = groups.map(([title, cities, price]) => `
    <article class="area-card"><div class="area-card-head"><h3>${title}</h3><strong class="area-price">${price}</strong></div><p>${cities}</p></article>`).join('');

  section.innerHTML = `
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${isEnglish ? 'Pickup areas' : 'Abholorte & Regionen'}</span>
        <h2>${isEnglish ? 'Airport transfers beyond Frankfurt.' : 'Nicht nur Frankfurt: Wir fahren auch aus der Region.'}</h2>
        <p>${isEnglish ? 'These are examples of frequently requested pickup areas. The displayed amounts are starting prices; the exact fixed price is confirmed before booking.' : 'Das sind Beispiele für häufig angefragte Abholorte. Die genannten Beträge sind Ab-Preise; den genauen Festpreis bestätigen wir vor der Buchung.'}</p>
      </div>
      <div class="area-grid">${cards}</div>
      <div class="compare-strip area-cta"><div><strong>${isEnglish ? 'Your city is not listed?' : 'Dein Ort ist nicht dabei?'}</strong><p>${isEnglish ? 'Send us your pickup location and airport. We will check the route and quote a fixed price.' : 'Schick uns Abholort und Flughafen. Wir prüfen die Strecke und nennen dir einen Festpreis.'}</p></div><a class="btn btn-whatsapp" data-whatsapp data-source="${isEnglish ? 'en_prices' : 'prices_cta'}" href="https://wa.me/${HBM.whatsappNumber}?text=${encodeURIComponent(isEnglish ? 'Hello HBM, I would like a price for an airport transfer.\nPickup: \nAirport/destination: \nDate/time: ' : 'Hallo HBM, ich möchte einen Preis für einen Flughafentransfer anfragen.\nAbholort: \nFlughafen/Ziel: \nDatum/Uhrzeit: ')}" target="_blank" rel="noopener">${isEnglish ? 'Request your route' : 'Strecke anfragen'}</a></div>
    </div>`;

  faq.parentNode.insertBefore(section, faq);
}

function appendPriceCards(grid, items) {
  items.forEach(([route, price, note]) => {
    const card = document.createElement('article');
    card.className = 'price-card price-card-more';
    card.innerHTML = `<span>${route}</span><strong>${price}</strong><small>${note}</small>`;
    grid.appendChild(card);
  });
}

function moveXlCardToEnd(grid) {
  const xlCard = [...grid.querySelectorAll('.price-card')].find((card) => /\bXL\b/i.test(card.textContent));
  if (xlCard) grid.appendChild(xlCard);
}

function expandHomePrices() {
  const priceSection = document.querySelector(currentLanguage() === 'en' ? '#prices' : '#preise');
  const grid = priceSection?.querySelector('.price-grid');
  if (!grid || grid.dataset.expanded === 'true') return;
  grid.dataset.expanded = 'true';

  appendPriceCards(grid, HOME_PRICE_GROUPS[currentLanguage()]);
  moveXlCardToEnd(grid);
}

function expandFraPagePrices() {
  const path = window.location.pathname;
  const isEnglish = currentLanguage() === 'en';
  const isFraPage = isEnglish
    ? path.includes('frankfurt-airport-transfer.html')
    : path.includes('flughafentransfer-frankfurt.html') && !path.includes('frankfurt-hahn');
  if (!isFraPage) return;

  const grid = document.querySelector('main .price-grid');
  if (!grid || grid.dataset.expanded === 'true') return;
  grid.dataset.expanded = 'true';
  appendPriceCards(grid, HOME_PRICE_GROUPS[currentLanguage()]);
  moveXlCardToEnd(grid);
}

function enhanceHahnPrices() {
  const path = window.location.pathname;
  const isEnglish = currentLanguage() === 'en';
  const isHahnPage = isEnglish
    ? path.includes('frankfurt-hahn-airport-transfer.html')
    : path.includes('flughafentransfer-frankfurt-hahn.html');
  if (!isHahnPage) return;

  const heroPrice = document.querySelector('.page-hero .price-hook strong');
  if (heroPrice) heroPrice.textContent = isEnglish ? 'from €129' : 'ab 129 €';

  const prices = {
    hhn_route_frankfurt: isEnglish ? 'from €129' : 'ab 129 €',
    en_hhn_route_frankfurt: 'from €129',
    hhn_route_mainz: isEnglish ? 'from €119' : 'ab 119 €',
    en_hhn_route_mainz: 'from €119',
    hhn_route_wiesbaden: isEnglish ? 'from €119' : 'ab 119 €',
    en_hhn_route_wiesbaden: 'from €119',
    hhn_route_offenbach: isEnglish ? 'from €129' : 'ab 129 €',
    en_hhn_route_offenbach: 'from €129'
  };

  document.querySelectorAll('.route[data-source]').forEach((route) => {
    const price = prices[route.dataset.source];
    if (!price) return;
    const label = route.querySelector('span');
    if (label) label.textContent = `${price} · ${isEnglish ? 'Request price →' : 'Preis anfragen →'}`;
  });
}

function expandHomeFaq() {
  const faq = document.querySelector('#faq .faq');
  if (!faq || faq.dataset.expanded === 'true') return;
  faq.dataset.expanded = 'true';
  const isEnglish = currentLanguage() === 'en';
  const details = document.createElement('details');
  details.innerHTML = isEnglish
    ? '<summary>Which pickup areas do you serve?</summary><p>Besides Frankfurt, we regularly accept requests from the Rhine-Main region, the Taunus, Wetterau, Central Hesse, Darmstadt and South Hesse, as well as longer routes from Mannheim, Heidelberg, Karlsruhe, Stuttgart, Cologne and other cities. The exact fixed price is confirmed before booking.</p>'
    : '<summary>Aus welchen Orten fahrt ihr zum Flughafen?</summary><p>Neben Frankfurt kannst du unter anderem Transfers aus Offenbach, dem Taunus, der Wetterau, Mittelhessen, Darmstadt und Südhessen sowie längere Strecken aus Mannheim, Heidelberg, Karlsruhe, Stuttgart, Köln und weiteren Orten anfragen. Den konkreten Festpreis bestätigen wir vor der Buchung.</p>';
  faq.appendChild(details);

  const longDistance = document.createElement('details');
  longDistance.innerHTML = isEnglish
    ? '<summary>Do you also offer long-distance airport transfers?</summary><p>Yes. Longer routes such as Mannheim, Heidelberg, Gießen, Marburg, Karlsruhe, Stuttgart, Koblenz or Cologne can be requested. Availability and price depend on the exact pickup point and travel time.</p>'
    : '<summary>Fahrt ihr auch längere Strecken zum Flughafen?</summary><p>Ja. Auch längere Strecken wie Mannheim, Heidelberg, Gießen, Marburg, Karlsruhe, Stuttgart, Koblenz oder Köln kannst du anfragen. Verfügbarkeit und Preis hängen vom genauen Abholort und der Fahrtzeit ab.</p>';
  faq.appendChild(longDistance);
}

function initHomeEnhancements() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = currentLanguage() === 'en' ? (path === '/en' || path === '/en/index.html') : (path === '/' || path === '/index.html');
  if (!isHome) return;
  expandHomePrices();
  createAreaSection();
  expandHomeFaq();
}

function initRoutePriceEnhancements() {
  expandFraPagePrices();
  enhanceHahnPrices();
}

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
}

loadRefinementStyles();
initGlobalNavigation();
initSubpageHeroForm();
initHomeEnhancements();
initRoutePriceEnhancements();
initConsent();
initInquiryForms();
initDirectWhatsAppLinks();
initServiceCards();
initMobileNav();