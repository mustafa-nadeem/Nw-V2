import { useEffect, useRef, useState } from 'react';
import './AuroraTimeline.css';
import placeholderImg from '../assets/placeholder.jpg';
import charityStatusImg from '../assets/charity-commission-certificate.png';
import firstOfficeImg from '../assets/20250114_114359.jpg';
import visionRebrandImg from '../assets/Brand Concepts V1 Archetype 16-1.png';
import firstGrantCycleImg from '../assets/WhatsApp Image 2025-12-27 at 13.09.26.jpeg';
import waqfPackImg from '../assets/Waqf Pack Homepage-1.png';

const milestones = [
  {
    monthYear: 'December 2021',
    year: 2021,
    title: 'Charity status awarded',
    body: 'Our charity status was awarded by the Charity Commission, and we secured initial seed funding to begin our mission.',
    image: charityStatusImg,
    imageFit: 'contain',
  },
  {
    monthYear: 'June 2023',
    year: 2023,
    title: 'Vision and rebrand',
    body: "The new executive board revised and defined a new vision and strategy, which included rebranding the charity's operating name to National Waqf.",
    image: visionRebrandImg,
  },
  {
    monthYear: 'January 2025',
    year: 2025,
    title: 'Moved into our first London office',
    body: 'This marked an important milestone in National Waqf’s journey, giving the team a dedicated base from which to strengthen our operations, build partnerships and expand our work across the UK.',
    image: firstOfficeImg,
  },
  {
    monthYear: 'December 2025',
    year: 2025,
    title: 'First public grant cycle',
    body: 'Our first public grant cycle marked a major milestone, with grants awarded to five organisations to strengthen their capacity and deliver measurable impact.',
    image: firstGrantCycleImg,
  },
  {
    monthYear: 'February 2026',
    year: 2026,
    title: 'Waqf Pack launched',
    body: 'The Waqf Pack is launched and made available for purchase by charities, Muslim institutions, high-net-worth individuals, and families seeking structured Islamic estate planning.',
    image: waqfPackImg,
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function AuroraTimeline() {
  const containerRef = useRef(null);
  const milestoneRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobileLayout(window.innerWidth <= 768);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let frameId = null;

    const updateTimelineState = () => {
      frameId = null;

      if (!containerRef.current) {
        return;
      }

      const windowHeight = window.innerHeight;
      const navbarElement = document.querySelector('.navbar-wrapper');
      const navbarBottom = navbarElement ? navbarElement.getBoundingClientRect().bottom : 0;
      const triggerPoint = Math.max(windowHeight * 0.38, navbarBottom + 16);

      const visualOrder = milestoneRefs.current
        .map((node, index) => ({ node, index }))
        .filter(({ node }) => Boolean(node))
        .map((item) => ({
          ...item,
          yearElement: item.node.querySelector('.aurora-timeline__year'),
        }))
        .filter(({ yearElement }) => Boolean(yearElement))
        .sort((a, b) => {
          const aTop = a.yearElement.getBoundingClientRect().top;
          const bTop = b.yearElement.getBoundingClientRect().top;
          return aTop - bTop;
        });

      let reachedOrderIndex = 0;

      for (let i = 0; i < visualOrder.length; i += 1) {
        const item = visualOrder[i];
        const yearElementTop = item.yearElement.getBoundingClientRect().top;

        if (yearElementTop <= triggerPoint) {
          reachedOrderIndex = i;
        } else {
          break;
        }
      }

      const reachedIndex = visualOrder[reachedOrderIndex]?.index ?? 0;
      const maxOrderIndex = Math.max(visualOrder.length - 1, 1);
      const timelineProgress = clamp(reachedOrderIndex / maxOrderIndex, 0, 1);

      setProgress(timelineProgress);
      setActiveIndex((previousIndex) => (previousIndex === reachedIndex ? previousIndex : reachedIndex));
    };

    const requestTimelineStateUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateTimelineState);
    };

    window.addEventListener('scroll', requestTimelineStateUpdate, { passive: true });
    window.addEventListener('resize', requestTimelineStateUpdate);
    requestTimelineStateUpdate();

    return () => {
      window.removeEventListener('scroll', requestTimelineStateUpdate);
      window.removeEventListener('resize', requestTimelineStateUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const leftMilestones = milestones.filter((_, index) => index % 2 === 0);
  const rightMilestones = milestones.filter((_, index) => index % 2 !== 0);
  const displayYear = String(milestones[activeIndex].year);

  return (
    <section className="aurora-timeline-section" ref={containerRef} aria-labelledby="aurora-timeline-title">
      <h2 id="aurora-timeline-title" className="aurora-timeline__section-title">Our Journey So Far.</h2>

      <div className="aurora-timeline__wrapper">
        <aside className="aurora-timeline__sticky-left" aria-label="Company timeline rail">
          <div className="aurora-timeline__sticky-inner">
            <p className="aurora-timeline__header-label">COMPANY TIMELINE</p>
            <p className="aurora-timeline__giant-year">{displayYear}</p>

            <div className="aurora-timeline__progress-rail">
              <p className="aurora-timeline__progress-start">2021</p>

              <div className="aurora-timeline__progress-track">
                <div className="aurora-timeline__progress-track-bg" />
                <div
                  className="aurora-timeline__progress-track-fill"
                  style={{
                    '--aurora-progress': `${progress * 100}%`,
                  }}
                />
                <span className="aurora-timeline__progress-dot aurora-timeline__progress-dot--start" />
                <span className="aurora-timeline__progress-dot aurora-timeline__progress-dot--end" />
              </div>

              <p className="aurora-timeline__progress-end">2026</p>
            </div>
          </div>
        </aside>

        <div className="aurora-timeline__content">
          {isMobileLayout ? (
            <div className="aurora-timeline__mobile-list">
              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;

                return (
                  <article
                    key={milestone.monthYear}
                    ref={(node) => {
                      milestoneRefs.current[index] = node;
                    }}
                    className="aurora-timeline__milestone"
                  >
                    <p className={`aurora-timeline__year ${isActive ? 'aurora-timeline__year--active' : ''}`}>
                      {milestone.monthYear}
                    </p>
                    <img
                      className={`aurora-timeline__image-placeholder${milestone.imageFit === 'contain' ? ' aurora-timeline__image-placeholder--contain' : ''}`}
                      src={milestone.image || placeholderImg}
                      alt=""
                      aria-hidden="true"
                    />
                    <h3 className="aurora-timeline__title">{milestone.title}</h3>
                    <p className="aurora-timeline__body">{milestone.body}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="aurora-timeline__columns">
              <div className="aurora-timeline__column--left">
                {leftMilestones.map((milestone, leftIndex) => {
                  const index = leftIndex * 2;
                  const isActive = activeIndex === index;

                  return (
                    <article
                      key={milestone.monthYear}
                      ref={(node) => {
                        milestoneRefs.current[index] = node;
                      }}
                      className="aurora-timeline__milestone"
                    >
                      <p className={`aurora-timeline__year ${isActive ? 'aurora-timeline__year--active' : ''}`}>
                        {milestone.monthYear}
                      </p>
                      <img
                        className={`aurora-timeline__image-placeholder${milestone.imageFit === 'contain' ? ' aurora-timeline__image-placeholder--contain' : ''}`}
                        src={milestone.image || placeholderImg}
                        alt=""
                        aria-hidden="true"
                      />
                      <h3 className="aurora-timeline__title">{milestone.title}</h3>
                      <p className="aurora-timeline__body">{milestone.body}</p>
                    </article>
                  );
                })}
              </div>

              <div className="aurora-timeline__column--right">
                {rightMilestones.map((milestone, rightIndex) => {
                  const index = rightIndex * 2 + 1;
                  const isActive = activeIndex === index;

                  return (
                    <article
                      key={milestone.monthYear}
                      ref={(node) => {
                        milestoneRefs.current[index] = node;
                      }}
                      className="aurora-timeline__milestone"
                    >
                      <p className={`aurora-timeline__year ${isActive ? 'aurora-timeline__year--active' : ''}`}>
                        {milestone.monthYear}
                      </p>
                      <img
                        className={`aurora-timeline__image-placeholder${milestone.imageFit === 'contain' ? ' aurora-timeline__image-placeholder--contain' : ''}`}
                        src={milestone.image || placeholderImg}
                        alt=""
                        aria-hidden="true"
                      />
                      <h3 className="aurora-timeline__title">{milestone.title}</h3>
                      <p className="aurora-timeline__body">{milestone.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AuroraTimeline;
