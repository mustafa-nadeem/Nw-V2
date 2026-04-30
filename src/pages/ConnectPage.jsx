import { useEffect, useRef, useState } from 'react';
import './ConnectPage.css';
import placeholderImg from '../assets/placeholder.jpg';

function ConnectPage() {
  const heroRef = useRef(null);
  const [formSlideOffset, setFormSlideOffset] = useState(0);
  const [showSectionHeading, setShowSectionHeading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [workshopEmail, setWorkshopEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [workshopSubmitStatus, setWorkshopSubmitStatus] = useState(null);

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

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return undefined;
    }

    const updateFormSlideOffset = () => {
      const start = heroEl.offsetTop;
      const end = start + heroEl.offsetHeight;
      const progress = (window.scrollY - start) / Math.max(end - start, 1);
      const clamped = Math.max(0, Math.min(1, progress));
      setFormSlideOffset(Math.round(clamped * 120));
    };

    updateFormSlideOffset();
    window.addEventListener('scroll', updateFormSlideOffset, { passive: true });
    window.addEventListener('resize', updateFormSlideOffset);

    return () => {
      window.removeEventListener('scroll', updateFormSlideOffset);
      window.removeEventListener('resize', updateFormSlideOffset);
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
      // TODO: Replace with your actual form submission endpoint
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

  const handleWorkshopSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual workshop subscription endpoint
      console.log('Workshop subscription:', { email: workshopEmail });
      setWorkshopSubmitStatus('success');
      setWorkshopEmail('');
      setTimeout(() => setWorkshopSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setWorkshopSubmitStatus('error');
      setTimeout(() => setWorkshopSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="connect-page" id="connect">
      <div ref={heroRef} className="connect-hero">
        <h1>Connect with us</h1>
      </div>

      <div className="connect-form-section" style={{ '--connect-form-slide': `${formSlideOffset}px` }}>
        <div className="connect-container">
          <div className={`connect-form-heading${showSectionHeading ? ' is-visible' : ''}`}>
            <h2>Connect with us</h2>
          </div>
          <div className="connect-content">
            {/* Contact Information Section */}
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

            {/* Contact Form Section */}
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

      <div className="workshop-section">
        <div className="workshop-container">
          <div className="workshop-content">
            <div className="workshop-text">
              <h2>Book educational workshops with us</h2>
              <form className="workshop-form" onSubmit={handleWorkshopSubmit}>
                <div className="workshop-form-group">
                  <input
                    type="email"
                    placeholder="What's your work email?"
                    value={workshopEmail}
                    onChange={(e) => setWorkshopEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="workshop-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                <p className="workshop-unsubscribe">Unsubscribe anytime</p>
                {workshopSubmitStatus === 'success' && (
                  <div className="workshop-message workshop-message--success">
                    Thank you for subscribing!
                  </div>
                )}
                {workshopSubmitStatus === 'error' && (
                  <div className="workshop-message workshop-message--error">
                    Error subscribing. Please try again.
                  </div>
                )}
              </form>
            </div>
            <div className="workshop-image">
              <img src={placeholderImg} alt="Educational workshops" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
