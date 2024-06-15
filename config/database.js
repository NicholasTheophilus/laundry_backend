// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});

pool.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to PostgreSQL successfully');
  }
});

// Sequelize instance
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false, // Disable logging; default: console.log
});

module.exports = { sequelize, pool };
