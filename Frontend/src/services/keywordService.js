import * as keywordApi from "../api/keywordApi";

export const fetchMovieKeywords = async (movieId) => {
  return await keywordApi.getMovieKeywords(movieId);
};