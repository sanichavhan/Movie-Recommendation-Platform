const genreService = require("../services/genre.service");

const getMovieGenres = async (req, res) => {
    try {
        const data = await genreService.getMovieGenres();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMovieGenres };