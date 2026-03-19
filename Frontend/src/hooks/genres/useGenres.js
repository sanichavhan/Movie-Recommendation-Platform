import { useEffect, useState } from "react";
import { fetchMovieGenres } from "../../services/genreService";

export const useGenres = () => {

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout for the request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchMovieGenres();
        clearTimeout(timeoutId);
        
        setGenres(data || []);
      } catch (err) {
        console.error("Genres error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading genres. Please refresh.");
        } else {
          setError(err.message || "Failed to fetch genres");
        }
        
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};