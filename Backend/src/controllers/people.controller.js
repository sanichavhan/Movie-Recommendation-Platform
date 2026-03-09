const peopleService = require("../services/people.service");

const getPopularPeople = async (req, res) => {
    try {
        const data = await peopleService.getPopularPeople();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPersonById = async (req, res) => {
    try {
        const data = await peopleService.getPersonById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrendingPeople = async (req, res) => {

    try {

        const data = await peopleService.getTrendingPeople();

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { 
    getPopularPeople, 
    getPersonById,
    getTrendingPeople
};