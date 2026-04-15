import { Link } from 'react-router-dom';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22800%22 viewBox=%220 0 600 800%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%25%22 stop-color=%22%232B346C%22/%3E%3Cstop offset=%2255%25%22 stop-color=%22%2300ACA6%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23FF8E54%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22600%22 height=%22800%22 fill=%22url(%23g)%22/%3E%3C/svg%3E';

function ProfileCard({ profile }) {
  const { name, role, imageSrc, slug } = profile;

  return (
    <article className="profile-grid-section__card" aria-label={`${name}, ${role}`}>
      <Link className="profile-grid-section__image-link" to={`/about/people/${slug}`}>
        <div className="profile-grid-section__image-container">
          <img
            className="profile-grid-section__image"
            src={imageSrc || PLACEHOLDER_IMAGE}
            alt={`${name} profile`}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="profile-grid-section__info-container">
        <h3 className="profile-grid-section__name">{name}</h3>
        <p className="profile-grid-section__role">{role || 'Placeholder role'}</p>
      </div>
    </article>
  );
}

export default ProfileCard;
