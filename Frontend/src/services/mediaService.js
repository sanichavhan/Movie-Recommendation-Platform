import * as mediaApi from "../api/mediaApi";

export const fetchMediaVideos = async (id) => {
  return await mediaApi.getMediaVideos(id);
};

export const fetchMediaImages = async (id) => {
  return await mediaApi.getMediaImages(id);
};