import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LearnMorePage.css';
import placeholderImg from '../assets/placeholder.jpg';

gsap.registerPlugin(ScrollTrigger);

const roleCards = [
  {
    title: 'Waqf',
    subtitle: 'Eternal reward for building community infrastructure',
    text: 'A perpetual endowment that preserves capital and generates sustainable income to fund long-term charitable, educational, and community initiatives.',
    mediaLabel: 'Image',
  },
  {
    title: 'Zakaat',
    subtitle: 'A pillar of our faith',
    text: 'Obligatory charitable giving distributed to eligible recipients to relieve hardship, reduce poverty, and uphold social justice in line with Islamic principles.',
    mediaLabel: 'Image',
  },
  {
    title: 'Sadaqah',
    subtitle: 'Giving that never decreases your wealth',
    text: 'Voluntary charitable giving that supports immediate relief, community needs, and ongoing good causes for spiritual and social benefit.',
    mediaLabel: 'Image',
  },
];

const usageCards = [
  {
    title: 'Religious Waqf',
    imageSrc: placeholderImg,
    imageAlt: 'Religious Waqf illustration',
    paragraphs: ['Endowments dedicated to supporting Islamic worship and sacred knowledge, such as mosques, Qur\'an distribution, and religious institutions.'],
  },
  {
    title: 'Philanthropic Waqf',
    imageSrc: placeholderImg,
    imageAlt: 'Philanthropic Waqf illustration',
    paragraphs: ['Endowments established for the public good, funding essential services such as education, social welfare, healthcare, and community development.'],
  },
  {
    title: 'Family Waqf',
    imageSrc: placeholderImg,
    imageAlt: 'Family Waqf illustration',
    paragraphs: ['Endowments designed to support family members while preserving wealth, enabling Islamic estate planning and a legacy of financial security.'],
  },
];

const USAGE_COLORS = ['#2B346C', '#01ACA6', '#E27D50'];
const USAGE_SECTION_HOVER_BACKGROUNDS = ['#E8ECFA', '#E8F5F4', '#FDF0EA'];

const videoCards = [
  {
    title: 'What is Waqf?',
    duration: '2m',
  },
  {
    title: 'How your donation works',
    duration: '3m',
  },
  {
    title: 'Community projects in action',
    duration: '2m',
  },
  {
    title: 'Inside our annual report',
    duration: '4m',
  },
];

const financialReports = [
  { title: '2025 Annual Report' },
  { title: '2025 Investments Report' },
  { title: '2025 Fundraising Report' },
  { title: '2025 Grant Impact Report' },
  { title: '2024 Annual Report' },
  { title: '2024 Investments Report' },
];

