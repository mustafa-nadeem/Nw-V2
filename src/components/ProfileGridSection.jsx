import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import './ProfileGridSection.css';

function ProfileGridSection({ id, title, subtitle, profiles, variant }) {
  const [activeProfile, setActiveProfile] = useState(null);
  const sectionClass = `profile-grid-section profile-grid-section--${variant}`;

  useEffect(() => {
    if (!activeProfile) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProfile(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProfile]);

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
              onView={setActiveProfile}
              key={`${title}-${profile.name}-${index}`}
            />
          ))}
        </div>
      </div>

      {activeProfile ? (
        <div
          className="profile-grid-section__modal-backdrop"
          role="presentation"
          onClick={() => setActiveProfile(null)}
        >
          <div
            className="profile-grid-section__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-modal-title`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="profile-grid-section__modal-close"
              onClick={() => setActiveProfile(null)}
              aria-label="Close profile popup"
            >
              ×
            </button>

            <h3 id={`${id}-modal-title`} className="profile-grid-section__modal-name">{activeProfile.name}</h3>
            <p className="profile-grid-section__modal-role">{activeProfile.role}</p>
            <p className="profile-grid-section__modal-bio">{activeProfile.bio}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default ProfileGridSection;
