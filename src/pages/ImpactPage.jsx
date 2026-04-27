import { useCallback, useEffect, useRef, useState } from 'react';
import placeholderImg from '../assets/placeholder.jpg';
import ukMapImage from '../assets/uk.jpg';
import DigitalReelNumber from '../components/DigitalReelNumber';
import './ImpactPage.css';

const UK_IMAGE_BOUNDS = {
  north: 59.35,
  south: 49.75,
  west: -8.9,
  east: 2.2,
};

function projectLatLngToImagePercent([lat, lng]) {
  const x = ((lng - UK_IMAGE_BOUNDS.west) / (UK_IMAGE_BOUNDS.east - UK_IMAGE_BOUNDS.west)) * 100;
  const y = ((UK_IMAGE_BOUNDS.north - lat) / (UK_IMAGE_BOUNDS.north - UK_IMAGE_BOUNDS.south)) * 100;
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}


const locations = [
  {
    id: 'manchester',
    city: 'Manchester',
    position: [53.4808, -2.2426],
    projects: [
      {
        name: 'Muslim Scout Scholarship',
        category: 'Youth Development',
        summary: 'Funding to expand access and leadership opportunities for young people across the North West.',
        grant: '£24,000',
        year: '2024',
      },
      {
        name: 'Youth Leadership Academy',
        category: 'Education',
        summary: 'A twelve-week leadership programme equipping young people with mentoring, coaching, and civic engagement skills.',
        grant: '£18,000',
        year: '2023',
      },
      {
        name: 'Community Outreach Initiative',
        category: 'Community Support',
        summary: 'Grassroots programme connecting youth with mentors and local organisations for holistic development.',
        grant: '£16,500',
        year: '2024',
      },
      {
        name: 'Skills for Tomorrow',
        category: 'Education',
        summary: 'Vocational training and employability workshops for underrepresented communities in Greater Manchester.',
        grant: '£14,200',
        year: '2023',
      },
      {
        name: 'Community Wellbeing Hub',
        category: 'Health and Wellbeing',
        summary: 'Integrated support services providing mental health resources and wellness programmes for families.',
        grant: '£12,800',
        year: '2024',
      },
    ],
  },
  {
    id: 'birmingham',
    city: 'Birmingham',
    position: [52.4862, -1.8904],
    projects: [
      {
        name: 'Supporting Humanity',
        category: 'Community Support',
        summary: 'Support for practical welfare and community outreach delivery across the Midlands.',
        grant: '£32,000',
        year: '2024',
      },
      {
        name: 'Community Kitchen',
        category: 'Welfare',
        summary: 'Weekly hot-meal programme supporting low-income families and rough sleepers through local community centres.',
        grant: '£12,500',
        year: '2023',
      },
      {
        name: 'Neighbourhood Mentoring',
        category: 'Youth Development',
        summary: 'One-to-one mentoring for teenagers in underserved areas, pairing them with trained community volunteers.',
        grant: '£9,000',
        year: '2023',
      },
      {
        name: 'Education Excellence Programme',
        category: 'Education',
        summary: 'Comprehensive support for students pursuing higher education with scholarships and guidance.',
        grant: '£15,300',
        year: '2024',
      },
      {
        name: 'Health Access Initiative',
        category: 'Health and Wellbeing',
        summary: 'Removing barriers to healthcare access for vulnerable populations through community partnerships.',
        grant: '£11,200',
        year: '2023',
      },
    ],
  },
  {
    id: 'london',
    city: 'London',
    position: [51.5072, -0.1276],
    projects: [
      {
        name: 'Sacred',
        category: 'Spiritual Programmes',
        summary: 'Support for guided programmes focused on faith, reflection, and rites of passage.',
        grant: '£28,000',
        year: '2024',
      },
      {
        name: 'Urban Da\'wah Collective',
        category: 'Outreach',
        summary: 'Community-led outreach initiatives connecting diverse audiences through open days, talks, and shared meals.',
        grant: '£15,000',
        year: '2024',
      },
      {
        name: 'London Youth Empowerment',
        category: 'Youth Development',
        summary: 'Leadership development and career mentoring for young people from disadvantaged backgrounds.',
        grant: '£19,500',
        year: '2024',
      },
      {
        name: 'Community Centre Support',
        category: 'Community Support',
        summary: 'Funding for community spaces providing safe environments and services across London neighbourhoods.',
        grant: '£13,800',
        year: '2023',
      },
      {
        name: 'Digital Inclusion Project',
        category: 'Education',
        summary: 'Digital literacy and tech skills training for underrepresented communities in East London.',
        grant: '£10,700',
        year: '2024',
      },
    ],
  },
  {
    id: 'leicester',
    city: 'Leicester',
    position: [52.6369, -1.1398],
    projects: [
      {
        name: 'Community Forum Policy',
        category: 'Civic Engagement',
        summary: 'Investment in dialogue and policy participation for local communities across the East Midlands.',
        grant: '£22,000',
        year: '2024',
      },
      {
        name: 'Leicester Welfare Alliance',
        category: 'Welfare',
        summary: 'Multi-agency approach to addressing poverty and providing emergency relief for families in crisis.',
        grant: '£17,600',
        year: '2024',
      },
      {
        name: 'Youth Aspiration Project',
        category: 'Youth Development',
        summary: 'Mentoring and career guidance helping young people achieve their educational and professional goals.',
        grant: '£14,400',
        year: '2023',
      },
      {
        name: 'Cultural Integration Initiative',
        category: 'Community Support',
        summary: 'Programmes fostering understanding and cohesion between diverse communities in Leicester.',
        grant: '£11,900',
        year: '2024',
      },
      {
        name: 'Refugee Support Services',
        category: 'Welfare',
        summary: 'Comprehensive support for asylum seekers and refugees including language classes and job training.',
        grant: '£16,200',
        year: '2023',
      },
    ],
  },
  {
    id: 'cardiff',
    city: 'Cardiff',
    position: [51.4816, -3.1791],
    projects: [
      {
        name: 'Sapience Institute',
        category: 'Research',
        summary: 'Research-led initiatives supporting informed community development and evidence-based policy work.',
        grant: '£36,000',
        year: '2024',
      },
      {
        name: 'Civic Voices',
        category: 'Civic Engagement',
        summary: 'A dedicated strand funding local roundtables and policy briefings on issues affecting Welsh Muslim communities.',
        grant: '£11,500',
        year: '2023',
      },
      {
        name: 'Cardiff Youth Services',
        category: 'Youth Development',
        summary: 'Comprehensive youth programmes providing support, activities, and pathways to employment.',
        grant: '£18,700',
        year: '2024',
      },
      {
        name: 'Community Health Programme',
        category: 'Health and Wellbeing',
        summary: 'Health awareness campaigns and fitness initiatives for underserved populations in Wales.',
        grant: '£13,400',
        year: '2023',
      },
      {
        name: 'Education Support Fund',
        category: 'Education',
        summary: 'Scholarships and tutoring support helping disadvantaged students achieve educational excellence.',
        grant: '£9,600',
        year: '2024',
      },
    ],
  },
  {
    id: 'glasgow',
    city: 'Glasgow',
    position: [55.8642, -4.2518],
    projects: [
      {
        name: 'Spinney Hill Recovery',
        category: 'Health and Recovery',
        summary: 'Targeted support for addiction recovery and resilience services across Scotland.',
        grant: '£26,500',
        year: '2024',
      },
      {
        name: 'Resilience Outreach',
        category: 'Welfare',
        summary: 'Community outreach focused on mental-health first-aid and crisis referral pathways in Glasgow city.',
        grant: '£14,000',
        year: '2023',
      },
      {
        name: 'Scottish Youth Initiative',
        category: 'Youth Development',
        summary: 'Holistic support for young people including mentoring, training, and community engagement.',
        grant: '£16,300',
        year: '2024',
      },
      {
        name: 'Community Cohesion Project',
        category: 'Community Support',
        summary: 'Building stronger communities through cultural events, dialogue, and shared activities.',
        grant: '£12,100',
        year: '2023',
      },
      {
        name: 'Learning and Skills Hub',
        category: 'Education',
        summary: 'Adult education and skills development programmes for workforce development and career progression.',
        grant: '£15,800',
        year: '2024',
      },
    ],
  },
];

