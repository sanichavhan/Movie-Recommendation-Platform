import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/reviewService";

export const useReviews = (movieId) => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    fetchMovieReviews(movieId).then(setReviews);

  }, [movieId]);

  return reviews;
};