import * as movieApi from "../api/movieApi";

export const fetchTrendingMovies = async () => {
  return await movieApi.getTrendingMovies();
};

export const fetchPopularMovies = async () => {
  return await movieApi.getPopularMovies();
};

export const fetchMovieDetails = async (id) => {
  return await movieApi.getMovieDetails(id);
};

export const fetchMovieCast = async (id) => {
  return await movieApi.getMovieCast(id);
};

export const searchMovies = async (query) => {
  return await movieApi.searchMovies(query);
};