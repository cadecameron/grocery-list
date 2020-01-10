const express = require('express');
const dbConnection = require('../database');

const app = express();
//const __dirname = 'string';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening on localhost', PORT));

// parse our request's body
app.use(express.json()); // this will parse the .body property of req into an object (rather than a JSON string)

// create simple server log that outputs the method and url sent to the server
app.use((req, res, next) => {
  console.log(`Handling a ${req.method} request for ${req.url}`);
  next(); // needed to continue server processing of client request
})

// GET request that queries the database for all the groceries
app.get('/api/groceries', (req, res) => {
  dbConnection.query('SELECT * FROM groceries', (err, rows, field) => {
    if (err) {
      console.log(err);
      res.send(500); // just send back a simple 500 error status code
    } else {
      console.log(rows);
      res.send(rows); // otherwise send back an array of the rows
    }
  })
});

// POST request that inserts a new grocery item intp the database
app.post('/api/groceries', (req, res) => {
  const {item, quantity} = req.body; // create new veriables to store the req.body properties
  const query = `INSERT INTO groceries (item, quantity) VALUES(?, ?)`; // using '?' auto-escapes the variables
  dbConnection.query(query, [item, quantity], (err, results) => { // an array of vales are inserted into the query string in the order of the '?' chars in the string
    if (err) {
      console.log(err);
      res.send(500); // just send back an error status code
    } else {
      console.log('Results from database:', results);
      res.send(201); // just send back an OK - created status code (or perhaps the new id of the inserted item, if the app needs it for something)
    }
  });
});

app.use(express.static('client/dist'));



