import axios from "./axiosInstance";

export const getMovieGenres = async () => {
  try {
    const response = await axios.get("/genres");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTVGenres = async () => {
  try {
    const response = await axios.get("/genres/tv");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};