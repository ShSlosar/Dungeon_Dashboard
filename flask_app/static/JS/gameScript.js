// const print = x => console.log(x);
//variables__________________________________________________
var monster_search_form = document.getElementById('monsterForm');
var monsters = document.getElementById('monster-result-card');
var monster = document.getElementById('monster-sidebar');
var actions = document.getElementById('actions');
var playerCardDiv = document.getElementById('participant-list');
var centerCard = document.getElementById('chapters-card');
var clockCard = document.getElementById('clock-card')
//----------------------------------------------------------------

// Skill-to-Modifier Function_____________________________________________________
function modifiers(data){
    var stat = parseInt(data);
    if(stat == 1){
        modif = '-5';
        return modif;
    }
    if(stat >=2  && stat <= 3){
        modif = '-4';
        return modif;
    }
    if(stat >=4  && stat <= 5){
        modif = '-3';
        return modif;
    }
    if(stat >=6  && stat <= 7){
        modif = '-2';
        return modif;
    }
    if(stat >=8  && stat <= 9){
        modif = '-1';
        return modif;
    }
    if(stat >=10  && stat <= 11){
        modif = '+0';
        return modif;
    }
    if(stat >=12  && stat <= 13){
        modif = '+1';
        return modif;
    }
    if(stat >=14  && stat <= 15){
        modif = '+2';
        return modif;
    }
    if(stat >=16  && stat <= 17){
        modif = '+3';
        return modif;
    }
    if(stat >=18  && stat <= 19){
        modif = '+4';
        return modif;
    }
    if(stat >=20  && stat <= 21){
        modif = '+5';
        return modif;
    }
    if(stat >=22  && stat <= 23){
        modif = '+6';
        return modif;
    }
    if(stat >=24  && stat <= 25){
        modif = '+7';
        return modif;
    }
    if(stat >=26  && stat <= 27){
        modif = '+8';
        return modif;
    }
    if(stat >=28  && stat <= 29){
        modif = '+9';
        return modif;
    }
    if(stat == 30){
        modif = '+10';
        return modif;
    }
}
//---------------------------------------------------------------------------------


// Change stat to modifier on mouse over_____________________________________________________
function displayMods(element){
    modif = element.innerText;
    element.innerText = modifiers(modif);
    if(modif[0]=='-'){
        element.classList.add('negative-modif');
    }
    if(modif == '+0'){
        element.classList.add('zero-modif');
    }
    else{
        element.classList.add('positive-modif');

    }
    
}
//-------------------------------------------------------------------------------------------

// Change modifier back to stat on mouse off__________________________________________________
function revertToStat(element,data){
    element.innerText = data;
    element.classList.remove('positive-modif');
    element.classList.remove('negative-modif');
    element.classList.remove('zero-modif');
}
//--------------------------------------------------------------------------------------------

//Change Id of Monster-view-card submit, and applying it to the monsterSearch (to display card)
function getMonsterFromList(e,element){
    e.preventDefault();
    console.log(element);
    element.id = 'monster-form-2';
    monsterSearch(e);
}

//----------------------------------------------------------------------------------------------

//Change Id of Player-view-card submit, and applying it to the display card function____________ 
function getPlayerFromList(e,element){
    e.preventDefault();
    console.log(element);
    element.id = 'get-player-form';
    displayPlayerCard(e);
}

//----------------------------------------------------------------------------------------------

//Change Id of Monster-add submit, and applying it to the addMonster (to game)__________________

function addMonsterToGame(e,element){
    e.preventDefault();
    console.log("ADD MONSTER TO GAME",element);
    element.id = 'add-monster-form';
    addMonster(e);
    
}

//-----------------------------------------------------------------------------------------------

