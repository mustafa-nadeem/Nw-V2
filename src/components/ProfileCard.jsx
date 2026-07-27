import trusteePlaceholder from '../assets/Yahya Raaby 5.jpeg';

const PLACEHOLDER_IMAGE = trusteePlaceholder;

function ProfileCard({ profile, onSelect }) {
  const { name, role, imageSrc, imageFit } = profile;
  const isContain = imageFit === 'contain';

  return (
    <article className="profile-grid-section__card" aria-label={`${name}, ${role}`}>
      <button
        type="button"
        className={`profile-grid-section__image-link${isContain ? ' profile-grid-section__image-link--contain' : ''}`}
        onClick={() => onSelect(profile)}
        aria-label={`View details for ${name}`}
      >
        <div className="profile-grid-section__image-container">
          <img
            className={`profile-grid-section__image${isContain ? ' profile-grid-section__image--contain' : ''}`}
            src={imageSrc || PLACEHOLDER_IMAGE}
            alt={`${name} profile`}
            loading="lazy"
          />
        </div>
      </button>

      <div className="profile-grid-section__info-container">
        <h3 className="profile-grid-section__name">{name}</h3>
        <p className="profile-grid-section__role">{role || 'Placeholder role'}</p>
      </div>
    </article>
  );
}

export default ProfileCard;
