import './AboutPage.css';

const journeyMilestones = [
  {
    date: 'March 2020',
    text: 'Initiative by the Muslim community leaders began to establish a charity to revive the Waqf institution.',
  },
  {
    date: 'December 2021',
    text: 'Our charity status was awarded and we secured initial seed funding to formalise long-term plans.',
  },
  {
    date: 'June 2022',
    text: 'Program design and first funding pathways were piloted with a governance model focused on sustainability.',
  },
  {
    date: 'June 2023',
    text: 'The executive board refined strategy and launched operations under the National Waqf name.',
  },
];

const trustees = [
  {
    name: 'Trustee Name',
    bio: 'Short trustee biography placeholder text describing expertise, governance responsibilities, and community contribution.',
  },
  {
    name: 'Trustee Name',
    bio: 'Short trustee biography placeholder text describing expertise, governance responsibilities, and community contribution.',
  },
  {
    name: 'Trustee Name',
    bio: 'Short trustee biography placeholder text describing expertise, governance responsibilities, and community contribution.',
  },
  {
    name: 'Trustee Name',
    bio: 'Short trustee biography placeholder text describing expertise, governance responsibilities, and community contribution.',
  },
];

const shariaBoard = [
  {
    name: 'Sharia Board Member',
    bio: 'Short sharia advisory biography placeholder text focused on jurisprudence, ethics, and endowment governance.',
  },
  {
    name: 'Sharia Board Member',
    bio: 'Short sharia advisory biography placeholder text focused on jurisprudence, ethics, and endowment governance.',
  },
  {
    name: 'Sharia Board Member',
    bio: 'Short sharia advisory biography placeholder text focused on jurisprudence, ethics, and endowment governance.',
  },
  {
    name: 'Sharia Board Member',
    bio: 'Short sharia advisory biography placeholder text focused on jurisprudence, ethics, and endowment governance.',
  },
];

const principles = [
  {
    title: 'Unity of the Ummah',
    text: 'We work to strengthen cohesion and collective progress through projects that benefit the wider community.',
  },
  {
    title: 'Transparency and Trust',
    text: 'We maintain clear governance, robust reporting, and responsible stewardship of every donation and asset.',
  },
  {
    title: 'Professional Excellence',
    text: 'We apply structured planning and expert oversight to deliver measurable social impact over the long term.',
  },
  {
    title: 'Independence with Integrity',
    text: 'We uphold principled decision-making so every strategic action aligns with our mission and values.',
  },
];

function AboutPage() {
  return (
    <div className="about-page" id="about">
      <section className="about-section about-hero" aria-labelledby="about-hero-title">
        <div className="about-shell about-shell-narrow">
          <h1 id="about-hero-title">National Waqf -<br />Building Communities one project at a Time</h1>
          <p>
            National Waqf works to build infrastructure for communities. Every project we
            invest in is thoroughly researched and developed with the intention of bringing
            maximum benefit sustainably for many years through a clear and accountable
            return on social investment model.
          </p>
        </div>
      </section>

      <section className="about-section about-operations" aria-labelledby="about-works-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-works-title">How does National Waqf Work?</h2>
          <p>
            National Waqf operates a sustainable funding cycle where donations are first
            received, then invested by an expert investment committee to generate long-term
            returns. From these returns, a portion is distributed as grants while the
            remaining balance is reinvested so communities can benefit year after year.
          </p>
          <div className="about-diagram-placeholder">Public diagram to come</div>

          <h2>How we fund the organisation - Private Waqf</h2>
          <p>
            National Waqf sustains its operations through private waqf assets and aligned
            business contributions. These funds support operational costs and ensure the
            organisation remains effective while maintaining financial sustainability.
          </p>
          <div className="about-funding-grid">
            <div className="about-diagram-placeholder" aria-hidden="true" />
            <aside className="about-note">Private operational and admin costs box</aside>
          </div>
        </div>
      </section>

      <section className="about-section about-purpose" aria-labelledby="about-purpose-title">
        <div className="about-shell about-shell-narrow">
          <article className="about-purpose-item">
            <h2 id="about-purpose-title">Our purpose</h2>
            <p>
              National Waqf exists to institutionalise the revival of waqf in the UK as a
              permanent engine for community resilience, social good, and ethical nation-building.
            </p>
          </article>

          <article className="about-purpose-item">
            <h2>Our vision</h2>
            <p>
              To establish Waqf as a permanent, trusted institution in the UK that funds
              generations of social, educational, civic, and spiritual impact.
            </p>
          </article>

          <article className="about-purpose-item">
            <h2>Our mission</h2>
            <p>
              To build, protect, and grow sustainable waqf assets and deploy their returns
              strategically to empower communities and strengthen institutions.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section about-journey" aria-labelledby="about-journey-title">
        <div className="about-shell">
          <h2 id="about-journey-title">Our journey so far</h2>
          <div className="about-journey-grid">
            {journeyMilestones.map((milestone) => (
              <article className="about-journey-card" key={milestone.date}>
                <div className="about-image-placeholder">Image</div>
                <div className="about-journey-body">
                  <h3>{milestone.date}</h3>
                  <p>{milestone.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-trustees-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-trustees-title">Meet our trustees</h2>
          <div className="about-profile-grid">
            {trustees.map((member, index) => (
              <article className="about-profile-card" key={`${member.name}-${index}`}>
                <div className="about-image-placeholder">Image needed</div>
                <div className="about-profile-content">
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-sharia-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-sharia-title">Meet our Sharia board</h2>
          <div className="about-profile-grid">
            {shariaBoard.map((member, index) => (
              <article className="about-profile-card" key={`${member.name}-${index}`}>
                <div className="about-image-placeholder">Image needed</div>
                <div className="about-profile-content">
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-principles" aria-labelledby="about-principles-title">
        <div className="about-shell about-shell-narrow">
          <h2 id="about-principles-title">Our principles</h2>
          <p className="about-principles-subhead">
            We focus on practical impact through values that guide every decision we make.
          </p>

          <div className="about-principles-list">
            {principles.map((principle) => (
              <article className="about-principle-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
