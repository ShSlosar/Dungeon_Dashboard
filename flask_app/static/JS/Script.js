

function loginCard(){
    var card = document.querySelector("#container")
    card.innerHTML = `
    <form id="login-card" class="position-absolute top-50 start-50 translate-middle border rounded border-3 border-dark col-4 text-light p-4" action="/login" method="POST">
        <img src="static/Assets/dunDashLogo.png" alt="logo">
        <i class="fa-2xl fa-solid fa-dice-d20 fa-bounce fa-spin"></i>
        <div class=" my-2">
            <p class="val-alert" hidden id="login-val"></p>
            <input oninput="validateLogin(event,this)" autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Email..." class="border border-2 border-dark w-100" type="text" name="email">
        </div>
        <div class=" my-2">
            <input oninput="validateLogin(event,this)" autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Password..." class="border border-2 border-dark w-100" type="password" name="password">
        </div>
        <div class="d-flex align-items-center">
            <i class=" mx-3 fa-2xl fa-solid fa-beat fa-user"></i>
            <input id="login-btn" disabled class="mx-auto my-2 btn btn-primary text-center border-2 border-dark" type="submit" value="Login">
            <a onclick="regiCard(this)" href="#" class="text-light">Click here to Register!</a>
        </div>
    </form> `
return card
}
function regiCard(){
    var card = document.querySelector("#container")
    card.innerHTML = `
        <form id="registration-card" class="position-absolute top-50 start-50 translate-middle border rounded border-3 border-dark col-4 text-light p-4" action="/create_user" method="POST">
            <img src="static/Assets/dunDashLogo.png" alt="logo">
            <i class="fa-2xl fa-solid fa-dice-d20 fa-bounce fa-spin"></i>
            <div class=" my-2">
                <p class="val-alert" hidden id="u_name"></p>
                <input oninput="validate(event,this)" placeholder="User Name..." class="border border-2 border-dark w-100" type="text" name="handle">
            </div>
            <div class=" my-2">
                <p class="val-alert" hidden id="fname"></p>
                <input oninput="validate(event,this)" placeholder="First Name..." class="border border-2 border-dark w-100" type="text" name="first_name">
            </div>
            <div class=" my-2">
                <p class="val-alert" hidden id="lname"></p>
                <input oninput="validate(event,this)" placeholder="Last Name..." class="border border-2 border-dark w-100" type="text" name="last_name">
            </div>
            <div class=" my-2">
                <p class="val-alert" hidden id="email"></p>
                <p class="val-alert" hidden id="email-Db"></p>
                <input oninput="validate(event,this)" placeholder="Email..." class="border border-2 border-dark w-100" type="text" name="email">
            </div>
            <div class=" my-2">
                <p class="val-alert" hidden id="pass"></p>
                <p class="val-alert" hidden id="pass-len"></p>
                <input oninput="validate(event,this)" placeholder="Password..." class="border border-2 border-dark w-100" type="password" name="password">
            </div>
            <div class=" my-2">
                <p class="val-alert" hidden id="con_pass"></p>
                <input oninput="validate(event,this)" placeholder="Confirm Password..." class="border border-2 border-dark w-100" type="password" name="con_pass">
            </div>
            <div class="d-flex align-items-center">
                <i class=" mx-3 fa-2xl fa-solid fa-beat fa-user"></i>
                <input id="reg-sub" disabled class="mx-auto my-2 btn btn-primary text-center border-2 border-dark" type="submit" value="Register">
                <a onclick="loginCard(this)" href="#" class="text-light">Click here to Login!</a>
            </div>
        </form>`
return card
}

//AJAX: Validations for Registration =>
function validate(e){
    e.preventDefault();
    var handle = document.getElementById('u_name')
    var fname = document.getElementById('fname')
    var lname = document.getElementById('lname')
    var email = document.getElementById('email')
    var emailDb = document.getElementById('email-Db')
    var pass = document.getElementById('pass')
    var passLen = document.getElementById('pass-len')
    var con_pass = document.getElementById('con_pass')
    var regForm =document.getElementById(`registration-card`)
    var reg_sub = document.getElementById('reg-sub')
    var form = new FormData(regForm);
    console.log('Clicked: createUser()', regForm);
    fetch('http://127.0.0.1:5000/validate/user', {method:'Post', body: form})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.handle_len);
            if(data == true ){
                console.log("True!");
                reg_sub.disabled = false;
            }
            if(data.handle_len != undefined){
                handle.innerText = data.handle_len
                handle.hidden = false;
            }
            if(data.handle_len == undefined || regForm.handle.value.length < 1 ){
                handle.hidden = true;
            }
            if(data.fname_len != undefined){
                fname.innerText = data.fname_len;
                fname.hidden = false;
            }
            if(data.fname_len == undefined || regForm.first_name.value.length < 1 ){
                fname.hidden = true;
            }
            if(data.lname_len != undefined){
                lname.innerText = data.lname_len;
                lname.hidden = false;
            }
            if(data.lname_len == undefined || regForm.last_name.value.length < 1 ){
                lname.hidden = true;
            }
            if(data.email_re != undefined){
                email.innerText = data.email_re;
                email.hidden = false;
            }
            if(data.email_re == undefined || regForm.email.value.length < 1 ){
                email.hidden = true;
            }
            if(data.db_email != undefined){
                emailDb.innerText = data.db_email;
                emailDb.hidden = false;
            }
            if(data.db_email == undefined || regForm.email.value.length < 1 ){
                emailDb.hidden = true;
            }
            if(data.password_re != undefined){
                pass.innerText = data.password_re;
                pass.hidden = false;
            }
            if(data.password_re == undefined || regForm.password.value.length < 1 ){
                pass.hidden = true;
            }
            if(data.password_len != undefined){
                passLen.innerText = data.password_len;
                passLen.hidden = false;
            }
            if(data.password_len == undefined || regForm.password.value.length < 1 ){
                passLen.hidden = true;
            }
            if(data.con_pass != undefined){
                con_pass.innerText = data.con_pass;
                con_pass.hidden = false;
            }
            if(data.con_pass == undefined || regForm.con_pass.value.length < 1 ){
                con_pass.hidden = true;
            }
        })
}

//AJAX: Validations for Login =>
function validateLogin(e){
    e.preventDefault();
    var email = document.getElementById('email')
    var pass = document.getElementById('password')
    var alert = document.getElementById('login-val')
    var logForm =document.getElementById(`login-card`)
    var log_sub = document.getElementById('login-btn')
    var form = new FormData(logForm);
    console.log('Clicked: validateLogin()', logForm);
    fetch('http://127.0.0.1:5000/validate/login', {method:'Post', body: form})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(logForm.email.value.length < 1 && logForm.password.value.length < 1){
                alert.hidden = true;
            }
            if(data ==true){
                log_sub.disabled = false;
                alert.hidden = true;
            }
            else{
                alert.innerText = data.alert;
                alert.hidden = false;
            }
        })
}



// AJAX Functions 

// function ajaxFunc(e){
//     e.preventDefault();
//     var formD = document.getElementById('card-form')
//     var form = new FormData(formD);
//     console.log(formD);
//     fetch('http://localhost:5000/create/game',{method:'POST',body:form})
//         .then(res => res.json() )                                             //res short for response
//         .then( res => console.log(res) )
// }