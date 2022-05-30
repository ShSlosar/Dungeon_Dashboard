//Variables:
var mainCard = document.getElementById('main-card');
var options = document.getElementById('options');
var accountBtn = document.getElementById('account-btn');
var dashBbtn = document.getElementById('dashboards-btn');
var selectedCardBtn = document.getElementById('main-card-btn');
var deselectedCardBtn = document.getElementById('un-main-card-btn');
var deleteAccountBtn = document.getElementById('delete-account');


function newDash(){
    var dashContainer = document.querySelector("#card-container");
    selectedCardBtn.id = 'un-main-card-btn';
    deselectedCardBtn.id = 'main-card-btn';
    mainCard.innerHTML = `
        <form id='card-form' class=" mx-auto p-3" action="/create/game" method="post">
            <div class="">
                <p onclick="runUserDash()" class="fa-solid fa-xmark"></p>
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
        `
        mainCard.id = "main-card-2";
}

function updateUserAccount(e){
    //e.preventdefault();
    console.log(page_items.user_data)
    options.innerHTML = `
            <h3 id="un-main-card-btn" onclick="runUserDash()" class="">My Dashboards</h3>
            <h3>|</h3>
            <h3 id="main-card-btn" onclick="updateUserAccount(event)" class="">Account</h3>
            `
    mainCard.innerHTML = `
        <h5 class="text-center">Edit Account</h5>
        <form id="user-update-form" class="col-8 d-flex flex-column mx-auto" onsubmit="updateUser(event)">
            <div>
                <div class="d-flex">
                    <div class="  m-3">
                        <label for="first_name">first name</label>
                        <input name="first_name" value="${page_items.user_data.first_name}" class="acc-form" type="text">
                    </div>
                    <div class=" m-3">
                        <label for="last_name">last name</label>
                        <input name="last_name" value="${page_items.user_data.last_name}" class="acc-form" type="text">
                    </div>
                </div>
                <div class="d-flex">
                    <div class=" m-3">
                        <label for="email">current email</label>
                        <input name="email" value="${page_items.user_data.email}" class="acc-form" type="text">
                    </div>
                    <div class=" m-3">
                        <label for="handle">current handle</label>
                        <input name="handle" value="${page_items.user_data.handle}" class="acc-form" type="text">
                        <input type="hidden" name="id" value="${page_items.user_data.id}">
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center m-3">
                <label for="password">password</label>
                <input name="password" class="" type="password">
            </div>
            <div class="d-flex justify-content-evenly m-3">
                <input class="sub-btn" value="Save" type="submit">
                <input onclick="updateUserAccount(event)" class="sub-btn" value="Reset" type="button">
            </div>
        </form>
        <div> 
            <h5 id="delete-account" class=" text-center"><a onclick="deleteAccountConf(event)" class="delete-acc" href="#">Delete Account</a></h5>
        </div>
        
    `
}

function deleteAccountConf(e){
    e.preventDefault();
    document.querySelector(".delete-acc").setAttribute('onclick','updateUserAccount(event)');
    console.log(document.querySelector(".delete-acc"))
    mainCard.innerHTML += `
    <form class="mx-auto" id="del-form" action="/user/delete" method="post">
        <input type="hidden" name="id" value="${page_items.user_data.id}">
        <label for="password">password</label>
        <input name="password" class="" type="password">
        <input class="sub-btn" value="Delete" type="submit">
    </form>
    `
}

function optionLinks(){
    options.innerHTML = `
    <h3 id="main-card-btn" onclick="runUserDash()" class="">My Dashboards</h3>
    <h3>|</h3>
    <h3 id="un-main-card-btn" onclick="updateUserAccount(event)" class="">Account</h3>
    `
}

