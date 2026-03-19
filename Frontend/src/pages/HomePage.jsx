import React from "react";
import useTrendingMovies from "../hooks/movies/useTrendingMovies";
import { usePopularMovies } from "../hooks/movies/usePopularMovies";

import MovieBanner from "../components/movie/MovieBanner";
import MovieRow from "../components/movie/MovieRow";
import Loader from "../components/common/Loader";

const HomePage = () => {

  const { movies: trending, loading: trendingLoading } = useTrendingMovies();
  const { movies: popular, loading: popularLoading } = usePopularMovies();

  if (trendingLoading || popularLoading) {
    return <Loader />;
  }

  return (
    <div className="home">

      <MovieBanner movie={trending?.[0]} />

      <MovieRow title="Trending Now" movies={trending || []} />

      <MovieRow title="Popular Movies" movies={popular || []} />

    </div>
  );
};

export default HomePage;