//Display New Character Form in Center Card______________________________________________________
function displayPlayerForm(element){
    centerCard.innerHTML = `
    <i onclick="defaultCenterCard(this)" class="fa-solid fa-xmark"></i>
    <h1 class="text-center">Create New Character</h1>
    <div class="d-flex justify-content-between">
        <form onsubmit="addPlayer(event)" class="mx-auto" id="add-player-form">
            <div class="d-flex justify-content-evenly p-2">
                <input class="" type="text" name="name" placeholder="Name...">
                <input class="" type="text" name="race" placeholder="Race">
            </div>
            <div class="d-flex justify-content-evenly p-2">
                <input class="" type="text" name="alignment" placeholder="alignment">
                <input class="" type="text" name="class_type" placeholder="class">
            </div>
            <table class="table text-center">
                <thead>
                    <th>AC</th>
                    <th>HP</th>
                    <th>Speed</th>
                    <th>LVL</th>
                </thead>
                <tbody>
                    <td><input class="w-50" min="1" max="30" type="number" name="ac"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="hp"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="speed"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="lvl"></td>
                </tbody>
            </table>
            <table class="table text-center">
                <thead>
                    <th>str</th>
                    <th>dex</th>
                    <th>int</th>
                    <th>wis</th>
                    <th>char</th>
                    <th>const</th>
                </thead>
                <tbody>
                    <td><input class="w-50" min="1" max="30" type="number" name="str"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="dex"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="intel"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="wis"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="chars"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="const"></td>
                </tbody>
            </table>
            <div class="d-flex justify-content-evenly p-3">
                <input class="sub-btn" type="submit" value="Submit">
                <input class="sub-btn" onclick="displayCharacterForm(this)" type="button" value="Clear All">
            </div>
        </form>
    </div>
    `
}
//-----------------------------------------------------------------------------------------------

//Display Edit Player Form______________________________________________________________________
function displayPlayerEditForm(e,element){
    e.preventDefault();
    for(i=0; i<element.player_id.value; i++){
        // console.log(game_items.players[i].id);
        if(element.player_id.value == game_items.players[i].id){
            data = game_items.players[i];
        }
    }
    console.log(data);
    centerCard.innerHTML = `
    <i onclick="defaultCenterCard(this)" class="fa-solid fa-xmark"></i>
    <h1 class="text-center">Edit Character</h1>
    <div class="d-flex justify-content-between">
        <form onsubmit="updatePlayer(event)" class="mx-auto" id="edit-player-form">
            <div class="d-flex justify-content-evenly p-2">
                <input class="" type="text" name="name" value="${data.name}">
                <input class="" type="text" name="race" value="${data.race}">
            </div>
            <div class="d-flex justify-content-evenly p-2">
                <input class="" type="text" name="alignment" value="${data.alignment}">
                <input class="" type="text" name="class_type" value="${data.class_type}">
            </div>
            <table class="table text-center">
                <thead>
                    <th>AC</th>
                    <th>HP</th>
                    <th>Speed</th>
                    <th>LVL</th>
                </thead>
                <tbody>
                    <td><input class="w-50" min="1" max="30" type="number" name="ac" value="${data.ac}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="hp" value="${data.hp}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="speed" value="${data.speed}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="lvl"value="${data.lvl}"></td>
                </tbody>
            </table>
            <table class="table text-center">
                <thead>
                    <th>str</th>
                    <th>dex</th>
                    <th>int</th>
                    <th>wis</th>
                    <th>char</th>
                    <th>const</th>
                </thead>
                <tbody>
                    <td><input class="w-50" min="1" max="30" type="number" name="str" value="${data.str}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="dex" value="${data.dex}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="intel" value="${data.intel}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="wis" value="${data.wis}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="chars" value="${data.chars}"></td>
                    <td><input class="w-50" min="1" max="30" type="number" name="const" value="${data.const}"></td>
                </tbody>
            </table>
            <div class="d-flex justify-content-evenly p-3">
                <input type="hidden" name="id" value="${data.id}">
                <input type="hidden" name="dm_id" value="${data.dm_id}">
                <input type="hidden" name="creator_id" value="${data.creator_id}">
                <input type="hidden" name="game_id" value="${data.game_id}">
                <input class="sub-btn" type="submit" value="Submit">
                <form id="" onsubmit="displayPlayerEditForm(event,this)" class="">
                    <input type="hidden" name="player_id" value="${data.id}">
                    <input class="sub-btn" value="Edit" type="submit">
                </form>
            </div>
        </form>
    </div>
    `
}

//Revert Center Card to Default View_____________________________________________________________

function defaultCenterCard(element){
    centerCard.innerHTML = `
    <h1 class="text-center">Text Box</h1>
    <div class="d-flex justify-content-between">
        <div  class="h-25 p-3 text-center">
            <textarea class="" name="Chapters" id="" cols="80" rows="20"></textarea>
            <input class="text-button h-25 p-2" type="submit" value="My Chapters">
            <input class="text-button h-25 p-2" type="submit" value="Save Work">
        </div>
    </div>
    `
}
//-----------------------------------------------------------------------------------------------

//Display players in game_____________________________________________________________________________________________

