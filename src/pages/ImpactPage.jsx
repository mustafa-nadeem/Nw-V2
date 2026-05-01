import { useCallback, useEffect, useRef, useState } from 'react';
import placeholderImg from '../assets/placeholder.jpg';
import logoMcb from '../assets/logosss/MCB 2 (1).png';
import logoMsf from '../assets/logosss/MSF (1).png';
import logoNewBeginnings from '../assets/logosss/New beginnings (1).png';
import logoSacred from '../assets/logosss/sacred.png';
import logoSapience from '../assets/logosss/sapience.png';
import logoSpinney from '../assets/logosss/spinney.png';
import logoThumbnail from '../assets/logosss/thumbnail_2025-12-19 14.52.20.jpg';
import DigitalReelNumber from '../components/DigitalReelNumber';
import './ImpactPage.css';

const UK_IMAGE_BOUNDS = {
  north: 59.35,
  south: 49.75,
  west: -8.9,
  east: 2.2,
};

const UK_MAP_DRAW_BOUNDS = {
  left: 26.4,
  right: 72.2,
  top: 3.6,
  bottom: 92.8,
};
const STATIC_OVERVIEW_SCALE = 0.84;
const STATIC_OVERVIEW_TX = 0;
const STATIC_OVERVIEW_TY = -3;

function projectLatLngToImagePercent([lat, lng]) {
  const normalizedX = (lng - UK_IMAGE_BOUNDS.west) / (UK_IMAGE_BOUNDS.east - UK_IMAGE_BOUNDS.west);
  const normalizedY = (UK_IMAGE_BOUNDS.north - lat) / (UK_IMAGE_BOUNDS.north - UK_IMAGE_BOUNDS.south);
  const x = UK_MAP_DRAW_BOUNDS.left + (normalizedX * (UK_MAP_DRAW_BOUNDS.right - UK_MAP_DRAW_BOUNDS.left));
  const y = UK_MAP_DRAW_BOUNDS.top + (normalizedY * (UK_MAP_DRAW_BOUNDS.bottom - UK_MAP_DRAW_BOUNDS.top));
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}


