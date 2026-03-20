import { useState, useEffect } from "react";
import { getSimilarMovies } from "../../services/searchService";

export const useSimilarMovies = (movieId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setMovies([]);
      return;
    }

    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSimilarMovies(movieId);
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching similar movies:", err);
        setError(err.message || "Failed to fetch similar movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  return { movies, loading, error };
};
