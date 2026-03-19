import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/movieService";

export const usePopularMovies = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const loadMovies = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchPopularMovies();
        clearTimeout(timeoutId);
        
        setMovies(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error(error);
        
        // Handle timeout/abort errors
        if (error.name === 'AbortError') {
          setError('Request timed out. Popular movies failed to load.');
        } else {
          setError(error.message || 'Failed to fetch popular movies');
        }
        
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

  }, []);

  return { movies, loading, error };
};