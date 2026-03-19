import * as collectionApi from "../api/collectionApi";

export const fetchCollectionDetails = async (id) => {
  return await collectionApi.getCollectionDetails(id);
};