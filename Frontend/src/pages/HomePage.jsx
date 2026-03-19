import React, { useState } from "react";
import useTrendingMovies from "../hooks/movies/useTrendingMovies";
import { usePopularMovies } from "../hooks/movies/usePopularMovies";

import MovieBanner from "../components/movie/MovieBanner";
import MovieRow from "../components/movie/MovieRow";
import GenreSection from "../components/movie/GenreSection";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/HomePage.scss";

const HomePage = () => {

  const { movies: trending, loading: trendingLoading, error: trendingError } = useTrendingMovies();
  const { movies: popular, loading: popularLoading, error: popularError } = usePopularMovies();
  const [showError, setShowError] = useState(true);

  const genres = [
    { id: 28, name: "Action", icon: "🔥" },
    { id: 12, name: "Adventure", icon: "🗺️" },
    { id: 16, name: "Animation", icon: "🎨" },
    { id: 35, name: "Comedy", icon: "😂" },
    { id: 80, name: "Crime", icon: "🔪" },
    { id: 99, name: "Documentary", icon: "📚" },
    { id: 18, name: "Drama", icon: "🎭" },
    { id: 10751, name: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: 14, name: "Fantasy", icon: "✨" },
    { id: 36, name: "History", icon: "📖" },
    { id: 27, name: "Horror", icon: "👻" },
    { id: 10402, name: "Music", icon: "🎵" },
    { id: 9648, name: "Mystery", icon: "🔍" },
    { id: 10749, name: "Romance", icon: "💕" },
    { id: 878, name: "Science Fiction", icon: "🚀" },
    { id: 10770, name: "TV Movie", icon: "📺" },
    { id: 53, name: "Thriller", icon: "⚡" },
    { id: 10752, name: "War", icon: "⚔️" },
    { id: 37, name: "Western", icon: "🤠" }
  ];

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
        <MovieBanner movie={trending?.[3]} />

        <MovieRow title="🔥 Trending Now" movies={trending || []} />

        <MovieRow title="⭐ Popular Movies" movies={popular || []} />

        <div className="genres-container">
          {genres.map((genre) => (
            <GenreSection
              key={genre.id}
              genreId={genre.id}
              genreName={genre.name}
              icon={genre.icon}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;