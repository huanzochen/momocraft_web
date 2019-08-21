// get the client
const mysql = require('mysql2');
 
// create the pool to database
const pool = mysql.createPool({
  host: 'momocraftban.ddns.me',
  user: 'webservice',
  database: 'web',
  password: 'A7894_g2kk?h'
});

module.exports = pool.promise();