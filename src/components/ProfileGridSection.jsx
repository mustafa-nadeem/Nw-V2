import ProfileCard from './ProfileCard';
import './ProfileGridSection.css';

function ProfileGridSection({ id, title, subtitle, profiles, variant }) {
  const sectionClass = `profile-grid-section profile-grid-section--${variant}`;

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
            <ProfileCard profile={profile} index={index} key={`${title}-${profile.name}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileGridSection;
