import axios from "./axiosInstance";

export const getPopularPeople = () => {
  return axios.get("/people/popular");
};

export const getPersonDetails = (id) => {
  return axios.get(`/people/${id}`);
};

export const getPersonMovies = (id) => {
  return axios.get(`/people/${id}/movies`);
};