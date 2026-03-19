import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { animateMovieCard, animateMovieCardHover } from "../../utils/animations";
import "../../styles/MovieCard.scss";

const MovieCard = ({ movie, onError }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    animateMovieCard(cardRef.current);
  }, []);

  const handleMouseEnter = () => {
    animateMovieCardHover(cardRef.current, true);
  };

  const handleMouseLeave = () => {
    animateMovieCardHover(cardRef.current, false);
  };

  if (!movie || !movie.id) {
    return null;
  }

  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title || movie.name || 'Unknown';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="movie-card"
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="movie-card-image">
          <img
            src={image}
            alt={title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/180x270?text=No+Image';
              onError && onError();
            }}
          />
          <div className="movie-rating">
            ⭐ {rating}
          </div>
        </div>

        <div className="movie-card-info">
          <h4 className="movie-title">{title}</h4>
          <p className="movie-year">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
