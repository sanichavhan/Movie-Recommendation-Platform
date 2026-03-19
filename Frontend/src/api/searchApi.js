import axios from "./axiosInstance";

export const multiSearch = (query) => {
  return axios.get(`/search?query=${query}`);
};