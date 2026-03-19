import * as reviewApi from "../api/reviewApi";

export const fetchMovieReviews = async (movieId) => {
  return await reviewApi.getMovieReviews(movieId);
};

export const createReview = async (reviewData) => {
  return await reviewApi.addReview(reviewData);
};

export const removeReview = async (id) => {
  return await reviewApi.deleteReview(id);
};