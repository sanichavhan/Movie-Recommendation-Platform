const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    title: String,
    overview: String,
    poster_path: String,
    release_date: String,
    popularity: Number
},{
    timestamps:true
})
const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel
