/* Video intro hands off at the logo-free frame to a separate ambient loop. */
(() => {
  'use strict';
  const loader = document.getElementById('page-loader');
  const intro = document.getElementById('intro-video');
  const background = document.getElementById('background-video');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData === true;
  if (!loader || !intro || !background) return;
  let dismissed = false;
  let startTimer;
  let stallTimer;
  let maximumTimer;
  function playBackground() {
    if (reduced.matches || saveData || document.hidden) return;
    if (!background.getAttribute('src')) background.src = background.dataset.src;
    background.muted = true;
    background.play().catch(() => { background.parentElement.hidden = true; });
  }
  background.addEventListener('playing', () => {
    background.parentElement.hidden = false;
    document.body.classList.add('video-background-active');
  });
  background.addEventListener('error', () => {
    background.parentElement.hidden = true;
    document.body.classList.remove('video-background-active');
  });
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(startTimer);
    clearTimeout(stallTimer);
    clearTimeout(maximumTimer);
    playBackground();
    loader.classList.add('is-leaving');
    loader.setAttribute('aria-hidden', 'true');
    document.documentElement.dataset.pageLoading = 'false';
    setTimeout(() => {
      intro.pause();
      intro.removeAttribute('src');
      intro.load();
      loader.remove();
      document.dispatchEvent(new Event('nexal:loaded'));
    }, reduced.matches || saveData ? 0 : 850);
    document.removeEventListener('keydown', dismiss);
    document.removeEventListener('pointerdown', dismiss);
  }
  loader.querySelector('.intro-skip')?.addEventListener('click', dismiss);
  document.documentElement.dataset.pageLoading = 'true';
  if (reduced.matches || saveData) {
    dismiss();
  } else {
    loader.hidden = false;
    intro.muted = true;
    intro.src = intro.dataset.src;
    startTimer = setTimeout(dismiss, 2500);
    maximumTimer = setTimeout(dismiss, 9500);
    intro.addEventListener('playing', () => clearTimeout(startTimer));
    intro.addEventListener('timeupdate', () => {
      clearTimeout(stallTimer);
      if (intro.currentTime >= 6) dismiss();
    });
    intro.addEventListener('waiting', () => {
      clearTimeout(stallTimer);
      stallTimer = setTimeout(dismiss, 1800);
    });
    intro.addEventListener('error', dismiss);
    intro.addEventListener('ended', dismiss);
    intro.play().catch(dismiss);
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss, { passive: true });
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      background.pause();
      background.parentElement.hidden = true;
      document.body.classList.remove('video-background-active');
      dismiss();
    } else if (dismissed) playBackground();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      intro.pause();
      background.pause();
      dismiss();
    } else if (dismissed) playBackground();
  });
  window.addEventListener('pagehide', dismiss, { once: true });
})();
