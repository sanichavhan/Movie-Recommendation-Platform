import axios from "./axiosInstance";

export const getTrendingTV = () => {
  return axios.get("/tv/trending");
};

export const getPopularTV = () => {
  return axios.get("/tv/popular");
};

export const getTVDetails = (id) => {
  return axios.get(`/tv/${id}`);
};