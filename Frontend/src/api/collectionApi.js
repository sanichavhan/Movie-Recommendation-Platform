import axios from "./axiosInstance";

export const getCollectionDetails = async (id) => {
  try {
    const response = await axios.get(`/collections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};