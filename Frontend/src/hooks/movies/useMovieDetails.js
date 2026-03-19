import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../services/movieService";

export const useMovieDetails = (id) => {

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch movie details');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();

  }, [id]);

  return { movie, loading, error };
};