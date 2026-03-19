import axios from "./axiosInstance";

export const getMovieReviews = (movieId) => {
  return axios.get(`/review/${movieId}`);
};

export const addReview = (data) => {
  return axios.post("/review", data);
};

export const deleteReview = (id) => {
  return axios.delete(`/review/${id}`);
};  