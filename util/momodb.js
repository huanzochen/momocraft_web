// get the client
const mysql = require('mysql2');
const info = require('./config/momodb');
 
// create the pool to database
const pool = mysql.createPool({
  host: info.host,
  user: info.user,
  database: info.database,
  password: info.password
});

module.exports = pool.promise();