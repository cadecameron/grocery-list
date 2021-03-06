const express = require('express');
const dbConnection = require('../database');

const app = express();
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
      res.sendStatus(500); // just send back a simple 500 error status code
    } else {
      console.log(rows);
      res.send(rows); // otherwise send back an array of the rows
    }
  })
});

// POST request that inserts a new grocery item into the database
app.post('/api/groceries', (req, res) => {
  const {item, quantity} = req.body; // create new veriables to store the req.body properties
  const query = `INSERT INTO groceries (item, quantity) VALUES(?, ?)`; // using '?' auto-escapes the variables
  dbConnection.query(query, [item, quantity], (err, results) => { // an array of vales are inserted into the query string in the order of the '?' chars in the string
    if (err) {
      console.log(err);
      res.sendStatus(500); // just send back an error status code
    } else {
      console.log('Results from database:', results);
      res.sendStatus(201); // just send back an OK - created status code (or perhaps the new id of the inserted item, if the app needs it for something)
    }
  });
});

// DELETE request that removes a given grocery item from the database
app.delete('/api/groceries', (req, res) => {
  const {id, item, quantity} = req.body;
  const query = `DELETE FROM groceries WHERE id=?`;
  dbConnection.query(query, [id], (err, result) => {
    if (err) {
      console.log(`Error attempting to delete ${item} (id: ${id}) from the database.`);
      res.sendStatus(500);
    } else {
      console.log(`Successfully deleted ${item} (id: ${id}) from the database.`);
      res.sendStatus(200);
    }
  })
});

// PUT request that updates a given grocery item in the database
app.put('/api/groceries', (req, res) => {
  const {id, item, quantity} = req.body;
  const query = `UPDATE groceries SET item=?, quantity=? WHERE id=?`;
  dbConnection.query(query, [item, quantity, id], (err, result) => {
    if(err) {
      console.log(`Error attempting to update ${item} (id: ${id}) from the database.`);
    } else {
      console.log(`Successfully updated ${item} (id: ${id}) in the database.`);
      res.sendStatus(201);
    }
  })
})

app.use(express.static('client/dist'));
