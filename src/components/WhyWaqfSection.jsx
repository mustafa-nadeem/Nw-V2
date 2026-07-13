import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyWaqfSection.css';
import placeholderImg from '../assets/placeholder.jpg';

gsap.registerPlugin(ScrollTrigger);

/* Pin math uses innerHeight; ignoring small mobile viewport chrome changes avoids refresh thrash. */
ScrollTrigger.config({ ignoreMobileResize: true });

const SCROLL_PACING = 1.42;
const LAST_SLIDE_HOLD = 0.42;
const MOBILE_SCROLL_PACING = 1.72;
const MOBILE_LAST_SLIDE_HOLD = 0.68;
const MOBILE_INITIAL_SLIDE_HOLD = 0.72;
const MOBILE_BETWEEN_SLIDE_HOLD = 0.56;

const slides = [
  {
    theme: 'surface',
    title: 'Because self-perpetuating funding is effective:',
    description:
      'Unlike one-time donations that get spent and disappear, waqf can create a permanent income stream or benefit to a community.',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
    alt: 'People walking through a city square representing active community life',
  },
  {
    theme: 'dark',
    title: 'Generational stability:',
    description:
      "Because Waqf assets can't be sold or divided up, they survive political changes, economic crises, and family disputes. A mosque or school established 500 years ago can still be operating today from the same endowment. This provides communities stable institutions that benefit them across generations.",
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Urban skyline at sunset symbolizing shared social progress',
  },
  {
    theme: 'light',
    title: 'The multiplier effect:',
    description:
      'One strategic waqf can spawn entire ecosystems. For example, a Waqf might fund a nearby school, which educates locals, who then open businesses in that same market. The economic and social benefits compound and grow over time.',
    image:
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Architectural structure with strong lines representing institutional stability',
  },
  {
    theme: 'accent',
    title: 'Community impact:',
    description:
      "Waqf creates lasting infrastructure that serves communities for generations. National Waqf carefully analyses and assesses a project's viability and the potential impact it can make before providing the funding that will drive that project forward.",
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80',
    alt: 'Historic and modern buildings side by side symbolizing long-term infrastructure',
  },
];

function WhyWaqfSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const headerBlockRef = useRef(null);
  const triggerIdsRef = useRef({
    pin: 'why-waqf-stage-pin',
    heading: 'why-waqf-heading-reveal',
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showPanelKicker, setShowPanelKicker] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    let resizeT;
    const refreshSoon = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.addEventListener('resize', refreshSoon);
    /* Do not refresh on visualViewport resize: URL bar show/hide recalculates pin end
       and causes visible jump/jitter during scroll on mobile. */
    return () => {
      window.clearTimeout(resizeT);
      window.removeEventListener('resize', refreshSoon);
    };
  }, []);

  useEffect(() => {
    const headerBlock = headerBlockRef.current;
    if (!headerBlock) {
      return undefined;
    }

    let kickerRaf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting;
        window.cancelAnimationFrame(kickerRaf);
        kickerRaf = window.requestAnimationFrame(() => {
          setShowPanelKicker((prev) => (prev === next ? prev : next));
        });
      },
      {
        threshold: 0,
        rootMargin: '160px 0px 0px 0px',
      }
    );

    observer.observe(headerBlock);
    return () => {
      window.cancelAnimationFrame(kickerRaf);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current || prefersReducedMotion) {
      return undefined;
    }

    const triggerIds = triggerIdsRef.current;

    const ctx = gsap.context(() => {
      const headingEl = sectionRef.current?.querySelector('.why-waqf-heading');

      if (headingEl) {
        gsap.fromTo(
          headingEl,
          {
            y: 64,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              id: triggerIds.heading,
              trigger: headingEl,
              start: 'top 95%',
              toggleActions: 'restart reverse restart reverse',
            },
          }
        );
      }
    }, sectionRef);

    const mm = gsap.matchMedia();

    const buildPinnedTimeline = (
      pacing,
      scrubValue,
      holdDuration,
      fastScrollEndValue,
      initialSlideHold = 0,
      betweenSlideHold = 0
    ) => {
      const scopedCtx = gsap.context(() => {
        const panels = gsap.utils.toArray('.why-waqf-panel');
        const transitionSpan = 1 + betweenSlideHold;
        const totalSteps = initialSlideHold + (panels.length - 1) * transitionSpan + holdDuration;

        gsap.set(panels, {
          yPercent: (index) => (index === 0 ? 0 : 100),
        });

        /* Avoid setAttribute on every tick — reduces layout thrash / scroll jitter */
        let lastOverlapIndex = -2;

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: triggerIds.pin,
            trigger: stageRef.current,
            start: 'top top',
            pin: true,
            pinSpacing: true,
            anticipatePin: 0,
            /* Default pinType ('fixed' outside scroll containers) lets the browser hold the
               section in place natively; 'transform' re-translates every frame and on
               Chrome can lag a frame behind compositor scroll → visible jitter. */
            scrub: scrubValue,
            fastScrollEnd: fastScrollEndValue,
            preventOverlaps: 'learn-why',
            end: () => {
              const el = stageRef.current;
              const h = el?.getBoundingClientRect().height;
              /* Match actual stage box (100vh / 100dvh on mobile) so pin distance matches layout. */
              const vh = h && h > 0 ? h : window.innerHeight;
              return '+=' + (panels.length - 1 + holdDuration) * vh * pacing;
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress * totalSteps;

              let overlapIndex = -1;
              for (let index = 0; index < panels.length - 1; index += 1) {
                const rangeStart = initialSlideHold + index * transitionSpan;
                const rangeEnd = rangeStart + 1;
                if (progress > rangeStart && progress < rangeEnd) {
                  overlapIndex = index;
                  break;
                }
              }

              if (overlapIndex === lastOverlapIndex) {
                return;
              }
              const prev = lastOverlapIndex;
              lastOverlapIndex = overlapIndex;

              if (prev >= 0 && panels[prev]) {
                panels[prev].setAttribute('data-overlap', 'false');
              }
              if (overlapIndex >= 0 && panels[overlapIndex]) {
                panels[overlapIndex].setAttribute('data-overlap', 'true');
              }
            },
          },
        });

        for (let index = 1; index < panels.length; index += 1) {
          const startAt = initialSlideHold + (index - 1) * transitionSpan;
          timeline.to(
            panels[index],
            {
              yPercent: 0,
              duration: 1,
            },
            startAt
          );
        }

        timeline.to({}, { duration: holdDuration });
      }, sectionRef);

      return () => {
        scopedCtx.revert();
      };
    };

    mm.add('(min-width: 768px)', () =>
      buildPinnedTimeline(SCROLL_PACING, 0.8, LAST_SLIDE_HOLD, true)
    );
    mm.add('(max-width: 767px)', () =>
      buildPinnedTimeline(
        MOBILE_SCROLL_PACING,
        0.95,
        MOBILE_LAST_SLIDE_HOLD,
        false,
        MOBILE_INITIAL_SLIDE_HOLD,
        MOBILE_BETWEEN_SLIDE_HOLD
      )
    );

    return () => {
      const allowedIds = Object.values(triggerIds);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (allowedIds.includes(trigger.vars?.id)) {
          trigger.kill();
        }
      });
      mm.revert();
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`why-waqf-scroll${prefersReducedMotion ? ' reduced-motion' : ''}${showPanelKicker ? ' why-waqf-scroll--show-kicker' : ''}`}
      aria-labelledby="why-waqf-scroll-title"
    >
      <div ref={headerBlockRef} className="why-waqf-header-block">
        <h2 id="why-waqf-scroll-title" className="why-waqf-heading">Why <span style={{color: '#01ACA6'}}>Waqf?</span></h2>
      </div>

      <div ref={stageRef} className="why-waqf-stage">
        {slides.map((slide) => (
          <article
            className={`why-waqf-panel why-waqf-panel--${slide.theme}`}
            key={slide.title}
            data-overlap="false"
          >
            <div className="why-waqf-panel-overlay" aria-hidden="true" />

            <div className="why-waqf-panel-inner">
              <div className="why-waqf-panel-media" aria-hidden="true">
                <img src={placeholderImg} alt="" />
              </div>

              <div className="why-waqf-panel-content">
                <p className="why-waqf-panel-kicker">Why Waqf?</p>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhyWaqfSection;
