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

  var data = req.body.data.metrics;

  console.log(data)

  var myData = []
  myData = getData(data) // functions puts steps in index 0, index 1 distance walked and run and index 2 is walking pace.

  console.log("sending response");
  res.send("data");
  res.end();

})

app.listen(SERVER_PORT, () => {
  console.log("Server listening on port: " + SERVER_PORT);
})

function getData(data){
  var myData = []
  var filteredData = []

  var resArr = data.map(function(x){ // make data map and push everything.
    myData.push(x[Object.keys(x)[0]]) // data is not in the same spot so everything needs to be pushed.
    myData.push(x[Object.keys(x)[1]])
    myData.push(x[Object.keys(x)[2]])
  });

  for(var p = 0; p< myData.length; p++){ // get all the data
    if(Array.isArray(myData[p])){ // if the data is an arrray
      filteredData.push(myData[p][0]) // push the dictionary on to the new array

    }
  }
  return filteredData 
}