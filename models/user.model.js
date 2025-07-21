const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim : true,
        lowercase: true,
        minLength: [5, 'Email must be at least 5 characters long'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim : true,
        minLength: [6, 'Password must be at least 6 characters long']
    },
    username: {
        type: String,
        required: true,
        trim : true,
        lowercase: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        unique: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
