// Import required dependencies
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
 GET /register
 Renders the user registration form
 */
router.get('/register', (req, res) => {
    res.render('register');
});

/*
 POST /register
 Handles user registration with validation and password hashing
 */
router.post('/register',
    // Input validation middleware
    body('email').trim().isEmail(), // Validate email format and trim whitespace
    body('password').trim().isLength({ min: 6 }), // Ensure password is at least 6 characters
    body('username').trim().isLength({ min: 3 }), // Ensure username is at least 3 characters
    async (req, res) => {
        // Check for validation errors from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid input'
            });
        }

        try {
            // Extract user data from request body
            const { email, password, username } = req.body;

            // Check if user already exists with the same email or username
            // Using $or operator to check both fields in a single query
            const existingUser = await UserModel.findOne({
                $or: [{ email }, { username }]
            });

            // If user exists, return error message
            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists with this email or username'
                });
            }

            // Hash the password before saving to database using bcrypt with salt rounds of 10 for security
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user in database with hashed password
            const newUser = await UserModel.create({
                email,
                password: hashedPassword,
                username
            });

            // Return success response (excluding password for security)
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username
                }
            });
        } catch (error) {
            // Handle MongoDB duplicate key error (E11000)
            // This is a fallback in case the pre-check didn't catch duplicates
            if (error.code === 11000) {
                // Extract the field name that caused the duplicate error
                const field = Object.keys(error.keyPattern)[0];
                return res.status(400).json({
                    message: `${field} already exists. Please choose a different ${field}.`
                });
            }

            // Handle any other unexpected server errors
            console.error('Registration error:', error); // Log error for debugging
            res.status(500).json({
                message: 'Server error during registration',
                error: error.message
            });
        }
    }
);

/*
 GET /login
 Renders the user login form
 */
router.get('/login', (req, res) => {
    res.render('login');
});

/*
 POST /login
 Handles user login with validation and JWT token generation
 */
router.post('/login',
    // Input validation middleware
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        try {
            // Check for validation errors from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid input'
                });
            }

            // Extract login credentials from request body
            const { username, password } = req.body;

            // Find user by username in database
            const user = await UserModel.findOne({ username: username });

            // Check if user exists
            if (!user) {
                return res.status(400).json({
                    message: 'username or password is incorrect'
                });
            }

            // Compare provided password with hashed password in database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'username or password is incorrect'
                });
            }

            // Generate JWT token for the authenticated user
            const token = jwt.sign({
                userId: user._id,
                email: user.email,
                username: user.username
            },
                process.env.JWT_SECRET,
                { expiresIn: '24h' } // Token expires in 24 hours
            );

            res.cookie('token', token)
            res.send("Logged in successfully");
        }
        catch (error) {
            // Handle unexpected server errors during login
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Server error during login',
                error: error.message
            });
        }
    }
);

// Export the router to be used in main app
module.exports = router;