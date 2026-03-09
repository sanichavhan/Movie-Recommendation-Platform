const collectionService = require("../services/collection.service");

const getCollection = async (req, res) => {

    try {

        const data = await collectionService.getCollection(req.params.id);

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

module.exports = { getCollection };