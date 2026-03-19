import * as searchApi from "../api/searchApi";

export const searchMulti = async (query) => {
  const res = await searchApi.multiSearch(query);
  return res.data;
};