import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/movieService";

const useTrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return { movies };
};

export default useTrendingMovies;