
var mysql = require('mysql');
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

var connection = mysql.createConnection({
  host     : `${DATABASE_HOST}`,
  user     : `${DATABASE_USER}`,
  password : `${DATABASE_PASSWORD}`,
  database : `${DATABASE_NAME}`
});

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : ``,
//   database : 'qrcodedatabase'
// });
connection.connect();

module.exports = connection;
