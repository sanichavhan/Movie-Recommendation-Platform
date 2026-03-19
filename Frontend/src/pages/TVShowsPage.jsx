import React, { useState } from 'react';
import { useTVShows } from '../hooks/tv/useTVShows';
import MovieCard from '../components/movie/MovieCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '../styles/TVShowsPage.scss';

const TVShowsPage = () => {
  const [type, setType] = useState('trending');
  const { shows, loading, error } = useTVShows(type);

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
      </div>

      <Footer />
    </div>
  );
};

export default TVShowsPage;
