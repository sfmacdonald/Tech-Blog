// server.js
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Adjust the path as necessary
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 15 * 60 * 1000, // 15 minutes;
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers if necessary
const hbs = exphbs.create({ /* your config and custom helpers */ });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the router
app.use('/', homeRoutes);

// Syncing our sequelize models and then starting our Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
