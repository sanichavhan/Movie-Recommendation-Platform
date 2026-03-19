import React, { useState } from 'react';
import { useTVShows } from '../hooks/tv/useTVShows';
import MovieCard from '../components/movie/MovieCard';
import TVGenreSection from '../components/tv/TVGenreSection';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '../styles/TVShowsPage.scss';

const TVShowsPage = () => {
  const [type, setType] = useState('trending');
  const { shows, loading, error } = useTVShows(type);

  const tvGenres = [
    { id: 28, name: "Action & Adventure", icon: "🔥" },
    { id: 35, name: "Comedy", icon: "😂" },
    { id: 80, name: "Crime", icon: "🔪" },
    { id: 99, name: "Documentary", icon: "📚" },
    { id: 18, name: "Drama", icon: "🎭" },
    { id: 10751, name: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: 10762, name: "Kids", icon: "🧒" },
    { id: 9648, name: "Mystery", icon: "🔍" },
    { id: 10766, name: "Soap", icon: "🧼" },
    { id: 10767, name: "Talk", icon: "💬" },
    { id: 10768, name: "War & Politics", icon: "⚔️" },
    { id: 37, name: "Western", icon: "🤠" },
    { id: 10749, name: "Romance", icon: "💕" },
    { id: 878, name: "Science Fiction", icon: "🚀" },
    { id: 53, name: "Thriller", icon: "⚡" },
    { id: 10759, name: "Action & Adventure", icon: "🎬" }
  ];

  return (
    <div className="tvshows-page">
      <Navbar />

      {error && <ErrorMessage message={error} />}

      <div className="tvshows-content">
        <h1 className="tvshows-heading">📺 TV Shows</h1>

        <div className="tvshows-filters">
          <div className="filter-buttons">
            <button
              onClick={() => setType('trending')}
              className={`filter-button ${type === 'trending' ? 'active' : ''}`}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => setType('popular')}
              className={`filter-button ${type === 'popular' ? 'active' : ''}`}
            >
              ⭐ Popular
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="tvshows-results">
            {shows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        )}

        <div className="tv-genres-container">
          {tvGenres.map((genre) => (
            <TVGenreSection
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

export default TVShowsPage;
