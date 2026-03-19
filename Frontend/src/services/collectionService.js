import * as collectionApi from "../api/collectionApi";

export const fetchCollectionDetails = async (id) => {
  const res = await collectionApi.getCollectionDetails(id);
  return res.data;
};