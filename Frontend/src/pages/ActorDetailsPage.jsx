import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useActorDetails } from "../hooks/people/useActorDetails";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import "../styles/ActorDetailsPage.scss";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { person, loading, error } = useActorDetails(id);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="error-page">
        <Navbar />
        <ErrorMessage message={error} />
        <button onClick={() => navigate(-1)} className="back-button">
          ← Go Back
        </button>
        <Footer />
      </div>
    );
  }

  if (!person || !person.id) return <Loader />;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate age
  const getAge = (birthDate, deathDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    const age = Math.floor((end - birth) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
  };

  return (
    <div className="actor-details-page">
      <Navbar />

      <div className="actor-details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="actor-details-grid">
          {/* Profile Image */}
          <div className="actor-profile-section">
            <div className="actor-profile-image">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                  }}
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>

            {/* Quick Info */}
            <div className="quick-info">
              <div className="info-item">
                <p className="info-label">Popularity</p>
                <h4 className="info-value">⭐ {person.popularity?.toFixed(1) || "N/A"}</h4>
              </div>

              {person.known_for_department && (
                <div className="info-item">
                  <p className="info-label">Known For</p>
                  <h4 className="info-value">🎬 {person.known_for_department}</h4>
                </div>
              )}

              {person.gender && (
                <div className="info-item">
                  <p className="info-label">Gender</p>
                  <h4 className="info-value">
                    {person.gender === 1 ? "Female ♀️" : person.gender === 2 ? "Male ♂️" : "Other"}
                  </h4>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Information */}
          <div className="actor-details-section">
            <h1 className="actor-name">{person.name}</h1>

            {/* Basic Details */}
            <div className="details-grid">
              {person.birthday && (
                <div className="detail-item">
                  <p className="detail-label">Birth Date</p>
                  <h4 className="detail-value">📅 {formatDate(person.birthday)}</h4>
                </div>
              )}

              {person.place_of_birth && (
                <div className="detail-item">
                  <p className="detail-label">Place of Birth</p>
                  <h4 className="detail-value">📍 {person.place_of_birth}</h4>
                </div>
              )}

              {person.birthday && (
                <div className="detail-item">
                  <p className="detail-label">Age</p>
                  <h4 className="detail-value">
                    {getAge(person.birthday, person.deathday)} years old
                  </h4>
                </div>
              )}

              {person.deathday && (
                <div className="detail-item">
                  <p className="detail-label">Death Date</p>
                  <h4 className="detail-value">⚰️ {formatDate(person.deathday)}</h4>
                </div>
              )}

              {person.imdb_id && (
                <div className="detail-item">
                  <p className="detail-label">IMDb ID</p>
                  <h4 className="detail-value">
                    <a
                      href={`https://www.imdb.com/name/${person.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="imdb-link"
                    >
                      View on IMDb →
                    </a>
                  </h4>
                </div>
              )}

              {person.homepage && (
                <div className="detail-item">
                  <p className="detail-label">Website</p>
                  <h4 className="detail-value">
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      Visit Website →
                    </a>
                  </h4>
                </div>
              )}
            </div>

            {/* Biography */}
            {person.biography && (
              <div className="biography-section">
                <h2 className="section-title">Biography</h2>
                <p className="biography-text">{person.biography}</p>
              </div>
            )}

            {/* Additional Stats */}
            {(person.also_known_as && person.also_known_as.length > 0) && (
              <div className="also-known-section">
                <h2 className="section-title">Also Known As</h2>
                <div className="also-known-list">
                  {person.also_known_as.map((name, idx) => (
                    <span key={idx} className="alias-tag">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActorDetailsPage;
