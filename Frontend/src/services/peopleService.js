import * as peopleApi from "../api/peopleApi";

export const fetchPopularPeople = async () => {
  const res = await peopleApi.getPopularPeople();
  return res.data;
};

export const fetchPersonDetails = async (id) => {
  const res = await peopleApi.getPersonDetails(id);
  return res.data;
};

export const fetchPersonMovies = async (id) => {
  const res = await peopleApi.getPersonMovies(id);
  return res.data;
};