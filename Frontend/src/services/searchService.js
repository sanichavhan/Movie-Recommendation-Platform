import * as searchApi from "../api/searchApi";

export const searchMulti = async (query) => {
  return await searchApi.multiSearch(query);
};

export const getSimilarMovies = async (movieId) => {
  return await searchApi.getSimilarMovies(movieId);
};

export const getRecommendedMovies = async (movieId) => {
  return await searchApi.getRecommendedMovies(movieId);
};

export const searchKeywords = async (query) => {
  return await searchApi.searchKeywords(query);
};