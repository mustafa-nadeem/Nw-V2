import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './ImpactPage.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ukOverview = {
  center: [54.75, -2.75],
  zoom: 6.05,
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
    title: 'Muslim Scout Scholarship',
    text: 'Placeholder copy: support awarded to increase participation, mentoring, and practical leadership pathways for youth participants.',
  },
  {
    title: 'Supporting Humanity',
    text: 'Placeholder copy: grant support focused on frontline aid delivery, volunteer training, and sustainable service capacity.',
  },
  {
    title: 'Sacred',
    text: 'Placeholder copy: funding allocated to deepen spiritual literacy, wellbeing, and long-term faith development pathways.',
  },
  {
    title: 'Community Forum Policy',
    text: 'Placeholder copy: programme support to strengthen civic confidence, informed participation, and local representation.',
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
    value: '£1 million',
    text: 'More than 150 organisations requested over £1 million in funding, showing strong demand for impact-led investment.',
    size: 'large',
  },
  {
    value: '£270k',
    text: 'Awarded in strategic grants to strengthen high-impact organisations and sustainable initiatives.',
    size: 'wide',
  },
  {
    value: '16',
    text: 'Grants awarded to organisations delivering impactful long-term work across the UK.',
    size: 'medium',
  },
  {
    value: '6',
    text: 'Cause areas selected for strategic, long-term social outcomes.',
    size: 'small',
  },
  {
    value: '10,000',
    text: 'Beneficiaries reached through funded projects across the UK.',
    size: 'medium',
  },
];

const causeAreas = [
  {
    title: 'Spiritual Preservation and Growth',
    text: 'Placeholder copy for supporting faith-informed practice, literacy, and safe communal spaces for worship and reflection.',
  },
  {
    title: 'Civic, Social and Legal Engagement',
    text: 'Placeholder copy for initiatives that strengthen participation, legal literacy, and constructive civic leadership.',
  },
  {
    title: 'Youth Empowerment and Leadership',
    text: 'Placeholder copy for programmes developing youth confidence, responsibility, and long-term leadership skills.',
  },
  {
    title: 'Da wah and Religious Resilience',
    text: 'Placeholder copy for outreach and educational pathways that support informed, grounded community identity.',
  },
  {
    title: 'Educational Excellence and Development',
    text: 'Placeholder copy for educational uplift, teacher development, and scalable quality-learning opportunities.',
  },
  {
    title: 'Socio-economic Empowerment',
    text: 'Placeholder copy for economic wellbeing, family resilience, and access pathways that improve stability and mobility.',
  },
];

function MapCameraController({ selectedProject, onZoomSettled }) {
  const map = useMap();
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (selectedProject) {
      map.flyTo(selectedProject.position, 8.85, {
        animate: true,
        duration: 1.25,
      });

      timerRef.current = window.setTimeout(() => {
        onZoomSettled();
      }, 860);
    } else {
      map.flyTo(ukOverview.center, ukOverview.zoom, {
        animate: true,
        duration: 1,
      });
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [map, onZoomSettled, selectedProject]);

  return null;
}

function ImpactPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);

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

  return (
    <div className="impact-page" id="impact-page">
      <section className="impact-section impact-map" aria-labelledby="impact-map-title">
        <div className="impact-map-stage" role="region" aria-label="UK projects map">
          <MapContainer
            center={ukOverview.center}
            zoom={ukOverview.zoom}
            minZoom={6}
            maxZoom={9.4}
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

            <MapCameraController selectedProject={selectedProject} onZoomSettled={onZoomSettled} />

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

          <aside className={`impact-project-panel ${isProjectPanelOpen ? 'impact-project-panel--open' : ''}`}>
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
                  <button type="button" className="impact-link-btn">Read More</button>
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
        <div className="impact-supported-strip" role="list" aria-label="Supported organisations logos">
          {supportedLogos.map((logo) => (
            <div key={logo} className="impact-supported-logo" role="listitem">{logo}</div>
          ))}
        </div>
      </section>

      <section className="impact-section impact-areas" aria-labelledby="impact-areas-title">
        <div className="impact-shell impact-shell-narrow">
          <h2 id="impact-areas-title">Areas we fund:</h2>
          <p>We focus on investing and funding particular areas that we believe will yield the best results.</p>
        </div>

        <div className="impact-shell">
          <div className="impact-stats-grid">
            {impactStats.map((stat) => (
              <article key={stat.value} className={`impact-stat-card impact-stat-card--${stat.size}`}>
                <p className="impact-stat-value">{stat.value}</p>
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
              <article key={cause.title} className="impact-cause-card">
                <div className="impact-placeholder impact-cause-image" aria-hidden="true">Image</div>
                <div className="impact-cause-body">
                  <h3>{cause.title}</h3>
                  <p>{cause.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ImpactPage;
