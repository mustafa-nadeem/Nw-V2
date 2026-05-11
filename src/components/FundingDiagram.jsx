import './FundingDiagram.css';

const sources = [
  { key: 'private', label: 'Internal Private Waqf' },
  { key: 'business', label: 'Monthly Business Donations' },
  { key: 'gift', label: 'Gift Aid' },
];

function FlowArrow() {
  return (
    <svg
      className="funding-flow-arrow-svg"
      viewBox="0 0 72 28"
      width="72"
      height="28"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0 10h44V4l28 10-28 10v-6H0z"
      />
    </svg>
  );
}

function FundingDiagram() {
  return (
    <div className="funding-diagram funding-diagram--flow" role="img" aria-label="Funding flows into National Waqf operations">
      <div className="funding-flow-desktop">
        <div className="funding-flow-left">
          {sources.map(({ key, label }) => (
            <div key={key} className={`funding-flow-source funding-flow-source--${key}`}>
              <span className="funding-flow-source__text">{label}</span>
              <span className="funding-flow-source__arrow" aria-hidden="true">
                <FlowArrow />
              </span>
            </div>
          ))}
        </div>

        <div className="funding-flow-mid" aria-hidden="true">
          {sources.map(({ key }) => (
            <div key={key} className="funding-flow-mid__cell">
              <FlowArrow />
            </div>
          ))}
        </div>

        <div className="funding-flow-output">
          <h3 className="funding-flow-output__title">National Waqf&rsquo;s Operations</h3>
          <p className="funding-flow-output__lede">
            (Salary &amp; Wages, Marketing costs, Events and all other admin costs)
          </p>
        </div>
      </div>
    </div>
  );
}

export default FundingDiagram;
