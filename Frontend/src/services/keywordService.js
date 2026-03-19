import * as keywordApi from "../api/keywordApi";

export const fetchMovieKeywords = async (movieId) => {
  const res = await keywordApi.getMovieKeywords(movieId);
  return res.data;
};