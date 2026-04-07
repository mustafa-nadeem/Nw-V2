import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatIsWaqfStack.css';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_CARD = 400;

const cards = [
  {
    title: 'How waqf works?',
    intro: 'A sustainable and permanent benefit to society:',
    paragraphs: [
      'Waqf creates a permanent income stream and permanent benefit to a community. A donated building generates rent forever or farmland produces crops year after year.',
      'The infrastructure funds itself and the benefits can self perpetuate. Because a Waqf cannot be sold or transferred and is entrusted to trustees, the benefits perpetually work for the community.',
    ],
  },
  {
    title: 'The benfits of waqf',
    sections: [
      {
        heading: 'Rewards to the donor:',
        body:
          'The rewards to the donor count the same as Sadaqah Jariyah - an ongoing reward for as long as the donation is in use.',
      },
      {
        heading: 'Wealth circulation:',
        body: 'A Waqf redirects private wealth towards public good.',
      },
      {
        heading: 'Independence:',
        body:
          'Communities can fund their own religious and social institutions through sustainable investment.',
      },
    ],
  },
  {
    title: 'Building sustainable infrastructure',
    intro: 'An Islamic way of building communities:',
    paragraphs: [
      'Throughout Islamic history, Waqf has funded universities, hospitals, libraries, public fountains, wells, supported scholars as well as many other societal causes. Waqf creates lasting infrastructure that serves communities for generations.',
      'It is an endowment fund rooted in Islamic law and spirituality - designed to build communities and benefit them forever.',
    ],
  },
];

function WhatIsWaqfStack() {
  const sectionRef = useRef(null);
  const triggerIdsRef = useRef({
    pin: 'what-is-waqf-stack-pin-trigger',
    heading: 'what-is-waqf-heading-reveal-trigger',
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setPrefersReducedMotion(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) {
      return undefined;
    }

    const sectionEl = sectionRef.current;
    const { pin: pinTriggerId, heading: headingTriggerId } = triggerIdsRef.current;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray('.waqf-stack-card');
      const headingEl = sectionEl.querySelector('.waqf-heading');
      const headingWords = gsap.utils.toArray('.waqf-word');

      gsap.set(headingWords, {
        autoAlpha: 0,
        y: 20,
      });

      gsap.to(headingWords, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          id: headingTriggerId,
          trigger: headingEl || sectionEl,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.set(cardEls, {
        rotation: 15,
        y: '100vh',
        transformOrigin: '50% 50%',
      });

      cardEls.forEach((cardEl, index) => {
        gsap.set(cardEl, { zIndex: index + 1 });
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: pinTriggerId,
          trigger: sectionEl,
          start: 'top top',
          end: '+=' + cardEls.length * SCROLL_PER_CARD,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cardEls.forEach((cardEl) => {
        timeline.to(cardEl, { rotation: 0, y: 0, duration: 1 });
      });
    }, sectionEl);

    return () => {
      const triggerIds = Object.values(triggerIdsRef.current);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (triggerIds.includes(trigger.vars?.id)) {
          trigger.kill();
        }
      });
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`section waqf-stack-section${prefersReducedMotion ? ' reduced-motion' : ''}`}
      aria-labelledby="what-is-waqf-heading"
    >
      <div className="container waqf-stack-layout">
        <div className="waqf-stack-copy">
          <h2 id="what-is-waqf-heading" className="waqf-heading" aria-label="What is Waqf?">
            <span className="waqf-word" aria-hidden="true">What</span>
            <span className="waqf-word" aria-hidden="true">is</span>
            <span className="waqf-word" aria-hidden="true">Waqf?</span>
          </h2>
        </div>

        <div className="waqf-stack-cards" role="list" aria-label="What is Waqf key cards">
          {cards.map((card, index) => (
            <article
              className="waqf-stack-card"
              key={card.title}
              role="listitem"
              aria-setsize={cards.length}
              aria-posinset={index + 1}
            >
              <div className="waqf-stack-icon" aria-hidden="true">Icon</div>
              <p className="waqf-stack-index">{String(index + 1).padStart(2, '0')}</p>
              <h3>{card.title}</h3>

              {card.intro ? <p className="waqf-stack-intro">{card.intro}</p> : null}

              {card.paragraphs
                ? card.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : null}

              {card.sections
                ? card.sections.map((item) => (
                    <div className="waqf-stack-detail" key={item.heading}>
                      <p className="waqf-stack-detail-heading">{item.heading}</p>
                      <p>{item.body}</p>
                    </div>
                  ))
                : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatIsWaqfStack;
