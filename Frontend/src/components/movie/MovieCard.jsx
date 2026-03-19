import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {

  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`}>

      <div style={{width:"200px"}}>

        <img
          src={image}
          alt={movie.title}
          style={{width:"100%"}}
        />

        <h4>{movie.title}</h4>

        <p>⭐ {movie.vote_average}</p>

      </div>

    </Link>
  );
};

export default MovieCard;