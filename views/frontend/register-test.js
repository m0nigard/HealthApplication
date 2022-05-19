document.querySelector('#login').addEventListener('click', (event) =>{
    location.href = "/"
});

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
        console.log(res)
        console.log("Registration faild!");
        return;
    }




});