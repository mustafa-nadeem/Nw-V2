import './AboutPage.css';
import AuroraTimeline from '../components/AuroraTimeline';
import ProfileGridSection from '../components/ProfileGridSection';
import { shariaBoard, trustees } from '../data/peopleData';

const floatingCards = [
  { className: 'hero-card hero-card--1' },
  { className: 'hero-card hero-card--2' },
  { className: 'hero-card hero-card--3' },
  { className: 'hero-card hero-card--4' },
  { className: 'hero-card hero-card--5' },
  { className: 'hero-card hero-card--6' },
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

function AboutPage() {
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

      <section className="about-section about-fullscreen" aria-labelledby="about-works-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-works-title">How does National Waqf Work?</h2>
          <p>
            National Waqf operates a sustainable funding cycle where donations are first
            received, then invested by an expert investment committee to generate long-term
            returns. From these returns, a portion is distributed as grants while the
            remaining balance is reinvested so communities can benefit year after year.
          </p>
          <div className="cycle-wrap">
            <svg className="cycle-svg" viewBox="0 0 700 700" aria-label="National Waqf funding cycle">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E27D50" />
                  <stop offset="25%" stopColor="#C7366B" />
                  <stop offset="50%" stopColor="#2B346C" />
                  <stop offset="75%" stopColor="#01ACA6" />
                  <stop offset="100%" stopColor="#E27D50" />
                </linearGradient>
              </defs>
              {/* Segment 1 — DONATE (top-right, orange) */}
              <g className="cycle-group">
                <path className="cycle-slice cycle-slice--1" d="M350,350 L350,20 A330,330 0 0,1 680,350 Z" />
                <text x="515" y="135" className="cycle-label-num" textAnchor="middle">01</text>
                <text x="515" y="185" className="cycle-label-title" textAnchor="middle">DONATE</text>
                <text className="cycle-label-desc" textAnchor="middle">
                  <tspan x="515" y="215">We receive your</tspan>
                  <tspan x="515" dy="22">donation to the</tspan>
                  <tspan x="515" dy="22">National Waqf</tspan>
                </text>
              </g>

              {/* Segment 2 — INVEST (bottom-right, pink) */}
              <g className="cycle-group">
                <path className="cycle-slice cycle-slice--2" d="M350,350 L680,350 A330,330 0 0,1 350,680 Z" />
                <text x="515" y="455" className="cycle-label-num" textAnchor="middle">02</text>
                <text x="515" y="505" className="cycle-label-title" textAnchor="middle">INVEST</text>
                <text className="cycle-label-desc" textAnchor="middle">
                  <tspan x="515" y="535">Our investment</tspan>
                  <tspan x="515" dy="22">committee invests</tspan>
                  <tspan x="515" dy="22">your donation</tspan>
                </text>
              </g>

              {/* Segment 3 — DISTRIBUTE (bottom-left, navy) */}
              <g className="cycle-group">
                <path className="cycle-slice cycle-slice--3" d="M350,350 L350,680 A330,330 0 0,1 20,350 Z" />
                <text x="185" y="455" className="cycle-label-num" textAnchor="middle">03</text>
                <text x="185" y="505" className="cycle-label-title" textAnchor="middle">DISTRIBUTE</text>
                <text className="cycle-label-desc" textAnchor="middle">
                  <tspan x="185" y="535">50% of the returns</tspan>
                  <tspan x="185" dy="22">are given as grants</tspan>
                  <tspan x="185" dy="22">to verified UK causes</tspan>
                  <tspan x="185" dy="22">and charities</tspan>
                </text>
              </g>

              {/* Segment 4 — GROW (top-left, teal) */}
              <g className="cycle-group">
                <path className="cycle-slice cycle-slice--4" d="M350,350 L20,350 A330,330 0 0,1 350,20 Z" />
                <text x="185" y="135" className="cycle-label-num" textAnchor="middle">04</text>
                <text x="185" y="185" className="cycle-label-title" textAnchor="middle">GROW</text>
                <text className="cycle-label-desc" textAnchor="middle">
                  <tspan x="185" y="215">The other 50% is</tspan>
                  <tspan x="185" dy="22">re-invested so your</tspan>
                  <tspan x="185" dy="22">donation continues</tspan>
                  <tspan x="185" dy="22">to grow year</tspan>
                  <tspan x="185" dy="22">after year</tspan>
                </text>
              </g>

              {/* Center ring */}
              <circle cx="350" cy="350" r="90" fill="#d0d0d6" />
              <circle className="cycle-ring" cx="350" cy="350" r="78" fill="none" strokeWidth="8" />
              <circle cx="350" cy="350" r="72" fill="#f2f2f2" />
            </svg>
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

      <section className="about-section about-fullscreen about-pvm about-pvm--dark" aria-labelledby="about-purpose-title">
        <div className="about-shell">
          <div className="about-pvm-grid">
            <h2 id="about-purpose-title" className="about-pvm-title">Our <span className="about-pvm-accent">Purpose</span></h2>
            <p className="about-pvm-body">
              National Waqf exists to institutionalise the revival of waqf in the UK as a
              permanent engine for community resilience, social good, and ethical
              nation-building. This document sets out a clear strategic framework that
              defines our long-term direction, priority objectives, and measurable goals
              over the next three to five years.
            </p>
            <div className="about-pvm-img">
              <span>Image</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-fullscreen about-pvm about-pvm--light" aria-labelledby="about-vision-title">
        <div className="about-shell">
          <div className="about-pvm-grid about-pvm-grid--reverse">
            <h2 id="about-vision-title" className="about-pvm-title">Our <span className="about-pvm-accent">Vision</span></h2>
            <p className="about-pvm-body">
              To establish Waqf as a permanent, trusted, and transformative institution
              in the UK, funding generations of social, educational, civic, and spiritual
              impact without dependency on short-term fundraising.
            </p>
            <div className="about-pvm-img">
              <span>Image</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-fullscreen about-pvm about-pvm--dark" aria-labelledby="about-mission-title">
        <div className="about-shell">
          <div className="about-pvm-grid">
            <h2 id="about-mission-title" className="about-pvm-title">Our <span className="about-pvm-accent">Mission</span></h2>
            <p className="about-pvm-body">
              To build, protect, and grow sustainable Waqf assets and deploy their
              returns strategically to empower communities, strengthen institutions, and
              enable long-term positive change through ethical, transparent, and
              professional governance.
            </p>
            <div className="about-pvm-img">
              <span>Image</span>
            </div>
          </div>
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
