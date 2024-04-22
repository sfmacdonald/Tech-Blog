// Import required Node.js modules
const path = require('path'); // Path module for working with file and directory paths
const express = require('express'); // Express.js framework for building web applications
const session = require('express-session'); // Express.js middleware for managing user sessions
const exphbs = require('express-handlebars'); // Handlebars view engine for Express.js
const routes = require('./controllers'); // Import routes from the controllers directory

// Import Sequelize and set up the connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the Express.js application
const app = express();
const PORT = process.env.PORT || 3306;

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

// Set up the view engine and static file serving
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes imported from the controllers directory
app.use(routes);

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('I am now listening'));
});