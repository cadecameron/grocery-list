const mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'password',
  database: 'groceries'
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to database.');
  }
});

module.exports = dbConnection;
