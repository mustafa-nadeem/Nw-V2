import { useEffect, useMemo, useRef, useState } from 'react';
import './DigitalReelNumber.css';

const DIGIT_STRIP = Array.from({ length: 20 }, (_, index) => index % 10);

function DigitalReelNumber({ value, className = '' }) {
  const rootRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chars = useMemo(() => String(value).split(''), [value]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setStarted(true);
      return undefined;
    }

    if (!rootRef.current) {
      return undefined;
    }

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(false);
          rafId = window.requestAnimationFrame(() => {
            setStarted(true);
          });
        } else {
          setStarted(false);
        }
      },
      {
        threshold: 0.55,
      }
    );

    observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [reducedMotion]);

  return (
    <span
      ref={rootRef}
      className={`reel-number ${started ? 'is-started' : ''} ${className}`.trim()}
      aria-label={String(value)}
    >
      {chars.map((char, index) => {
        const digit = Number(char);

        if (Number.isNaN(digit)) {
          return (
            <span className="reel-static" key={`${char}-${index}`} style={{ '--wave-index': index }}>
              {char}
            </span>
          );
        }

        return (
          <span className="reel-digit" key={`${char}-${index}`} style={{ '--wave-index': index }}>
            <span
              className="reel-track"
              style={{
                '--target': 10 + digit,
                '--delay': `${index * 90}ms`,
              }}
            >
              {DIGIT_STRIP.map((stripDigit, stripIndex) => (
                <span className="reel-cell" key={`${index}-${stripIndex}`}>
                  {stripDigit}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default DigitalReelNumber;
