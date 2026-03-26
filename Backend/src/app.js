const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

// Dynamic CORS for production
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use(express.static("./public"))

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

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
app.use("/api/media", mediaRoutes)
app.use("/api/people", peopleRoutes)
app.use("/api/tv", tvRoutes)
app.use("/api/genres", genreRouter)
app.use("/api/review", reviewRoutes)
app.use("/api/keywords", keywordRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/discover", discoverRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;