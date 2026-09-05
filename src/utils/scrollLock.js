import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lockCount = 0;
let release = null;

function canConsumeScroll(target, boundary, deltaY) {
  let el = target instanceof Element ? target : null;
  while (el) {
    if (el.scrollHeight > el.clientHeight + 1) {
      const overflowY = window.getComputedStyle(el).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((deltaY > 0 && !atTop) || (deltaY < 0 && !atBottom)) {
          return true;
        }
      }
    }
    if (el === boundary) return false;
    el = el.parentElement;
  }
  return false;
}

export function lockScroll(allowWithinSelector) {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount > 1) return;

  const normalizer = ScrollTrigger.normalizeScroll();
  if (normalizer) normalizer.disable();

  const html = document.documentElement;
  const body = document.body;
  const prevHtmlOverflow = html.style.overflow;
  const prevBodyOverflow = body.style.overflow;
  const prevHtmlOverscroll = html.style.overscrollBehavior;
  const prevBodyOverscroll = body.style.overscrollBehavior;
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  html.style.overscrollBehavior = 'none';
  body.style.overscrollBehavior = 'none';

  let touchStartY = 0;

  const onTouchStart = (event) => {
    touchStartY = event.touches[0].clientY;
  };

  const onTouchMove = (event) => {
    if (!event.cancelable) return;
    const target = event.target;
    const boundary =
      allowWithinSelector && target instanceof Element
        ? target.closest(allowWithinSelector)
        : null;
    if (!boundary) {
      event.preventDefault();
      return;
    }
    const deltaY = event.touches[0].clientY - touchStartY;
    if (!canConsumeScroll(target, boundary, deltaY)) {
      event.preventDefault();
    }
  };

  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: false });

  release = () => {
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    html.style.overflow = prevHtmlOverflow;
    body.style.overflow = prevBodyOverflow;
    html.style.overscrollBehavior = prevHtmlOverscroll;
    body.style.overscrollBehavior = prevBodyOverscroll;
    if (normalizer) normalizer.enable();
  };
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0 && release) {
    release();
    release = null;
  }
}
