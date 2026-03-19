import * as tvApi from "../api/tvApi";

export const fetchTrendingTV = async () => {
  return await tvApi.getTrendingTV();
};

export const fetchPopularTV = async () => {
  return await tvApi.getPopularTV();
};

export const fetchTVDetails = async (id) => {
  return await tvApi.getTVDetails(id);
};