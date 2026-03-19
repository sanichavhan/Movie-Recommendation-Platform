import axios from "./axiosInstance";

export const getMovieKeywords = async (movieId) => {
  try {
    const response = await axios.get(`/keywords/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};