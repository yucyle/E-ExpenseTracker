const express = require('express');
const router = express.Router();
const { register, login, logout, refresh } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.post('/register', register);


module.exports = router;