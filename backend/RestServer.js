// Import the better-sqlite3 module
const betterSqlite3 = require('better-sqlite3');

// Connect to the database
const db = betterSqlite3('./database/database.sql');

var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = process.env.PORT || 3000;
const MAX_LENGTH_WORD = 10;

app.post('/data', function (req, res) {
  console.log("post requested received with data: ");

  var data = req.body.data;

  console.log(data);

  console.log("sending response");
  res.send(data);
  res.end();

})

app.listen(SERVER_PORT, () => {
  console.log("Server listening on port: " + SERVER_PORT);
})