import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/movieService";

export const usePopularMovies = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

  }, []);

  return { movies, loading };
};