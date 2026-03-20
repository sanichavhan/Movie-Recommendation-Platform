import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../movie/MovieCard";
import "../../styles/RecommendationModal.scss";

const RecommendationModal = ({ movie, similarMovies, loading, onClose }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    onClose();
  };

  return (
    <div className="recommendation-modal-overlay" onClick={onClose}>
      <div className="recommendation-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Movie Header */}
        <div className="modal-header">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="movie-poster"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />
          <div className="movie-info">
            <h2>{movie.title || movie.name}</h2>
            <div className="movie-meta">
              <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className="year">
                {new Date(movie.release_date || movie.first_air_date).getFullYear()}
              </span>
            </div>
            <p className="overview">{movie.overview || "No description available"}</p>
            <button 
              className="view-details-btn"
              onClick={() => handleMovieClick(movie.id)}
            >
              View Full Details
            </button>
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className="similar-movies-section">
          <h3>Similar Movies You Might Like</h3>
          {loading ? (
            <div className="loading">Loading recommendations...</div>
          ) : similarMovies && similarMovies.length > 0 ? (
            <div className="similar-movies-grid">
              {similarMovies.slice(0, 6).map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  className="similar-movie-item"
                  onClick={() => handleMovieClick(similarMovie.id)}
                >
                  <MovieCard movie={similarMovie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-recommendations">
              <p>No similar movies found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;
