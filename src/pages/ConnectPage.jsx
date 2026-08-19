import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConnectPage.css';
import { useViewportRebuildKey } from '../hooks/useViewportRebuildKey';

gsap.registerPlugin(ScrollTrigger);

function ConnectPage() {
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showSectionHeading, setShowSectionHeading] = useState(false);
  const viewportRebuildKey = useViewportRebuildKey();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    const el = formSectionRef.current;
    if (!el) return undefined;

    const trigger = ScrollTrigger.create({
      id: 'connect-scroll-lock-form',
      trigger: el,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.16)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
      scrub: false,
      invalidateOnRefresh: true,
    });

    return () => trigger.kill();
  }, [prefersReducedMotion, viewportRebuildKey]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return undefined;
    }

    const updateHeadingVisibility = () => {
      const triggerPoint = heroEl.offsetTop + (heroEl.offsetHeight * 0.5);
      setShowSectionHeading(window.scrollY >= triggerPoint);
    };

    updateHeadingVisibility();
    window.addEventListener('scroll', updateHeadingVisibility, { passive: true });
    window.addEventListener('resize', updateHeadingVisibility);

    return () => {
      window.removeEventListener('scroll', updateHeadingVisibility);
      window.removeEventListener('resize', updateHeadingVisibility);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="connect-page" id="connect">
      <div className="connect-hero-wrapper">
        <div ref={heroRef} className="connect-hero">
          <h1>Connect with us</h1>
        </div>
      </div>

      <div
        ref={formSectionRef}
        className="connect-form-section"
      >
        <div className="connect-container">
          <div className={`connect-form-heading${showSectionHeading ? ' is-visible' : ''}`}>
            <h2>Connect with us</h2>
          </div>
          <div className="connect-content">
            <div className="connect-info">
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Email</h3>
                  <a href="mailto:enquiries@nationalwaqf.org">enquiries@nationalwaqf.org</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Phone</h3>
                  <a href="tel:02034223333">0203 422 3333</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Address</h3>
                  <p>63 Woodgrange Road, E7 0EL</p>
                </div>
              </div>
            </div>

            <form className="connect-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message..."
                rows="6"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-message form-message--success">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="form-message form-message--error">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
