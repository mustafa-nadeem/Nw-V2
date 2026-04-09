import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatIsWaqfStack.css';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_CARD = 400;
const HEADING_SCROLL = 500;

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
    description: 'what-is-waqf-description-reveal-trigger',
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

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

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobileLayout(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const useStaticLayout = prefersReducedMotion || isMobileLayout;

  useLayoutEffect(() => {
    if (!sectionRef.current || useStaticLayout) {
      return undefined;
    }

    const sectionEl = sectionRef.current;
    const triggerIds = triggerIdsRef.current;
    const {
      pin: pinTriggerId,
      heading: headingTriggerId,
      description: descriptionTriggerId,
    } = triggerIds;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray('.waqf-stack-card');
      const copyEl = sectionEl.querySelector('.waqf-stack-copy');
      const headingEl = sectionEl.querySelector('.waqf-heading');
      const descriptionEl = sectionEl.querySelector('.waqf-stack-description');
      const cardsWrap = sectionEl.querySelector('.waqf-stack-cards');
      const headingWords = gsap.utils.toArray('.waqf-word');
      const totalScroll = HEADING_SCROLL + cardEls.length * SCROLL_PER_CARD;

      // Heading starts centered and large
      gsap.set(copyEl, {
        position: 'absolute',
        top: '50%',
        left: '0%',
        xPercent: 0,
        yPercent: -50,
        width: '100%',
        zIndex: 10,
      });

      gsap.set(headingEl, {
        fontSize: 'clamp(3.5rem, 7vw, 7rem)',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '0.32ch',
      });

      // Cards hidden off-screen
      gsap.set(cardsWrap, { autoAlpha: 0 });

      // Description fades in after heading settles, before cards enter
      gsap.set(descriptionEl, {
        autoAlpha: 0,
        y: 0,
      });

      let isDescriptionVisible = false;

      ScrollTrigger.create({
        id: descriptionTriggerId,
        trigger: sectionEl,
        start: 'top top',
        end: '+=' + totalScroll,
        onUpdate: (self) => {
          const shouldShowDescription = self.progress >= 0.27;

          if (shouldShowDescription === isDescriptionVisible) {
            return;
          }

          isDescriptionVisible = shouldShowDescription;

          gsap.to(descriptionEl, {
            autoAlpha: shouldShowDescription ? 1 : 0,
            duration: shouldShowDescription ? 0.9 : 0.25,
            ease: shouldShowDescription ? 'power2.out' : 'power1.out',
            overwrite: 'auto',
          });
        },
      });

      gsap.set(headingWords, {
        autoAlpha: 0,
        y: 40,
      });

      gsap.set(cardEls, {
        rotation: 0,
        y: '100vh',
        transformOrigin: '50% 50%',
      });

      cardEls.forEach((cardEl, index) => {
        gsap.set(cardEl, { zIndex: index + 1 });
      });

      // Word reveal scrubbed to scroll
      const wordTimeline = gsap.timeline({
        scrollTrigger: {
          id: headingTriggerId,
          trigger: sectionEl,
          start: 'top 40%',
          end: 'top 5%',
          scrub: 1,
        },
      });

      headingWords.forEach((word, i) => {
        wordTimeline.to(word, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, i * 0.6);
      });

      // Main pinned timeline
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: pinTriggerId,
          trigger: sectionEl,
          start: 'top top',
          end: '+=' + totalScroll,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: heading shrinks and moves to left
      timeline
        .to(headingEl, {
          fontSize: 'clamp(2.4rem, 4vw, 5rem)',
          duration: 1,
          ease: 'power2.inOut',
        }, 0)
        .to(copyEl, {
          width: '45%',
          zIndex: 1,
          duration: 1,
          ease: 'power2.inOut',
        }, 0)
        .to(cardsWrap, {
          autoAlpha: 1,
          duration: 0.3,
        }, 1.08);

      // Phase 2: cards fly in
      cardEls.forEach((cardEl) => {
        timeline.to(cardEl, { y: 0, duration: 1 });
      });
    }, sectionEl);

    return () => {
      const allowedIds = Object.values(triggerIds);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (allowedIds.includes(trigger.vars?.id)) {
          trigger.kill();
        }
      });
      ctx.revert();
    };
  }, [useStaticLayout]);

  return (
    <section
      ref={sectionRef}
      className={`section waqf-stack-section${useStaticLayout ? ' reduced-motion' : ''}`}
      aria-labelledby="what-is-waqf-heading"
    >
      <div className="container waqf-stack-layout">
        <div className="waqf-stack-copy">
          <h2 id="what-is-waqf-heading" className="waqf-heading" aria-label="What is Waqf?">
            <span className="waqf-word" aria-hidden="true">What</span>
            <span className="waqf-word" aria-hidden="true">is</span>
            <span className="waqf-word" aria-hidden="true" style={{color: '#01ACA6'}}>Waqf?</span>
          </h2>

          <div className="waqf-stack-description" aria-label="What is Waqf description">
            <p>
              Waqf is a sustainable way of giving to build communities and society.
            </p>
            <p>
              A Waqf (plural Awqaf) is an Islamic charitable endowment made by an
              individual, organisation or institution. Assets such as land, buildings,
              or financial investments can be donated permanently for religious,
              educational or social benefit.
            </p>
            <p>
              Once a Waqf is established, the donated assets cannot be sold,
              transferred, or inherited, ensuring their long-term benefit to the
              community and to society.
            </p>
          </div>
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
