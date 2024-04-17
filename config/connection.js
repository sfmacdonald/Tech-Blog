// Importing the required Sequelize module and the dotenv configuration
const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Checking if the JAWSDB_URL environment variable is set, if so, using it to connect to the database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, using the individual environment variables to connect to the database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3308
    }
  );
}

// Exporting the sequelize object to be used in other modules
module.exports = sequelize;