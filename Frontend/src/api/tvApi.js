import axios from "./axiosInstance";

export const getTrendingTV = async () => {
  try {
    const response = await axios.get("/tv/trending");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPopularTV = async () => {
  try {
    const response = await axios.get("/tv/popular");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTVDetails = async (id) => {
  try {
    const response = await axios.get(`/tv/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};