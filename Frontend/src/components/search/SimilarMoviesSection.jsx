import React from "react";
import MovieCard from "../movie/MovieCard";
import "../../styles/SimilarMoviesSection.scss";

const SimilarMoviesSection = ({ movies, loading, error, title = "Similar Movies" }) => {
  if (loading) {
    return (
      <div className="similar-movies-section">
        <h2>{title}</h2>
        <div className="loading-spinner">Loading similar movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="similar-movies-section">
        <h2>{title}</h2>
        <div className="error-message">Failed to load similar movies</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="similar-movies-section">
        <h2>{title}</h2>
        <div className="no-movies">No similar movies found</div>
      </div>
    );
  }

  return (
    <div className="similar-movies-section">
      <h2>{title}</h2>
      <div className="similar-movies-carousel">
        {movies.slice(0, 12).map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMoviesSection;
