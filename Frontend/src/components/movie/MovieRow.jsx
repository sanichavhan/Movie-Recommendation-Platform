import MovieCard from "./MovieCard";
import "../../styles/MovieRow.scss";

const MovieRow = ({ title, movies = [] }) => {

  if (!movies || !movies.length) return null;

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>

      <div className="movie-row-scroll">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;