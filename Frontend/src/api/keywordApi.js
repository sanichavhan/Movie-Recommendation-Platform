import axios from "./axiosInstance";

export const getMovieKeywords = (movieId) => {
  return axios.get(`/keywords/${movieId}`);
};