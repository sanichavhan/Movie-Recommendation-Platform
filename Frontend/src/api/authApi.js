import axios from "./axiosInstance";

export const registerUser = (data) => {
  return axios.post("/auth/register", data);
};

export const loginUser = (data) => {
  return axios.post("/auth/login", data);
};

export const logoutUser = () => {
  return axios.post("/auth/logout");
};

export const getCurrentUser = () => {
  return axios.get("/auth/getme");
};