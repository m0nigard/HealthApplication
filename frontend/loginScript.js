
const session = require('express-session')


module.exports = function(app, db){

    app.use(session({
        secret: 'someUnusualStringThatIsUniqueForThisProject',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' },
        store: store({ dbPath: './backen/database/database.sql' })
    }));


    app.post('/api/login', (req, res) => {

    

        let stmt = db.prepare(`
            SELECT * FROM users
            WHERE userName = :userName AND password = :password
        `);


        let result = stmt.all(req.body)[0] || {_error: 'No such user.'};

        delete result.password;

        if(!result._error){
            req.session.user = result;
        }

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



document.querySelector('#login').addEventListener('click', async (event) =>{
    event.preventDefault();


    const uname =  document.getElementById('uname');
    const pname = document.getElementById('pname');

    let requestBody = {};

    requestBody['userName'] = uname.value;
    requestBody['password'] = pname.value;

    console.log(requestBody);

    let result = {};

    try {
        result = await (await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })).json();
    } catch (error) {
        console.log(error)
    }


    if(!result || result._error){
        console.log('Invalid login');
        return;
    }
})