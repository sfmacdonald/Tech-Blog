// /config/connection.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Make sure to require dotenv if you're using environment variables

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // Use JAWSDB_URL for Heroku deployment with JawsDB MySQL
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

module.exports = sequelize;
