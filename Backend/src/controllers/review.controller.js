const reviewService = require("../services/review.service");

const getMovieReviews = async (req, res) => {

    try {

        const data = await reviewService.getMovieReviews(req.params.id);

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { getMovieReviews };