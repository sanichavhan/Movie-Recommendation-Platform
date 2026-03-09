const mediaService = require("../services/media.service");

const getMovieImages = async (req, res) => {
    try {
        const data = await mediaService.getMovieImages(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMovieVideos = async (req, res) => {
    try {
        const data = await mediaService.getMovieVideos(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getMovieImages, 
    getMovieVideos
};