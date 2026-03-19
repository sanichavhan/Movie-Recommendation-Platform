import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  timeout: 10000 // 10 second timeout to prevent infinite hanging
});

export default axiosInstance;