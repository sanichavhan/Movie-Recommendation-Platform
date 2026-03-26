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

// Search History Service Functions
export const saveSearchHistory = async (query) => {
  return await searchApi.saveSearchHistory(query);
};

export const getSearchHistory = async () => {
  return await searchApi.getSearchHistory();
};

export const deleteSearchHistory = async (searchId) => {
  return await searchApi.deleteSearchHistory(searchId);
};

export const searchKeywords = async (query) => {
  return await searchApi.searchKeywords(query);
};