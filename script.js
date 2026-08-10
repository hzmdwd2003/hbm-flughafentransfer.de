const HBM = {
  whatsappNumber: '4915229547574',
  ga4Id: 'G-7REXSWTTEM',
  googleAdsId: 'AW-18239011094',
  // Nach dem Anlegen der Google-Ads-Conversion "WhatsApp Anfrage" hier nur das Conversion-Label eintragen.
  googleAdsConversionLabel: ''
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
  privacy_mobile: 'DATENSCHUTZ-MOBILE'
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
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date);
}

function buildWhatsAppUrl(data) {
  const lines = [
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
      const service = form.dataset.service || data.get('service') || 'Flughafentransfer';
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
    const currentText = url.searchParams.get('text') || 'Hallo HBM, ich möchte einen Flughafentransfer anfragen.';
    if (!currentText.includes('\nRef: ') && !currentText.startsWith('Ref: ')) {
      url.searchParams.set('text', `${currentText}\nRef: ${sourceReference(source)}`);
      link.href = url.toString();
    }
  } catch (_) {
    // Fallback: ursprünglichen Link unverändert lassen.
  }
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

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
}

initConsent();
initInquiryForms();
initDirectWhatsAppLinks();
initMobileNav();
