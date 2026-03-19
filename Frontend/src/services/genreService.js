import * as genreApi from "../api/genreApi";

export const fetchMovieGenres = async () => {
  return await genreApi.getMovieGenres();
};

export const fetchTVGenres = async () => {
  return await genreApi.getTVGenres();
};