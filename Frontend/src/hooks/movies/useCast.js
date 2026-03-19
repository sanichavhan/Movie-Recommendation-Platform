import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../services/movieService";

export const useCast = (movieId) => {

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setCast([]);
      setLoading(false);
      return;
    }

    const loadCast = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchMovieCast(movieId);
        clearTimeout(timeoutId);
        
        setCast(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cast error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading cast.");
        } else {
          setError(err.message || "Failed to fetch cast");
        }
        
        setCast([]);
      } finally {
        setLoading(false);
      }
    };

    loadCast();

  }, [movieId]);

  return { cast, loading, error };
};
