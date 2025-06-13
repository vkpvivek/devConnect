const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');


// POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
