import * as searchApi from "../api/searchApi";

export const searchMulti = async (query) => {
  return await searchApi.multiSearch(query);
};