import React, { useState } from 'react';
import { usePeople } from '../hooks/people/usePeople';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '../styles/PeoplePage.scss';

const PeoplePage = () => {
  const [type, setType] = useState('popular');
  const { people, loading, error } = usePeople(type);

  return (
    <div className="people-page">
      <Navbar />

      {error && <ErrorMessage message={error} />}

      <div className="people-content">
        <h1 className="people-heading">👥 Popular People</h1>

        <div className="people-filters">
          <div className="people-buttons">
            <button
              onClick={() => setType('popular')}
              className={`people-button ${type === 'popular' ? 'active' : ''}`}
            >
              ⭐ Popular
            </button>
            <button
              onClick={() => setType('trending')}
              className={`people-button ${type === 'trending' ? 'active' : ''}`}
            >
              🔥 Trending
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="people-results">
            {people.map((person) => (
              <Link key={person.id} to={`/actor/${person.id}`} className="people-link">
                <div className="people-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt={person.name}
                    className="person-image"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'}
                  />
                  <div className="person-info">
                    <h4 className="person-name">
                      {person.name}
                    </h4>
                    <p className="person-role">
                      {person.known_for_department || 'Actor'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PeoplePage;
