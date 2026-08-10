const HBM = {
  whatsappNumber: '4915229547574',
  ga4Id: 'G-7REXSWTTEM',
  googleAdsId: 'AW-18239011094',
  // Add the Google Ads conversion label here after creating the website conversion.
  googleAdsConversionLabel: ''
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
      ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'
    });
    loadGoogleTag();
    return;
  }
  if (state === 'denied') return;
  const banner = document.querySelector('[data-consent-banner]');
  banner?.querySelector('[data-consent-accept]')?.addEventListener('click', grantConsent);
  banner?.querySelector('[data-consent-deny]')?.addEventListener('click', denyConsent);
}

function trackWhatsApp(source = 'unknown', intent = 'airport_transfer') {
  if (localStorage.getItem('hbm_consent') !== 'granted') return;
  gtag('event', 'whatsapp_click', {
    event_category: 'lead',
    lead_source: source,
    service_intent: intent
  });
  gtag('event', 'generate_lead', {
    currency: 'EUR',
    value: 1,
    lead_source: source,
    service_intent: intent
  });
  if (HBM.googleAdsConversionLabel) {
    gtag('event', 'conversion', {
      send_to: `${HBM.googleAdsId}/${HBM.googleAdsConversionLabel}`,
      value: 1,
      currency: 'EUR'
    });
  }
}

function buildWhatsAppUrl(data) {
  const lines = [
    'Hallo HBM Airport Transfer, ich möchte einen Flughafentransfer anfragen.',
    `Service: ${data.service || 'Economy Transfer'}`,
    `Abholort: ${data.pickup || ''}`,
    `Ziel: ${data.destination || ''}`,
    `Datum/Uhrzeit: ${data.datetime || ''}`,
    `Personen: ${data.passengers || ''}`,
    `Gepäck: ${data.luggage || ''}`,
    `Flugnummer: ${data.flight || ''}`
  ];
  return `https://wa.me/${HBM.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function initInquiryForms() {
  document.querySelectorAll('[data-inquiry-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const service = form.dataset.service || data.get('service') || 'Economy Transfer';
      const url = buildWhatsAppUrl({
        service,
        pickup: data.get('pickup'),
        destination: data.get('destination'),
        datetime: data.get('datetime'),
        passengers: data.get('passengers'),
        luggage: data.get('luggage'),
        flight: data.get('flight')
      });
      trackWhatsApp(form.dataset.source || 'inquiry_form', form.dataset.intent || 'airport_transfer');
      window.open(url, '_blank', 'noopener');
    });
  });
}

function initDirectWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.addEventListener('click', () => {
      trackWhatsApp(link.dataset.source || 'direct_link', link.dataset.intent || 'airport_transfer');
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
