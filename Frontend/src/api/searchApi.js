import axios from "./axiosInstance";

export const multiSearch = async (query) => {
  try {
    const response = await axios.get("/search", { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};