const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const getMovieImages = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/images`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

const getMovieVideos = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

module.exports = { 
    getMovieImages, 
    getMovieVideos
};