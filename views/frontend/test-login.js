
document.querySelector('#register').addEventListener('click', (event) =>{
    location.href = "register"
});

document.querySelector('#login').addEventListener('click', async (event) =>{
    event.preventDefault();


    const uname =  document.getElementById('uname');
    const pname = document.getElementById('pname');

    

    
    let requestBody = {
        username: uname.value,
        password: pname.value
    };

    

    console.log(requestBody);
    
    let result = {};
    

    try {
       result = await fetch('/api/login', {
           method: 'POST',
           headers: { 'content-type': 'application/json'},
           body: JSON.stringify(requestBody)
       });
       rest = await result.json();
    } catch (error) {
        console.log(error)
    }



    if(!rest || rest._error){
        console.log('Invalid login');
        return;
    }
    
    console.log("inloggad!!")
});