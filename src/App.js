import './App.css';
import WhatIsWaqfStack from './components/WhatIsWaqfStack';
import WhyWaqfSection from './components/WhyWaqfSection';
import DigitalReelNumber from './components/DigitalReelNumber';

function App() {
  return (
    <main className="homepage">
      <section className="section hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">National Waqf</p>
            <h1 id="hero-title">Building a better future through sustainable Waqf</h1>
            <p className="hero-highlight">
              We are the authoritative body that collects, distributes and safeguards
              Waqf donations across the United Kingdom.
            </p>
            <p>
              We receive monetary and asset donations, manage them responsibly, and
              use long-term yields to fund Islamic community projects.
            </p>
            <p>
              Our team identifies worthy initiatives that strengthen communities and
              create lasting social benefit.
            </p>
          </div>

          <aside className="donation-card" aria-label="Donation panel template">
            <h2>Donate to a waqf</h2>
            <p className="donation-subtitle">
              Donate as little as 5 pounds a month and help us build our communities.
            </p>

            <div className="toggle-row" role="group" aria-label="Donation type">
              <button type="button" className="toggle-btn">One-off</button>
              <button type="button" className="toggle-btn active">Monthly</button>
            </div>

            <label className="field-label" htmlFor="donation-cause">Choose an amount to give</label>
            <select id="donation-cause" className="form-field" defaultValue="general">
              <option value="general">General Waqf Fund</option>
              <option value="education">Education Projects</option>
              <option value="health">Health and Welfare</option>
            </select>

            <div className="amount-grid" role="group" aria-label="Quick amounts">
              <button type="button" className="amount-btn">5</button>
              <button type="button" className="amount-btn">10</button>
              <button type="button" className="amount-btn">25</button>
              <button type="button" className="amount-btn">50</button>
              <button type="button" className="amount-btn amount-btn-wide">Other amount</button>
            </div>

            <label className="field-label" htmlFor="custom-amount">Enter custom amount</label>
            <input id="custom-amount" className="form-field" type="number" placeholder="0.00" />

            <label className="gift-aid-row" htmlFor="gift-aid">
              <input id="gift-aid" type="checkbox" />
              <span>Enable Gift Aid declaration</span>
            </label>

            <button type="button" className="primary-btn">Donate</button>
          </aside>
        </div>
      </section>

      <WhatIsWaqfStack />

      <div className="section-spacer" aria-hidden="true" />

      <WhyWaqfSection />

      <section className="section impact" aria-labelledby="impact-title">
        <div className="impact-shell">
          <div className="impact-intro">
            <h2 id="impact-title">The impact we have made</h2>
            <p className="section-copy">
              We collect and manage donations and assets to fund worthy projects that
              build communities, strengthen institutions, and support long-term change.
            </p>
          </div>

          <div className="impact-grid">
            <article className="impact-card impact-card-donors">
              <p className="impact-value"><DigitalReelNumber value="1300+" /></p>
              <p className="impact-text">A trusted and engaged donor community supporting the mission.</p>
            </article>

            <article className="impact-card impact-card-raised">
              <p className="impact-value"><DigitalReelNumber value="£1,500,000+" /></p>
              <p className="impact-text">Raised from individuals, families, and institutions to establish Waqf assets.</p>
            </article>

            <article className="impact-card impact-card-monthly">
              <p className="impact-value"><DigitalReelNumber value="29,000+" /></p>
              <p className="impact-text">A growing base of committed monthly supporters.</p>
            </article>

            <article className="impact-card impact-card-direct-debit">
              <p className="impact-value"><DigitalReelNumber value="£348,000+" /></p>
              <p className="impact-text">Raised via direct debit contributions for long-term planning.</p>
            </article>

            <article className="impact-card impact-card-focus">
              <p className="impact-value"><DigitalReelNumber value="100%" /></p>
              <p className="impact-text">Focused on long-term sustainable funding through Waqf-based models.</p>
            </article>

            <article className="impact-card impact-card-reach">
              <p className="impact-value">UK wide</p>
              <p className="impact-text">National reach through projects and partnerships across multiple regions.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
