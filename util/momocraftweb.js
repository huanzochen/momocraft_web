// get the client
const mysql = require('mysql2');
 
// create the pool to database
const connection = mysql.createConnection({
  host: 'momocraftban.ddns.net',
  user: 'webservice',
  database: 'momo',
  password: 'A7894_g2kk?h'
});

module.exports = connection.promise()