// Importing the express Router and User model, as well as the withAuth middleware
const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// GET route for the homepage, rendering the 'homepage' template
// No authentication is required for this route
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for the login page, rendering the 'login' template
// If the user is already logged in, they will be redirected to the homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET route for the signup page, rendering the 'signup' template
// If the user is already logged in, they will be redirected to the homepage
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// GET route for the dashboard page, rendering the 'dashboard' template
// Authentication is required for this route, and if the user is not logged in, they will be redirected to the login page
router.get('/dashboard', withAuth, (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('dashboard');
});

// Exporting the router module
module.exports = router;