import axios from "./axiosInstance";

export const getMovieGenres = () => {
  return axios.get("/genres/movie");
};

export const getTVGenres = () => {
  return axios.get("/genres/tv");
};