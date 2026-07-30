import './FundingDiagram.css';

const sources = [
  {
    key: 'private',
    label: 'Internal Private Waqf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9.5" cy="7.5" r="3.1" />
        <path d="M4 19.2c0-3.1 2.5-5.1 5.5-5.1 1.3 0 2.4.4 3.3 1" />
        <rect x="14.4" y="13.6" width="6.6" height="5.6" rx="1.1" />
        <path d="M16.1 13.6v-1.4a1.6 1.6 0 0 1 3.2 0v1.4" />
      </svg>
    ),
  },
  {
    key: 'business',
    label: 'Monthly Business Donations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12.3 10.2 15.4 7.3a2.15 2.15 0 1 0-3.1-3l-.3.3-.3-.3a2.15 2.15 0 1 0-3.1 3l3.4 3.2z" />
        <path d="M3 15.4h3.1c.5 0 1 .1 1.4.4l1.9 1.1c.4.2.9.4 1.3.4h2.4a1.3 1.3 0 0 1 0 2.6H10" />
        <path d="M13.4 19.5l4.9-1.5a1.4 1.4 0 0 1 1.8.9c.2.7-.2 1.4-.9 1.7l-5.4 1.8c-.7.2-1.5.2-2.2-.1L3 19.6" />
      </svg>
    ),
  },
  {
    key: 'gift',
    label: 'Gift Aid',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4.2" y="11.2" width="15.6" height="8.8" rx="1" />
        <path d="M3.2 7.8h17.6v3.4H3.2z" />
        <path d="M12 7.8v12.2" />
        <path d="M12 7.8c-1.9 0-3.6-.9-3.6-2.3C8.4 4.2 9.5 3.5 10.5 4c1 .5 1.5 2.2 1.5 3.8zM12 7.8c1.9 0 3.6-.9 3.6-2.3 0-1.3-1.1-2-2.1-1.5-1 .5-1.5 2.2-1.5 3.8z" />
      </svg>
    ),
  },
];

function FundingDiagram() {
  return (
    <div className="funding-orbit-diagram">
      <div className="funding-orbit" aria-hidden="true">
        <div className="funding-orbit__ring funding-orbit__ring--outer">
          <span className="funding-orbit__band funding-orbit__band--gift" />
          <div className="funding-orbit__ring funding-orbit__ring--mid">
            <span className="funding-orbit__band funding-orbit__band--business" />
            <div className="funding-orbit__ring funding-orbit__ring--inner">
              <span className="funding-orbit__band funding-orbit__band--private" />
            </div>
          </div>
        </div>
      </div>

      <div className="funding-orbit__center">
        <h3 className="funding-orbit__title">National Waqf&rsquo;s Operations</h3>
        <p className="funding-orbit__lede">
          (Salary &amp; Wages, Marketing costs, Events and all other admin costs)
        </p>
      </div>

      <ul className="funding-orbit__sources">
        {sources.map(({ key, label, icon }) => (
          <li key={key} className={`funding-orbit__source funding-orbit__source--${key}`}>
            <span className="funding-orbit__diamond">
              <span className="funding-orbit__diamond-shape" aria-hidden="true" />
              <span className="funding-orbit__diamond-icon">{icon}</span>
            </span>
            <span className="funding-orbit__label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FundingDiagram;
