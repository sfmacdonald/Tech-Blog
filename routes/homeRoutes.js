const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('home', {
    // Pass data to your template as needed
  });
});

module.exports = router;
