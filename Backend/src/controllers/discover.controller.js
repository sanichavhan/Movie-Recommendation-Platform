const discoverService = require("../services/discover.service");

const discoverMovies = async (req, res) => {

    try {

        const data = await discoverService.discoverMovies(req.query);

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { discoverMovies };