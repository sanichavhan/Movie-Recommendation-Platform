import axios from "./axiosInstance";

export const discoverMovies = (params) => {
  return axios.get("/discover", { params });
};