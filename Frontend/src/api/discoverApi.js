import axios from "./axiosInstance";

export const discoverMovies = async (params = {}) => {
  try {
    const response = await axios.get("/discover", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};