function displayPlayers(e){
    playerCardDiv.innerHTML = `<p class="border-bottom border-2 border-dark"><strong>There are ${game_items.players.length} players in this game</strong></p>`
    for(var i=0; i<game_items.players.length; i++){
        console.log(game_items.players[i].name);
        playerCardDiv.innerHTML += 
        `<div class="d-flex justify-content-center border-bottom border-dark p-2 mt-2">
            <div class="d-flex flex-column">
                <form id="" onsubmit="removePlayerFromItems(event, this)" class="remove-link">
                    <input type="hidden" name="player_id" value="${game_items.players[i].id}">
                    <input class="sub-btn " value="remove" type="submit">
                </form>
                <h4 class="text-center"><strong>${game_items.players[i].name}</strong></h4>
                <div class="d-flex justify-content-evenly border-top border-dark">
                    <p><strong>AC: </strong>${game_items.players[i].ac}</p>
                    <p><strong>|</strong></p>
                    <p><strong>LVL: </strong>${game_items.players[i].lvl}</p>
                    <p><strong>|</strong></p>
                    <p><strong>HP: </strong>${game_items.players[i].hp}</p>
                </div>
                <table  class="table text-center">
                    <thead>
                        <th>str</th>
                        <th>dex</th>
                        <th>int</th>
                        <th>wis</th>
                        <th>char</th>
                        <th>const</th>
                        </thead>
                        <tbody>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].str})">
                        ${game_items.players[i].str}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].dex})">
                        ${game_items.players[i].dex}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].intel})">
                        ${game_items.players[i].intel}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].wis})">
                        ${game_items.players[i].wis}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].chars})">
                        ${game_items.players[i].chars}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.players[i].const})">
                        ${game_items.players[i].const}
                        </td>
                        </tbody>
                </table>
                <div class="d-flex justify-content-between">
                    <div>
                    <form id="" onsubmit="getPlayerFromList(event,this)" class=" ">
                    <input type="hidden" name="player_id" value="${game_items.players[i].id}">
                    <input class="sub-btn " value="View sheet" type="submit">
                    </form>
                    </div>
                    <input class="sub-btn " value="Add to inititave" type="submit">
                </div>
                </div>
        </div>`
    }
}

//----------------------------------------------------------------------------------------------------------------------------------

//Take new Player and push to gameitems list________________________________________________________________________________
function getPlayerData(e,data){
    console.log(data);
    game_items.players.push(data);
    displayPlayers(e);
    defaultCenterCard(e);
    
}
//------------------------------------------------------------------------------------------------------------------------------

//Remove monster from game_items list____________________________________________________________________________________
function removeMonsterFromItems(e,element){
    e.preventDefault();
    console.log(element.monster_id.value);
    console.log(game_items.monsters.length)
    for(i=0; i<game_items.monsters.length; i++){
        if(element.monster_id.value == game_items.monsters[i].id ){
            game_items.monsters.splice(i,1);
        }
    }
    console.log(game_items.monsters);
    removeMonster(e,element.monster_id.value);
    displayMonsters(e);
}
//-----------------------------------------------------------------------------------------------------------

//Remove player from game_items list_________________________________________________________________________
function removePlayerFromItems(e,element){
    e.preventDefault();
    console.log(element.player_id.value);
    console.log(game_items.players.length);
    for(i=0; i<game_items.players.length; i++){
        // console.log(game_items.players[i].id);
        if(element.player_id.value == game_items.players[i].id){
            game_items.players.splice(i,1);
        }
    }
    console.log(game_items.players);
    removePlayer(e,element.player_id.value);
    displayPlayers(e);
}
//---------------------------------------------------------------------------------------------------------------

function updatePlayerInItems(e,data){
    e.preventDefault();
    console.log(data.id);
    for(i=0; i<game_items.length; i++){
        // console.log(game_items.players[i].id);
        if(data.id == game_items.players[i].id){
            game_items.players[i] = data;
            console.log(game_items.players[i]);
        }
    }
    console.log(game_items.players);
    displayPlayers(e);
    defaultCenterCard(e);
}

//Display monsters in game_______________________________________________________________________ 

