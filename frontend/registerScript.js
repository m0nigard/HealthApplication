
module.exports = function(app, db){

    app.post('/api/user', (req, res) => {

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


document.querySelector('form[name="registration"]').addEventListener('submit', async (event) =>{
    event.preventDefault();


    let elements = document.forms.registration.elements;

    console.log(elements)

    let reqBody = {};
    for(let element of elements){
        if(element.type === 'button' || element.type === 'submit'){
            continue;
        }
        reqBody[element.name] = element.value;
    }

    console.log(reqBody);

    let res = {};

    try {
        res = await (await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        })).json();
    } catch (error) {
        console.log(error)
    }


    if(!res || res._error){
        console.log("Registration faild!");
        return;
    }




});