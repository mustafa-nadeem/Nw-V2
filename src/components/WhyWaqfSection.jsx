import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyWaqfSection.css';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PACING = 1.28;

const slides = [
  {
    title: 'Because self-perpetuating funding is effective:',
    description:
      'Unlike one-time donations that get spent and disappear, waqf can create a permanent income stream or benefit to a community.',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
    alt: 'People walking through a city square representing active community life',
  },
  {
    title: 'Generational stability:',
    description:
      "Because Waqf assets can't be sold or divided up, they survive political changes, economic crises, and family disputes. A mosque or school established 500 years ago can still be operating today from the same endowment. This provides communities stable institutions that benefit them across generations.",
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Urban skyline at sunset symbolizing shared social progress',
  },
  {
    title: 'The multiplier effect:',
    description:
      'One strategic waqf can spawn entire ecosystems. For example, a Waqf might fund a nearby school, which educates locals, who then open businesses in that same market. The economic and social benefits compound and grow over time.',
    image:
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Architectural structure with strong lines representing institutional stability',
  },
  {
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
  const triggerIdsRef = useRef({
    pin: 'why-waqf-stage-pin',
    heading: 'why-waqf-heading-reveal',
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

    mm.add('(min-width: 768px)', () => {
      const scopedCtx = gsap.context(() => {
        const panels = gsap.utils.toArray('.why-waqf-panel');

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
      className={`why-waqf-scroll${prefersReducedMotion ? ' reduced-motion' : ''}`}
      aria-labelledby="why-waqf-scroll-title"
    >
      <div className="why-waqf-header-block">
        <h2 id="why-waqf-scroll-title" className="why-waqf-heading">Why <span style={{color: '#01ACA6'}}>Waqf?</span></h2>
      </div>

      <div ref={stageRef} className="why-waqf-stage">
        {slides.map((slide) => (
          <article className="why-waqf-panel" key={slide.title} data-overlap="false">
            <div className="why-waqf-panel-overlay" aria-hidden="true" />

            <div className="why-waqf-panel-inner">
              <div className="why-waqf-panel-media" aria-label={slide.alt} />

              <div className="why-waqf-panel-content">
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