function displayMonsters(e){
    e.preventDefault();
    monsters.innerHTML = `<p><strong>There are ${game_items.monsters.length} monsters in this game</strong></p>`
    for(var i=0; i<game_items.monsters.length; i++){
        monsters.innerHTML+=
        `<div class="d-flex justify-content-center border-bottom border-dark p-2 mt-2">
            <div class="d-flex flex-column">
                <form id="" onsubmit="removeMonsterFromItems(event, this)" class="remove-link">
                    <input type="hidden" name="monster_id" value="${game_items.monsters[i].id}">
                    <input class="sub-btn " value="remove" type="submit">
                </form>
                <h4 class="text-center"><strong>${game_items.monsters[i].name}</strong></h4>
                <div class="d-flex justify-content-evenly border-top border-dark">
                    <p><strong>AC: </strong>${game_items.monsters[i].armor_class}</p>
                    <p><strong>|</strong></p>
                    <p><strong>Challenge: </strong>${game_items.monsters[i].challenge_rating}</p>
                    <p><strong>|</strong></p>
                    <p><strong>HP: </strong>${game_items.monsters[i].hit_points}</p>
                </div>
                <table  class="table text-center">
                    <thead>
                        <th>str</th>
                        <th>dex</th>
                        <th>int</th>
                        <th>wis</th>
                        <th>char</th>
                        <th>const</th>
                    </thead>
                    <tbody>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].strength})">
                        ${game_items.monsters[i].strength}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].dexterity})">
                        ${game_items.monsters[i].dexterity}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].intelligence})">
                        ${game_items.monsters[i].intelligence}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].wisdom})">
                        ${game_items.monsters[i].wisdom}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].charisma})">
                        ${game_items.monsters[i].charisma}
                        </td>
                        <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${game_items.monsters[i].constitution})">
                        ${game_items.monsters[i].constitution}
                        </td>
                    </tbody>
                </table>
                <div class="d-flex justify-content-between">
                    <div>
                    <form id="" onsubmit="inGameMonsterCard(event,this)" class=" ">
                    <input type="hidden" name="monster_indx" value="${game_items.monsters[i].index}">
                    <input class="sub-btn" value="View sheet" type="submit">
                    </form>
                    </div>
                    <input class="sub-btn " value="Add to inititave" type="submit">
                </div>
            </div>
        </div>`
    }
    actions.innerHTML = '<p class="border-bottom border-2 border-dark"></p>'
}
//-------------------------------------------------------------------------------------------------

// Clock Form__________________________________________________________________________________
function changeClock(e){
    e.preventDefault();
    var time = game_items.game_data.time_active;
    console.log(time);
    var seconds = time.slice(6,9);
    var minutes = time.slice(3,5);
    var hours = time.slice(0,2);
    var amPm = time.slice(9)
    var secInt = parseInt(seconds);
    var minInt = parseInt(minutes);
    var hrsInt = parseInt(hours);
    var dysInt = parseInt(game_items.game_data.day)// LEFT OFF HERE =>NEED to submit time form, convert back to a string, and save to DB
    clockCard.innerHTML = `
        <form class="d-flex justify-content-evenly" onsubmit="saveClock(event)">
            <table class="table-sm text-center col-6 border-right border-2 border-dark h">
                <thead>
                    <th>Day</th>
                    <th>Hrs</th>
                    <th>Min</th>
                    <th>Sec</th>
                    <th>A/PM</th>
                </thead>
                <tbody>       
                    <td><input class=" clock-input w-75" name="day" type="number" value="${dysInt}"></td>
                    <td><input class=" clock-input w-75" name="hour" type="number" min="1" max="12" value="${hrsInt}" ></td>
                    <td><input class=" clock-input w-75" name="minute" type="number" min="1" max="59" value="${minInt}"></td>
                    <td><input class=" clock-input w-75" name="second" type="number" min="1" max="59" value="${secInt}"></td>
                    <td>
                        <select class="" name="amPm" id="">
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </td>
                </tbody>
            </table>
            <div class="d-flex mt-4 mb-4">
                <input class="mx-1 sub-btn" type="submit" value="Save" onclick="changeclock(event)">
                <input class="mx-1 sub-btn" type="button" value="Back" onclick="defaultClockCard(event)">
            </div>
        </form>
    `
}
//-----------------------------------------------------------------------------------------
function defaultClockCard(e){
    e.preventDefault();
    clockCard.innerHTML = `
    <div>
        <h5><strong>Day:</strong> ${game_items.game_data.day} </h5>
        <h5 ><strong>Active Time:</strong> <span id="timer">${game_items.game_data.time_active}</span> </h5>
    </div>
    <div class="d-flex flex-column justify-content-around">
        <h5><strong>Adjust in-game time:</strong></h5>
        <input type="submit" value="Change" onclick="changeClock(event)">
    </div>
    `
}

//           /||||||||||||||||||--AJAX--|||||||||||||||||||\----------------------------------------

