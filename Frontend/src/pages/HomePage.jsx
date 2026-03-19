import React, { useState } from "react";
import useTrendingMovies from "../hooks/movies/useTrendingMovies";
import { usePopularMovies } from "../hooks/movies/usePopularMovies";

import MovieBanner from "../components/movie/MovieBanner";
import MovieRow from "../components/movie/MovieRow";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/HomePage.scss";

const HomePage = () => {

  const { movies: trending, loading: trendingLoading, error: trendingError } = useTrendingMovies();
  const { movies: popular, loading: popularLoading, error: popularError } = usePopularMovies();
  const [showError, setShowError] = useState(true);

  if (trendingLoading || popularLoading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <Navbar />
      
      {(trendingError || popularError) && showError && (
        <ErrorMessage
          message={trendingError || popularError}
          onClose={() => setShowError(false)}
        />
      )}

      <div className="home-content">
        <MovieBanner movie={trending?.[0]} />

        <MovieRow title="🔥 Trending Now" movies={trending || []} />

        <MovieRow title="⭐ Popular Movies" movies={popular || []} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;