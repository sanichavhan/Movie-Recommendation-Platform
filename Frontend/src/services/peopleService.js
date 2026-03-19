import * as peopleApi from "../api/peopleApi";

export const fetchPopularPeople = async () => {
  return await peopleApi.getPopularPeople();
};

export const fetchPersonDetails = async (id) => {
  return await peopleApi.getPersonDetails(id);
};

export const fetchPersonMovies = async (id) => {
  return await peopleApi.getPersonMovies(id);
};