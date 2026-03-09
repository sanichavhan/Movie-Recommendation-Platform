const tvService = require("../services/tv.service");

const getTrendingTV = async (req, res) => {
    try {
        const data = await tvService.getTrendingTV();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPopularTV = async (req, res) => {
    try {
        const data = await tvService.getPopularTV();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTVById = async (req, res) => {
    try {
        const data = await tvService.getTVById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getTrendingTV, getPopularTV, getTVById };