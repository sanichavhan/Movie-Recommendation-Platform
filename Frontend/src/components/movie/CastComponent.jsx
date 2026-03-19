import React from 'react';
import '../../styles/CastComponent.scss';

const CastComponent = ({ cast = [] }) => {
  if (!cast || cast.length === 0) {
    return (
      <div className="cast-section">
        <h3 className="cast-title">Cast</h3>
        <p className="no-cast">No cast information available</p>
      </div>
    );
  }

  return (
    <div className="cast-section">
      <h3 className="cast-title">Cast</h3>
      <div className="cast-carousel">
        {cast.slice(0, 12).map((actor) => (
          <div key={actor.id} className="cast-card">
            <div className="cast-image-wrapper">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/185x278?text=No+Image';
                  }}
                />
              ) : (
                <div className="cast-placeholder">
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div className="cast-info">
              <h4 className="cast-name">{actor.name}</h4>
              <p className="cast-character">
                {actor.character ? `as ${actor.character}` : 'Cast Member'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastComponent;