const fundedProjects = [
  {
    title: 'Muslim Scout',
    text: 'National Waqf\'s funding for two minibuses enabled MSF to transport young people to national events, enhancing their development while generating sustainable income for long-term impact.',
  },
  {
    title: 'Supporting Humanity',
    text: 'Our grant enabled a specialist recovery organisation to support vulnerable individuals affected by addiction, homelessness, and social exclusion. Through funded programmes, beneficiaries accessed structured recovery support, emotional guidance, and stable housing, helping them rebuild their lives. As a result, individuals have overcome substance dependency, avoided reoffending, and are now contributing positively to their communities.',
  },
  {
    title: 'Sacred BMS',
    text: 'With pass-through funding from National Waqf, Sacred BMS produced a landmark research report strengthening awareness and understanding of abuse within Scottish Muslim communities.',
  },
  {
    title: 'Community Forum Policy',
    text: 'An independent think tank advancing evidence-based, community-led policy solutions to address structural inequalities affecting Muslim communities in the UK.',
  },
];

const supportedLogos = [
  'Sapience Institute',
  'Community Policy Forum',
  'Spinney Hill',
  'Muslim Census',
  'MCB',
  'Sacred',
];

const impactStats = [
  {
    value: '£270,000',
    text: 'Awarded in strategic grants to strengthen high-impact organisations and sustainable initiatives.',
    layout: 'left-tall',
    tone: 'donors',
  },
  {
    value: '£1,000,000',
    text: 'More than 150 organisations requested over £1 million in funding, showing strong demand for impact-led investment.',
    layout: 'top-wide',
    tone: 'raised',
  },
  {
    value: '16',
    text: 'Grants awarded to organisations delivering impactful long-term work across the UK.',
    layout: 'bottom-left',
    tone: 'focus',
  },
  {
    value: '6',
    text: 'Cause areas selected for strategic, long-term social outcomes.',
    layout: 'middle-tall',
    tone: 'monthly',
  },
  {
    value: '10,000',
    text: 'Beneficiaries reached through funded projects across the UK.',
    layout: 'bottom-right',
    tone: 'direct-debit',
  },
];

