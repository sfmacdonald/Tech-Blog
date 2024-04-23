// Import required Node.js modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars'); // Using destructuring for express-handlebars
const routes = require('./controllers'); // Assuming this file contains the proper route setups

// Import Sequelize and set up the connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the Express.js application
const app = express();
const PORT = process.env.PORT || 3000;

// Configure the Express.js session middleware with Sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up the view engine for Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main' // Confirm the default layout file is named 'main.handlebars'
}));
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes imported from the controllers directory
app.use(routes);

// Generic error handler - improved to provide HTTP status code and message
app.use((err, req, res, next) => {
  console.error('Error:', err); // Log error message and stack for debugging
  const status = err.status || 500;
  const message = err.message || "Something went wrong on the server!";
  res.status(status).send(message);
});

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
