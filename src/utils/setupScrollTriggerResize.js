import { ScrollTrigger } from 'gsap/ScrollTrigger';

let installed = false;

/**
 * Large viewport (100lvh) so pinned sections paint under Safari's floating chrome.
 * Falls back when lvh is unsupported.
 */
export function setAppVh() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  let height = 0;
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;left:0;top:0;height:100lvh;width:0;pointer-events:none;visibility:hidden;';
  document.documentElement.appendChild(probe);
  height = probe.offsetHeight;
  probe.remove();

  if (!height) {
    height = Math.max(
      window.innerHeight,
      document.documentElement.clientHeight || 0,
    );
  }

  height = Math.max(
    height,
    window.visualViewport?.height || 0,
    window.innerHeight || 0,
    document.documentElement.clientHeight || 0,
  );

  document.documentElement.style.setProperty('--app-vh', `${height * 0.01}px`);
}

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
  setAppVh();

  const isTouchOnlyDevice = ScrollTrigger.isTouch === 1;
  if (isTouchOnlyDevice) {
    ScrollTrigger.normalizeScroll({ allowNestedScroll: true });
  }

  let lastWidth = window.innerWidth;
  let timer = 0;

  const notifyAndRefresh = () => {
    setAppVh();
    window.dispatchEvent(
      new CustomEvent('nw:viewport-width-change', {
        detail: { width: window.innerWidth },
      }),
    );
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
    if (isTouchOnlyDevice) {
      ScrollTrigger.normalizeScroll(false);
    }
    installed = false;
  };
}
