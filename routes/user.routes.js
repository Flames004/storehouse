const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const bcrpyt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 6 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Invalid input' });
        }

        try {
            const { email, password, username } = req.body;

            // Check if user already exists
            const existingUser = await UserModel.findOne({
                $or: [{ email }, { username }]
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists with this email or username'
                });
            }

            // Create new user
            const hashedPassword = await bcrpyt.hash(password, 10);
            const newUser = await UserModel.create({ email, password: hashedPassword, username });

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username
                }
            });
        } catch (error) {
            // Handle duplicate key error
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return res.status(400).json({
                    message: `${field} already exists. Please choose a different ${field}.`
                });
            }

            // Handle other errors
            res.status(500).json({
                message: 'Server error during registration',
                error: error.message
            });
        }
    }
);

module.exports = router;