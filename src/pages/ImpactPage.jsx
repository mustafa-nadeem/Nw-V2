import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import ukGeoJson from '../assets/geo/uk.geo.json';
import './ImpactPage.css';

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 920;
const MAP_PANEL_SAFE_AREA_RATIO = 0.26;

const projects = [
  {
    name: 'Muslim Scout Scholarship',
    city: 'Manchester',
    category: 'Youth Development',
    summary: 'Funding to expand access and leadership opportunities for young people.',
    coordinates: [-2.2426, 53.4808],
  },
  {
    name: 'Supporting Humanity',
    city: 'Birmingham',
    category: 'Community Support',
    summary: 'Support for practical welfare and community outreach delivery.',
    coordinates: [-1.8904, 52.4862],
  },
  {
    name: 'Sacred',
    city: 'London',
    category: 'Spiritual Programmes',
    summary: 'Support for guided programmes focused on faith and reflection.',
    coordinates: [-0.1276, 51.5072],
  },
  {
    name: 'Community Forum Policy',
    city: 'Leicester',
    category: 'Civic Engagement',
    summary: 'Investment in dialogue and policy participation for local communities.',
    coordinates: [-1.1398, 52.6369],
  },
  {
    name: 'Sapience Institute',
    city: 'Cardiff',
    category: 'Research',
    summary: 'Research-led initiatives supporting informed community development.',
    coordinates: [-3.1791, 51.4816],
  },
  {
    name: 'Spinney Hill Recovery',
    city: 'Glasgow',
    category: 'Health and Recovery',
    summary: 'Targeted support for addiction recovery and resilience services.',
    coordinates: [-4.2518, 55.8642],
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

function ImpactPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);
  const panelTimerRef = useRef(null);

  const ukFeature = useMemo(() => {
    if (!ukGeoJson?.features?.length) {
      return null;
    }

    return ukGeoJson.features[0];
  }, []);

  const projection = useMemo(() => {
    if (!ukFeature) {
      return null;
    }

    return geoMercator().fitExtent([[120, 68], [MAP_WIDTH - 120, MAP_HEIGHT - 80]], ukFeature);
  }, [ukFeature]);

  const mapPath = useMemo(() => {
    if (!projection || !ukFeature) {
      return '';
    }

    return geoPath(projection)(ukFeature) || '';
  }, [projection, ukFeature]);

  const projectPoints = useMemo(() => {
    if (!projection) {
      return [];
    }

    return projects
      .map((project) => {
        const projectedPoint = projection(project.coordinates);

        if (!projectedPoint) {
          return null;
        }

        return {
          ...project,
          x: projectedPoint[0],
          y: projectedPoint[1],
        };
      })
      .filter(Boolean);
  }, [projection]);

  const mapTransform = useMemo(() => {
    const overviewTransform = { scale: 1, x: 0, y: 0 };

    if (!selectedProject) {
      return overviewTransform;
    }

    const targetPoint = projectPoints.find((point) => point.name === selectedProject.name);

    if (!targetPoint) {
      return overviewTransform;
    }

    const scale = 2.65;
    const targetX = MAP_WIDTH * MAP_PANEL_SAFE_AREA_RATIO;
    const targetY = MAP_HEIGHT * 0.5;

    return {
      scale,
      x: targetX - targetPoint.x * scale,
      y: targetY - targetPoint.y * scale,
    };
  }, [projectPoints, selectedProject]);

  const onSelectProject = useCallback((project) => {
    setIsProjectPanelOpen(false);
    setSelectedProject(project);
  }, []);

  const onCloseProjectPanel = useCallback(() => {
    setIsProjectPanelOpen(false);
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (panelTimerRef.current) {
      window.clearTimeout(panelTimerRef.current);
      panelTimerRef.current = null;
    }

    if (!selectedProject) {
      return;
    }

    panelTimerRef.current = window.setTimeout(() => {
      setIsProjectPanelOpen(true);
    }, 700);

    return () => {
      if (panelTimerRef.current) {
        window.clearTimeout(panelTimerRef.current);
      }
    };
  }, [selectedProject]);

  return (
    <div className="impact-page" id="impact-page">
      <section className="impact-section impact-map" aria-labelledby="impact-map-title">
        <div className="impact-map-stage" role="region" aria-label="UK projects map">
          <div className="impact-map-canvas" aria-hidden="true">
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="impact-uk-map" role="img">
              <g
                className="impact-uk-map__viewport"
                style={{
                  transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
                }}
              >
                <path className="impact-uk-map__shape" d={mapPath} />

                {projectPoints.map((project) => {
                  const isActive = selectedProject?.name === project.name;

                  return (
                    <g key={project.name} transform={`translate(${project.x}, ${project.y})`}>
                      <circle
                        className={`impact-checkpoint-ring ${isActive ? 'impact-checkpoint-ring--active' : ''}`}
                        cx="0"
                        cy="0"
                        r="11"
                      />
                      <circle
                        className={`impact-checkpoint-dot ${isActive ? 'impact-checkpoint-dot--active' : ''}`}
                        cx="0"
                        cy="0"
                        r="6"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="impact-map-hit-layer">
            {projectPoints.map((project) => {
              const isActive = selectedProject?.name === project.name;

              return (
                <button
                  key={project.name}
                  type="button"
                  className={`impact-checkpoint-hit ${isActive ? 'impact-checkpoint-hit--active' : ''}`}
                  style={{
                    left: `${(project.x / MAP_WIDTH) * 100}%`,
                    top: `${(project.y / MAP_HEIGHT) * 100}%`,
                  }}
                  onClick={() => onSelectProject(project)}
                  aria-label={`View ${project.name} details`}
                />
              );
            })}
          </div>

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
