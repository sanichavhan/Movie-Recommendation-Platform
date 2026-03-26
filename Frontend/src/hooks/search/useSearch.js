import { useState, useEffect } from "react";
import { searchMulti } from "../../services/searchService";

export const useSearch = (query) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setMovies([]);
      setError(null);
      return;
    }

    // Debounce search - wait 500ms after user stops typing
    const debounceTimer = setTimeout(() => {
      const fetchResults = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Add timeout to prevent hanging
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          
          const data = await searchMulti(query);
          clearTimeout(timeoutId);
          
          setMovies(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Search error:", err);
          
          // Handle timeout/abort errors
          if (err.name === 'AbortError') {
            setError("Search timed out. Please try again.");
          } else {
            setError(err.message || "Failed to search");
          }
          
          setMovies([]);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }, 500); // Wait 500ms after user stops typing

    // Cleanup: Cancel search if user types again
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { movies, loading, error };
};