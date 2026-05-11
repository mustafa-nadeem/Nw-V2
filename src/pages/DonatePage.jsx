import { useMemo, useState } from 'react';
import './DonatePage.css';

const AMOUNTS = [25, 50, 150, 500];

function formatGBP(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function clampMoney(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100000, value));
}

function DonatePage() {
  const [step, setStep] = useState(1); // 1 | 2 | 3
  const [frequency, setFrequency] = useState('oneOff'); // oneOff | monthly
  const [presetAmount, setPresetAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isZakat, setIsZakat] = useState(false);
  const [coverCosts, setCoverCosts] = useState(true);
  const [giftAid, setGiftAid] = useState(true);
  const [keepInTouchEmail, setKeepInTouchEmail] = useState(false);
  const [keepInTouchSms, setKeepInTouchSms] = useState(false);
  const [isCompanyDonation, setIsCompanyDonation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | paypal

  const [details, setDetails] = useState({
    email: '',
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });

  const amount = useMemo(() => {
    const numericCustom = customAmount.trim() ? Number(customAmount) : null;
    const chosen = numericCustom !== null && Number.isFinite(numericCustom) ? numericCustom : presetAmount;
    return clampMoney(chosen);
  }, [customAmount, presetAmount]);

  const contributionRate = coverCosts ? 0.15 : 0;
  const contribution = useMemo(() => amount * contributionRate, [amount, contributionRate]);
  const total = useMemo(() => amount + contribution, [amount, contribution]);

  return (
    <div className="donate-page">
      <header className={`donate-hero${step > 1 ? ' donate-hero--compact' : ''}`} aria-label="Donate hero">
        <div className="donate-hero-shell">
          <p className="donate-eyebrow">Step {step} out of 3</p>
          {step === 1 ? (
            <>
              <h1 className="donate-title">Give sustainably. Build permanently.</h1>
              <p className="donate-subtitle">
                Choose an amount, boost it with Gift Aid where eligible, and complete your donation securely.
              </p>
            </>
          ) : (
            <h1 className="donate-title donate-title--small">Complete your donation</h1>
          )}
        </div>
      </header>

      <main className="donate-shell donate-grid" aria-label="Donation form">
        <div className="donate-left">
          {step === 1 ? (
            <section className="donate-card donate-card--details" aria-labelledby="donate-details-title">
              <div className="donate-card-header">
                <div>
                  <h2 id="donate-details-title">Donation details</h2>
                  <p className="donate-muted">Where most needed</p>
                </div>
                <span className="donate-chip" aria-label="Campaign tag">General</span>
              </div>

              <div className="donate-tabs" role="tablist" aria-label="Donation frequency">
                <button
                  type="button"
                  className={`donate-tab${frequency === 'monthly' ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={frequency === 'monthly'}
                  onClick={() => setFrequency('monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`donate-tab${frequency === 'oneOff' ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={frequency === 'oneOff'}
                  onClick={() => setFrequency('oneOff')}
                >
                  One-Off
                </button>
              </div>

              <div className="donate-block">
                <p className="donate-label">Select your donation amount.</p>
                <div className="donate-amounts" role="group" aria-label="Quick amounts">
                  {AMOUNTS.map((value) => {
                    const isActive = !customAmount.trim() && presetAmount === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        className={`donate-amount${isActive ? ' is-active' : ''}`}
                        onClick={() => {
                          setCustomAmount('');
                          setPresetAmount(value);
                        }}
                      >
                        £{value}
                      </button>
                    );
                  })}
                </div>

                <div className="donate-custom" aria-label="Custom amount">
                  <span className="donate-custom-prefix" aria-hidden="true">£</span>
                  <input
                    inputMode="decimal"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="50"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    aria-label="Custom donation amount"
                  />
                </div>

                <p className="donate-impact-hint">
                  Provides long-term support through sustainable Waqf investment returns.
                </p>
              </div>

              <div className="donate-divider" role="separator" />

              <div className="donate-toggles" aria-label="Donation options">
                <label className="donate-toggle">
                  <input type="checkbox" checked={isZakat} onChange={(e) => setIsZakat(e.target.checked)} />
                  <span className="donate-toggle-ui" aria-hidden="true" />
                  <span className="donate-toggle-text">This is a Zakat donation</span>
                </label>

                <label className="donate-toggle">
                  <input type="checkbox" checked={coverCosts} onChange={(e) => setCoverCosts(e.target.checked)} />
                  <span className="donate-toggle-ui" aria-hidden="true" />
                  <span className="donate-toggle-text">Cover National Waqf’s costs (15%)</span>
                </label>

                <label className="donate-toggle">
                  <input type="checkbox" checked={giftAid} onChange={(e) => setGiftAid(e.target.checked)} />
                  <span className="donate-toggle-ui" aria-hidden="true" />
                  <span className="donate-toggle-text">Boost your donation with Gift Aid (if eligible)</span>
                </label>
              </div>

              {giftAid ? (
                <div className="donate-giftaid">
                  <p className="donate-giftaid-title">Gift Aid declaration</p>
                  <p className="donate-giftaid-body">
                    I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount
                    of Gift Aid claimed, it is my responsibility to pay any difference.
                  </p>
                  <button type="button" className="donate-link">Read more about Gift Aid</button>
                </div>
              ) : null}

              <div className="donate-divider" role="separator" />

              <div className="donate-keepintouch" aria-label="Keep in touch options">
                <h3 className="donate-h3">Can we keep in touch?</h3>
                <label className="donate-toggle donate-toggle--compact">
                  <input
                    type="checkbox"
                    checked={keepInTouchEmail}
                    onChange={(e) => setKeepInTouchEmail(e.target.checked)}
                  />
                  <span className="donate-toggle-ui" aria-hidden="true" />
                  <span className="donate-toggle-text">I’m happy to receive emails</span>
                </label>
                <label className="donate-toggle donate-toggle--compact">
                  <input
                    type="checkbox"
                    checked={keepInTouchSms}
                    onChange={(e) => setKeepInTouchSms(e.target.checked)}
                  />
                  <span className="donate-toggle-ui" aria-hidden="true" />
                  <span className="donate-toggle-text">I’m happy to receive text messages</span>
                </label>
              </div>

              <div className="donate-cta-row">
                <button
                  type="button"
                  className="donate-pay donate-pay--primary"
                  onClick={() => setStep(2)}
                >
                  Continue to your details
                </button>
                <p className="donate-fineprint">
                  Secure checkout. Your donation supports long-term Waqf impact.
                </p>
              </div>
            </section>
          ) : (
            <div className="donate-left-stack">
              <button
                type="button"
                className="donate-step-card donate-step-card--done"
                onClick={() => setStep(1)}
                aria-label="Edit donation details"
              >
                <span className="donate-step-card__left">
                  <span className="donate-step-check" aria-hidden="true">✓</span>
                  <span className="donate-step-card__title">Donation details</span>
                </span>
                <span className="donate-step-edit" aria-hidden="true">✎</span>
              </button>

              {step === 2 ? (
                <section className="donate-card donate-card--details" aria-labelledby="donate-your-details-title">
                  <div className="donate-card-header donate-card-header--tight">
                    <h2 id="donate-your-details-title">Your details</h2>
                  </div>

                  <form
                    className="donate-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(3);
                    }}
                  >
                    <div className="donate-field">
                      <label htmlFor="donate-email">Email address*</label>
                      <input
                        id="donate-email"
                        type="email"
                        required
                        value={details.email}
                        onChange={(e) => setDetails((p) => ({ ...p, email: e.target.value }))}
                      />
                    </div>

                    <div className="donate-form-row donate-form-row--3">
                      <div className="donate-field">
                        <label htmlFor="donate-title">Title*</label>
                        <select
                          id="donate-title"
                          required
                          value={details.title}
                          onChange={(e) => setDetails((p) => ({ ...p, title: e.target.value }))}
                        >
                          <option value="" disabled>—</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                        </select>
                      </div>
                      <div className="donate-field">
                        <label htmlFor="donate-first-name">First name*</label>
                        <input
                          id="donate-first-name"
                          type="text"
                          required
                          value={details.firstName}
                          onChange={(e) => setDetails((p) => ({ ...p, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="donate-field">
                        <label htmlFor="donate-last-name">Last name*</label>
                        <input
                          id="donate-last-name"
                          type="text"
                          required
                          value={details.lastName}
                          onChange={(e) => setDetails((p) => ({ ...p, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="donate-field">
                      <label htmlFor="donate-phone">Phone number (optional)</label>
                      <input
                        id="donate-phone"
                        type="tel"
                        value={details.phone}
                        onChange={(e) => setDetails((p) => ({ ...p, phone: e.target.value }))}
                      />
                    </div>

                    <div className="donate-field">
                      <label htmlFor="donate-address">Start typing your address or enter it manually*</label>
                      <input
                        id="donate-address"
                        type="text"
                        required
                        value={details.address}
                        onChange={(e) => setDetails((p) => ({ ...p, address: e.target.value }))}
                      />
                    </div>

                    <label className="donate-checkbox">
                      <input
                        type="checkbox"
                        checked={isCompanyDonation}
                        onChange={(e) => setIsCompanyDonation(e.target.checked)}
                      />
                      <span>This is a company donation</span>
                    </label>

                    <button type="submit" className="donate-primary-btn">
                      Continue to payment details
                    </button>
                  </form>
                </section>
              ) : (
                <>
                  <button
                    type="button"
                    className="donate-step-card donate-step-card--done"
                    onClick={() => setStep(2)}
                    aria-label="Edit your details"
                  >
                    <span className="donate-step-card__left">
                      <span className="donate-step-check" aria-hidden="true">✓</span>
                      <span className="donate-step-card__title">Your details</span>
                    </span>
                    <span className="donate-step-edit" aria-hidden="true">✎</span>
                  </button>

                  <section className="donate-card donate-card--details" aria-labelledby="donate-payment-title">
                    <div className="donate-card-header donate-card-header--tight">
                      <h2 id="donate-payment-title">Payment details</h2>
                    </div>

                    <div className="donate-payment-methods" role="radiogroup" aria-label="Payment method">
                      <label className="donate-radio">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <span>Debit / Credit Card</span>
                      </label>
                      <label className="donate-radio">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                        />
                        <span>PayPal</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      className="donate-primary-btn donate-primary-btn--complete"
                      onClick={() => {}}
                    >
                      Complete donation
                    </button>
                  </section>
                </>
              )}
            </div>
          )}
        </div>

        <aside className="donate-card donate-card--summary" aria-label="Donation summary">
          <h2 className="donate-summary-title">Your donation</h2>

          <dl className="donate-summary-list">
            <div className="donate-summary-row">
              <dt>Where most needed</dt>
              <dd>{formatGBP(amount)}</dd>
            </div>
            <div className="donate-summary-row donate-summary-row--muted">
              <dt>Frequency</dt>
              <dd>{frequency === 'monthly' ? 'Monthly' : 'One-off'}</dd>
            </div>
            <div className="donate-summary-row donate-summary-row--muted">
              <dt>Type</dt>
              <dd>{isZakat ? 'Zakat' : 'Sadaqah / Waqf'}</dd>
            </div>
            {coverCosts ? (
              <div className="donate-summary-row">
                <dt>15% Contribution</dt>
                <dd>{formatGBP(contribution)}</dd>
              </div>
            ) : null}
          </dl>

          <div className="donate-summary-total">
            <div className="donate-summary-total-row">
              <span>Total</span>
              <span>{formatGBP(total)}</span>
            </div>
            <p className="donate-summary-note">
              We invest donations sustainably and distribute returns strategically for lasting impact.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default DonatePage;

