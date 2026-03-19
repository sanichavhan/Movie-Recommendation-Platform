import { useEffect, useState } from "react";
import { fetchTrendingTV, fetchPopularTV } from "../../services/tvService";

export const useTVShows = (type = 'trending') => {

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        let data;
        if (type === 'trending') {
          data = await fetchTrendingTV();
        } else if (type === 'popular') {
          data = await fetchPopularTV();
        }
        
        clearTimeout(timeoutId);
        setShows(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("TV Shows error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading TV shows. Please try again.");
        } else {
          setError(err.message || "Failed to fetch TV shows");
        }
        
        setShows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [type]);

  return { shows, loading, error };
};