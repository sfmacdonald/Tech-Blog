// middleware verifies user logged in prior to restricted route access provided
const withAuth = (req, res, next) => {
    if (!req.session.LoggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;