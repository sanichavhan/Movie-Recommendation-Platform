const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

const authRoutes = require('./routes/auth.route')
const movieRoutes = require('./routes/movie.routes')
const mediaRoutes = require('./routes/media.routes')
const peopleRoutes = require('./routes/people.routes')
const tvRoutes = require('./routes/tv.routes')
const genreRouter = require('./routes/genre.routes')
const reviewRoutes = require("./routes/review.routes")
const keywordRoutes = require("./routes/keyword.routes");
const collectionRoutes = require("./routes/collection.routes");
const searchRoutes = require("./routes/search.routes");
const discoverRoutes = require('./routes/discover.routes')

app.use("/api/auth", authRoutes)
app.use("/api/movies",movieRoutes)
app.use("/api/media",mediaRoutes)
app.use("/api/people",peopleRoutes)
app.use("/api/tv",tvRoutes)
app.use("/api/genres",genreRouter)
app.use("/api/review",reviewRoutes)
app.use("/api/keywords", keywordRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/search", searchRoutes);
app.use("api/discover",discoverRoutes)

module.exports = app;