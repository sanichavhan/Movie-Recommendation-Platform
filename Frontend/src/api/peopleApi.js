import axios from "./axiosInstance";

export const getPopularPeople = async () => {
  try {
    const response = await axios.get("/people/popular");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTrendingPeople = async () => {
  try {
    const response = await axios.get("/people/trending");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPersonDetails = async (id) => {
  try {
    const response = await axios.get(`/people/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};