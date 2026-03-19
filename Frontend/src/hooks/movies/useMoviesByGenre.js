import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";

export const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/discover/movies", {
          params: {
            with_genres: genreId,
            sort_by: "popularity.desc",
            page: 1
          }
        });
        setMovies(response.data.movies || []);
        setError(null);
      } catch (err) {
        console.error(`Error fetching movies for genre ${genreId}:`, err);
        setError(err.message || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchMovies();
    }
  }, [genreId]);

  return { movies, loading, error };
};