//AJAX: Display Game Data when first loading game=>
function runGame(e){
    var clockIniCards = document.getElementById('top-container');
    console.log('Starting game...');
    //e.preventDefault();
    fetch('http://127.0.0.1:5000/game/run')
        .then(res => res.json() )                                          //res short for response
        
        .then (data =>
            {
            // CLOCK:
            globalThis.game_items = data;
            console.log(game_items.monsters[0])
            var time = data.game_data.time_active;
            var days = data.game_data.day;
            clockCard.innerHTML =
                `
                <div>
                    <h5><strong>Day:</strong> ${days} </h5>
                    <h5 ><strong>Active Time:</strong> <span id="timer">${time}</span> </h5>
                </div>
                <div class="d-flex flex-column justify-content-around">
                    <h5><strong>Adjust in-game time:</strong></h5>
                    <input type="submit" value="Change" onclick="changeClock(event)">
                </div>
            `
        // PLAYER LIST:
        function list_chars(){ 
            playerCardDiv.innerHTML = `<p class="border-bottom border-2 border-dark"><strong>There are ${data.players.length} players in this game</strong></p>`
            for(var i=0; i<data.players.length; i++){
                console.log(data.players[i].name);
                playerCardDiv.innerHTML +=  // <= LEFT OFF HERE CREATE REMOVE & EDIT FOR PLAYERS/ REMOVE FOR MONSTERS 5/19=====================
                `<div class="d-flex justify-content-center border-bottom border-dark p-2 mt-2">
                <div class="d-flex flex-column">
                    <form id="" onsubmit="removePlayerFromItems(event, this)" class="remove-link">
                        <input type="hidden" name="player_id" value="${data.players[i].id}">
                        <input class="sub-btn " value="remove" type="submit">
                    </form>
                        <h4 class="text-center"><strong>${data.players[i].name}</strong></h4>
                        <div class="d-flex justify-content-evenly border-top border-dark">
                            <p><strong>AC: </strong>${data.players[i].ac}</p>
                            <p><strong>|</strong></p>
                            <p><strong>LVL: </strong>${data.players[i].lvl}</p>
                            <p><strong>|</strong></p>
                            <p><strong>HP: </strong>${data.players[i].hp}</p>
                        </div>
                        <table  class="table text-center">
                            <thead>
                                <th>str</th>
                                <th>dex</th>
                                <th>int</th>
                                <th>wis</th>
                                <th>char</th>
                                <th>const</th>
                            </thead>
                            <tbody>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].str})">
                                ${data.players[i].str}
                                </td>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].dex})">
                                ${data.players[i].dex}
                                </td>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].intel})">
                                ${data.players[i].intel}
                                </td>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].wis})">
                                ${data.players[i].wis}
                                </td>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].chars})">
                                ${data.players[i].chars}
                                </td>
                                <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.players[i].const})">
                                ${data.players[i].const}
                                </td>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-between">
                            
                            <form id="" onsubmit="getPlayerFromList(event, this)" class=" ">
                                <input type="hidden" name="player_id" value="${data.players[i].id}">
                                <input class="sub-btn " value="View sheet" type="submit">
                            </form>
                            
                            <input class="sub-btn " value="Add to inititave" type="submit">
                        </div>
                        
                    </div>
                </div>`
            }
        }
        list_chars();
        //Monster List______________________________________________________________________________________
        function list_monst(){
            monsters.innerHTML = `<p class="border-bottom border-2 border-dark"><strong>There are ${data.monsters.length} monsters in this game</strong></p>`
            for(var i=0; i<data.monsters.length; i++){
                console.log(data.monsters[i].id)
                monsters.innerHTML+=
                `<div class="d-flex justify-content-center border-bottom border-dark p-2 mt-2">
                        <div class="d-flex flex-column">
                            <form id="" onsubmit="removeMonsterFromItems(event, this)" class="remove-link">
                                <input type="hidden" name="monster_id" value="${data.monsters[i].id}">
                                <input class="sub-btn " value="remove" type="submit">
                            </form>
                            <h4 class="text-center"><strong>${data.monsters[i].name}</strong></h4>
                            <div class="d-flex justify-content-evenly border-top border-dark">
                                <p><strong>AC: </strong>${data.monsters[i].armor_class}</p>
                                <p><strong>|</strong></p>
                                <p><strong>Challenge: </strong>${data.monsters[i].challenge_rating}</p>
                                <p><strong>|</strong></p>
                                <p><strong>HP: </strong>${data.monsters[i].hit_points}</p>
                            </div>
                            <table  class="table text-center">
                                <thead>
                                    <th>str</th>
                                    <th>dex</th>
                                    <th>int</th>
                                    <th>wis</th>
                                    <th>char</th>
                                    <th>const</th>
                                </thead>
                                <tbody>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].strength})">
                                    ${data.monsters[i].strength}
                                    </td>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].dexterity})">
                                    ${data.monsters[i].dexterity}
                                    </td>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].intelligence})">
                                    ${data.monsters[i].intelligence}
                                    </td>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].wisdom})">
                                    ${data.monsters[i].wisdom}
                                    </td>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].charisma})">
                                    ${data.monsters[i].charisma}
                                    </td>
                                    <td onmouseover="displayMods(this)" onmouseout="revertToStat(this,${data.monsters[i].constitution})">
                                    ${data.monsters[i].constitution}
                                    </td>
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-between">
                                <div>
                                <form id="" onsubmit="inGameMonsterCard(event,this)" class=" ">
                                    <input type="hidden" name="monster_indx" value="${data.monsters[i].index}">
                                    <input class="sub-btn " value="View sheet" type="submit">
                                </form>
                                </div>
                                <input class="sub-btn " value="Add to inititave" type="submit">
                            </div>
                        </div>
                    </div>`
            }
        }
        list_monst();
    })
}
//================================================================================================

