const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const getPopularPeople = async () => {
    const res = await axios.get(`${BASE_URL}/person/popular`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

const getPersonById = async (id) => {
    const res = await axios.get(`${BASE_URL}/person/${id}`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

const getTrendingPeople = async () => {

    const res = await axios.get(`${BASE_URL}/trending/person/day`, {
        params: { api_key: API_KEY }
    });

    return res.data;
};

module.exports = { 
    getPopularPeople, 
    getPersonById,
    getTrendingPeople
};