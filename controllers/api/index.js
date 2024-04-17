// Import the Router class from the express module
const router = require('express').Router();

// Import the userRoutes module
const userRoutes = require('./userRoutes');

// Use the userRoutes module for all routes starting with '/users'
router.use('/users', userRoutes);

// Export the router object to be used as middleware in the main application
module.exports = router;