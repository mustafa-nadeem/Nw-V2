import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FundingDiagram.css';

gsap.registerPlugin(ScrollTrigger);

const PersonLockIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="10" r="4" />
    <path d="M4 26c0-4.4 3.6-8 8-8 1.6 0 3.1.5 4.4 1.3" />
    <rect x="19" y="18" width="9" height="7" rx="1.2" />
    <path d="M21 18v-2.2a2.5 2.5 0 0 1 5 0V18" />
  </svg>
);

const HandsExchangeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 20h6l3-2.5a2.8 2.8 0 0 1 2.9-.2l2.2 1.1a2 2 0 0 0 2.4-.5l1.5-1.9a2 2 0 0 1 2.8-.3l.2.2a2 2 0 0 1 .3 2.6l-2.4 3.4a5.4 5.4 0 0 1-5.8 2l-4-1-3 2H7z" />
    <path d="M3.5 19.5h3.5V26H3.5z" />
    <circle cx="19.3" cy="10.2" r="2.8" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="13" width="22" height="14" rx="1.5" />
    <path d="M5 19h22" />
    <path d="M16 13v14" />
    <path d="M16 13c-3 0-5.5-1.5-5.5-3.5S12 6.5 13 7s3 3 3 6c0-3 2-5.5 3-6s2.5.5 2.5 2.5S19 13 16 13z" />
  </svg>
);

const streams = [
  {
    key: 'private',
    color: '#01ACA6',
    bg: '#BFE3E1',
    top: '48%',
    start: '18px',
    label: 'Internal Private Waqf',
    Icon: PersonLockIcon,
  },
  {
    key: 'business',
    color: '#E27D50',
    bg: '#F4DDD1',
    top: '66%',
    start: '42px',
    label: 'Monthly Business Donations',
    Icon: HandsExchangeIcon,
  },
  {
    key: 'gift',
    color: '#2B346C',
    bg: '#D7DEEF',
    top: '84%',
    start: '72px',
    label: 'Gift Aid',
    Icon: GiftIcon,
  },
];

function FundingDiagram() {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.funding-ring', {
        scale: 0.4,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        transformOrigin: '50% 50%',
      })
        .from(
          '.funding-center',
          { y: 14, opacity: 0, duration: 0.5 },
          '-=0.25'
        )
        .from(
          '.funding-stream',
          { x: -40, opacity: 0, duration: 0.6, stagger: 0.14 },
          '-=0.35'
        )
        .from(
          '.funding-icon svg',
          { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
          '-=0.5'
        );
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <div className="funding-diagram" ref={rootRef}>
      <div className="funding-orbit">
        <div className="funding-circle-stage">
          <div className="funding-ring funding-ring--outer" aria-hidden="true" />
          <div className="funding-ring funding-ring--mid" aria-hidden="true" />
          <div className="funding-ring funding-ring--inner" aria-hidden="true" />
          <div className="funding-center">
            <h3>National Waqf&rsquo;s Operations</h3>
            <p>(Salary &amp; Wages, Marketing costs, Events and all other admin costs)</p>
          </div>
        </div>

        <ul className="funding-streams">
          {streams.map(({ key, color, bg, top, start, label, Icon }) => (
            <li
              key={key}
              className={`funding-stream funding-stream--${key}`}
              style={{
                '--arrow-bg': bg,
                '--arrow-color': color,
                '--stream-top': top,
                '--stream-start': start,
              }}
            >
              <div className="funding-arrow" aria-hidden="true">
                <span className="funding-icon">
                  <Icon />
                </span>
              </div>
              <span className="funding-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FundingDiagram;
