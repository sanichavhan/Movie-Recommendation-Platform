import axios from "./axiosInstance";

export const getMediaVideos = async (id) => {
  try {
    const response = await axios.get(`/media/${id}/videos`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMediaImages = async (id) => {
  try {
    const response = await axios.get(`/media/${id}/images`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};