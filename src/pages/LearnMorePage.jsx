import { useState } from 'react';
import './LearnMorePage.css';

const roleCards = [
  {
    title: 'Zakat',
    subtitle: 'A pillar of our faith',
    text: 'Obligatory charitable giving distributed to eligible recipients to relieve hardship, reduce poverty, and uphold social justice in line with Islamic principles.',
  },
  {
    title: 'Sadaqah',
    subtitle: 'Giving that never decreases your wealth',
    text: 'Voluntary charitable giving that supports immediate relief, community needs, and ongoing good causes for spiritual and social benefit.',
  },
  {
    title: 'Waqf',
    subtitle: 'Eternal reward for building community infrastructure',
    text: 'A perpetual endowment that preserves capital and generates sustainable income to fund long-term charitable, educational, and community initiatives.',
  },
];

const usageCards = [
  {
    title: 'Religious Waqf',
    text: 'Endowments dedicated to supporting Islamic worship and sacred knowledge, such as mosques, Qur\'an distribution, and religious institutions, preserving faith and spiritual life for the community.',
    examples: ['Masjid', 'Mushaf'],
  },
  {
    title: 'Philanthropic Waqf',
    text: 'Endowments established for the public good, funding essential services such as education, social welfare, healthcare, and community development to deliver long-term societal impact.',
    examples: ['Social welfare', 'Public services', 'Education'],
  },
  {
    title: 'Family Waqf',
    text: 'Endowments designed to support family members while preserving wealth, enabling structured Islamic estate planning and creating a legacy of financial security and charitable benefit.',
    examples: ['Family benefit', 'Estate planning'],
  },
];

const contentCards = [
  {
    title: 'Browse our video content',
    text: 'Browse our video content to learn more about the work we do.',
    layout: 'tall',
  },
  {
    title: 'Browse our case studies',
    text: 'Browse our case studies to learn more about the impact we create.',
    layout: 'wide',
  },
  {
    title: 'Browse student resources',
    text: 'Browse our student resources to continue your learning journey.',
    layout: 'wide',
  },
];

const financialReports = [
  {
    title: 'Annual reports',
    text: 'All annual financial summaries, governance statements, and strategic updates.',
  },
  {
    title: 'Investments reports',
    text: 'Performance and stewardship reports for invested funds and long-term portfolios.',
  },
  {
    title: 'Fundraising reports',
    text: 'Donation trends, campaign summaries, and supporter growth updates.',
  },
  {
    title: 'Grant giving impact reports',
    text: 'Grant allocation outcomes and measurable social impact across funded initiatives.',
  },
];

const faqGroups = [
  {
    heading: 'General questions',
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
    heading: 'Policies and reports',
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
      {
        question: 'Do you provide educational resources?',
        answer: 'Yes. We publish educational materials and case studies to support learning about waqf and community development.',
      },
    ],
  },
];

function LearnMorePage() {
  const [openFaqItems, setOpenFaqItems] = useState({});

  const toggleFaq = (key) => {
    setOpenFaqItems((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <div className="learn-page" id="learn-more">
      <section className="learn-section learn-hero" aria-labelledby="learn-hero-title">
        <div className="learn-shell learn-hero-grid">
          <div className="learn-hero-copy">
            <h1 id="learn-hero-title">Donate here to earn eternal rewards</h1>
            <p>
              Log in or sign up to donate. It does not take long and you can set up your giving
              to be a regular donation.
            </p>
            <div className="learn-hero-actions">
              <button type="button">Log in</button>
              <button type="button">Sign up</button>
            </div>
          </div>
          <div className="learn-hero-image" aria-hidden="true">Image</div>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-role-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-role-title">The role of Zakaat, Sadaqah and Waqf in Islam</h2>
        </div>
        <div className="learn-shell">
          <div className="learn-role-grid">
            {roleCards.map((card) => (
              <article className="learn-role-card" key={card.title}>
                <div className="learn-icon-circle" aria-hidden="true">icon/illustration</div>
                <h3>{card.title}</h3>
                <h4>{card.subtitle}</h4>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-usage-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-usage-title">Usages of Awqaf</h2>
        </div>
        <div className="learn-shell">
          <div className="learn-usage-grid">
            {usageCards.map((card) => (
              <article className="learn-usage-card" key={card.title}>
                <div className="learn-icon-circle" aria-hidden="true">icon/illustration</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <p className="learn-examples-label">Examples:</p>
                <ul>
                  {card.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section learn-workshop" aria-labelledby="learn-workshop-title">
        <div className="learn-shell learn-workshop-grid">
          <div className="learn-workshop-copy">
            <h2 id="learn-workshop-title">Book educational workshops with us</h2>
            <form className="learn-workshop-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="learn-workshop-email">Your email:</label>
              <input id="learn-workshop-email" type="email" name="email" required />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="learn-workshop-image" aria-hidden="true">Image</div>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-policies-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-policies-title">Our policies</h2>
        </div>
        <div className="learn-shell learn-shell-narrow">
          <article className="learn-download-row">
            <div>
              <h3>Download our policies:</h3>
              <p>Download and learn more about our policies in this thorough document.</p>
            </div>
            <button type="button" aria-label="Download policies">Download</button>
          </article>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-content-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-content-title">Connect to our content</h2>
          <p className="learn-lead">Connect here and learn more about National Waqf\'s work through our storytelling content.</p>
        </div>
        <div className="learn-shell">
          <div className="learn-content-grid">
            {contentCards.map((card, index) => (
              <article
                key={card.title}
                className={`learn-content-card learn-content-card--${card.layout} ${index === 0 ? 'learn-content-card--left' : ''}`}
              >
                <div className="learn-content-image" aria-hidden="true">Image</div>
                <p>{card.text}</p>
                <button type="button" aria-label={`Open ${card.title}`}>Go</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-finance-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-finance-title">Financial reports</h2>
          <p className="learn-lead">All our latest financial reports are available to download here.</p>
        </div>
        <div className="learn-shell learn-shell-narrow">
          <div className="learn-report-list">
            {financialReports.map((report) => (
              <article className="learn-download-row" key={report.title}>
                <div>
                  <h3>{report.title}</h3>
                  <p>{report.text}</p>
                </div>
                <button type="button" aria-label={`Download ${report.title}`}>Download</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section" aria-labelledby="learn-faq-title">
        <div className="learn-shell learn-shell-narrow">
          <h2 id="learn-faq-title">Frequently asked questions</h2>
          <p className="learn-lead">Find quick answers to common questions about our work, funding, and reporting.</p>
        </div>
        <div className="learn-shell learn-shell-narrow">
          {faqGroups.map((group, groupIndex) => (
            <div className="learn-faq-group" key={group.heading}>
              <h3>{group.heading}</h3>
              <div className="learn-faq-list">
                {group.items.map((item, itemIndex) => {
                  const key = `${groupIndex}-${itemIndex}`;
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
                        <span className="learn-faq-icon" aria-hidden="true">{isOpen ? '-' : '+'}</span>
                      </button>
                      <div id={`learn-faq-panel-${key}`} className="learn-faq-panel" hidden={!isOpen}>
                        <p>{item.answer}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LearnMorePage;
