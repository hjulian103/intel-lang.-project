// Auto-Detect Language & Adjust Layout
// This script observes changes to the <html> lang attribute (e.g., by Google Translate)
// and applies RTL layout if the language is a right-to-left language.

// List of RTL language codes
const rtlLangs = ['ar', 'he', 'fa', 'ur', 'ps'];

function isRtlLang(lang) {
  return rtlLangs.includes(lang.split('-')[0]);
}

function applyDirectionForLang(lang) {
  const rtlLink = document.getElementById('bootstrap-rtl');
  if (isRtlLang(lang)) {
    document.documentElement.setAttribute('dir', 'rtl');
    rtlLink && rtlLink.removeAttribute('disabled');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    rtlLink && rtlLink.setAttribute('disabled', '');
  }
}

// Observe changes to the <html> lang attribute
const htmlEl = document.documentElement;
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
      const lang = htmlEl.getAttribute('lang') || 'en';
      applyDirectionForLang(lang);
    }
  });
});

observer.observe(htmlEl, { attributes: true });

// Initial check in case the lang is already set
applyDirectionForLang(htmlEl.getAttribute('lang') || 'en');
