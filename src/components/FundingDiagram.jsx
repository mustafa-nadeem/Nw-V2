import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fundingDiagram from '../assets/Funding NW@2x.png';
import './FundingDiagram.css';

gsap.registerPlugin(ScrollTrigger);

function FundingDiagram() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    const imageEl = imageRef.current;
    if (!rootEl || !imageEl) return undefined;

    const triggerId = 'funding-diagram-entrance';

    if (prefersReducedMotion) {
      gsap.set(imageEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: 'circle(150% at 30% 50%)',
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(imageEl, {
        opacity: 0,
        y: 40,
        scale: 0.94,
        clipPath: 'circle(0% at 30% 50%)',
        filter: 'blur(10px)',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: triggerId,
          trigger: rootEl,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to(imageEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out',
      }, 0)
        .to(imageEl, {
          clipPath: 'circle(150% at 30% 50%)',
          duration: 1.6,
          ease: 'power3.inOut',
        }, 0.15)
        .add(() => {
          gsap.to(imageEl, {
            scale: 1.012,
            duration: 5.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        });
    }, rootEl);

    return () => {
      ScrollTrigger.getById(triggerId)?.kill();
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className="funding-diagram">
      <img
        ref={imageRef}
        src={fundingDiagram}
        alt="National Waqf funding sources: internal private waqf, monthly business donations, and gift aid"
        className="funding-diagram__image"
        draggable={false}
      />
    </div>
  );
}

export default FundingDiagram;
