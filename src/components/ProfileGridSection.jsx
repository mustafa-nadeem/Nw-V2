import { useCallback, useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import './ProfileGridSection.css';
import trusteePlaceholder from '../assets/Yahya Raaby 5.jpeg';

const DIALOG_PLACEHOLDER_IMAGE = trusteePlaceholder;

function ProfileGridSection({ id, title, subtitle, profiles, variant }) {
  const sectionClass = `profile-grid-section profile-grid-section--${variant}`;
  const [selectedProfile, setSelectedProfile] = useState(null);

  const onSelect = useCallback((profile) => {
    setSelectedProfile(profile);
  }, []);

  const onClose = useCallback(() => {
    setSelectedProfile(null);
  }, []);

  useEffect(() => {
    if (!selectedProfile) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('profile-grid-section-dialog-open');

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('profile-grid-section-dialog-open');
    };
  }, [selectedProfile, onClose]);

  return (
    <section
      id={id}
      className={sectionClass}
      aria-labelledby={`${id}-title`}
    >
      <div className="profile-grid-section__container">
        <div className="profile-grid-section__intro">
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="profile-grid-section__grid" role="list" aria-label={`${title} profiles`}>
          {profiles.map((profile, index) => (
            <ProfileCard
              profile={profile}
              onSelect={onSelect}
              key={`${title}-${profile.name}-${index}`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`profile-grid-section__backdrop ${selectedProfile ? 'profile-grid-section__backdrop--open' : ''}`}
        onClick={onClose}
        aria-label="Close profile"
        tabIndex={selectedProfile ? 0 : -1}
      />

      <div
        className={`profile-grid-section__dialog ${selectedProfile ? 'profile-grid-section__dialog--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!selectedProfile}
      >
        {selectedProfile && (
          <>
            <button
              type="button"
              className="profile-grid-section__dialog-close"
              onClick={onClose}
              aria-label="Close profile"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="profile-grid-section__dialog-media">
              <img
                className="profile-grid-section__dialog-image"
                src={selectedProfile.imageSrc || DIALOG_PLACEHOLDER_IMAGE}
                alt={`${selectedProfile.name} profile`}
              />
            </div>

            <div className="profile-grid-section__dialog-body">
              <div className="profile-grid-section__dialog-heading">
                <h3 className="profile-grid-section__dialog-name">{selectedProfile.name}</h3>
                <a
                  className="profile-grid-section__dialog-linkedin"
                  href={selectedProfile.linkedinUrl || '#'}
                  target={selectedProfile.linkedinUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={`Visit ${selectedProfile.name}'s LinkedIn profile`}
                  title={`View ${selectedProfile.name} on LinkedIn`}
                  onClick={(e) => {
                    if (!selectedProfile.linkedinUrl) e.preventDefault();
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              </div>
              <p className="profile-grid-section__dialog-role">{selectedProfile.role}</p>
              <div className="profile-grid-section__dialog-divider" aria-hidden="true" />
              <p className="profile-grid-section__dialog-bio">{selectedProfile.bio}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileGridSection;
