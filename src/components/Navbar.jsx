import { useState, useEffect } from 'react';
import './Navbar.css';
import logoWhite from '../assets/logo/white.svg';
import logoBlack from '../assets/logo/black.svg';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}>
      <nav className={`navbar${open ? ' open' : ''}`}>
        <a href="/" className="navbar-logo" aria-label="National Waqf home">
          <img
            className="navbar-logo-img navbar-logo-white"
            src={logoWhite}
            alt="National Waqf"
          />
          <img
            className="navbar-logo-img navbar-logo-black"
            src={logoBlack}
            alt="National Waqf"
          />
        </a>

        <div className="navbar-center">
          <a href="#about" className="navbar-link">About Us</a>
          <a href="#impact" className="navbar-link">Our Impact</a>
          <a href="#learn" className="navbar-link">Learn More</a>
          <a href="#connect" className="navbar-link">Connect With Us</a>
        </div>

        <div className="navbar-actions">
          <a href="#grant" className="navbar-action-link">Apply</a>
          <a href="#signin" className="navbar-action-link">Sign In</a>
          <a href="#donate" className="navbar-btn navbar-btn--donate">Donate £5</a>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
