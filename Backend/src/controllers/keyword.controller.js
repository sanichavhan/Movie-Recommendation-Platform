const keywordService = require("../services/keyword.service");

const getMovieKeywords = async (req, res) => {

    try {

        const data = await keywordService.getMovieKeywords(req.params.id);

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { getMovieKeywords };