import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoWhite from '../assets/logo/white.svg';
import logoBlack from '../assets/logo/black.svg';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const isMobileViewport = window.matchMedia('(max-width: 980px)').matches;

    if (!isMobileViewport) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const navigateToHomeSection = (sectionId) => (event) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState({}, '', `#${sectionId}`);
    }
  };

  return (
    <header
      className={`navbar-wrapper${scrolled ? ' scrolled' : ''}${
        location.pathname.startsWith('/impact') ? ' navbar-wrapper--dark-logo' : ''
      }`}
    >
      <nav className={`navbar${open ? ' open' : ''}`}>
        <Link to="/" className="navbar-logo" aria-label="National Waqf home" onClick={closeMenu}>
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
        </Link>

        <div className="navbar-center">
          <Link to="/about" className="navbar-link" onClick={closeMenu}>About Us</Link>
          <Link to="/impact" className="navbar-link" onClick={closeMenu}>Our Impact</Link>
          <Link to="/learn-more" className="navbar-link" onClick={closeMenu}>Learn More</Link>
          <a href="#connect" className="navbar-link" onClick={navigateToHomeSection('connect')}>Connect With Us</a>
        </div>

        <div className="navbar-actions">
          <a href="#grant" className="navbar-action-link" onClick={closeMenu}>Apply</a>
          <a href="#signin" className="navbar-action-link" onClick={closeMenu}>Sign In</a>
          <a href="#donate" className="navbar-btn navbar-btn--donate" onClick={closeMenu}>Donate £5</a>
        </div>

        <button
          type="button"
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
