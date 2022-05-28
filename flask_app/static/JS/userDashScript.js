//Variables:
var mainCard = document.getElementById('main-card');
var options = document.getElementById('options');
var accountBtn = document.getElementById('account-btn');
var dashBbtn = document.getElementById('dashboards-btn');

function newDash(){
    var dashContainer = document.querySelector("#card-container");
    mainCard.innerHTML = `
        <form id='card-form' class=" mx-auto p-3" action="/create/game" method="post">
            <div class="">
                <i onclick="runUserDash()" class="fa-solid fa-xmark"></i>
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

//AJAX: user dashborad load =>
function runUserDash(){
    console.log('Loading user Dashboard...');
    fetch(`http://127.0.0.1:5000/user/dash`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        console.log(data.games[0].game_data.name)
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
                            <form id="" onsubmit="openDash(event,this)" class="">
                                <input type="hidden" name="game_id" value="${data.games[i].game_data.id}">
                                <input class="sub-btn " value="open" type="submit">
                            </form> | 
                            <form id="" onsubmit="deleteDashboard(event,this)" class="">
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
            mainCard.innerHTML = html;
        }
        listGames(data);
    })
}
//window.onload = runUserDash();