import axios from "./axiosInstance";

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/review/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addReview = async (data) => {
  try {
    const response = await axios.post("/review", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`/review/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};