import * as tvApi from "../api/tvApi";

export const fetchTrendingTV = async () => {
  const res = await tvApi.getTrendingTV();
  return res.data;
};

export const fetchPopularTV = async () => {
  const res = await tvApi.getPopularTV();
  return res.data;
};

export const fetchTVDetails = async (id) => {
  const res = await tvApi.getTVDetails(id);
  return res.data;
};