import axios from "./axiosInstance";

export const getCollectionDetails = (id) => {
  return axios.get(`/collections/${id}`);
};