//AJAX: Add Monster to game =>
function addMonster(e){
    e.preventDefault();
    var addForm =document.getElementById(`add-monster-form`)
    var form = new FormData(addForm);
    console.log('Clicked: addMonster()', addForm);
    fetch('http://127.0.0.1:5000/save/monster', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        getMonsterData(e,data)
        //Display new card at bottom of monsters ingame list =>
    })
}
//=================================================================================================

//AJAX: Remove Monster from game =>
function removeMonster(e,data){
    e.preventDefault();
    // var removeForm =document.getElementById(`remove-monster-form`)
    // var form = new FormData(removeForm);
    console.log('Clicked: removeMonster()');
    fetch(`http://127.0.0.1:5000/delete/monster/${data}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
}


//=================================================================================================================

//AJAX: Get Card for monster in game =>
function inGameMonsterCard(e,element){
    e.preventDefault();
    console.log('Clicked inGameMonsterCard()', element.monster_indx.value);
    var indx = element.monster_indx.value
    fetch(`https://www.dnd5eapi.co/api/monsters/${indx}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.name); 
        var constMod = modifiers(data.constitution);
        var strMod = modifiers(data.strength);
        var intMod = modifiers(data.intelligence);
        var dexMod = modifiers(data.dexterity);
        var charMod = modifiers(data.charisma);
        var wisMod = modifiers(data.wisdom);
        // Monster Action Cards___________________________________________________________________
        function actionCards(data){
            for(var num=0; num<data.actions.length; num++){
                console.log('looping...',num)
                actions.innerHTML +=
                `<table class="table">
                <p><strong>${data.actions[parseInt(num)].name}</strong></p>
                <thead>
                <th>Description</th>
                </thead>
                <tbody>
                <td>${data.actions[parseInt(num)].desc}</td>
                </tbody>
                </table>`
            }
        }
        //-----------------------------------------------------------------------------------------
        //Monster stats____________________________________________________________________________
        monsters.innerHTML = 
        `<i onclick="displayMonsters(event)" class="fa-solid fa-xmark"></i>
        <h4><strong>${data.name}</strong></h4>
        <form id="" onsubmit="removeMonsterFromItems(event, this)" class=" ">
            <input type="hidden" name="monster_id" value="${data.id}">
            <input class="sub-btn " value="remove" type="submit">
        </form>
        </form>
        <div>
        <p><strong>alignment:</strong> ${data.alignment}</p>
        <p><strong>Race:</strong> ${data.type}</p>
        </div>
        <table class="mx-auto table w-75 text-center">
        <thead>
        <th>HP</th>
        <th>AC</th>
        <th>Speed</th>
        <th>Initiative</th>
        </thead>
        <tbody>
                <td>${data.hit_points}</td>
                <td>${data.armor_class}</td>
                <td>${data.speed.walk}</td>
                <td>${data.dexterity}</td>
            </tbody>
        </table>
        <table class="table text-center">
            <thead>
                <th>Dex</th>
                <th>Str</th>
                <th>Int</th>
                <th>Wis</th>
                <th>Char</th>
                <th>Const</th>
            </thead>
            <tbody>
                <td>${data.dexterity}</td>
                <td>${data.strength}</td>
                <td>${data.intelligence}</td>
                <td>${data.wisdom}</td>
                <td>${data.charisma}</td>
                <td>${data.constitution}</td>
            </tbody>
            <tbody>
                <td>${dexMod}</td>
                <td>${strMod}</td>
                <td>${intMod}</td>
                <td>${wisMod}</td>
                <td>${charMod}</td>
                <td>${constMod}</td>
            </tbody>
        </table>`
        //----------------------------------------------------------------------------
        console.log("actions length:");
        console.log(data.actions.length);
        actionCards(data);
    })
    .catch(err => console.log(err) )
}
//========================================================================================================================

