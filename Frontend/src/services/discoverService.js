import * as discoverApi from "../api/discoverApi";

export const discoverMovies = async (filters) => {
  return await discoverApi.discoverMovies(filters);
};