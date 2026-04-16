import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';
import AuroraTimeline from '../components/AuroraTimeline';
import ProfileGridSection from '../components/ProfileGridSection';
import { shariaBoard, trustees } from '../data/peopleData';

gsap.registerPlugin(ScrollTrigger);

const floatingCards = [
  { className: 'hero-card hero-card--1' },
  { className: 'hero-card hero-card--2' },
  { className: 'hero-card hero-card--3' },
  { className: 'hero-card hero-card--4' },
  { className: 'hero-card hero-card--5' },
  { className: 'hero-card hero-card--6' },
];

const steps = [
  { num: '01', title: 'DONATE', desc: 'We receive your donation to the National Waqf', color: '#E27D50' },
  { num: '02', title: 'INVEST', desc: 'Our investment committee invests your donation to generate long-term returns', color: '#C7366B' },
  { num: '03', title: 'DISTRIBUTE', desc: '50% of the returns are given as grants to verified UK causes and charities', color: '#2B346C' },
  { num: '04', title: 'GROW', desc: 'The other 50% is re-invested so your donation continues to grow year after year', color: '#01ACA6' },
];

const principles = [
  {
    title: 'Unity of the Ummah',
    text: 'We work to strengthen cohesion and collective progress through projects that benefit the wider community.',
  },
  {
    title: 'Transparency and Trust',
    text: 'We maintain clear governance, robust reporting, and responsible stewardship of every donation and asset.',
  },
  {
    title: 'Professional Excellence',
    text: 'We apply structured planning and expert oversight to deliver measurable social impact over the long term.',
  },
  {
    title: 'Independence with Integrity',
    text: 'We uphold principled decision-making so every strategic action aligns with our mission and values.',
  },
];

const PVM_SCROLL_PACING = 1.28;

const pvmSlides = [
  {
    id: 'about-purpose-title',
    label: 'Purpose',
    theme: 'dark',
    reverse: false,
    body: 'National Waqf exists to institutionalise the revival of waqf in the UK as a permanent engine for community resilience, social good, and ethical nation-building. This document sets out a clear strategic framework that defines our long-term direction, priority objectives, and measurable goals over the next three to five years.',
  },
  {
    id: 'about-vision-title',
    label: 'Vision',
    theme: 'light',
    reverse: true,
    body: 'To establish Waqf as a permanent, trusted, and transformative institution in the UK, funding generations of social, educational, civic, and spiritual impact without dependency on short-term fundraising.',
  },
  {
    id: 'about-mission-title',
    label: 'Mission',
    theme: 'dark',
    reverse: false,
    body: 'To build, protect, and grow sustainable Waqf assets and deploy their returns strategically to empower communities, strengthen institutions, and enable long-term positive change through ethical, transparent, and professional governance.',
  },
];

