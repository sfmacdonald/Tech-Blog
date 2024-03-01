const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/', postController.getHomePage);

module.exports = router;
