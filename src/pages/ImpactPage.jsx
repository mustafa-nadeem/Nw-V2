import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import DigitalReelNumber from '../components/DigitalReelNumber';
import './ImpactPage.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ukOverview = {
  center: [50.5, -2.75],
  zoom: 5.95,
};

const ukOverviewMobile = {
  center: [54.2, -3.2],
  zoom: 4.85,
};

const mapZoom = {
  min: 5.2,
  max: 9.4,
  projectFocus: 8.2,
};

const mapZoomMobile = {
  min: 4.4,
  max: 9.4,
  projectFocus: 7.6,
};

const ukViewBounds = [
  [49.75, -8.9],
  [59.35, 2.2],
];

const checkpointIcon = L.divIcon({
  className: 'impact-checkpoint-marker',
  html: '<span class="impact-checkpoint-core" aria-hidden="true"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const checkpointIconActive = L.divIcon({
  className: 'impact-checkpoint-marker impact-checkpoint-marker--active',
  html: '<span class="impact-checkpoint-core" aria-hidden="true"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const projects = [
  {
    name: 'Muslim Scout Scholarship',
    city: 'Manchester',
    category: 'Youth Development',
    summary: 'Funding to expand access and leadership opportunities for young people.',
    position: [53.4808, -2.2426],
  },
  {
    name: 'Supporting Humanity',
    city: 'Birmingham',
    category: 'Community Support',
    summary: 'Support for practical welfare and community outreach delivery.',
    position: [52.4862, -1.8904],
  },
  {
    name: 'Sacred',
    city: 'London',
    category: 'Spiritual Programmes',
    summary: 'Support for guided programmes focused on faith and reflection.',
    position: [51.5072, -0.1276],
  },
  {
    name: 'Community Forum Policy',
    city: 'Leicester',
    category: 'Civic Engagement',
    summary: 'Investment in dialogue and policy participation for local communities.',
    position: [52.6369, -1.1398],
  },
  {
    name: 'Sapience Institute',
    city: 'Cardiff',
    category: 'Research',
    summary: 'Research-led initiatives supporting informed community development.',
    position: [51.4816, -3.1791],
  },
  {
    name: 'Spinney Hill Recovery',
    city: 'Glasgow',
    category: 'Health and Recovery',
    summary: 'Targeted support for addiction recovery and resilience services.',
    position: [55.8642, -4.2518],
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
    value: '£1,000,000',
    text: 'More than 150 organisations requested over £1 million in funding, showing strong demand for impact-led investment.',
    layout: 'left-tall',
    tone: 'donors',
  },
  {
    value: '£270,000',
    text: 'Awarded in strategic grants to strengthen high-impact organisations and sustainable initiatives.',
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

function MapCameraController({
  selectedProject,
  onZoomSettled,
  overviewCenter,
  overviewZoom,
  projectFocusZoom,
}) {
  const map = useMap();
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (selectedProject) {
      map.flyTo(selectedProject.position, projectFocusZoom, {
        animate: true,
        duration: 1.25,
      });

      timerRef.current = window.setTimeout(() => {
        onZoomSettled();
      }, 860);
    } else {
      map.setView(overviewCenter, overviewZoom, {
        animate: false,
      });
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [
    map,
    onZoomSettled,
    overviewCenter,
    overviewZoom,
    projectFocusZoom,
    selectedProject,
  ]);

  return null;
}

function ImpactPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [isCausePanelOpen, setIsCausePanelOpen] = useState(false);
  const impactAreasRef = useRef(null);
  const [impactAreasSheenActive, setImpactAreasSheenActive] = useState(false);
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

  const activeOverview = isMobileMap ? ukOverviewMobile : ukOverview;
  const activeZoom = isMobileMap ? mapZoomMobile : mapZoom;

  useEffect(() => {
    setIsProjectPanelOpen(false);
    setSelectedProject(null);
  }, [isMobileMap]);

  const onZoomSettled = useCallback(() => {
    setIsProjectPanelOpen(true);
  }, []);

  const onSelectProject = useCallback((project) => {
    setIsProjectPanelOpen(false);
    setSelectedProject(project);
  }, []);

  const onCloseProjectPanel = useCallback(() => {
    setIsProjectPanelOpen(false);
    setSelectedProject(null);
  }, []);

  const onSelectCause = useCallback((cause) => {
    setSelectedCause(cause);
    setIsCausePanelOpen(true);
  }, []);

  const onCloseCausePanel = useCallback(() => {
    setIsCausePanelOpen(false);
  }, []);

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
          <MapContainer
            key={isMobileMap ? 'mobile' : 'desktop'}
            center={activeOverview.center}
            zoom={activeOverview.zoom}
            minZoom={activeZoom.min}
            maxZoom={activeZoom.max}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
            touchZoom={false}
            zoomControl={false}
            attributionControl={false}
            maxBounds={ukViewBounds}
            maxBoundsViscosity={1}
            zoomSnap={0.05}
            className="impact-map-canvas"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap
            />

            <MapCameraController
              selectedProject={selectedProject}
              onZoomSettled={onZoomSettled}
              overviewCenter={activeOverview.center}
              overviewZoom={activeOverview.zoom}
              projectFocusZoom={activeZoom.projectFocus}
            />

            {projects.map((project) => (
              <Marker
                key={project.name}
                position={project.position}
                icon={selectedProject?.name === project.name ? checkpointIconActive : checkpointIcon}
                eventHandlers={{
                  click: () => onSelectProject(project),
                }}
              />
            ))}
          </MapContainer>

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
            {selectedProject && (
              <>
                <button
                  type="button"
                  className="impact-project-panel__close"
                  onClick={onCloseProjectPanel}
                  aria-label="Close project details"
                >
                  Close
                </button>
                <p className="impact-project-panel__eyebrow">{selectedProject.city}</p>
                <h2>{selectedProject.name}</h2>
                <p className="impact-project-panel__tag">{selectedProject.category}</p>
                <p>{selectedProject.summary}</p>
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
          <div className="impact-placeholder impact-eligibility-image" aria-hidden="true">Image</div>
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
                <div className="impact-placeholder impact-funded-image" aria-hidden="true">Image</div>
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
            {impactStats.map((stat) => (
              <article
                key={stat.value}
                className={`impact-stat-card impact-stat-card--${stat.layout} impact-stat-card--${stat.tone}`}
              >
                <p className="impact-stat-value"><DigitalReelNumber value={stat.value} /></p>
                <p className="impact-stat-text">{stat.text}</p>
              </article>
            ))}
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
