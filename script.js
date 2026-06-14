// Kleine UX-Verbesserung: externe WhatsApp-Links trackbar markieren
const links = document.querySelectorAll('a[href^="https://wa.me/"]');
links.forEach((link) => {
  link.addEventListener('click', () => {
    try {
      if (window.gtag) window.gtag('event', 'whatsapp_click');
    } catch (_) {}
  });
});
