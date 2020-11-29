// get the client
require('dotenv').config()
const mysql = require('mysql2');
const info = require('./config/info');
 
// create the pool to database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD
});

module.exports = pool.promise();