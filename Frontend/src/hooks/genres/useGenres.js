import { useEffect, useState } from "react";
import { fetchMovieGenres } from "../../services/genreService";

export const useGenres = () => {

  const [genres, setGenres] = useState([]);

  useEffect(() => {

    fetchMovieGenres().then(setGenres);

  }, []);

  return genres;
};