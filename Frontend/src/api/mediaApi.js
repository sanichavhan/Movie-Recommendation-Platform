import axios from "./axiosInstance";

export const getMediaVideos = (id) => {
  return axios.get(`/media/${id}/videos`);
};

export const getMediaImages = (id) => {
  return axios.get(`/media/${id}/images`);
};