function listGames(data){
    e.preventDefault();
    html= `
    <h5 class="text-center"><a onclick="newDash(this)" class="text-light" href="#">Start a New Dashboard</a></h5>
    <table id="games-table" class="table text-center">
        <thead>
            <th>Name</th>
            <th>Game Time</th>
            <th>Players</th>
            <th>Monsters</th>
            <th>Created</th>
            <th>Options</th>
        </thead>
    `
    if(data.games.length>0){
        for(i=0;i<data.games.length;i++){
            html += `
            <tbody>
                <td>${data.games[i].game_data.name}</td>
                <td>${data.games[i].game_data.time_active}</td>
                <td>${data.games[i].players}</td>
                <td>${data.games[i].monsters}</td>
                <td>${data.games[i].game_data.created_at}</td>
                <td>
                    <div class="d-flex justify-content-evenly">
                        <form id="" action="/game/dashboard/${data.games[i].game_data.id}" class="">
                            <input type="hidden" name="game_id" value="${data.games[i].game_data.id}">
                            <input class="sub-btn" value="open" type="submit">
                        </form> | 
                        <form id="del-dash" onsubmit="removeDashFromItems(event,element)" class="">
                            <input type="hidden" name="game_id" value="${data.games[i].game_data.id}">
                            <input class="sub-btn " value="delete" type="submit">
                        </form>
                    </div>
                </td>
            </tbody>
            `
        }
        html+= `
        </table>
        `
    }
    else{
        html+= `
        </table>
        `
        html += `
        <h3 class="text-center">No games yet...</h3>
        `
    }
    mainCard.innerHTML = html;
}

function removeDashFromItems(e,element){
    e.preventDefault();
    console.log(element.game_id.value);
    for(i=0; i<page_items.game_data.length; i++){
        // console.log(game_items.players[i].id);
        if(element.game_id.value == page_items.game_data[i].id){
            page_items.game_data.splice(i,1);
        }
    }
    deleteDash(e,element.game_id.value);
    listGames(e,page_items);
}

//AJAX: user dashborad load =>
function runUserDash(){
    console.log('Loading user Dashboard...');
    fetch(`http://127.0.0.1:5000/user/dash`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        globalThis.page_items = data;
        mainCard.id = "main-card";
        function listGames(data){
            html= `
            <h5 class="text-center"><a onclick="newDash(this)" class="text-light" href="#">Start a New Dashboard</a></h5>
            <table id="games-table" class="table text-center">
                <thead>
                    <th>Name</th>
                    <th>Game Time</th>
                    <th>Players</th>
                    <th>Monsters</th>
                    <th>Created</th>
                    <th>Options</th>
                </thead>
            `
            if(data.games.length>0){
                for(i=0;i<data.games.length;i++){
                    html += `
                    <tbody>
                        <td>${data.games[i].game_data.name}</td>
                        <td>${data.games[i].game_data.time_active}</td>
                        <td>${data.games[i].players}</td>
                        <td>${data.games[i].monsters}</td>
                        <td>${data.games[i].game_data.created_at}</td>
                        <td>
                            <div class="d-flex justify-content-evenly">
                                <form id="" action="/game/dashboard/${data.games[i].game_data.id}" class="">
                                    <input type="hidden" name="game_id" value="${data.games[i].game_data.id}">
                                    <input class="sub-btn" value="open" type="submit">
                                </form> | 
                                <form id="del-dash" onsubmit="removeDashFromItems(event,element)" class="">
                                    <input type="hidden" name="game_id" value="${data.games[i].game_data.id}">
                                    <input class="sub-btn " value="delete" type="submit">
                                </form>
                            </div>
                        </td>
                    </tbody>
                    `
                }
                html+= `
                </table>
                `
            }
            else{
                html+= `
                </table>
                `
                html += `
                <h3 class="text-center">No games yet...</h3>
                `
            }
            mainCard.innerHTML = html;
        }
        listGames(data);
        function optionLinks(){
            options.innerHTML = `
            <h3 id="main-card-btn" onclick="runUserDash()" class="">My Dashboards</h3>
            <h3>|</h3>
            <h3 id="un-main-card-btn" onclick="updateUserAccount(event)" class="">Account</h3>
            `
        }
        optionLinks()
    })
}
//========================================

//AJAX: update user =>
function updateUser(e){
    e.preventDefault();
    var editForm =document.getElementById(`user-update-form`)
    var form = new FormData(editForm);
    console.log('Clicked: updateUser()', editForm);
    fetch('http://127.0.0.1:5000/user/update', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        page_items.user_data = data;
        console.log(page_items);
        updateUserAccount();
    })
}
function delAcc(e){
    // e.preventDefault();
    var delForm =document.getElementById(`del-form`)
    var form = new FormData(delForm);
    console.log('Clicked: updateUser()', delForm);
    fetch('http://127.0.0.1:5000/user/delete', {method:'Post', body: form})
}
function deleteDash(e,data){
    fetch(`http://127.0.0.1:5000/delete/dashboard/${data}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
}
window.onload = runUserDash();