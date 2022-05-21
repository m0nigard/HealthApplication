// Import the better-sqlite3 module
const betterSqlite3 = require('better-sqlite3');

// Connect to the database
const db = betterSqlite3('./backend/database/database.sqlite3');

const path = require('path')

var express = require('express')
var app = express()

const SERVER_PORT = process.env.PORT || 3000;
const MAX_LENGTH_WORD = 10;

app.listen(SERVER_PORT, () => {
    console.log("Server listening on port: " + SERVER_PORT);
  })

const login = require('./views/frontend/loginScript.js');
login(app, db);

const register = require('./views/frontend/registerScript.js');
register(app, db);



app.use(express.static(__dirname))

app.get('/loggedIn', function(req, res){
    res.sendFile(__dirname+ "/views/frontend/loggedIn.html")
});

app.get('/', function(req, res){
    res.sendFile(__dirname+ "/views/frontend/login.html")
});

app.get('/register', function(req, res){
    res.sendFile(__dirname+"/views/frontend/register.html")
});

/*
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('frontend/login'))
*/