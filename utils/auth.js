// Middleware function to check if a user is authenticated
// before allowing access to certain routes
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect them to the login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // If the user is logged in, continue to the next middleware function
    next();
  }
};

module.exports = withAuth;