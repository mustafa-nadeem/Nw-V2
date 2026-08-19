import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import placeholderImg from '../assets/placeholder.jpg';
import purposeImg from '../assets/image (3).png';
import visionImg from '../assets/image (3) copy.png';
import missionImg from '../assets/WhatsApp Image 2026-02-07 at 17.27.21.jpeg';
import heroCommunityImg from '../assets/1692199542610.jpg';
import heroMosqueImg from '../assets/image (6) copy 3.png';
import heroGatheringImg from '../assets/image (6).png';
import heroProjectImg from '../assets/WhatsApp Image 2025-11-11 at 15.44.01.jpeg';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';
import AuroraTimeline from '../components/AuroraTimeline';
import FundingDiagram from '../components/FundingDiagram';
import ProfileGridSection from '../components/ProfileGridSection';
import { shariaBoard, trustees } from '../data/peopleData';
import { useViewportRebuildKey } from '../hooks/useViewportRebuildKey';

gsap.registerPlugin(ScrollTrigger);

const floatingCards = [
  { className: 'hero-card hero-card--1', image: heroCommunityImg },
  { className: 'hero-card hero-card--2', image: heroMosqueImg },
  { className: 'hero-card hero-card--3', image: heroGatheringImg },
  { className: 'hero-card hero-card--4', image: heroProjectImg },
  { className: 'hero-card hero-card--5', image: missionImg },
  { className: 'hero-card hero-card--6', image: purposeImg },
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

const PVM_SCROLL_PACING = 0.55;
const PVM_LAST_PANEL_HOLD_SCROLL = 160;
/** Mobile: short hold so each panel settles without long scrub runway. */
const PVM_SCROLL_PACING_MOBILE = 0.62;
const PVM_LAST_PANEL_HOLD_SCROLL_MOBILE = 160;
const PVM_INITIAL_HOLD_STEP = 0.22;
const PVM_BETWEEN_PANEL_HOLD_STEP = 0.16;
const PVM_LAST_PANEL_HOLD_STEP = 0.24;
/** Pin length (× viewport height): staged orbit reveal needs a longer scrub runway. */
const FUNDING_PIN_SCROLL_DESKTOP = 0.9;
/** Mobile: enough runway to scrub the diagram reveal without feeling stuck. */
const FUNDING_PIN_SCROLL_MOBILE = 1;

const pvmSlides = [
  {
    id: 'about-purpose-title',
    label: 'Purpose',
    theme: 'dark',
    reverse: false,
    imageSrc: purposeImg,
    body: 'National Waqf exists to institutionalise the revival of waqf in the UK as a permanent engine for community resilience, social good, and ethical nation-building. This document sets out a clear strategic framework that defines our long-term direction, priority objectives, and measurable goals over the next three to five years.',
  },
  {
    id: 'about-vision-title',
    label: 'Vision',
    theme: 'light',
    reverse: true,
    imageSrc: visionImg,
    body: 'To establish Waqf as a permanent, trusted, and transformative institution in the UK, funding generations of social, educational, civic, and spiritual impact without dependency on short-term fundraising.',
  },
  {
    id: 'about-mission-title',
    label: 'Mission',
    theme: 'dark',
    reverse: false,
    imageSrc: missionImg,
    body: 'To build, protect, and grow sustainable Waqf assets and deploy their returns strategically to empower communities, strengthen institutions, and enable long-term positive change through ethical, transparent, and professional governance.',
  },
];

function AboutPage() {
  const worksSectionRef = useRef(null);
  const worksStageRef = useRef(null);
  const fundingSectionRef = useRef(null);
  const fundingStageRef = useRef(null);
  const fundingDiagramRevealRef = useRef(null);
  const pvmSectionRef = useRef(null);
  const pvmStageRef = useRef(null);
  const trusteesScrollLockRef = useRef(null);
  const shariaScrollLockRef = useRef(null);
  const principlesScrollLockRef = useRef(null);
  const [cycleStep, setCycleStep] = useState(1);
  const [hoverStep, setHoverStep] = useState(null);
  const prevStepRef = useRef(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const viewportRebuildKey = useViewportRebuildKey();

  const activeStep = hoverStep ?? cycleStep;
  const activeData = steps[activeStep - 1];
  const canHoverCycle = cycleStep === steps.length;
  const isHovering = canHoverCycle && hoverStep !== null;

  const direction = activeStep >= prevStepRef.current ? 'down' : 'up';
  if (activeStep !== prevStepRef.current) {
    prevStepRef.current = activeStep;
  }

  useEffect(() => {
    if (!canHoverCycle && hoverStep !== null) {
      setHoverStep(null);
    }
  }, [canHoverCycle, hoverStep]);

  const onCycleGroupEnter = useCallback((step) => {
    if (!canHoverCycle) return;
    setHoverStep(step);
  }, [canHoverCycle]);

  const onCycleGroupLeave = useCallback(() => {
    setHoverStep(null);
  }, []);

  useLayoutEffect(() => {
    const stageEl = worksStageRef.current;
    if (!stageEl) return undefined;

    const triggerId = 'about-works-cycle-pin';
    const earlyTriggerId = 'about-works-cycle-early';
    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      ScrollTrigger.create({
        id: earlyTriggerId,
        trigger: stageEl,
        start: 'top 90%',
        end: 'bottom bottom',
        onEnter: () => setCycleStep(1),
        onLeaveBack: () => setCycleStep(1),
      });

      ScrollTrigger.create({
        id: triggerId,
        trigger: stageEl,
        start: 'top top+=38',
        end: () => '+=' + window.innerHeight * 1.35,
        pin: true,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextStep = Math.min(4, Math.max(1, Math.floor(self.progress * 4) + 1));
          setCycleStep((prev) => (prev === nextStep ? prev : nextStep));
        },
        onLeaveBack: () => setCycleStep(1),
      });

      return () => {
        ScrollTrigger.getById(earlyTriggerId)?.kill();
        ScrollTrigger.getById(triggerId)?.kill();
      };
    });

    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        id: earlyTriggerId,
        trigger: stageEl,
        start: 'top 90%',
        end: 'bottom bottom',
        onEnter: () => setCycleStep(1),
        onLeaveBack: () => setCycleStep(1),
      });

      ScrollTrigger.create({
        id: triggerId,
        trigger: stageEl,
        start: 'bottom bottom',
        end: () => '+=' + window.innerHeight * 1.35,
        pin: true,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextStep = Math.min(4, Math.max(1, Math.floor(self.progress * 4) + 1));
          setCycleStep((prev) => (prev === nextStep ? prev : nextStep));
        },
        onLeaveBack: () => setCycleStep(1),
      });

      return () => {
        ScrollTrigger.getById(earlyTriggerId)?.kill();
        ScrollTrigger.getById(triggerId)?.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getById(earlyTriggerId)?.kill();
      ScrollTrigger.getById(triggerId)?.kill();
    };
  }, [viewportRebuildKey]);

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
    const stage = fundingStageRef.current;
    const diagramWrap = fundingDiagramRevealRef.current;
    if (!fundingSectionRef.current || !stage || !diagramWrap) {
      return undefined;
    }

    if (prefersReducedMotion) {
      gsap.set(diagramWrap, { autoAlpha: 1, clearProps: 'transform,opacity' });
      return undefined;
    }

    const fundingTriggerId = 'about-funding-stage-pin';
    const mm = gsap.matchMedia();

    const buildFundingReveal = (pinScrollMult, pinStart = 'top top') => {
      const ctx = gsap.context(() => {
        const rings = diagramWrap.querySelectorAll('.funding-orbit__ring');
        const centerBlock = diagramWrap.querySelector('.funding-orbit__center');
        const container = diagramWrap.querySelector('.funding-orbit-diagram');
        const sourceKeys = ['private', 'business', 'gift'];

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: fundingTriggerId,
            trigger: stage,
            start: pinStart,
            end: () => '+=' + Math.round(window.innerHeight * pinScrollMult),
            pin: true,
            pinSpacing: true,
            scrub: 0.32,
            fastScrollEnd: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        tl.set(diagramWrap, { autoAlpha: 1 }, 0);
        if (container) {
          tl.fromTo(
            container,
            { autoAlpha: 0, y: 20, scale: 0.98 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
            0
          );
        }
        tl.fromTo(
          rings,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.26, ease: 'power1.out', stagger: 0.09 },
          0.05
        );
        if (centerBlock) {
          tl.fromTo(
            centerBlock,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            0.28
          );
        }
        let sourceCursor = 0.62;
        sourceKeys.forEach((key) => {
          const band = diagramWrap.querySelector(`.funding-orbit__band--${key}`);
          const diamond = diagramWrap.querySelector(
            `.funding-orbit__source--${key} .funding-orbit__diamond`
          );
          const label = diagramWrap.querySelector(
            `.funding-orbit__source--${key} .funding-orbit__label`
          );

          if (band) {
            tl.fromTo(
              band,
              { scaleX: 0, transformOrigin: '0% 50%' },
              { scaleX: 1, duration: 0.36, ease: 'power2.inOut' },
              sourceCursor
            );
          }

          sourceCursor += 0.36;

          if (diamond) {
            tl.fromTo(
              diamond,
              { scale: 0, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(1.7)' },
              sourceCursor
            );
          }

          if (label) {
            tl.fromTo(
              label,
              { autoAlpha: 0, x: 18 },
              { autoAlpha: 1, x: 0, duration: 0.3, ease: 'power2.out' },
              sourceCursor
            );
          }

          sourceCursor += 0.38;
        });
        tl.to({}, { duration: 0.35 }, sourceCursor);
      }, fundingSectionRef);

      return () => ctx.revert();
    };

    mm.add('(min-width: 921px)', () => buildFundingReveal(FUNDING_PIN_SCROLL_DESKTOP, 'top top'));
    /* Mobile: pin flush to viewport top so heading sits closer to navbar. */
    mm.add('(max-width: 920px)', () =>
      buildFundingReveal(FUNDING_PIN_SCROLL_MOBILE, 'top top'),
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.id === fundingTriggerId) t.kill();
      });
      mm.revert();
    };
  }, [prefersReducedMotion, viewportRebuildKey]);

  useLayoutEffect(() => {
    if (!pvmSectionRef.current || !pvmStageRef.current || prefersReducedMotion) {
      return undefined;
    }

    const pvmTriggerId = 'about-pvm-stage-pin';
    const mm = gsap.matchMedia();

    const buildPvmTimeline = (scrollPacing, lastPanelHoldScroll, scrubValue, pinStart = 'top top') => {
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
            start: pinStart,
            pin: true,
            pinSpacing: true,
            scrub: scrubValue,
            fastScrollEnd: true,
            anticipatePin: 1,
            end: () => '+=' + (
              (panels.length - 1) * window.innerHeight * scrollPacing + lastPanelHoldScroll
            ),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const panelTransitionSteps = panels.length - 1;
              const betweenHoldCount = Math.max(0, panelTransitionSteps - 1);
              const totalSteps =
                PVM_INITIAL_HOLD_STEP
                + panelTransitionSteps
                + (betweenHoldCount * PVM_BETWEEN_PANEL_HOLD_STEP)
                + PVM_LAST_PANEL_HOLD_STEP;
              const progress = self.progress * totalSteps;
              panels.forEach((p) => p.setAttribute('data-overlap', 'false'));
              let cursor = PVM_INITIAL_HOLD_STEP;
              for (let idx = 0; idx < panelTransitionSteps; idx += 1) {
                const start = cursor;
                const end = start + 1;
                if (progress > start && progress < end) {
                  panels[idx].setAttribute('data-overlap', 'true');
                  break;
                }
                cursor = end + (idx < panelTransitionSteps - 1 ? PVM_BETWEEN_PANEL_HOLD_STEP : 0);
              }
            },
          },
        });

        tl.to({}, { duration: PVM_INITIAL_HOLD_STEP }, 0);

        let cursor = PVM_INITIAL_HOLD_STEP;
        for (let idx = 1; idx < panels.length; idx += 1) {
          tl.to(panels[idx], { yPercent: 0, duration: 1 }, cursor);
          cursor += 1;
          if (idx < panels.length - 1) {
            tl.to({}, { duration: PVM_BETWEEN_PANEL_HOLD_STEP }, cursor);
            cursor += PVM_BETWEEN_PANEL_HOLD_STEP;
          }
        }

        tl.to({}, { duration: PVM_LAST_PANEL_HOLD_STEP }, cursor);
      }, pvmSectionRef);

      return () => ctx.revert();
    };

    mm.add('(min-width: 768px)', () =>
      buildPvmTimeline(PVM_SCROLL_PACING, PVM_LAST_PANEL_HOLD_SCROLL, 0.35, 'top top'),
    );
    /* Mobile: pin at top of viewport so the panels lock fully to 100vh (no nav-gap).
       The fixed navbar overlays the dark/light panels naturally. */
    mm.add('(max-width: 767px)', () =>
      buildPvmTimeline(
        PVM_SCROLL_PACING_MOBILE,
        PVM_LAST_PANEL_HOLD_SCROLL_MOBILE,
        0.4,
        'top top',
      ),
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.id === pvmTriggerId) t.kill();
      });
      mm.revert();
    };
  }, [prefersReducedMotion, viewportRebuildKey]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const lockIds = [
      'about-scroll-lock-trustees',
      'about-scroll-lock-sharia',
      'about-scroll-lock-principles',
    ];
    const lockRefs = [trusteesScrollLockRef, shariaScrollLockRef, principlesScrollLockRef];
    const triggers = [];

    lockRefs.forEach((refObj, index) => {
      const el = refObj.current;
      if (!el) return;

      const trigger = ScrollTrigger.create({
        id: lockIds[index],
        trigger: el,
        start: 'top top',
        end: () =>
          `+=${Math.round(
            window.innerHeight * (window.matchMedia('(max-width: 767px)').matches ? 0.38 : 0.28),
          )}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReducedMotion, viewportRebuildKey]);

  return (
    <div className="about-page" id="about">
      <section className="about-section about-hero" aria-labelledby="about-hero-title">
        {floatingCards.map((card, i) => (
          <div
            key={i}
            className={card.className}
            style={{ backgroundImage: `url("${card.image}")` }}
            aria-hidden="true"
          />
        ))}
        <div className="about-shell about-shell-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <h1 id="about-hero-title">National Waqf -<br />building communities one project at a time</h1>
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
                  className={`cycle-svg is-step-${cycleStep}${isHovering ? ' has-hover' : ''}${canHoverCycle ? ' hover-ready' : ''}`}
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
                    onMouseEnter={() => onCycleGroupEnter(1)}
                    onMouseLeave={onCycleGroupLeave}
                  >
                    <path className="cycle-slice cycle-slice--1" d="M350,350 L350,20 A330,330 0 0,1 680,350 Z" />
                    <text x="495" y="205" className="cycle-label-num" textAnchor="middle" dominantBaseline="middle">01</text>
                    <text x="495" y="252" className="cycle-label-title" textAnchor="middle" dominantBaseline="middle">DONATE</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 2 ? ' is-active' : ''}`}
                    onMouseEnter={() => onCycleGroupEnter(2)}
                    onMouseLeave={onCycleGroupLeave}
                  >
                    <path className="cycle-slice cycle-slice--2" d="M350,350 L680,350 A330,330 0 0,1 350,680 Z" />
                    <text x="495" y="495" className="cycle-label-num" textAnchor="middle" dominantBaseline="middle">02</text>
                    <text x="495" y="542" className="cycle-label-title" textAnchor="middle" dominantBaseline="middle">INVEST</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 3 ? ' is-active' : ''}`}
                    onMouseEnter={() => onCycleGroupEnter(3)}
                    onMouseLeave={onCycleGroupLeave}
                  >
                    <path className="cycle-slice cycle-slice--3" d="M350,350 L350,680 A330,330 0 0,1 20,350 Z" />
                    <text x="205" y="495" className="cycle-label-num" textAnchor="middle" dominantBaseline="middle">03</text>
                    <text x="205" y="542" className="cycle-label-title" textAnchor="middle" dominantBaseline="middle">DISTRIBUTE</text>
                  </g>
                  <g
                    className={`cycle-group${activeStep === 4 ? ' is-active' : ''}`}
                    onMouseEnter={() => onCycleGroupEnter(4)}
                    onMouseLeave={onCycleGroupLeave}
                  >
                    <path className="cycle-slice cycle-slice--4" d="M350,350 L20,350 A330,330 0 0,1 350,20 Z" />
                    <text x="205" y="205" className="cycle-label-num" textAnchor="middle" dominantBaseline="middle">04</text>
                    <text x="205" y="252" className="cycle-label-title" textAnchor="middle" dominantBaseline="middle">GROW</text>
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

      <section
        ref={fundingSectionRef}
        className="about-section about-fullscreen"
        aria-labelledby="about-funding-title"
      >
        <div ref={fundingStageRef} className="about-funding-pin-stage">
          <div className="about-shell about-shell-narrow">
            <h2 id="about-funding-title">How we fund the organisation - Private Waqf</h2>
            <p>
              National Waqf sustains its operations through private waqf assets and aligned
              business contributions. These funds support operational costs and ensure the
              organisation remains effective while maintaining financial sustainability.
            </p>
            <div ref={fundingDiagramRevealRef} className="about-funding-diagram-reveal">
              <FundingDiagram />
            </div>
          </div>
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
                      <img src={slide.imageSrc || placeholderImg} alt="" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AuroraTimeline />

      <div ref={trusteesScrollLockRef} className="about-viewport-scroll-lock">
        <ProfileGridSection
          id="about-trustees"
          title="Meet our trustees"
          subtitle="Placeholder supporting line for trustees section."
          variant="trustees"
          profiles={trustees}
          carousel
        />
      </div>

      <div ref={shariaScrollLockRef} className="about-viewport-scroll-lock about-viewport-scroll-lock--sharia">
        <ProfileGridSection
          id="about-shariah-board"
          title="Meet our Shariah board"
          subtitle="Placeholder supporting line for Shariah board section."
          variant="sharia"
          profiles={shariaBoard}
        />
      </div>

      <section
        ref={principlesScrollLockRef}
        className="about-section about-fullscreen about-principles about-principles--scroll-pause"
        aria-labelledby="about-principles-title"
      >
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
