/* Animate visible content only. No scroll hijacking, hidden content, or library. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  // Pause decorative light offscreen and respect device motion preferences.
  function syncAmbient() {
    document.body.classList.toggle('ambient-ready', !reduced.matches);
    document.body.classList.toggle('ambient-paused', document.hidden);
  }
  reduced.addEventListener('change', syncAmbient);
  document.addEventListener('visibilitychange', syncAmbient);
  syncAmbient();
  const running = new Set();
  const seen = new WeakSet();
  const targets = [...new Set(document.querySelectorAll(
    '.hero .eyebrow, .hero h1, .hero .lead, .hero .actions, .hero-foot, .visual, .heading, .info-panel, .aboutcopy > p, .cards > .card, .vision > *, .values > *, .steps > *, .faq details, .contactgrid > *, .cta-band'
  ))];
  function animate(element, keyframes, options) {
    if (reduced.matches || document.hidden || !element.animate) return;
    const animation = element.animate(keyframes, options);
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
    return animation;
  }
  function reveal(element) {
    if (seen.has(element)) return;
    seen.add(element);
    const siblings = [...element.parentElement.children].filter(child => targets.includes(child));
    const delay = Math.min(siblings.indexOf(element) * 65, 195);
    animate(element, [
      { opacity: .15, translate: '0 20px' },
      { opacity: 1, translate: '0 0' }
    ], { duration: 760, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    function startReveals() { targets.forEach(target => observer.observe(target)); }
    if (document.documentElement.dataset.pageLoading === 'true' || document.querySelector('.page-loader.is-leaving')) {
      document.addEventListener('nexal:loaded', startReveals, { once: true });
      // Bounded fallback if the loader script is interrupted.
      setTimeout(startReveals, 3200);
    } else startReveals();
  }

  document.querySelectorAll('#faq details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) animate(detail.querySelector('p'), [
        { opacity: 0, translate: '0 -5px' }, { opacity: 1, translate: '0 0' }
      ], { duration: 320, easing: 'ease-out' });
    });
  });

  const visual = document.querySelector('.visual');
  const studio = document.querySelector('.studio');
  let pointerFrame;
  let bounds;
  function resetTilt() {
    cancelAnimationFrame(pointerFrame);
    if (!studio) return;
    studio.style.removeProperty('--tilt-x');
    studio.style.removeProperty('--tilt-y');
    bounds = null;
  }
  if (visual && studio) {
    visual.addEventListener('pointerenter', () => {
      if (!reduced.matches && finePointer.matches) bounds = visual.getBoundingClientRect();
    });
    visual.addEventListener('pointermove', event => {
      if (reduced.matches || !finePointer.matches || !bounds) return;
      const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        studio.style.setProperty('--tilt-x', `${-y * 7}deg`);
        studio.style.setProperty('--tilt-y', `${x * 7}deg`);
      });
    });
    visual.addEventListener('pointerleave', resetTilt);
    visual.addEventListener('pointercancel', resetTilt);
  }
  const header = document.querySelector('header.nav');
  let scrollFrame;
  function updateHeader() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => header?.classList.toggle('is-scrolled', scrollY > 40));
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', resetTilt, { passive: true });
  updateHeader();
  function stopMotion() {
    resetTilt();
    running.forEach(animation => animation.cancel());
    running.clear();
  }
  reduced.addEventListener('change', () => { if (reduced.matches) stopMotion(); });
  finePointer.addEventListener('change', resetTilt);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });
})();
