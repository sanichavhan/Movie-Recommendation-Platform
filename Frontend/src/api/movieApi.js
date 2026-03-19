import axios from "./axiosInstance";

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/movies/trending");
    return response.data.movies; // ✅ return movies array
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get("/movies/popular");
    return response.data.movies; // ✅ return movies array
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`/movies/search?query=${query}`);
    return response.data.movies;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movies/${id}`);
    return response.data.movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};