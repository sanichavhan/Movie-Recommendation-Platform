import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/reviewService";

export const useReviews = (movieId) => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!movieId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const loadReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchMovieReviews(movieId);
        clearTimeout(timeoutId);
        
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Reviews error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading reviews.");
        } else {
          setError(err.message || "Failed to fetch reviews");
        }
        
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();

  }, [movieId]);

  return { reviews, loading, error };
};