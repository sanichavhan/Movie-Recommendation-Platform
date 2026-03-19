import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/movieService";

const useTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchTrendingMovies();
        clearTimeout(timeoutId);
        
        setMovies(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error(err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError('Request timed out. Trending movies failed to load.');
        } else {
          setError(err.message || 'Failed to fetch trending movies');
        }
        
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useTrendingMovies;