const rawProjects = [
  {
    id: 1,
    organisation: 'New Beginnings',
    cause_area: 'Spiritual preservation and growth',
    based_in: 'Oldham',
    impact_area: 'Oldham, Greater Manchester',
    description: 'New Beginnings is a registered UK charity dedicated to working with converts to Islam, new Muslims, and those exploring Islam, through education, social connections, wellbeing and facilitation.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 2,
    organisation: 'SREIslamic',
    cause_area: null,
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Grassroots organisation supporting Muslim parents navigating sex education and related challenges.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 3,
    organisation: 'Sacred BMS',
    cause_area: 'Social and Economic Empowerment',
    based_in: 'Dundee, Scotland',
    impact_area: 'Glasgow',
    description: 'Creates change for Muslim communities by building evidence on abuse survivors experiences.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 4,
    organisation: 'Sapience',
    cause_area: "Da'wah religious awareness and outreach",
    based_in: 'London',
    impact_area: 'London',
    description: 'Supports individuals and organisations to intellectually share and defend Islam.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 5,
    organisation: 'Spinney Hill',
    cause_area: 'Social and Economic Empowerment',
    based_in: 'Leicester',
    impact_area: 'Leicester',
    description: 'Supports Muslims struggling with drug and alcohol addictions.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 6,
    organisation: 'Zubeda Welcome',
    cause_area: 'Educational Excellence and Development',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Addresses Islamic education for asylum seekers in the UK.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 7,
    organisation: 'Muslim Scouts Fellowship',
    cause_area: 'Youth empowerment & leadership',
    based_in: 'London',
    impact_area: 'London',
    description: 'Official UK body for Muslim adults in scouting, providing youth education.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 8,
    organisation: 'Community Policy Forum',
    cause_area: 'Civic, media & legal engagement',
    based_in: 'Birmingham',
    impact_area: 'Nationwide',
    description: 'Promotes evidence-based policymaking addressing structural inequalities.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 9,
    organisation: 'Muslim Friendly Employers',
    cause_area: null,
    based_in: 'London',
    impact_area: 'Nationwide',
    description: null,
    key_outcomes: null,
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 10,
    organisation: 'Ibn Ashur',
    cause_area: 'Spiritual preservation and growth',
    based_in: 'Scotland',
    impact_area: 'Scotland',
    description: 'Healing Through the Quran podcast exploring faith, trauma, identity, and spirituality.',
    key_outcomes: [
      'Quran-centred podcast and media series',
      'Accessible classical scholarship for modern audiences',
      'National and global digital reach',
    ],
    total_grant: 5000,
    logo_attached: true,
  },
  {
    id: 11,
    organisation: 'Ihsan Careers Network Ltd - FOSIS',
    cause_area: 'Youth empowerment and leadership',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'National mentorship initiative connecting Muslim professionals with students for career support.',
    key_outcomes: [
      'One-to-one mentorship for Muslim students',
      'Access to ethical careers and networks',
      'National reach via universities',
    ],
    total_grant: 5000,
    logo_attached: true,
  },
  {
    id: 12,
    organisation: 'Here for Youth - Islamic Network',
    cause_area: 'Youth empowerment and leadership',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Supports mosques and organisations with safeguarding training, policy templates, and coaching.',
    key_outcomes: [
      'Training youth leaders nationwide',
      'Embedding safeguarding practices',
      'Creating safe youth spaces',
    ],
    total_grant: 5000,
    logo_attached: true,
  },
  {
    id: 13,
    organisation: 'Muslim Census',
    cause_area: 'Civic, Media & Legal Engagement',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Delivers a comprehensive State of the Nation study on Muslims in the UK.',
    key_outcomes: [
      'National report on Muslim life',
      'Evidence for policy and funding',
      'Community insight and advocacy',
    ],
    total_grant: 5000,
    logo_attached: true,
  },
  {
    id: 14,
    organisation: 'Solace UK',
    cause_area: 'Spiritual preservation and growth',
    based_in: 'London',
    impact_area: 'London',
    description: 'Weekend spiritual programme supporting womens faith, resilience, and personal development.',
    key_outcomes: [
      'Faith-based spiritual courses',
      'Support for revert women',
      'Long-term wellbeing and resilience',
    ],
    total_grant: 5000,
    logo_attached: true,
  },
  {
    id: 15,
    organisation: 'Supporting Humanity',
    cause_area: 'Social and Economic Empowerment',
    based_in: 'London',
    impact_area: 'London',
    description: 'Provides mental health, bereavement support, and funeral services.',
    key_outcomes: [
      'End-of-life care support',
      'Bereavement services',
      'Mental health outreach',
    ],
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 16,
    organisation: 'Muslim Family Initiative',
    cause_area: null,
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Supports Muslim parents navigating sex education challenges in schools.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 17,
    organisation: 'Quran Revision Project',
    cause_area: 'Spiritual preservation and growth',
    based_in: 'National',
    impact_area: 'Nationwide',
    description: 'Supports individuals facing Islamophobia with reporting, legal guidance, and emotional support.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 18,
    organisation: 'Islamophobia Response Unit',
    cause_area: 'Civic, Media & Legal Engagement',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Supports victims of Islamophobia.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
  {
    id: 19,
    organisation: 'Muslim Council of Britain',
    cause_area: 'Civic, Media & Legal Engagement',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Visionary Leadership Programme to strengthen Muslim civic participation.',
    key_outcomes: [
      'Train media and public affairs representatives',
      'Support national engagement',
      'Strengthen civic participation',
    ],
    total_grant: null,
    logo_attached: true,
  },
  {
    id: 20,
    organisation: 'Muslim Legal Fund',
    cause_area: 'Civic, Media & Legal Engagement',
    based_in: 'London',
    impact_area: 'Nationwide',
    description: 'Protects Muslim rights through legal action, guidance, and policy work.',
    key_outcomes: null,
    total_grant: null,
    logo_attached: false,
  },
];

const locationCoordinates = {
  oldham: [52.709, -1.8114],
  london: [50.8072, -0.32],
  'dundee-scotland': [56.462, -2.9707],
  leicester: [52.0369, -1.1398],
  birmingham: [52.4862, -1.8904],
  scotland: [56.4907, -4.2026],
  national: [54.55, -3.43],
};

const locationScreenOverrides = {
  'dundee-scotland': { x: 54.2, y: 33.2 },
  scotland: { x: 50.9, y: 36.4 },
};

function makeLocationId(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatGrant(totalGrant) {
  if (typeof totalGrant !== 'number') {
    return 'TBC';
  }
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(totalGrant);
}

const projects = rawProjects.map((project) => ({
  id: project.id,
  organisation: project.organisation,
  causeArea: project.cause_area,
  basedIn: project.based_in,
  impactArea: project.impact_area,
  description: project.description,
  totalGrant: project.total_grant,
  keyOutcomes: project.key_outcomes,
  logoAttached: project.logo_attached,
  isNationwide: typeof project.impact_area === 'string' && project.impact_area.toLowerCase().includes('nationwide'),
}));

const NATIONWIDE_LOCATION_ID = 'nationwide';
const NATIONWIDE_SCREEN_POSITION = { x: 68, y: 18 };

const localProjects = projects.filter((project) => !project.isNationwide);
const nationwideProjects = projects.filter((project) => project.isNationwide);

const groupedLocations = Object.values(
  localProjects.reduce((acc, project) => {
    const key = makeLocationId(project.basedIn || 'National');
    const position = locationCoordinates[key] || locationCoordinates.national;

    if (!acc[key]) {
      acc[key] = {
        id: key,
        city: project.basedIn || 'National',
        position,
        screenPosition: locationScreenOverrides[key],
        projects: [],
      };
    }

    acc[key].projects.push(project);
    return acc;
  }, {})
).sort((a, b) => a.city.localeCompare(b.city));

const nationwideLocation = nationwideProjects.length > 0
  ? {
      id: NATIONWIDE_LOCATION_ID,
      city: 'Nationwide',
      isNationwide: true,
      screenPosition: NATIONWIDE_SCREEN_POSITION,
      projects: nationwideProjects,
    }
  : null;

const locations = nationwideLocation ? [...groupedLocations, nationwideLocation] : groupedLocations;

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
  { src: logoMcb, alt: 'MCB logo' },
  { src: logoMsf, alt: 'MSF logo' },
  { src: logoNewBeginnings, alt: 'New Beginnings logo' },
  { src: logoSacred, alt: 'Sacred logo' },
  { src: logoSapience, alt: 'Sapience logo' },
  { src: logoSpinney, alt: 'Spinney logo' },
  { src: logoThumbnail, alt: 'Community Policy Forum logo' },
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
  const [staticMapView, setStaticMapView] = useState({
    scale: STATIC_OVERVIEW_SCALE,
    tx: STATIC_OVERVIEW_TX,
    ty: STATIC_OVERVIEW_TY,
  });
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
    setStaticMapView({
      scale: STATIC_OVERVIEW_SCALE,
      tx: STATIC_OVERVIEW_TX,
      ty: STATIC_OVERVIEW_TY,
    });
  }, [isMobileMap]);

  useEffect(() => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }

    if (selectedLocation) {
      if (selectedLocation.isNationwide) {
        setStaticMapView({
          scale: STATIC_OVERVIEW_SCALE,
          tx: STATIC_OVERVIEW_TX,
          ty: STATIC_OVERVIEW_TY,
        });
        zoomTimerRef.current = window.setTimeout(() => {
          onZoomSettled();
        }, 220);
      } else {
        const point = projectLatLngToImagePercent(selectedLocation.position);
        const scale = isMobileMap ? 1.72 : 2.1;
        const tx = (50 - point.x) * scale;
        const ty = (53 - point.y) * scale;
        setStaticMapView({ scale, tx, ty });

        zoomTimerRef.current = window.setTimeout(() => {
          onZoomSettled();
        }, 860);
      }
    } else {
      setStaticMapView({
        scale: STATIC_OVERVIEW_SCALE,
        tx: STATIC_OVERVIEW_TX,
        ty: STATIC_OVERVIEW_TY,
      });
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
              <div className="impact-static-map__frame">
                <img src="/uk.svg" alt="" aria-hidden="true" className="impact-static-map__image" />
                <div className="impact-static-map__markers" aria-hidden="false">
                  {locations.map((location) => {
                    const point = location.screenPosition || projectLatLngToImagePercent(location.position);
                    const isActive = selectedLocation?.id === location.id;
                    const isNationwidePin = !!location.isNationwide;
                    return (
                      <button
                        key={location.id}
                        type="button"
                        className={`impact-checkpoint-marker impact-checkpoint-marker--static${isActive ? ' impact-checkpoint-marker--active' : ''}${isNationwidePin ? ' impact-checkpoint-marker--nationwide' : ''}`}
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        onClick={() => onSelectLocation(location)}
                        aria-label={isNationwidePin ? 'View nationwide projects' : `View projects in ${location.city}`}
                      >
                        <span className="impact-checkpoint-core" aria-hidden="true">
                          {isNationwidePin ? (
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                              className="impact-checkpoint-icon"
                            >
                              <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                              <path
                                d="M2.75 12h18.5M12 2.85c2.85 3.15 2.85 15.15 0 18.3M12 2.85c-2.85 3.15-2.85 15.15 0 18.3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : null}
                        </span>
                        {isNationwidePin ? (
                          <span className="impact-checkpoint-label">
                            <span className="impact-checkpoint-label__dot" aria-hidden="true" />
                            Nationwide reach
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
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
                  <p className="impact-project-panel__eyebrow">
                    {selectedLocation.isNationwide ? 'Across the UK' : selectedLocation.city}
                  </p>
                  <h2>
                    {selectedLocation.isNationwide
                      ? 'Nationwide projects'
                      : `Projects in ${selectedLocation.city}`}
                  </h2>
                  <p className="impact-project-panel__count">
                    {selectedLocation.projects.length} funded {selectedLocation.projects.length === 1 ? 'project' : 'projects'}
                  </p>
                </header>

                <div className="impact-project-panel__body" ref={projectPanelBodyRef}>
                  {selectedLocation.projects.map((project) => (
                    <article className="impact-project-card" key={project.id}>
                      <div className="impact-project-card__tags">
                        <span className="impact-project-card__tag">{project.causeArea || 'Funded Project'}</span>
                        {project.isNationwide ? (
                          <span className="impact-project-card__tag impact-project-card__tag--nationwide">Nationwide</span>
                        ) : null}
                      </div>
                      <h3 className="impact-project-card__title">{project.organisation}</h3>
                      <p className="impact-project-card__summary">{project.description || 'Project details coming soon.'}</p>
                      <dl className="impact-project-card__meta">
                        <div>
                          <dt>Impact area</dt>
                          <dd>{project.impactArea || 'TBC'}</dd>
                        </div>
                        <div>
                          <dt>Grant</dt>
                          <dd>{formatGrant(project.totalGrant)}</dd>
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
              <div key={`${logo.alt}-${index}`} className="impact-supported-logo" role="listitem">
                <img className="impact-supported-logo-image" src={logo.src} alt={logo.alt} loading="lazy" />
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
                <img
                  className="impact-cause-card-image"
                  src={placeholderImg}
                  alt=""
                  aria-hidden="true"
                />
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
