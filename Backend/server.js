require('dotenv').config();
const app = require("./src/app");
const connectToDb = require('./src/config/database')

const PORT = process.env.PORT || 3000;

// Connect to database
connectToDb()

// Add error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Add error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server is running on http://localhost:${PORT}`);
  console.log(`\n📌 Make sure Frontend is running on http://localhost:5173`);
  console.log(`📝 API Base URL: http://localhost:${PORT}/api\n`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please close the other process or set a different PORT.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});