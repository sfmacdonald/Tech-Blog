// Importing the Router from express
const router = require('express').Router();

// Importing the API routes
const apiRoutes = require('./api');

// Importing the home routes
const homeRoutes = require('./homeRoutes');

// Using the home routes on the root path
router.use('/', homeRoutes);

// Using the API routes on the /api path
router.use('/api', apiRoutes);

// Exporting the router
module.exports = router;