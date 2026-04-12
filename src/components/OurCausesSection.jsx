import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurCausesSection.css';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PACING = 1.28;
const MOBILE_SCROLL_PACING = 1.05;

function OurCausesSection({ slides }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const triggerIdsRef = useRef({
    pin: 'our-causes-stage-pin',
    pinMobile: 'our-causes-stage-pin-mobile',
    heading: 'our-causes-heading-reveal',
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current || prefersReducedMotion) {
      return undefined;
    }

    const triggerIds = triggerIdsRef.current;

    const ctx = gsap.context(() => {
      const headingEl = sectionRef.current?.querySelector('.our-causes-heading');

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

    mm.add('(min-width: 768px)', () => {
      const scopedCtx = gsap.context(() => {
        const panels = gsap.utils.toArray('.our-causes-panel');

        gsap.set(panels, {
          yPercent: (index) => (index === 0 ? 0 : 100),
        });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: triggerIds.pin,
            trigger: stageRef.current,
            start: 'top top',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            end: () => '+=' + (panels.length - 1) * window.innerHeight * SCROLL_PACING,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress * (panels.length - 1);

              panels.forEach((panel) => {
                panel.setAttribute('data-overlap', 'false');
              });

              for (let index = 0; index < panels.length - 1; index += 1) {
                if (progress > index && progress < index + 1) {
                  panels[index].setAttribute('data-overlap', 'true');
                  break;
                }
              }
            },
          },
        });

        for (let index = 1; index < panels.length; index += 1) {
          timeline.to(
            panels[index],
            {
              yPercent: 0,
              duration: 1,
            },
            index - 1
          );
        }
      }, sectionRef);

      return () => {
        scopedCtx.revert();
      };
    });

    mm.add('(max-width: 767px)', () => {
      const scopedCtx = gsap.context(() => {
        sectionRef.current?.classList.add('mobile-slide-enabled');
        const panels = gsap.utils.toArray('.our-causes-panel');

        gsap.set(panels, {
          yPercent: (index) => (index === 0 ? 0 : 100),
        });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: triggerIds.pinMobile,
            trigger: stageRef.current,
            start: 'top top',
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            end: () => '+=' + (panels.length - 1) * window.innerHeight * MOBILE_SCROLL_PACING,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress * (panels.length - 1);

              panels.forEach((panel) => {
                panel.setAttribute('data-overlap', 'false');
              });

              for (let index = 0; index < panels.length - 1; index += 1) {
                if (progress > index && progress < index + 1) {
                  panels[index].setAttribute('data-overlap', 'true');
                  break;
                }
              }
            },
          },
        });

        for (let index = 1; index < panels.length; index += 1) {
          timeline.to(
            panels[index],
            {
              yPercent: 0,
              duration: 1,
            },
            index - 1
          );
        }
      }, sectionRef);

      return () => {
        sectionRef.current?.classList.remove('mobile-slide-enabled');
        scopedCtx.revert();
      };
    });

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
      className={`our-causes-scroll${prefersReducedMotion ? ' reduced-motion' : ''}`}
      aria-labelledby="our-causes-scroll-title"
    >
      <div className="our-causes-header-block">
        <h2 id="our-causes-scroll-title" className="our-causes-heading">Our <span style={{ color: '#01ACA6' }}>Causes</span></h2>
      </div>

      <div ref={stageRef} className="our-causes-stage">
        {slides.map((slide) => (
          <article className="our-causes-panel" key={slide.title} data-overlap="false">
            <div className="our-causes-panel-overlay" aria-hidden="true" />

            <div className="our-causes-panel-inner">
              <div className="our-causes-panel-media" aria-hidden="true">
                <span>Image</span>
              </div>

              <div className="our-causes-panel-content">
                <p className="our-causes-panel-kicker">{slide.title}</p>
                <h3>{slide.subtitle}</h3>
                {slide.text.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OurCausesSection;
