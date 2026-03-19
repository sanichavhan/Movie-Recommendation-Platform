const axios = require("axios")

const BASE_URL = process.env.TMDB_BASE_URL
const API_KEY = process.env.TMDB_API_KEY

async function getTrendingMovies(){
    const res = await axios.get(`${BASE_URL}/trending/movie/day`,{
        params:{ api_key: API_KEY }
    })
    return res.data.results
}

async function getPopularMovies(){
    const res = await axios.get(`${BASE_URL}/movie/popular`,{
        params:{ api_key: API_KEY }
    })
    return res.data.results
}

async function searchMovies(query){
    const res = await axios.get(`${BASE_URL}/search/movie`,{
        params:{
            api_key: API_KEY,
            query: query
        }
    })
    return res.data.results
}

async function getMovieDetails(id){
    const res = await axios.get(`${BASE_URL}/movie/${id}`,{
        params:{ api_key: API_KEY }
    })
    return res.data
}

const getTopRatedMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getUpcomingMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getNowPlayingMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getMovieCast = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: { api_key: API_KEY }
    });
    return res.data;
};

const getSimilarMovies = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

const getRecommendedMovies = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

module.exports = {
    getTrendingMovies,
    getPopularMovies,
    searchMovies,
    getMovieDetails,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getMovieCast,
    getSimilarMovies,
    getRecommendedMovies
}