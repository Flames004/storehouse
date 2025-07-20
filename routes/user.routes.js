const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('User test route is working');
});

module.exports = router;