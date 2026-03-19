import * as mediaApi from "../api/mediaApi";

export const fetchMediaVideos = async (id) => {
  const res = await mediaApi.getMediaVideos(id);
  return res.data;
};

export const fetchMediaImages = async (id) => {
  const res = await mediaApi.getMediaImages(id);
  return res.data;
};