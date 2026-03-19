const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const discoverMovies = async (filters) => {

    try {
        const params = {
            api_key: API_KEY,
        };

        // Add optional parameters if provided
        if (filters.genre_ids) {
            params.with_genres = filters.genre_ids;
        }
        if (filters.year) {
            params.primary_release_year = filters.year;
        }
        if (filters.rating) {
            params['vote_average.gte'] = filters.rating;
        }

        // Log the request for debugging
        console.log("Discover request params:", params);

        const res = await axios.get(`${BASE_URL}/discover/movie`, { params });

        return res.data.results || [];
    } catch (error) {
        console.error("Discover service error:", error.message);
        if (error.response) {
            console.error("TMDB API error:", error.response.data);
        }
        throw error;
    }
};

module.exports = { discoverMovies };