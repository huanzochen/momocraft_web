// get the client
require('dotenv').config()
const mysql = require('mysql2')

// create the pool to database
const pool = mysql.createPool({
  host: process.env.MYSQL_WEB_DB_HOST,
  user: process.env.MYSQL_WEB_DB_USER,
  database: process.env.MYSQL_WEB_DB_DATABASE,
  password: process.env.MYSQL_WEB_DB_PASSWORD
})

module.exports = pool.promise()