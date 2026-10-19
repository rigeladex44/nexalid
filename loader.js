/* A short brand introduction, bounded even when resources fail. */
(() => {
  'use strict';
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const started = performance.now();
  let dismissed = false;
  let minimumTimer;
  let maximumTimer;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(minimumTimer);
    clearTimeout(maximumTimer);
    loader.classList.add('is-leaving');
    loader.setAttribute('aria-hidden', 'true');
    document.documentElement.dataset.pageLoading = 'false';
    // Reveal page content only after the overlay finishes fading.
    setTimeout(() => {
      loader.remove();
      document.dispatchEvent(new Event('nexal:loaded'));
    }, reduced.matches ? 0 : 800);
    document.removeEventListener('keydown', dismiss);
    document.removeEventListener('pointerdown', dismiss);
  }
  document.documentElement.dataset.pageLoading = 'true';
  loader.hidden = false;
  maximumTimer = setTimeout(dismiss, 2200);
  function ready() {
    const logo = loader.querySelector('img');
    const logoReady = logo?.decode ? logo.decode().catch(() => {}) : Promise.resolve();
    logoReady.then(() => {
      if (dismissed) return;
      minimumTimer = setTimeout(dismiss, Math.max(0, (reduced.matches ? 0 : 1900) - (performance.now() - started)));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
  document.addEventListener('keydown', dismiss);
  document.addEventListener('pointerdown', dismiss, { passive: true });
  window.addEventListener('pagehide', dismiss, { once: true });
  reduced.addEventListener('change', () => { if (reduced.matches) dismiss(); });
})();