function AboutPage() {
  const worksSectionRef = useRef(null);
  const worksStageRef = useRef(null);
  const pvmSectionRef = useRef(null);
  const pvmStageRef = useRef(null);
  const [cycleStep, setCycleStep] = useState(1);
  const [hoverStep, setHoverStep] = useState(null);
  const prevStepRef = useRef(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPvmMobile, setIsPvmMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );

  const activeStep = hoverStep ?? cycleStep;
  const activeData = steps[activeStep - 1];
  const isHovering = hoverStep !== null;

  const direction = activeStep >= prevStepRef.current ? 'down' : 'up';
  if (activeStep !== prevStepRef.current) {
    prevStepRef.current = activeStep;
  }

  useLayoutEffect(() => {
    const stageEl = worksStageRef.current;
    if (!stageEl) return undefined;

    const isMobile = window.matchMedia('(max-width: 520px)').matches;
    if (isMobile) {
      setCycleStep(4);
      return undefined;
    }

    const triggerId = 'about-works-cycle-pin';
    const earlyTriggerId = 'about-works-cycle-early';

    ScrollTrigger.create({
      id: earlyTriggerId,
      trigger: stageEl,
      start: 'top 90%',
      end: 'bottom bottom',
      onEnter: () => setCycleStep(1),
      onLeaveBack: () => setCycleStep(1),
    });

    const trigger = ScrollTrigger.create({
      id: triggerId,
      trigger: stageEl,
      start: 'bottom bottom',
      end: () => '+=' + window.innerHeight * 3,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextStep = Math.min(4, Math.max(1, Math.floor(self.progress * 4) + 1));
        setCycleStep((prev) => (prev === nextStep ? prev : nextStep));
      },
      onLeaveBack: () => setCycleStep(1),
    });

    return () => {
      ScrollTrigger.getById(earlyTriggerId)?.kill();
      trigger.kill();
    };
  }, []);

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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsPvmMobile(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useLayoutEffect(() => {
    if (!pvmSectionRef.current || !pvmStageRef.current || prefersReducedMotion || isPvmMobile) {
      return undefined;
    }

    const pvmTriggerId = 'about-pvm-stage-pin';
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.about-pvm-panel');

        gsap.set(panels, {
          yPercent: (i) => (i === 0 ? 0 : 100),
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: pvmTriggerId,
            trigger: pvmStageRef.current,
            start: 'top top',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            end: () => '+=' + (panels.length - 1) * window.innerHeight * PVM_SCROLL_PACING,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress * (panels.length - 1);
              panels.forEach((p) => p.setAttribute('data-overlap', 'false'));
              for (let idx = 0; idx < panels.length - 1; idx += 1) {
                if (progress > idx && progress < idx + 1) {
                  panels[idx].setAttribute('data-overlap', 'true');
                  break;
                }
              }
            },
          },
        });

        for (let idx = 1; idx < panels.length; idx += 1) {
          tl.to(panels[idx], { yPercent: 0, duration: 1 }, idx - 1);
        }
      }, pvmSectionRef);

      return () => ctx.revert();
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.id === pvmTriggerId) t.kill();
      });
      mm.revert();
    };
  }, [prefersReducedMotion, isPvmMobile]);

  return (
    <div className="about-page" id="about">
      <section className="about-section about-hero" aria-labelledby="about-hero-title">
        {floatingCards.map((card, i) => (
          <div key={i} className={card.className} aria-hidden="true" />
        ))}
        <div className="about-shell about-shell-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <h1 id="about-hero-title">National Waqf -<br />Building Communities one project at a Time</h1>
          <p>
            National Waqf works to build infrastructure for communities. Every project we
            invest in is thoroughly researched and developed with the intention of bringing
            maximum benefit to communities, sustainably, for many years. We do this through
            a way of working that has been carefully developed and designed to create
            excellent ROSI (Return On Social Investment).
          </p>
        </div>
      </section>

      <section
        ref={worksSectionRef}
        className="about-section about-works-pinned"
        aria-labelledby="about-works-title"
      >
        <div ref={worksStageRef} className="about-works-pin-stage">
          <div className="about-shell">
            <div className="cycle-header">
              <h2 id="about-works-title">How does National Waqf Work?</h2>
              <p>
                National Waqf operates a sustainable funding cycle where donations are first
                received, then invested by an expert investment committee to generate long-term
                returns. From these returns, a portion is distributed as grants while the
                remaining balance is reinvested so communities can benefit year after year.
              </p>
            </div>
            <div className="cycle-split">
              <div className="cycle-diagram-col">
                <svg
                  className={`cycle-svg is-step-${cycleStep}${isHovering ? ' has-hover' : ''}`}
                  viewBox="0 0 700 700"
                  aria-label="National Waqf funding cycle"
                >
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E27D50" />
                      <stop offset="25%" stopColor="#C7366B" />
                      <stop offset="50%" stopColor="#2B346C" />
                      <stop offset="75%" stopColor="#01ACA6" />
                      <stop offset="100%" stopColor="#E27D50" />
                    </linearGradient>
                  </defs>
                  <g
                    className={`cycle-group${activeStep === 1 ? ' is-active' : ''}`}
                    onMouseEnter={() => setHoverStep(1)}
                    onMouseLeave={() => setHoverStep(null)}
                  >
                    <path className="cycle-slice cycle-slice--1" d="M350,350 L350,20 A330,330 0 0,1 680,350 Z" />
                    <text x="515" y="160" className="cycle-label-num" textAnchor="middle">01</text>
                    <text x="515" y="210" className="cycle-label-title" textAnchor="middle">DONATE</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 2 ? ' is-active' : ''}`}
                    onMouseEnter={() => setHoverStep(2)}
                    onMouseLeave={() => setHoverStep(null)}
                  >
                    <path className="cycle-slice cycle-slice--2" d="M350,350 L680,350 A330,330 0 0,1 350,680 Z" />
                    <text x="515" y="480" className="cycle-label-num" textAnchor="middle">02</text>
                    <text x="515" y="530" className="cycle-label-title" textAnchor="middle">INVEST</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 3 ? ' is-active' : ''}`}
                    onMouseEnter={() => setHoverStep(3)}
                    onMouseLeave={() => setHoverStep(null)}
                  >
                    <path className="cycle-slice cycle-slice--3" d="M350,350 L350,680 A330,330 0 0,1 20,350 Z" />
                    <text x="185" y="480" className="cycle-label-num" textAnchor="middle">03</text>
                    <text x="185" y="530" className="cycle-label-title" textAnchor="middle">DISTRIBUTE</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 4 ? ' is-active' : ''}`}
                    onMouseEnter={() => setHoverStep(4)}
                    onMouseLeave={() => setHoverStep(null)}
                  >
                    <path className="cycle-slice cycle-slice--4" d="M350,350 L20,350 A330,330 0 0,1 350,20 Z" />
                    <text x="185" y="160" className="cycle-label-num" textAnchor="middle">04</text>
                    <text x="185" y="210" className="cycle-label-title" textAnchor="middle">GROW</text>
                  </g>
                  <circle cx="350" cy="350" r="90" fill="#d0d0d6" />
                  <circle className="cycle-ring" cx="350" cy="350" r="78" fill="none" strokeWidth="8" />
                  <circle cx="350" cy="350" r="72" fill="#f2f2f2" />
                </svg>
              </div>
              <div className={`cycle-info-panel${isHovering ? ' is-hover' : ''}`}>
                <div
                  className="cycle-accent-line"
                  style={{ background: activeData.color }}
                />
                <div
                  className={`cycle-info-card cycle-info-${direction}`}
                  key={activeStep}
                >
                  <span className="cycle-info-num" style={{ color: activeData.color }}>
                    {activeData.num}
                  </span>
                  <h3 className="cycle-info-title">{activeData.title}</h3>
                  <p className="cycle-info-desc">{activeData.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-fullscreen" aria-labelledby="about-funding-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-funding-title">How we fund the organisation - Private Waqf</h2>
          <p>
            National Waqf sustains its operations through private waqf assets and aligned
            business contributions. These funds support operational costs and ensure the
            organisation remains effective while maintaining financial sustainability.
          </p>
          <div className="about-diagram-placeholder" aria-hidden="true" />
        </div>
      </section>

      <section
        ref={pvmSectionRef}
        className={`about-pvm-scroll${prefersReducedMotion ? ' reduced-motion' : ''}`}
        aria-label="Purpose, Vision, and Mission"
      >
        <div ref={pvmStageRef} className="about-pvm-stage">
          {pvmSlides.map((slide) => (
            <article
              className={`about-pvm-panel about-pvm-panel--${slide.theme}`}
              key={slide.id}
              data-overlap="false"
            >
              <div className="about-pvm-panel-overlay" aria-hidden="true" />
              <div className="about-pvm-panel-inner">
                <div className="about-shell">
                  <div className={`about-pvm-grid${slide.reverse ? ' about-pvm-grid--reverse' : ''}`}>
                    <h2 id={slide.id} className="about-pvm-title">
                      Our <span className="about-pvm-accent">{slide.label}</span>
                    </h2>
                    <p className="about-pvm-body">{slide.body}</p>
                    <div className="about-pvm-img">
                      <span>Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AuroraTimeline />

      <ProfileGridSection
        id="about-trustees"
        title="Meet our trustees"
        subtitle="Placeholder supporting line for trustees section."
        variant="trustees"
        profiles={trustees}
      />

      <ProfileGridSection
        id="about-shariah-board"
        title="Meet our Shariah board"
        subtitle="Placeholder supporting line for Shariah board section."
        variant="sharia"
        profiles={shariaBoard}
      />

      <section className="about-section about-fullscreen about-principles" aria-labelledby="about-principles-title">
        <div className="about-shell">
          <h2 id="about-principles-title">Our principles</h2>
          <p className="about-principles-subhead">
            We focus on practical impact through values that guide every decision we make.
          </p>

          <div className="about-principles-list">
            {principles.map((principle) => (
              <article className="about-principle-card" key={principle.title}>
                <div className="about-principle-content">
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
