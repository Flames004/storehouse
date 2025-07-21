const express = require('express');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Connect to database after env vars are loaded
const connectDB = require('./config/db');
connectDB();

// Initialize Express app
const app = express();

// Import routes
const userRouter = require('./routes/user.routes');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.use('/user', userRouter);

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});