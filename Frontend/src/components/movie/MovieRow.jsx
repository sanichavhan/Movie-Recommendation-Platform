import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies = [] }) => {

  if (!movies.length) return null;

  return (
    <div style={{ margin: "20px" }}>

      <h2>{title}</h2>

      <div style={{ display: "flex", overflowX: "auto", gap: "10px" }}>

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

      </div>

    </div>
  );
};

export default MovieRow;