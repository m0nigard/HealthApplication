var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app, db){

    app.post('/api/user', jsonParser, (req, res) => {

        console.log(req.body)
        let result
        try {
            let stmt = db.prepare(`
            INSERT INTO users
            (${Object.keys(req.body)}) VALUES (${Object.keys(req.body).map(x => ':' + x)})
        `);

        result = stmt.run(req.body)
            
        } catch (error) {
            result = {_error: error + '' }
        }
        

        res.json(result)
    });


    
}


