import { useEffect, useState } from "react";
import { discoverMovies } from "../../services/discoverService";

export const useDiscover = (filters) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    discoverMovies(filters).then(setMovies);

  }, [filters]);

  return movies;
};