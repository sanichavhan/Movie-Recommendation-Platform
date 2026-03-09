const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const discoverMovies = async (filters) => {

    const res = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
            api_key: API_KEY,
            with_genres: filters.genre,
            primary_release_year: filters.year,
            vote_average_gte: filters.rating
        }
    });

    return res.data;
};

module.exports = { discoverMovies };