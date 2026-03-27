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

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await axios.get(`/movies/${movieId}/similar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRecommendedMovies = async (movieId) => {
  try {
    const response = await axios.get(`/movies/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchKeywords = async (query) => {
  try {
    const response = await axios.get("/keywords", { params: { query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};