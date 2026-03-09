const {Router} = require('express')
const movieController = require('../controllers/movie.controller')
const router = Router();

router.get('/trending',movieController.getTrending)
router.get('/popular',movieController.getPopular)
router.get('/search',movieController.searchMovie)
router.get('/:id',movieController.getMovieById)
router.get("/top-rated", movieController.getTopRatedMovies);
router.get("/upcoming", movieController.getUpcomingMovies);
router.get("/now-playing", movieController.getNowPlayingMovies);
router.get("/:id/cast", movieController.getMovieCast);
router.get("/:id/similar", movieController.getSimilarMovies);
router.get("/:id/recommendations", movieController.getRecommendedMovies);

module.exports = router