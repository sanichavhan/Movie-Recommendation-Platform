import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

console.log("API Base URL:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000 // 15 second timeout to prevent infinite hanging
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API] Requesting: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
let retryCount = 0;
const MAX_RETRIES = 2;

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API] Success: ${response.status} ${response.config.url}`);
    retryCount = 0;
    return response;
  },
  async (error) => {
    const config = error.config;
    
    // Log error details
    if (error.response) {
      console.error(`[API] Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error("[API] No Response:", error.request);
    } else {
      console.error("[API] Error:", error.message);
    }

    // Don't retry if already retried
    if (!config || retryCount >= MAX_RETRIES) {
      retryCount = 0;
      return Promise.reject(error);
    }

    // Retry on network errors or 5xx errors
    if (!error.response || error.response.status >= 500) {
      retryCount++;
      console.log(`[API] Retrying... (Attempt ${retryCount}/${MAX_RETRIES})`);
      
      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return axiosInstance(config);
    }

    retryCount = 0;
    return Promise.reject(error);
  }
);

export default axiosInstance;