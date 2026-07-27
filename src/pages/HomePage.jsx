import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatIsWaqfStack from '../components/WhatIsWaqfStack';
import WhyWaqfSection from '../components/WhyWaqfSection';
import DigitalReelNumber from '../components/DigitalReelNumber';
import { useViewportRebuildKey } from '../hooks/useViewportRebuildKey';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const impactSectionRef = useRef(null);
  const [impactSheenActive, setImpactSheenActive] = useState(false);
  const navigate = useNavigate();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const viewportRebuildKey = useViewportRebuildKey();

  useEffect(() => {
    const section = impactSectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setImpactSheenActive(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
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

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;
    const el = impactSectionRef.current;
    if (!el) return undefined;

    const trigger = ScrollTrigger.create({
      id: 'home-scroll-lock-impact',
      trigger: el,
      start: 'top top-=22',
      end: () => `+=${Math.round(window.innerHeight * 0.16)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
      scrub: false,
      invalidateOnRefresh: true,
    });

    return () => trigger.kill();
  }, [prefersReducedMotion, viewportRebuildKey]);

  return (
    <>
      <section className="section hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 id="hero-title">Building a better future through sustainable Waqf</h1>
            <p className="hero-lede hero-lede--mobile-only">
              We are the authoritative body that collects, distributes and safeguards
              Waqf donations across the United Kingdom. We receive monetary and asset
              donations, manage them responsibly, and use long-term yields to fund Islamic
              community projects.
            </p>
            <p className="hero-lede hero-lede--desktop-only">
              We are the authoritative body that collects, distributes and safeguards
              Waqf donations across the United Kingdom.
            </p>
            <p className="hero-lede hero-lede--desktop-only">
              We receive monetary and asset donations, manage them responsibly, and
              use long-term yields to fund Islamic community projects.
            </p>
            <p className="hero-lede hero-lede--desktop-only">
              Our team identifies worthy initiatives that strengthen communities and
              create lasting social benefit.
            </p>
          </div>

          <aside className="donation-card" aria-label="Donation panel">
            <div className="dc-tabs" role="group" aria-label="Donation frequency">
              <button type="button" className="dc-tab">Give Once</button>
              <button type="button" className="dc-tab dc-tab--active">Monthly</button>
            </div>

            <div className="dc-body">
              <h2 className="dc-heading">Choose an amount to give</h2>
              <p className="dc-subtitle">Every pound builds a lasting legacy for our communities.</p>

              <div className="dc-amounts" role="group" aria-label="Quick amounts">
                <button type="button" className="dc-amount">
                  <span className="dc-amount-value">£5</span>
                  <span className="dc-amount-label">per month</span>
                </button>
                <button type="button" className="dc-amount">
                  <span className="dc-amount-value">£10</span>
                  <span className="dc-amount-label">per month</span>
                </button>
                <button type="button" className="dc-amount dc-amount--active">
                  <span className="dc-amount-value">£25</span>
                  <span className="dc-amount-label">per month</span>
                </button>
                <button type="button" className="dc-amount">
                  <span className="dc-amount-value">£50</span>
                  <span className="dc-amount-label">per month</span>
                </button>
                <button type="button" className="dc-amount dc-amount--wide">
                  <span className="dc-amount-value">Other amount</span>
                </button>
              </div>

              <div className="dc-custom">
                <span className="dc-custom-prefix">£</span>
                <input
                  type="number"
                  className="dc-custom-input"
                  placeholder="Or enter a custom amount"
                  aria-label="Custom donation amount"
                />
              </div>

              <button type="button" className="dc-cta" onClick={() => navigate('/donate')}>Give Now &rarr;</button>
            </div>
          </aside>
        </div>
      </section>

      <div id="learn">
        <WhatIsWaqfStack />
      </div>

      <WhyWaqfSection />

      <section
        id="impact"
        ref={impactSectionRef}
        className={`section impact ${impactSheenActive ? 'impact--sheen-active' : ''}`}
        aria-labelledby="impact-title"
      >
        <div className="impact-shell">
          <div className="impact-intro">
            <h2 id="impact-title">The <span style={{ color: '#01ACA6' }}>impact</span> we have made</h2>
            <p className="section-copy">
              We collect and manage donations and assets to fund worthy projects that
              build communities, strengthen institutions, and support long-term change.
            </p>
          </div>

          <div className="impact-grid">
            <article className="impact-card impact-card-donors">
              <p className="impact-value"><DigitalReelNumber value="1300+" /></p>
              <p className="impact-text">A trusted and engaged donor community supporting the mission.</p>
            </article>

            <article className="impact-card impact-card-raised">
              <p className="impact-value"><DigitalReelNumber value="£1,500,000+" /></p>
              <p className="impact-text">Raised from individuals, families, and institutions to establish Waqf assets.</p>
            </article>

            <article className="impact-card impact-card-monthly">
              <p className="impact-value"><DigitalReelNumber value="29,000+" /></p>
              <p className="impact-text">A growing base of committed monthly supporters.</p>
            </article>

            <article className="impact-card impact-card-direct-debit">
              <p className="impact-value"><DigitalReelNumber value="£348,000+" /></p>
              <p className="impact-text">Raised via direct debit contributions for long-term planning.</p>
            </article>

            <article className="impact-card impact-card-focus">
              <p className="impact-value"><DigitalReelNumber value="100%" /></p>
              <p className="impact-text">Focused on long-term sustainable funding through Waqf-based models.</p>
            </article>

            <article className="impact-card impact-card-reach">
              <p className="impact-value">UK wide</p>
              <p className="impact-text">National reach through projects and partnerships across multiple regions.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
