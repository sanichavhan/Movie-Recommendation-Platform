const discoverService = require("../services/discover.service");

const discoverMovies = async (req, res) => {

    try {

        const data = await discoverService.discoverMovies(req.query);
        
        // Ensure we return an array
        const moviesArray = Array.isArray(data) ? data : (data || []);

        res.json(moviesArray);

    } catch (error) {
        console.error("Discover error:", error.message);
        res.status(500).json({ message: error.message, error: error.toString() });

    }
};

module.exports = { discoverMovies };