require('dotenv').config();
const app = require("./src/app");
const connectToDb = require('./src/config/database')

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

const server = app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});