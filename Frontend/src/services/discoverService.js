import * as discoverApi from "../api/discoverApi";

export const discoverMovies = async (filters) => {
  const res = await discoverApi.discoverMovies(filters);
  return res.data;
};