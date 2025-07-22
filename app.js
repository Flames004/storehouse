const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/user.routes');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use('/user', userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});