const causeAreas = [
  {
    title: 'Spiritual Preservation and Growth',
    subtitle: 'Supporting Muslims to confidently live Islam and spiritually grow',
    text: '"O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow..." (Qur\'an, Al-Hashr 59:18)\n\nSpiritual preservation is the heart of a strong Muslim identity. The Prophet (peace be upon him) taught that the health of the heart shapes the entire person. When faith is nurtured, communities grow with resilience and direction.',
    color: '#2B346C',
  },
  {
    title: 'Civic, Media and Legal Engagement',
    subtitle: 'Positive development and protection of Muslims in public life',
    text: '"O you who believe! Be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives." (Qur\'an 4:135)\n\nWe are commanded as believers to uphold justice in all circumstances. Civic engagement and legal empowerment are vital pathways through which communities can fulfil this duty, ensuring fairness, representation, and the protection of rights for all.',
    color: '#01ACA6',
  },
  {
    title: 'Youth Empowerment and Leadership',
    subtitle: 'Nurturing and equipping the youth to become future leaders',
    text: 'The Prophet (peace be upon him) inspired many youth in his time. From Mus\'ab ibn Umair (RA) delivering Islam to Madinah in his early 20s, to Mu\'adh ibn Jabal (RA) being sent to Yemen as a young governor, our tradition teaches that youth must be given the opportunity to achieve their full potential.\n\nNational Waqf invests in initiatives that build real opportunities, and connect youth with purpose-driven action. We aim to help develop confident, capable changemakers who give back to society.',
    color: '#E27D50',
  },
  {
    title: 'Da\'wah - Religious Awareness & Outreach',
    subtitle: 'Supporting organisations to share Islamic values with wisdom and integrity',
    text: '"Invite to the way of your Lord with wisdom and good advice..." (Qur\'an 16:125)\n\nSharing the values of Islam with clarity is a prophetic tradition. Islam\'s teachings offer guidance for the flourishing of society as a whole. Religious outreach, therefore, is about helping people better understand Islam\'s message and contribution to our shared lives.\n\nNational Waqf\'s approach to religious outreach values collaboration, supporting stronger connections between Muslim organisations, as well as across diverse faith communities.',
    color: '#3a4284',
  },
  {
    title: 'Educational Excellence and Development',
    subtitle: 'Equipping individuals with knowledge and holistic growth',
    text: '"The seeking of knowledge is an obligation upon every Muslim." (Hadith - Ibn Majah)\n\nEducation is the foundation of community development. To secure a thriving future, we must invest in nurturing talent and innovation across all sectors.\n\nNational Waqf supports initiatives that close these gaps. By building an educational ecosystem that empowers young Muslims intellectually, spiritually, and professionally, we create a generation who positively contribute to wider society.',
    color: '#019d98',
  },
  {
    title: 'Socio-economic Empowerment',
    subtitle: 'Investing in the dignity, wellbeing, and long-term stability of underserved communities',
    text: '"...so that wealth does not circulate only among the rich among you." (Qur\'an 59:7)\n\nWe emphasise fairness in wealth distribution and compassionate care for society\'s most vulnerable. A thriving community must care for those at its margin, not only through short-term relief, but by building systems that protect dignity and enable all to flourish.\n\nNational Waqf\'s approach aims to focus on strengthening the social infrastructure that supports community resilience.',
    color: '#FF8E53',
  },
];

function ImpactPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);
  const projectPanelBodyRef = useRef(null);
  const [selectedCause, setSelectedCause] = useState(null);
  const [isCausePanelOpen, setIsCausePanelOpen] = useState(false);
  const impactAreasRef = useRef(null);
  const [impactAreasSheenActive, setImpactAreasSheenActive] = useState(false);
  const zoomTimerRef = useRef(null);
  const [staticMapView, setStaticMapView] = useState({ scale: 1, tx: 0, ty: 0 });
  const [isMobileMap, setIsMobileMap] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 860px)');
    const update = () => setIsMobileMap(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const onZoomSettled = useCallback(() => {
    setIsProjectPanelOpen(true);
    if (projectPanelBodyRef.current) {
      projectPanelBodyRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
    return () => {
      if (zoomTimerRef.current) {
        window.clearTimeout(zoomTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsProjectPanelOpen(false);
    setSelectedLocation(null);
    setStaticMapView({ scale: 1, tx: 0, ty: 0 });
  }, [isMobileMap]);

  useEffect(() => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }

    if (selectedLocation) {
      const point = projectLatLngToImagePercent(selectedLocation.position);
      const scale = isMobileMap ? 1.72 : 2.1;
      const tx = (50 - point.x) * scale;
      const ty = (53 - point.y) * scale;
      setStaticMapView({ scale, tx, ty });

      zoomTimerRef.current = window.setTimeout(() => {
        onZoomSettled();
      }, 860);
    } else {
      setStaticMapView({ scale: 1, tx: 0, ty: 0 });
    }
  }, [isMobileMap, onZoomSettled, selectedLocation]);

  const onSelectLocation = useCallback((location) => {
    setIsProjectPanelOpen(false);
    setSelectedLocation(location);
  }, []);

  const onCloseProjectPanel = useCallback(() => {
    setIsProjectPanelOpen(false);
    setSelectedLocation(null);
  }, []);

  const onSelectCause = useCallback((cause) => {
    setSelectedCause(cause);
    setIsCausePanelOpen(true);
  }, []);

  const onCloseCausePanel = useCallback(() => {
    setIsCausePanelOpen(false);
  }, []);

  // Lock body scroll when project panel is open
  useEffect(() => {
    if (isProjectPanelOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('impact-project-panel-open');

      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.classList.remove('impact-project-panel-open');
      };
    }

    document.body.classList.remove('impact-project-panel-open');

    return undefined;
  }, [isProjectPanelOpen]);

  useEffect(() => {
    if (!isCausePanelOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseCausePanel();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCausePanelOpen, onCloseCausePanel]);

  useEffect(() => {
    const section = impactAreasRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setImpactAreasSheenActive(entry.isIntersecting);
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

  return (
    <div className="impact-page" id="impact-page">
      <section className="impact-section impact-map" aria-labelledby="impact-map-title">
        <div className="impact-map-stage" role="region" aria-label="UK projects map">
          <div
            className="impact-static-map"
            style={{
              '--static-map-scale': staticMapView.scale,
              '--static-map-tx': `${staticMapView.tx}%`,
              '--static-map-ty': `${staticMapView.ty}%`,
            }}
          >
            <div className="impact-static-map__inner">
              <img src={ukMapImage} alt="" aria-hidden="true" className="impact-static-map__image" />
              <div className="impact-static-map__markers" aria-hidden="false">
                {locations.map((location) => {
                  const point = projectLatLngToImagePercent(location.position);
                  const isActive = selectedLocation?.id === location.id;
                  return (
                    <button
                      key={location.id}
                      type="button"
                      className={`impact-checkpoint-marker impact-checkpoint-marker--static${isActive ? ' impact-checkpoint-marker--active' : ''}`}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      onClick={() => onSelectLocation(location)}
                      aria-label={`View projects in ${location.city}`}
                    >
                      <span className="impact-checkpoint-core" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="impact-map-overlay">
            <div className="impact-shell impact-shell-narrow">
              <h1 id="impact-map-title">Explore our projects</h1>
              <p>
                Click a project checkpoint to trigger a guided zoom and view funding details.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={`impact-project-backdrop ${isProjectPanelOpen ? 'impact-project-backdrop--open' : ''}`}
            onClick={onCloseProjectPanel}
            aria-label="Close project details"
            tabIndex={isProjectPanelOpen ? 0 : -1}
          />

          <aside
            className={`impact-project-panel ${isProjectPanelOpen ? 'impact-project-panel--open' : ''}`}
            role="dialog"
            aria-modal="true"
          >
            {selectedLocation && (
              <>
                <button
                  type="button"
                  className="impact-project-panel__close"
                  onClick={onCloseProjectPanel}
                  aria-label="Close project details"
                >
                  Close
                </button>

                <header className="impact-project-panel__header">
                  <p className="impact-project-panel__eyebrow">{selectedLocation.city}</p>
                  <h2>Projects in {selectedLocation.city}</h2>
                  <p className="impact-project-panel__count">
                    {selectedLocation.projects.length}
                    {' '}
                    {selectedLocation.projects.length === 1 ? 'funded project' : 'funded projects'}
                  </p>
                </header>

                <div className="impact-project-panel__body" ref={projectPanelBodyRef}>
                  {selectedLocation.projects.map((project) => (
                    <article key={project.name} className="impact-project-card">
                      <span className="impact-project-card__tag">{project.category}</span>
                      <h3 className="impact-project-card__title">{project.name}</h3>
                      <p className="impact-project-card__summary">{project.summary}</p>
                      <dl className="impact-project-card__meta">
                        <div>
                          <dt>Grant</dt>
                          <dd>{project.grant}</dd>
                        </div>
                        <div>
                          <dt>Year</dt>
                          <dd>{project.year}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="impact-section impact-eligibility" aria-labelledby="impact-eligibility-title">
        <div className="impact-shell impact-eligibility-grid">
          <div className="impact-eligibility-content">
            <h2 id="impact-eligibility-title">Is your organisation eligible for a Waqf grant?</h2>
            <p>
              Click to download our comprehensive guide on application criteria,
              application guidance, and winning grant fundamentals.
            </p>
            <button type="button" className="impact-btn">Download Now</button>
          </div>
          <img className="impact-placeholder impact-eligibility-image" src={placeholderImg} alt="" aria-hidden="true" />
        </div>
      </section>

      <section className="impact-section impact-funded" aria-labelledby="impact-funded-title">
        <div className="impact-shell">
          <h2 id="impact-funded-title">Blessed to have funded</h2>
          <p className="impact-subtitle">
            We proudly support many inspiring projects across the UK. Placeholder text to update once final copy is approved.
          </p>

          <div className="impact-funded-list">
            {fundedProjects.map((project, index) => (
              <article
                key={project.title}
                className={`impact-funded-row ${index % 2 !== 0 ? 'impact-funded-row--reverse' : ''}`}
              >
                <img className="impact-placeholder impact-funded-image" src={placeholderImg} alt="" aria-hidden="true" />
                <div className="impact-funded-copy">
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-section impact-supported" aria-labelledby="impact-supported-title">
        <div className="impact-shell impact-shell-narrow">
          <h2 id="impact-supported-title">The social projects we have supported</h2>
        </div>
        <div className="impact-supported-marquee" aria-label="Supported organisations logos">
          <div className="impact-supported-track" role="list">
            {[...supportedLogos, ...supportedLogos].map((logo, index) => (
              <div key={`${logo}-${index}`} className="impact-supported-logo" role="listitem">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={impactAreasRef}
        className={`impact-section impact-areas ${impactAreasSheenActive ? 'impact-areas--sheen-active' : ''}`}
        aria-labelledby="impact-areas-title"
      >
        <div className="impact-shell impact-shell-narrow">
          <h2 id="impact-areas-title">Areas we fund:</h2>
          <p>We focus on investing and funding particular areas that we believe will yield the best results.</p>
        </div>

        <div className="impact-shell">
          <div className="impact-stats-grid">
            {impactStats.map((stat) => {
              const compactValue = String(stat.value).replace(/\s+/g, '').length >= 9;

              return (
                <article
                  key={stat.value}
                  className={`impact-stat-card impact-stat-card--${stat.layout} impact-stat-card--${stat.tone}`}
                >
                  <p className={`impact-stat-value${compactValue ? ' impact-stat-value--compact' : ''}`}>
                    <DigitalReelNumber value={stat.value} />
                  </p>
                  <p className="impact-stat-text">{stat.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="impact-section impact-model" aria-labelledby="impact-model-title">
        <div className="impact-model-grid">
          <div className="impact-model-content">
            <h2 id="impact-model-title">Grant giving</h2>
            <p>
              Placeholder copy for how grants are evaluated, awarded, and monitored for impact.
              Replace with final approved grant-giving language.
            </p>

            <h3>Our funding model</h3>
            <p>
              Placeholder copy for investment-to-grant cycle, due diligence standards,
              and governance checkpoints used to sustain long-term outcomes.
            </p>
          </div>

          <div className="impact-model-diagram" aria-hidden="true">
            <div className="impact-model-box impact-model-box--top">Input</div>
            <div className="impact-model-box impact-model-box--left">Allocate</div>
            <div className="impact-model-box impact-model-box--right">Deliver</div>
            <div className="impact-model-box impact-model-box--bottom">Impact</div>
            <svg className="impact-model-lines" viewBox="0 0 520 520" preserveAspectRatio="none">
              <path d="M260 110 C260 150, 180 150, 170 205" />
              <path d="M260 110 C260 150, 340 150, 350 205" />
              <path d="M170 315 C180 370, 260 370, 260 410" />
              <path d="M350 315 C340 370, 260 370, 260 410" />
            </svg>
          </div>
        </div>
      </section>

      <section className="impact-section impact-causes" aria-labelledby="impact-causes-title">
        <div className="impact-shell impact-shell-narrow">
          <h2 id="impact-causes-title">Our cause areas</h2>
        </div>

        <div className="impact-shell">
          <div className="impact-cause-grid">
            {causeAreas.map((cause) => (
              <button
                type="button"
                key={cause.title}
                className="impact-cause-card"
                style={{ backgroundColor: cause.color }}
                onClick={() => onSelectCause(cause)}
                aria-label={`Learn more about ${cause.title}`}
              >
                <span className="impact-cause-card-title">{cause.title}</span>
                <span className="impact-cause-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        className={`impact-cause-backdrop ${isCausePanelOpen ? 'impact-cause-backdrop--open' : ''}`}
        onClick={onCloseCausePanel}
        aria-label="Close cause details"
        tabIndex={isCausePanelOpen ? 0 : -1}
      />

      <aside
        className={`impact-cause-panel ${isCausePanelOpen ? 'impact-cause-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isCausePanelOpen}
      >
        {selectedCause && (
          <>
            <button
              type="button"
              className="impact-cause-panel__close"
              onClick={onCloseCausePanel}
              aria-label="Close cause details"
            >
              Close
            </button>
            <span
              className="impact-cause-panel__swatch"
              style={{ backgroundColor: selectedCause.color }}
              aria-hidden="true"
            />
            <h2>{selectedCause.title}</h2>
            <p className="impact-cause-panel__subtitle">{selectedCause.subtitle}</p>
            {selectedCause.text.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        )}
      </aside>
    </div>
  );
}

export default ImpactPage;
