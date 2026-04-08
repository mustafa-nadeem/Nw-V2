import './Footer.css';
import logoWhite from '../assets/logo/white.svg';

const causes = [
  "Spiritual Preservation & Growth",
  "Civic, Media & Legal Engagement",
  "Youth Empowerment & Leadership",
  "Da'wah - Religious Awareness & Outreach",
  'Educational Excellence & Development',
  'Economic Relief & Empowerment',
];

const about = ['Our Story', 'What is Waqf?', 'Our Team', 'Contact'];

const getInvolved = [
  'Reporting',
  'Fundraising',
  'Campaigns',
  'Careers and Volunteering',
  'Grant Giving',
  'Manage Donations',
];

const socialLinks = [
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
  { label: 'X', icon: 'x', href: 'https://x.com' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
  { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
  { label: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com' },
];

function toAnchor(label) {
  return `#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
}

function SocialIcon({ icon }) {
  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 8.3h2.1V5h-2.8C10.9 5 9.4 6.5 9.4 9v2H7.7v3.3h1.7V19h3.4v-4.7h2.5l.4-3.3h-2.9V9.4c0-.8.4-1.1 1.1-1.1Z" />
      </svg>
    );
  }

  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.7 3h8.6A4.7 4.7 0 0 1 21 7.7v8.6a4.7 4.7 0 0 1-4.7 4.7H7.7A4.7 4.7 0 0 1 3 16.3V7.7A4.7 4.7 0 0 1 7.7 3Zm0 1.9A2.8 2.8 0 0 0 4.9 7.7v8.6a2.8 2.8 0 0 0 2.8 2.8h8.6a2.8 2.8 0 0 0 2.8-2.8V7.7a2.8 2.8 0 0 0-2.8-2.8H7.7Zm8.9 1.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.9a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z" />
      </svg>
    );
  }

  if (icon === 'x') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h3.5l4 5.2L16.9 5H20l-6 6.8L20.3 19h-3.5l-4.3-5.5L7.7 19H4.6l6.2-7.1L5 5Z" />
      </svg>
    );
  }

  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 8.1a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM5 9.6h3.2V19H5V9.6Zm5 0h3.1v1.3h.1c.6-1 1.7-1.7 3.3-1.7 2.7 0 4 1.7 4 4.8V19h-3.2v-4.2c0-1.4-.5-2.3-1.8-2.3-1 0-1.6.7-1.8 1.4-.1.3-.1.7-.1 1.1V19H10V9.6Z" />
      </svg>
    );
  }

  if (icon === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.3 8.2c-.2-1.3-1.2-2.2-2.5-2.4C17 5.4 14.6 5.3 12 5.3c-2.6 0-5 .1-6.8.5-1.3.2-2.3 1.1-2.5 2.4C2.4 10 2.3 11.5 2.3 12s.1 2 .4 3.8c.2 1.3 1.2 2.2 2.5 2.4 1.8.4 4.2.5 6.8.5 2.6 0 5-.1 6.8-.5 1.3-.2 2.3-1.1 2.5-2.4.3-1.8.4-3.3.4-3.8s-.1-2-.4-3.8ZM10.3 15.6V8.4l5.4 3.6-5.4 3.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.8 5c.7 1 1.7 1.6 3 1.8v2.3c-1.2-.1-2.1-.4-3-.9v5.2a4.9 4.9 0 1 1-4.9-4.9c.2 0 .4 0 .7.1v2.4h-.4a2.5 2.5 0 1 0 2.3 2.5V4h2.3v1Z" />
    </svg>
  );
}

function FooterColumn({ title, links }) {
  return (
    <section className="footer-column" aria-label={title}>
      <h2 className="footer-column-title">{title}</h2>
      <ul className="footer-link-list">
        {links.map((link) => (
          <li key={link}>
            <a href={toAnchor(link)} className="footer-link">{link}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="connect">
      <div className="site-footer-inner impact-shell">
        <section className="footer-brand" aria-label="National Waqf details">
          <a href="/" className="footer-logo-link" aria-label="National Waqf home">
            <img src={logoWhite} alt="National Waqf" className="footer-logo" />
          </a>

          <p className="footer-copy">
            National Waqf generates sustainable charity revenue through strategic
            investments.
          </p>

          <div className="footer-regulator" aria-label="Regulator registration">
            <div className="footer-regulator-badge" aria-hidden="true">FR</div>
            <div className="footer-regulator-text">
              <p>Registered with</p>
              <p className="footer-regulator-strong">FUNDRAISING</p>
              <p className="footer-regulator-strong">REGULATOR</p>
            </div>
          </div>

          <div className="footer-socials" aria-label="Social links">
            <p className="footer-socials-label">Follow Us</p>
            <ul className="footer-social-list">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="footer-social-link"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FooterColumn title="Causes" links={causes} />
        <FooterColumn title="About" links={about} />
        <FooterColumn title="Get involved" links={getInvolved} />
      </div>
    </footer>
  );
}

export default Footer;