//AJAX: get new monster data &push to gameitems list =>
function getMonsterData(e,data){
    fetch(`https://www.dnd5eapi.co/api/monsters/${data.indx}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        game_items.monsters.push(data);
        displayMonsters(e);
    })
    .catch(err => console.log(err) )
}
//==========================================================================================================

//AJAX: Add Player to game =>
function addPlayer(e){
    e.preventDefault();
    var addForm =document.getElementById(`add-player-form`)
    var form = new FormData(addForm);
    console.log('Clicked: addPlayer()', addForm);
    fetch('http://127.0.0.1:5000/save/player', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        getPlayerData(e,data);
        //Display new card at bottom of player ingame list =>
    })
}
//====================================================================================================

//AJAX: Remove Monster from game =>
function removePlayer(e,data){
    e.preventDefault();
    console.log('Clicked: deletePlayer()', data);
    fetch(`http://127.0.0.1:5000/delete/player/${data}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
}
//=================================================================================================================

//AJAX: Display player card => -------CAN CONDENSE IN FUTURE?------
function displayPlayerCard(e){
    e.preventDefault();
    var playerForm =document.getElementById(`get-player-form`)
    var form = new FormData(playerForm);
    console.log('Clicked: displayPlayerCard()', playerForm)
    fetch('http://127.0.0.1:5000/get/player', {method:'post', body:form})
        .then(res => res.json() )                                          //res short for response
        .then (data =>{
            console.log(data)
            // console.log(game_items);
            var constMod = modifiers(data.const);
            var strMod = modifiers(data.str);
            var intMod = modifiers(data.intel);
            var dexMod = modifiers(data.dex);
            var charMod = modifiers(data.chars);
            var wisMod = modifiers(data.wis);
            playerCardDiv.innerHTML = 
                `<i onclick="displayPlayers(event)" class="fa-solid fa-xmark"></i>
                <h4><strong>${data.name}</strong></h4>
                <div>
                    <p><strong>alignment:</strong> ${data.alignment}</p>
                    <p><strong>Race:</strong> ${data.race}</p>
                </div>
                <table class="mx-auto table w-75 text-center">
                    <thead>
                        <th>HP</th>
                        <th>AC</th>
                        <th>Speed</th>
                        <th>Initiative</th>
                    </thead>
                    <tbody>
                        <td>${data.hp}</td>
                        <td>${data.ac}</td>
                        <td>${data.speed}</td>
                        <td>${dexMod}</td>
                    </tbody>
                </table>
                <table class="table text-center">
                    <thead>
                        <th>Dex</th>
                        <th>Str</th>
                        <th>Int</th>
                        <th>Wis</th>
                        <th>Char</th>
                        <th>Con</th>
                    </thead>
                    <tbody>
                        <td>${data.dex}</td>
                        <td>${data.str}</td>
                        <td>${data.intel}</td>
                        <td>${data.wis}</td>
                        <td>${data.chars}</td>
                        <td>${data.const}</td>
                    </tbody>
                    <tbody>
                        <td>${dexMod}</td>
                        <td>${strMod}</td>
                        <td>${intMod}</td>
                        <td>${wisMod}</td>
                        <td>${charMod}</td>
                        <td>${constMod}</td>
                    </tbody>
                </table>
                <div class="d-flex justify-content-evenly">
                    <form id="" onsubmit="removePlayerFromItems(event, this)" class="">
                        <input type="hidden" name="player_id" value="${data.id}">
                        <input class="sub-btn " value="Remove" type="submit">
                    </form>
                    <form id="" onsubmit="displayPlayerEditForm(event,this)" class="">
                        <input type="hidden" name="player_id" value="${data.id}">
                        <input class="sub-btn " value="Edit" type="submit">
                    </form>
                </div>`
            })
    }
//===============================================================================================

// Update Player =>
function updatePlayer(e){
    e.preventDefault();
    var editForm =document.getElementById(`edit-player-form`)
    var form = new FormData(editForm);
    console.log('Clicked: updatePlayer()', editForm);
    fetch('http://127.0.0.1:5000/update/player', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        updatePlayerInItems(e,data);
        
    })
}

