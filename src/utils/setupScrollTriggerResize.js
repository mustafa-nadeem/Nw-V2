import { ScrollTrigger } from 'gsap/ScrollTrigger';

let installed = false;

/**
 * Keep ScrollTrigger pin spacers / start-end values in sync while the viewport
 * is resized live (DevTools responsive mode, window drag, orientation).
 * Ignores height-only changes (mobile URL bar) to avoid scroll jitter.
 */
export function setupScrollTriggerResize() {
  if (installed || typeof window === 'undefined') {
    return () => {};
  }

  installed = true;
  ScrollTrigger.config({ ignoreMobileResize: true });

  let lastWidth = window.innerWidth;
  let timer = 0;

  const notifyAndRefresh = () => {
    window.dispatchEvent(
      new CustomEvent('nw:viewport-width-change', {
        detail: { width: window.innerWidth },
      }),
    );
    /* Allow React layout effects to rebuild pins, then refresh spacers. */
    window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  };

  const onResize = () => {
    const width = window.innerWidth;
    if (width === lastWidth) {
      return;
    }
    lastWidth = width;
    window.clearTimeout(timer);
    timer = window.setTimeout(notifyAndRefresh, 120);
  };

  const onOrientation = () => {
    lastWidth = window.innerWidth;
    window.clearTimeout(timer);
    timer = window.setTimeout(notifyAndRefresh, 180);
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onOrientation);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onOrientation);
    installed = false;
  };
}
