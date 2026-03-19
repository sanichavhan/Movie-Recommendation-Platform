import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../services/movieService";

export const useMovieDetails = (id) => {

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    fetchMovieDetails(id).then(setMovie);

  }, [id]);

  return movie;
};  