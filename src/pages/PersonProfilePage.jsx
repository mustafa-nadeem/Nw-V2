import { Link, Navigate, useParams } from 'react-router-dom';
import { allPeople } from '../data/peopleData';
import './PersonProfilePage.css';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22800%22 viewBox=%220 0 600 800%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%25%22 stop-color=%22%232B346C%22/%3E%3Cstop offset=%2255%25%22 stop-color=%22%2300ACA6%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23FF8E54%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22600%22 height=%22800%22 fill=%22url(%23g)%22/%3E%3C/svg%3E';

function PersonProfilePage() {
  const { slug } = useParams();
  const person = allPeople.find((entry) => entry.slug === slug);

  if (!person) {
    return <Navigate to="/about" replace />;
  }

  const isTrustee = person.group === 'trustees';
  const backHash = isTrustee ? '#about-trustees' : '#about-shariah-board';
  const backLabel = isTrustee ? 'Back to Meet our trustees' : 'Back to Meet our Shariah board';

  return (
    <div className="person-profile-page">
      <section className="person-profile-hero" aria-labelledby="person-profile-title">
        <div className="person-profile-shell">
          <Link className="person-profile-back" to={`/about${backHash}`}>
            <span className="person-profile-back-arrow" aria-hidden="true">&larr;</span>
            {backLabel}
          </Link>

          <div className="person-profile-grid">
            <article className="person-profile-card">
              <img
                className="person-profile-image"
                src={person.imageSrc || PLACEHOLDER_IMAGE}
                alt={person.name}
              />
            </article>

            <article className="person-profile-content">
              <p className="person-profile-kicker">National Waqf Leadership</p>
              <h1 id="person-profile-title">{person.name}</h1>
              <p className="person-profile-role">{person.role}</p>
              <p className="person-profile-group">
                {person.group === 'trustees' ? 'Trustees Board' : 'Shariah Board'}
              </p>
              <div className="person-profile-divider" aria-hidden="true" />
              <p className="person-profile-bio">{person.bio}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonProfilePage;
