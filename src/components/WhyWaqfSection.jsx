import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyWaqfSection.css';
import placeholderImg from '../assets/placeholder.jpg';
import selfPerpetuatingImg from '../assets/WhatsApp Image 2025-11-11 at 15.44.01.jpeg';
import cafeBusinessImg from '../assets/image (6) copy 4.jpg';
import generationalStabilityImg from '../assets/image (6) copy 3.png';
import communityImpactImg from '../assets/WhatsApp Image 2026-03-03 at 14.32.23.jpeg';
import { useViewportRebuildKey } from '../hooks/useViewportRebuildKey';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PACING = 0.55;
const LAST_PANEL_HOLD_SCROLL = 160;
const MOBILE_SCROLL_PACING = 0.62;
const MOBILE_LAST_PANEL_HOLD_SCROLL = 160;
const INITIAL_HOLD_STEP = 0.22;
const BETWEEN_PANEL_HOLD_STEP = 0.16;
const LAST_PANEL_HOLD_STEP = 0.24;
const OFFSCREEN_YPERCENT = 103;

const slides = [
  {
    theme: 'surface',
    title: 'Because self-perpetuating funding is effective:',
    description:
      'Unlike one-time donations that get spent and disappear, waqf can create a permanent income stream or benefit to a community.',
    image: selfPerpetuatingImg,
    alt: 'People walking through a city square representing active community life',
  },
  {
    theme: 'dark',
    title: 'Generational stability:',
    description:
      "Because Waqf assets can't be sold or divided up, they survive political changes, economic crises, and family disputes. A mosque or school established 500 years ago can still be operating today from the same endowment. This provides communities stable institutions that benefit them across generations.",
    image: generationalStabilityImg,
    alt: 'Cambridge Central Mosque representing lasting community infrastructure',
  },
  {
    theme: 'light',
    title: 'The multiplier effect:',
    description:
      'One strategic waqf can spawn entire ecosystems. For example, a Waqf might fund a nearby school, which educates locals, who then open businesses in that same market. The economic and social benefits compound and grow over time.',
    image: cafeBusinessImg,
    alt: 'Architectural structure with strong lines representing institutional stability',
  },
  {
    theme: 'accent',
    title: 'Community impact:',
    description:
      "Waqf creates lasting infrastructure that serves communities for generations. National Waqf carefully analyses and assesses a project's viability and the potential impact it can make before providing the funding that will drive that project forward.",
    image: communityImpactImg,
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
  const viewportRebuildKey = useViewportRebuildKey();

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
        rootMargin: '32px 0px 0px 0px',
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

    const buildPinnedTimeline = (pacing, lastPanelHoldScroll, scrubValue) => {
      const scopedCtx = gsap.context(() => {
        const panels = gsap.utils.toArray('.why-waqf-panel');
        const panelTransitions = Math.max(0, panels.length - 1);
        const betweenHoldCount = Math.max(0, panelTransitions - 1);
        const totalSteps =
          INITIAL_HOLD_STEP
          + panelTransitions
          + betweenHoldCount * BETWEEN_PANEL_HOLD_STEP
          + LAST_PANEL_HOLD_STEP;

        gsap.set(panels, {
          yPercent: (index) => (index === 0 ? 0 : OFFSCREEN_YPERCENT),
        });

        let lastOverlapIndex = -2;

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: triggerIds.pin,
            trigger: stageRef.current,
            start: 'top top',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: scrubValue,
            fastScrollEnd: true,
            end: () => '+=' + (
              panelTransitions * window.innerHeight * pacing + lastPanelHoldScroll
            ),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress * totalSteps;

              let overlapIndex = -1;
              let cursor = INITIAL_HOLD_STEP;
              for (let index = 0; index < panelTransitions; index += 1) {
                const rangeStart = cursor;
                const rangeEnd = rangeStart + 1;
                if (progress > rangeStart && progress < rangeEnd) {
                  overlapIndex = index;
                  break;
                }
                cursor = rangeEnd + (
                  index < panelTransitions - 1 ? BETWEEN_PANEL_HOLD_STEP : 0
                );
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

        timeline.to({}, { duration: INITIAL_HOLD_STEP }, 0);

        let cursor = INITIAL_HOLD_STEP;
        for (let index = 1; index < panels.length; index += 1) {
          timeline.to(
            panels[index],
            {
              yPercent: 0,
              duration: 1,
            },
            cursor
          );
          cursor += 1;
          if (index < panels.length - 1) {
            timeline.to({}, { duration: BETWEEN_PANEL_HOLD_STEP }, cursor);
            cursor += BETWEEN_PANEL_HOLD_STEP;
          }
        }

        timeline.to({}, { duration: LAST_PANEL_HOLD_STEP }, cursor);
      }, sectionRef);

      return () => {
        scopedCtx.revert();
      };
    };

    mm.add('(min-width: 768px)', () =>
      buildPinnedTimeline(SCROLL_PACING, LAST_PANEL_HOLD_SCROLL, 0.35)
    );
    mm.add('(max-width: 767px)', () =>
      buildPinnedTimeline(
        MOBILE_SCROLL_PACING,
        MOBILE_LAST_PANEL_HOLD_SCROLL,
        0.4,
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
  }, [prefersReducedMotion, viewportRebuildKey]);

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
                <img src={slide.image || placeholderImg} alt={slide.alt || ''} />
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
