import * as genreApi from "../api/genreApi";

export const fetchMovieGenres = async () => {
  const res = await genreApi.getMovieGenres();
  return res.data;
};

export const fetchTVGenres = async () => {
  const res = await genreApi.getTVGenres();
  return res.data;
};