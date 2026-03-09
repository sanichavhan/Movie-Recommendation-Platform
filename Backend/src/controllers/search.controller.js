const searchService = require("../services/search.service");

const multiSearch = async (req, res) => {

    try {

        const { query } = req.query;

        const data = await searchService.multiSearch(query);

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { multiSearch };