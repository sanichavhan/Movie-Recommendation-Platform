import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";

export const useTVShowsByGenre = (genreId) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/discover/tv", {
          params: {
            with_genres: genreId,
            sort_by: "popularity.desc",
            page: 1
          }
        });
        setShows(response.data.shows || []);
        setError(null);
      } catch (err) {
        console.error(`Error fetching TV shows for genre ${genreId}:`, err);
        setError(err.message || "Failed to fetch TV shows");
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchShows();
    }
  }, [genreId]);

  return { shows, loading, error };
};
