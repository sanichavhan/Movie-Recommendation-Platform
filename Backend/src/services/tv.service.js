const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const getTrendingTV = async () => {
    const res = await axios.get(`${BASE_URL}/trending/tv/day`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getPopularTV = async () => {
    const res = await axios.get(`${BASE_URL}/tv/popular`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getTVById = async (id) => {
    const res = await axios.get(`${BASE_URL}/tv/${id}`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

module.exports = { getTrendingTV, getPopularTV, getTVById };