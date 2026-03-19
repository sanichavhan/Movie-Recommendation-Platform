import React from "react";
import { useMoviesByGenre } from "../../hooks/movies/useMoviesByGenre";
import MovieRow from "./MovieRow";
import Loader from "../common/Loader";
import "../../styles/GenreSection.scss";

const GenreSection = ({ genreId, genreName, icon }) => {
  const { movies, loading, error } = useMoviesByGenre(genreId);

  if (loading) return <div className="genre-section-loader"><Loader /></div>;
  if (error) return null;
  if (!movies || movies.length === 0) return null;

  return (
    <div className="genre-section">
      <MovieRow title={`${icon} ${genreName}`} movies={movies.slice(0, 8)} />
    </div>
  );
};

export default GenreSection;
