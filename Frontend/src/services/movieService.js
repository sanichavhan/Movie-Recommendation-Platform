import * as movieApi from "../api/movieApi";

export const fetchTrendingMovies = async () => {
  const res = await movieApi.getTrendingMovies();
  return res.data;
};

export const fetchPopularMovies = async () => {
  const res = await movieApi.getPopularMovies();
  return res.data;
};

export const fetchMovieDetails = async (id) => {
  const res = await movieApi.getMovieDetails(id);
  return res.data;
};

export const searchMovies = async (query) => {
  const res = await movieApi.searchMovies(query);
  return res.data;
};