const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const multiSearch = async (query) => {
    const res = await axios.get(`${BASE_URL}/search/multi`, {
        params: {
            api_key: API_KEY,
            query: query
        }
    });
    return res.data.results;
};

module.exports = { multiSearch };