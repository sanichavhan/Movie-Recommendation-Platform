import axios from "./axiosInstance";

export const registerUser = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.get("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/auth/getme");
  return response.data;
};