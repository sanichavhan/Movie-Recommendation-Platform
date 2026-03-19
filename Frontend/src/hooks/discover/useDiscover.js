import { useEffect, useState, useMemo } from "react";
import { discoverMovies } from "../../services/discoverService";

export const useDiscover = (filters) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the filter string to detect actual changes
  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add a timeout to the request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await discoverMovies(filters);
        clearTimeout(timeoutId);
        
        setMovies(data || []);
      } catch (err) {
        console.error("Discover error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "Failed to fetch movies");
        }
        
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filterKey]); // Use filterKey instead of filters object

  return { movies, loading, error };
};