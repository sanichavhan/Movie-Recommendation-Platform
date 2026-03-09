const providerService = require("../services/provider.service");

const getWatchProviders = async (req, res) => {
    try {
        const data = await providerService.getWatchProviders(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWatchProviders };