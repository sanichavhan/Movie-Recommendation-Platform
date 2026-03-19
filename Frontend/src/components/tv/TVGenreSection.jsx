import React from "react";
import { useTVShowsByGenre } from "../../hooks/tv/useTVShowsByGenre";
import MovieRow from "../movie/MovieRow";
import Loader from "../common/Loader";
import "../../styles/TVGenreSection.scss";

const TVGenreSection = ({ genreId, genreName, icon }) => {
  const { shows, loading, error } = useTVShowsByGenre(genreId);

  if (loading) return <div className="tv-genre-section-loader"><Loader /></div>;
  if (error) return null;
  if (!shows || shows.length === 0) return null;

  return (
    <div className="tv-genre-section">
      <MovieRow title={`${icon} ${genreName}`} movies={shows.slice(0, 8)} />
    </div>
  );
};

export default TVGenreSection;
