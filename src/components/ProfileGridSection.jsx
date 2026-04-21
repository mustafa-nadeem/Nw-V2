import { useCallback, useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import './ProfileGridSection.css';

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

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
            <h3 className="profile-grid-section__dialog-name">{selectedProfile.name}</h3>
            <p className="profile-grid-section__dialog-role">{selectedProfile.role}</p>
            <p className="profile-grid-section__dialog-bio">{selectedProfile.bio}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileGridSection;