//--////////////////////////__API SEARCH__\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//AJAX: Display searched Monster Card => -------CAN CONDENSE IN FUTURE?------
function monsterSearch(e){
    e.preventDefault();
    var searchForm2 =document.getElementById(`monster-form-2`)
    var form = new FormData(searchForm2);
    console.log('Clicked: monsterSearch()', searchForm2)
    fetch('http://127.0.0.1:5000/search/monsters', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        console.log(data.name); 
        var constMod = modifiers(data.constitution);
        var strMod = modifiers(data.strength);
        var intMod = modifiers(data.intelligence);
        var dexMod = modifiers(data.dexterity);
        var charMod = modifiers(data.charisma);
        var wisMod = modifiers(data.wisdom);
        // Monster Action Cards___________________________________________________________________
        function actionCards(data){
            for(var num=0; num<data.actions.length; num++){
                console.log('looping...',num)
                    actions.innerHTML +=
                    `<table class="table">
                        <p><strong>${data.actions[parseInt(num)].name}</strong></p>
                        <thead>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            <td>${data.actions[parseInt(num)].desc}</td>
                        </tbody>
                    </table>`
            }
        }
        //-----------------------------------------------------------------------------------------
        //Monster stats____________________________________________________________________________
        monsters.innerHTML = 
        `<i onclick="displayMonsters(event)" class="fa-solid fa-xmark"></i>
        <h4><strong>${data.name}</strong></h4>
        <form id="" onsubmit="addMonsterToGame(event,this)" class=" ">
            <input type="hidden" name="monster_indx" value="${data.index}">
            <input type="submit" value="Add to game">
        </form>
        <div>
            <p><strong>alignment:</strong> ${data.alignment}</p>
            <p><strong>Race:</strong> ${data.type}</p>
        </div>
        <table class="mx-auto table w-75 text-center">
            <thead>
                <th>HP</th>
                <th>AC</th>
                <th>Speed</th>
                <th>Initiative</th>
            </thead>
            <tbody>
                <td>${data.hit_points}</td>
                <td>${data.armor_class}</td>
                <td>${data.speed.walk}</td>
                <td>${data.dexterity}</td>
            </tbody>
        </table>
        <table class="table text-center">
            <thead>
                <th>Dex</th>
                <th>Str</th>
                <th>Int</th>
                <th>Wis</th>
                <th>Char</th>
                <th>Const</th>
            </thead>
            <tbody>
                <td>${data.dexterity}</td>
                <td>${data.strength}</td>
                <td>${data.intelligence}</td>
                <td>${data.wisdom}</td>
                <td>${data.charisma}</td>
                <td>${data.constitution}</td>
            </tbody>
            <tbody>
                <td>${dexMod}</td>
                <td>${strMod}</td>
                <td>${intMod}</td>
                <td>${wisMod}</td>
                <td>${charMod}</td>
                <td>${constMod}</td>
            </tbody>
        </table>`
        //----------------------------------------------------------------------------
        console.log("actions length:");
        console.log(data.actions.length);
        actionCards(data);
    })
}
//================================================================================================

//AJAX: Monster Search-by-Challenge Rating =>
function monsterSearch2(e){
    e.preventDefault();
    var searchForm = document.getElementById('monster-form2');
    var rating = document.getElementById('rating').value;
    var form = new FormData(searchForm);
    console.log('monster Challenge Rating Search =>', rating);
    fetch('http://127.0.0.1:5000/search/monsters/ch', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        // Monster Search Results_______________________________________________________________________________________________
        function list_res(){ 
            monsters.innerHTML = `
            <i onclick="displayMonsters(event)" class="fa-solid fa-xmark"></i>
            <p><strong>Displaying ${data.results.length} results for challenge rating ${rating}:</strong></p>`
            for(var i=0; i<data.results.length; i++){
                console.log(data.results[i].index);
                monsters.innerHTML +=
                `<div class="d-flex justify-content-between border-bottom border-dark p-2 mt-2">
                    <p><strong>${i+1}.</strong></p>
                    <h5 class="text-start">${data.results[i].name}</h5>
                        <div class="d-flex justify-content-end">
                            <form id="" onsubmit="addMonsterToGame(event,this)" class=" ">
                                <input type="hidden" name="monster_indx" value="${data.results[i].index}">
                                <input class="sub-btn" value="add" type="submit">
                            </form>
                            <h5>|</h5>
                            <form id="" onsubmit="getMonsterFromList(event,this)" class=" ">
                                <input type="hidden" name="monster_indx" value="${data.results[i].index}">
                                <input class="sub-btn" value="view" type="submit">
                            </form>
                        </div>
                    </div>`
            }
            actions.innerHTML = '<p class="border-bottom border-2 border-dark"></p>'
        }
        list_res();
        //-------------------------------------------------------------------------------------------------
    })
}
//=================================================================================================
window.onload = runGame();