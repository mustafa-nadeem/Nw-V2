import { useEffect, useRef, useState } from 'react';
import './AuroraTimeline.css';

const milestones = [
  {
    monthYear: 'March 2020',
    year: 2020,
    title: 'Initiative begins',
    body: 'Initiative by the Muslim community leaders began to establish a charity to revive the Waqf institution. However, progress was not as swift as desired due to COVID-19 set back.',
  },
  {
    monthYear: 'December 2021',
    year: 2021,
    title: 'Charity status awarded',
    body: 'Our charity status was awarded by the Charity Commission, and we secured initial seed funding to begin our mission.',
  },
  {
    monthYear: 'June 2022',
    year: 2022,
    title: 'Momentum rebuilds',
    body: 'With the pandemic easing, momentum rebuilt as community engagement increased and foundational structures were put in place.',
  },
  {
    monthYear: 'June 2023',
    year: 2023,
    title: 'Vision and rebrand',
    body: "The new executive board revised and defined a new vision and strategy, which included rebranding the charity's operating name to National Waqf.",
  },
  {
    monthYear: 'June 2024',
    year: 2024,
    title: '£1m milestone invested',
    body: 'A £1 million donation milestone was reached and strategically invested into income-generating assets to create long-term, sustainable impact.',
  },
  {
    monthYear: 'December 2025',
    year: 2025,
    title: 'First public grant cycle',
    body: 'Our first public grant cycle marked a major milestone, with grants awarded to five organisations to strengthen their capacity and deliver measurable impact.',
  },
  {
    monthYear: 'February 2026',
    year: 2026,
    title: 'Waqf Pack launched',
    body: 'The Waqf Pack is launched and made available for purchase by charities, Muslim institutions, high-net-worth individuals, and families seeking structured Islamic estate planning.',
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

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      const denominator = containerHeight - windowHeight * 0.2;
      const rawProgress = denominator <= 0
        ? 0
        : (windowHeight * 0.4 - containerTop) / denominator;
      const scrollProgress = clamp(rawProgress, 0, 1);

      setProgress(scrollProgress);

      const triggerPoint = window.innerHeight * 0.35;

      const visualOrder = milestoneRefs.current
        .map((node, index) => ({ node, index }))
        .filter(({ node }) => Boolean(node))
        .sort((a, b) => {
          const aTop = a.node.querySelector('.aurora-timeline__year').getBoundingClientRect().top;
          const bTop = b.node.querySelector('.aurora-timeline__year').getBoundingClientRect().top;
          return aTop - bTop;
        });

      let reachedIndex = 0;

      for (let i = 0; i < visualOrder.length; i += 1) {
        const item = visualOrder[i];
        const yearElementTop = item.node.querySelector('.aurora-timeline__year').getBoundingClientRect().top;

        if (yearElementTop <= triggerPoint) {
          reachedIndex = item.index;
        }
      }

      setActiveIndex(reachedIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const leftMilestones = milestones.filter((_, index) => index % 2 === 0);
  const rightMilestones = milestones.filter((_, index) => index % 2 !== 0);
  const displayYear = milestones[activeIndex].year === 2026 ? 'TODAY' : String(milestones[activeIndex].year);

  return (
    <section className="aurora-timeline-section" ref={containerRef} aria-labelledby="aurora-timeline-title">
      <h2 id="aurora-timeline-title" className="aurora-timeline__section-title">Our Journey So Far.</h2>

      <div className="aurora-timeline__wrapper">
        <aside className="aurora-timeline__sticky-left" aria-label="Company timeline rail">
          <div className="aurora-timeline__sticky-inner">
            <p className="aurora-timeline__header-label">COMPANY TIMELINE</p>
            <p className="aurora-timeline__giant-year">{displayYear}</p>

            <div className="aurora-timeline__progress-rail">
              <p className="aurora-timeline__progress-start">2020</p>

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

              <p className="aurora-timeline__progress-end">TODAY</p>
            </div>
          </div>
        </aside>

        <div className="aurora-timeline__content">
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
                    <div className="aurora-timeline__image-placeholder" />
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
                    <div className="aurora-timeline__image-placeholder" />
                    <h3 className="aurora-timeline__title">{milestone.title}</h3>
                    <p className="aurora-timeline__body">{milestone.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuroraTimeline;
