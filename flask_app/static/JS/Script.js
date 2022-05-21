

function loginCard(){
    var card = document.querySelector("#container")
    card.innerHTML = `
    <form id="L_and_R_card" class="position-absolute top-50 start-50 translate-middle border rounded border-3 border-dark col-4 text-light p-4" action="/login" method="POST">
        <img src="static/Assets/dunDashLogo.png" alt="logo">
        <i class="fa-2xl fa-solid fa-dice-d20 fa-bounce fa-spin"></i>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Email..." class="border border-2 border-dark w-100" type="text" name="email">
        </div>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Password..." class="border border-2 border-dark w-100" type="password" name="password">
        </div>
        <div class="d-flex align-items-center">
            <i class=" mx-3 fa-2xl fa-solid fa-beat fa-user"></i>
            <input class="mx-auto my-2 btn btn-primary text-center border-2 border-dark" type="submit" value="Login">
            <a onclick="regiCard(this)" href="#" class="text-light">Or click here to Register!</a>
        </div>
    </form> `
return card
}
function regiCard(){
    var card = document.querySelector("#L_and_R_card")
    card.innerHTML = `
    <form id="L_and_R_card" class="position-absolute top-50 start-50 translate-middle border rounded border-3 border-dark col-4 text-light p-4" action="/create_user" method="POST">
        <img src="static/Assets/dunDashLogo.png" alt="logo">
        <i class="fa-2xl fa-solid fa-dice-d20 fa-bounce fa-spin"></i>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="User Name..." class="border border-2 border-dark w-100" type="text" name="handle">
        </div>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="First Name..." class="border border-2 border-dark w-100" type="text" name="first_name">
        </div>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Last Name..." class="border border-2 border-dark w-100" type="text" name="last_name">
        </div>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Email..." class="border border-2 border-dark w-100" type="text" name="email">
        </div>
        <div class=" my-2">
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Password..." class="border border-2 border-dark w-100" type="password" name="password">
        </div>
        <div class=" my-2">
            
            <input autocorrect="off" spellcheck="false" autocomplete="off" placeholder="Confirm Password..." class="border border-2 border-dark w-100" type="password" name="con_pass">
        </div>
        <div class="d-flex align-items-center">
            <i class=" mx-3 fa-2xl fa-solid fa-beat fa-user"></i>
            <input class="mx-auto my-2 btn btn-primary text-center border-2 border-dark" type="submit" value="Register">
            <a onclick="loginCard(this)" href="#" class="text-light">Or click here to Login!</a>
        </div>
    </form>`
return card
}
function newDash(){
    var dashContainer = document.querySelector("#card-container");
    dashContainer.innerHTML = `
        <div class="option mt-auto card mx-2 col-3 p-3">
            <img src="static/Assets/logoFinalX.png" alt="Logo">
            <h5 class="text-center"><a class="text-light" href="#">Create Charecter or NPC</a></h5>
        </div>
        <form id='card-form' class=" card mx-2 col-3 p-3" action="/create/game" method="post">
            <div class="">
                <i onclick="defaultCard(this)" class="fa-solid fa-xmark"></i>
                <h5 class=" form-label text-center">Start a new campeign</h5>
            </div>
            <div class="">
                <label class="form-label" for="name">Name your dashboard:</label>
                <input class="border border-2 border-dark w-100 my-2" type="text" name="name">
            </div>
            <div class="">
                <label class="form-label" for="time_active">Choose starting time:</label>
                <input class="border border-2 border-dark w-100 my-2" type="time" step="1" name="time_active">
            </div>
            <input name="day" value="0" type="hidden">
            <input class="mx-auto my-2 btn text-center border-2 border-dark" type="submit" value="Launch">
        </form>
        <div class="option mt-auto card mx-2 col-3 p-3">
            <img src="static/Assets/logoFinalX.png" alt="Logo">
            <h5 class="text-center"><a class="text-light" href="#">Your Dashboards</a></h5>
        </div>`
    // document.getElementById('card-container').id = 'form-container'
return dashContainer;
}
function defaultCard(){
    var dashContainer = document.querySelector("#card-container");
    dashContainer.innerHTML = `
        <div class="mt-auto card mx-2 col-3 p-3">
            <img src="static/Assets/logoFinal (1).png" alt="Logo">
            <h5 class="text-center"><a class="text-light" href="#">Create Charecter or NPC</a></h5>
        </div>
        <div class="mt-auto card mx-2 col-3 p-3">
            <img src="static/Assets/logoFinal (1).png" alt="Logo">
            <h5 class="text-center"><a onclick="newDash(this)" class="text-light" href="#">Start a New Dashboard</a></h5>
        </div>
        <div class="mt-auto card mx-2 col-3 p-3">
            <img src="static/Assets/logoFinal (1).png" alt="Logo">
            <h5 class="text-center"><a class="text-light" href="#">Your Dashboards</a></h5>
        </div>`
    return dashContainer;
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