const faqGroups = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        question: 'What is National Waqf and how does it work?',
        answer: 'National Waqf collects and manages charitable funds and assets, then deploys returns through structured grant making and community projects.',
      },
      {
        question: 'Who can apply for support?',
        answer: 'Organisations aligned with our mission and due diligence standards can apply through our formal grant and partnership pathways.',
      },
      {
        question: 'How do I donate regularly?',
        answer: 'You can create an account and set up recurring giving through the donation portal with clear contribution options.',
      },
    ],
  },
  {
    id: 'policies',
    label: 'Policies & reports',
    items: [
      {
        question: 'Where can I download your policies?',
        answer: 'You can access policy documents in the Our policies section on this page and download the latest version directly.',
      },
      {
        question: 'How often are financial reports published?',
        answer: 'Financial and impact reporting is published on a regular cycle with periodic updates for transparency and governance.',
      },
      {
        question: 'Can I request more information about a report?',
        answer: 'Yes. You can contact us through the Connect to our content section and request specific supporting information.',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    items: [
      {
        question: 'Do you provide educational resources?',
        answer: 'Yes. We publish educational materials and case studies to support learning about waqf and community development.',
      },
      {
        question: 'Can I book an educational workshop?',
        answer: 'Yes. Use the workshop sign-up form on this page and our team will reach out to arrange a session.',
      },
    ],
  },
];

function LearnMorePage() {
  const [openFaqItems, setOpenFaqItems] = useState({});
  const [activeFaqGroup, setActiveFaqGroup] = useState(0);
  const [activeRole, setActiveRole] = useState(0);
  const reportsRailRef = useRef(null);
  const roleSectionRef = useRef(null);
  const usageSectionRef = useRef(null);
  const workshopSectionRef = useRef(null);
  const reportsSectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [usageHoveredIndex, setUsageHoveredIndex] = useState(null);
  const [expandedUsageIndex, setExpandedUsageIndex] = useState(null);

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

    const sections = [
      { id: 'learn-scroll-lock-role', ref: roleSectionRef },
      { id: 'learn-scroll-lock-usage', ref: usageSectionRef },
      { id: 'learn-scroll-lock-workshop', ref: workshopSectionRef },
      { id: 'learn-scroll-lock-reports', ref: reportsSectionRef },
    ];
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const triggers = sections
      .map(({ id, ref }) => {
        const el = ref.current;
        if (!el) return null;
        const mobileUsageEnd = id === 'learn-scroll-lock-usage' && isMobile
          ? Math.round(window.innerHeight * 0.62)
          : null;
        return ScrollTrigger.create({
          id,
          trigger: el,
          start: 'top top',
          end: () => `+=${mobileUsageEnd ?? Math.round(window.innerHeight * 0.42)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          scrub: false,
          invalidateOnRefresh: true,
        });
      })
      .filter(Boolean);

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, [prefersReducedMotion]);

  const toggleFaq = (key) => {
    setOpenFaqItems((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const scrollReports = (direction) => {
    const rail = reportsRailRef.current;
    if (!rail) return;
    const card = rail.querySelector('.learn-report-card');
    const step = card ? card.getBoundingClientRect().width + 20 : 260;
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const activeUsageIndex = usageHoveredIndex ?? expandedUsageIndex;
  const usageSectionBackground = activeUsageIndex === null
    ? '#FFF9F3'
    : USAGE_SECTION_HOVER_BACKGROUNDS[activeUsageIndex];

  return (
    <div className="learn-page" id="learn-more">
      <section className="learn-section learn-hero" aria-labelledby="learn-hero-title">
        <div className="learn-shell learn-hero-grid">
          <div className="learn-hero-copy">
            <h1 id="learn-hero-title">Donate here to earn eternal rewards</h1>
            <p>
              Log in or sign up to donate. It doesn't take long and you can set up your giving to be a regular donation.
            </p>
            <div className="learn-hero-actions">
              <button type="button">Log in</button>
              <button type="button">Sign up</button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={roleSectionRef}
        className="learn-section learn-section--role learn-scroll-lock"
        aria-labelledby="learn-role-title"
      >
        <div className="learn-shell">
          <h2 id="learn-role-title" className="learn-role-title">The role of Waqf, Zakaat and Sadaqah in Islam</h2>
          <div className="learn-role-accordion">
            <div className="learn-role-tabs" role="tablist" aria-label="Roles">
              {roleCards.map((card, index) => {
                const isActive = activeRole === index;
                return (
                  <div
                    key={card.title}
                    className={`learn-role-tab ${isActive ? 'is-active' : ''}`}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`learn-role-panel-${index}`}
                      id={`learn-role-tab-${index}`}
                      className="learn-role-tab-trigger"
                      onClick={() => setActiveRole(index)}
                    >
                      <span className="learn-role-tab-marker" aria-hidden="true" />
                      <span className="learn-role-tab-title">{card.title}</span>
                    </button>
                    <div
                      className="learn-role-tab-panel"
                      aria-hidden={!isActive}
                    >
                      <div className="learn-role-tab-panel-inner">
                        <p className="learn-role-tab-subtitle">{card.subtitle}</p>
                        <p>{card.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="learn-role-media"
              role="tabpanel"
              id={`learn-role-panel-${activeRole}`}
              aria-labelledby={`learn-role-tab-${activeRole}`}
            >
              {roleCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`learn-role-media-item ${activeRole === index ? 'is-active' : ''}`}
                  aria-hidden={activeRole !== index}
                >
                  <img src={placeholderImg} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={usageSectionRef}
        className="learn-section learn-section--usage learn-scroll-lock"
        style={{ '--usage-section-bg': usageSectionBackground }}
        aria-labelledby="learn-usage-title"
      >
        <div className="learn-shell">
          <div className="learn-usage-intro">
            <h2 id="learn-usage-title">Usages of <span className="learn-accent">Awqaf</span></h2>
          </div>
          <div className="learn-usage-grid">
            {usageCards.map((card, index) => (
              <article
                key={card.title}
                className={`learn-usage-card${expandedUsageIndex === index ? ' is-revealed' : ''}`}
                style={{ '--usage-color': USAGE_COLORS[index] }}
                onMouseEnter={() => setUsageHoveredIndex(index)}
                onMouseLeave={() => setUsageHoveredIndex(null)}
                onClick={() =>
                  setExpandedUsageIndex((prev) => (prev === index ? null : index))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setExpandedUsageIndex((prev) => (prev === index ? null : index));
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={expandedUsageIndex === index}
              >
                <img
                  className="learn-usage-card-photo"
                  src={card.imageSrc}
                  alt=""
                  aria-hidden="true"
                />
                <div className="learn-usage-card-body">
                  <h3 className="learn-usage-card-title">{card.title}</h3>
                  <div className="learn-usage-card-reveal">
                    {card.paragraphs.map((p) => (
                      <p key={p} className="learn-usage-card-text">{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={workshopSectionRef}
        className="learn-section learn-workshop learn-scroll-lock"
        aria-labelledby="learn-workshop-title"
      >
        <div className="learn-shell learn-workshop-grid">
          <div className="learn-workshop-copy">
            <h2 id="learn-workshop-title">Book educational<br />workshops with us</h2>
            <form className="learn-workshop-form" onSubmit={(event) => event.preventDefault()}>
              <div className="learn-workshop-input-row">
                <input
                  id="learn-workshop-email"
                  type="email"
                  name="email"
                  placeholder="What's your work email?"
                  aria-label="Your work email"
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <p className="learn-workshop-fineprint">Unsubscribe anytime</p>
            </form>
          </div>
          <img className="learn-workshop-media" src={placeholderImg} alt="" aria-hidden="true" />
        </div>
      </section>

      <section className="learn-section learn-section--policies" aria-labelledby="learn-policies-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-policies-title">Our policies</h2>
          <p className="learn-lead">Download and learn more about our policies in this thorough document.</p>
        </div>
        <div className="learn-shell">
          <article className="learn-policies-card">
            <span className="learn-policies-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6" />
                <path d="M9 17h4" />
              </svg>
            </span>
            <div className="learn-policies-text">
              <h3>Policies document</h3>
              <p>PDF &middot; Updated 2026</p>
            </div>
            <button type="button" className="learn-policies-button" aria-label="Download policies">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </article>
        </div>
      </section>

      <section className="learn-section learn-section--videos" aria-labelledby="learn-content-title">
        <div className="learn-shell">
          <h2 id="learn-content-title" className="learn-content-heading">Watch our video walkthroughs</h2>
          <div className="learn-video-grid">
            {videoCards.map((card) => (
              <article className="learn-video-card" key={card.title}>
                <button
                  type="button"
                  className="learn-video-thumb"
                  aria-label={`Play ${card.title}`}
                >
                  <span className="learn-video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
                <h3 className="learn-video-title">{card.title}</h3>
                <p className="learn-video-meta">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 8.5v7l6-3.5z" fill="currentColor" />
                  </svg>
                  Watch {card.duration}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={reportsSectionRef}
        className="learn-section learn-section--reports learn-scroll-lock"
        aria-labelledby="learn-finance-title"
      >
        <div className="learn-shell">
          <div className="learn-reports-header">
            <h2 id="learn-finance-title" className="learn-reports-heading">Financial reports</h2>
            <div className="learn-reports-nav" role="group" aria-label="Scroll reports">
              <button
                type="button"
                className="learn-reports-nav-btn"
                aria-label="Previous reports"
                onClick={() => scrollReports(-1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="learn-reports-nav-btn"
                aria-label="Next reports"
                onClick={() => scrollReports(1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="learn-reports-rail" ref={reportsRailRef}>
            {financialReports.map((report) => (
              <article className="learn-report-card" key={report.title}>
                <div className="learn-report-cover" aria-hidden="true">
                  <span>Image</span>
                </div>
                <p className="learn-report-title">{report.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section learn-faq" aria-labelledby="learn-faq-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-faq-title" className="learn-faq-heading">Frequently Asked Questions</h2>
          <div className="learn-faq-tabs" role="tablist" aria-label="FAQ categories">
            {faqGroups.map((group, index) => {
              const isActive = activeFaqGroup === index;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`learn-faq-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveFaqGroup(index)}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="learn-shell learn-shell-narrow">
          <div className="learn-faq-list">
            {faqGroups[activeFaqGroup].items.map((item, itemIndex) => {
              const key = `${activeFaqGroup}-${itemIndex}`;
              const isOpen = Boolean(openFaqItems[key]);

              return (
                <article className={`learn-faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                  <button
                    type="button"
                    className="learn-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`learn-faq-panel-${key}`}
                    onClick={() => toggleFaq(key)}
                  >
                    <span>{item.question}</span>
                    <span className="learn-faq-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`learn-faq-panel-${key}`}
                    className="learn-faq-panel"
                    aria-hidden={!isOpen}
                  >
                    <div className="learn-faq-panel-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LearnMorePage;
