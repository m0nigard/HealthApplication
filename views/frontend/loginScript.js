
const session = require('express-session')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, db){

    app.use(session({
        secret: 'someUnusualStringThatIsUniqueForThisProject',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' },
    }));

    app.post('/api/login',jsonParser, (req, res) => {

        
        //console.log(req.body)
        let stmt = db.prepare(`
        SELECT * FROM users
        WHERE userName = :username AND password = :password
        `);

        let result = stmt.all(req.body)[0] || { _error: 'No such user.' };
    
        delete result.password;
        
        if (!result._error) {
          req.session.user = result;
        }
        // Respond
        console.log(result)
        console.log("Session" + req.session.user)
        res.json(result);
    });


    app.get('/api/login', (req, res) =>{
        res.json(req.session.user || {_error: 'Not logged in'});
    });

    app.delete('/api/login', (req, res) =>{ 
        delete req.session.user;
        res.json({ success: 'logged out'});
    });
}


