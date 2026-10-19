/* Progressive enhancement: native anchor links still work without JavaScript. */
(() => {
  'use strict';
  const nav = document.getElementById('navlinks');
  const header = document.querySelector('header.nav');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!nav || !header) return;

  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  nav.prepend(indicator);
  let frame;
  function positionIndicator() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const active = nav.querySelector('a.active');
      if (!active || matchMedia('(max-width: 1000px)').matches) return;
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
      nav.classList.add('indicator-ready');
    });
  }
  const activeObserver = new MutationObserver(positionIndicator);
  nav.querySelectorAll('a').forEach(link => activeObserver.observe(link, {
    attributes: true, attributeFilter: ['class', 'aria-current']
  }));
  // Observe link attributes only; setting the ready class must not retrigger itself.
  const observer = new ResizeObserver(positionIndicator);
  observer.observe(nav);
  window.addEventListener('resize', positionIndicator, { passive: true });
  if (document.fonts) document.fonts.ready.then(positionIndicator);
  positionIndicator();

  let timer;
  let pendingTarget = null;
  let arrivalAnimation;
  function finishNavigation() {
    clearTimeout(timer);
    if (!pendingTarget) return;
    const target = pendingTarget;
    pendingTarget = null;
    if (reducedMotion.matches) return;
    const heading = target.querySelector('.heading, h1');
    if (heading && typeof heading.animate === 'function') {
      arrivalAnimation = heading.animate([
        { opacity: .65, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 480, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  }
  function cancelArrival() {
    clearTimeout(timer);
    pendingTarget = null;
    if (arrivalAnimation) arrivalAnimation.cancel();
  }
  window.addEventListener('scrollend', finishNavigation);
  window.addEventListener('wheel', cancelArrival, { passive: true });
  window.addEventListener('touchstart', cancelArrival, { passive: true });
  document.addEventListener('keydown', event => {
    if (['Escape', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) cancelArrival();
  });
  reducedMotion.addEventListener('change', cancelArrival);

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    cancelArrival();
    // The existing mobile menu closes on link activation before this handler.
    const offset = (parseFloat(getComputedStyle(header).top) || 0) + header.offsetHeight + 24;
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
    if (location.hash !== hash) history.pushState(null, '', hash);
    const focusTarget = target.querySelector('h1, h2') || target;
    if (!focusTarget.hasAttribute('tabindex')) {
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true });
    }
    focusTarget.focus({ preventScroll: true });
    pendingTarget = target;
    window.scrollTo({ top, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    // Fallback for browsers without the scrollend event, and same-position clicks.
    timer = setTimeout(finishNavigation, reducedMotion.matches ? 0 : 1200);
  });
})();
