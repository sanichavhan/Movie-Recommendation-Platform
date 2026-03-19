const movieService = require("../services/movie.service")

async function getTrending(req,res){
    try{

        const movies = await movieService.getTrendingMovies()

        res.status(200).json({
            message:"Trending movies fetched",
            movies
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

async function getPopular(req,res){
    try{

        const movies = await movieService.getPopularMovies()

        res.status(200).json({
            message:"Popular movies fetched",
            movies
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

async function searchMovie(req,res){
    try{

        const {query} = req.query

        const movies = await movieService.searchMovies(query)

        res.status(200).json({
            message:"Search results",
            movies
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

async function getMovieById(req,res){
    try{

        const {id} = req.params

        const movie = await movieService.getMovieDetails(id)

        res.status(200).json({
            message:"Movie fetched",
            movie
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


const getTopRatedMovies = async (req, res) => {
    try {
        const data = await movieService.getTopRatedMovies();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUpcomingMovies = async (req, res) => {
    try {
        const data = await movieService.getUpcomingMovies();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNowPlayingMovies = async (req, res) => {
    try {
        const data = await movieService.getNowPlayingMovies();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMovieCast = async (req, res) => {
    try {
        const data = await movieService.getMovieCast(req.params.id);
        // TMDB returns { cast: [...], crew: [...] }
        // We only want the cast array
        res.json({ cast: data.cast || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSimilarMovies = async (req, res) => {
    try {
        const data = await movieService.getSimilarMovies(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecommendedMovies = async (req, res) => {
    try {
        const data = await movieService.getRecommendedMovies(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getTrending,
    getPopular,
    searchMovie,
    getMovieById,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getMovieCast,
    getSimilarMovies,
    getRecommendedMovies
}