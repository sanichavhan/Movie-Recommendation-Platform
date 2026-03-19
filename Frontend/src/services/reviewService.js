import * as reviewApi from "../api/reviewApi";

export const fetchMovieReviews = async (movieId) => {
  const res = await reviewApi.getMovieReviews(movieId);
  return res.data;
};

export const createReview = async (reviewData) => {
  const res = await reviewApi.addReview(reviewData);
  return res.data;
};

export const removeReview = async (id) => {
  const res = await reviewApi.deleteReview(id);
  return res.data;
};