import React from 'react';
import { useDiscover } from '../hooks/discover/useDiscover';
import { useGenres } from '../hooks/genres/useGenres';
import MovieCard from '../components/movie/MovieCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '../styles/DiscoverPage.scss';

const DiscoverPage = () => {
  const [selectedGenre, setSelectedGenre] = React.useState('');
  const { genres, loading: genresLoading, error: genresError } = useGenres();
  
  // Use useMemo to prevent filters object from changing on every render
  const filters = React.useMemo(
    () => (selectedGenre ? { genre_ids: selectedGenre } : {}),
    [selectedGenre]
  );
  
  const { movies, loading: moviesLoading, error: moviesError } = useDiscover(filters);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="discover-page">
      <Navbar />

      {(moviesError || genresError) && <ErrorMessage message={moviesError || genresError} />}

      <div className="discover-content">
        <h1 className="discover-heading">🎬 Discover Movies</h1>

        <div className="discover-filters">
          <h3 className="filters-title">Filter by Genre: {genresLoading && '(Loading...)'}</h3>
          <div className="genre-buttons">
            <button
              onClick={() => handleGenreChange('')}
              className={`genre-button ${selectedGenre === '' ? 'active' : ''}`}
            >
              All Genres
            </button>
            {genres && genres.length > 0 ? (
              genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreChange(genre.id)}
                  className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
                >
                  {genre.name}
                </button>
              ))
            ) : (
              genresLoading && <span className="loading-text">Loading genres...</span>
            )}
          </div>
        </div>

        {moviesLoading ? (
          <Loader />
        ) : movies && movies.length > 0 ? (
          <div className="discover-results">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="search-empty">
            <h2>No movies found. Try selecting a different genre.</h2>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DiscoverPage;
