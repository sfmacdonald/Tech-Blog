// server.js
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Adjust the path as necessary
require('dotenv').config();
const homeRoutes = require('./controllers/homeRoutes.js');

// Environment variable validation (Consider using dotenv-safe for this)
if (!process.env.SESSION_SECRET) {
  console.error('FATAL ERROR: SESSION_SECRET is not defined.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration with enhanced security
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 15 * 60 * 1000, // 15 minutes
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    httpOnly: true, // Mitigate risk of client-side script accessing the cookie
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  // Example custom helper
  helpers: {
    formatDate: function (date, format) {
      return moment(date).format(format); // Ensure moment is installed and required
    },
  },
});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the router
app.use('/', homeRoutes);

app.get('/login', (req, res) => {
  // Check if the user is already logged in and redirect to dashboard if they are
  if (req.session.isLoggedIn) {
      return res.redirect('/dashboard');
  }
  // Otherwise, render the login page
  res.render('login');
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Syncing our sequelize models and then starting our Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
