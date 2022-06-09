//------------------------------------------------Game_Dashboard_Script----------------------------------------------------------------------- 


// const print = x => console.log(x);
//variables__________________________________________________
var monster_search_form = document.getElementById('monsterForm');
var monsters = document.getElementById('monster-result-card');
var monster = document.getElementById('monster-sidebar');
var actions = document.getElementById('actions');
var playerCardDiv = document.getElementById('participant-list');
var centerCard = document.getElementById('notes-card');
var clockCard = document.getElementById('clock-card');
var noteTable = document.getElementById('note-table-body');
var initiativeCard = document.getElementById('ini-cont');
var clearIniBtn = document.getElementById('ini-btn');
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

// Add To initiative Card_____________________________________________________________________
function addPtoIni(e,element){                       //Left off here: find a way to add to INI and save? to game new DB table?
    e.preventDefault();
    clearIniBtn.type = "button";
        for(i=0; i<game_items.players.length; i++){
            // console.log(game_items.players[i].id);
            if(element.player_id.value == game_items.players[i].id){
                data = game_items.players[i];
            }
        }
        initiativeCard.innerHTML += `
            <div class="ini mx-1 w-25 border-end border-2 border-dark d-flex justify-content-evenly align-items-center">
                    <p class="text-center col-4 border-end border-1 border-secondary"><strong>${data.name}</strong></p>
                    <p class="col-4"><strong>HP:</strong> <input class="w-50" type="number" value="${data.hp}"></p>
            </div>
        `
}
//======
function addMtoIni(e,element){
    e.preventDefault();
    clearIniBtn.type = "button";
    console.log('THis', game_items);
    for(i=0; i<game_items.monsters.length; i++){
        // console.log(game_items.players[i].id);
        if(element.monster_idx.value == game_items.monsters[i].index){
            console.log(game_items.monsters[i]);
            var data = game_items.monsters[i];
        }
    }
    initiativeCard.innerHTML += `
        <div class="ini mx-1 w-25 border-end border-2 border-dark d-flex justify-content-evenly align-items-center">
                <p class="text-center col-4 border-end border-1 border-secondary"><strong>${data.name}</strong></p>
                <p class="col-4"><strong>HP:</strong> <input class="w-50" type="number" value="${data.hit_points}"></p>
        </div>
    `
}
//-----------------------------------------------------------------------------------------------------------------------
function clearIniCards(e,element){
    e.preventDefault();
    clearIniBtn.type = "hidden";
    initiativeCard.innerHTML= `
    `
}

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
    inGameMonsterCard(e,element);
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
    <p onclick="defaultCenterCard(this)" class="fa-solid fa-xmark"></p>
    <h1 class="text-center">Create New Character</h1>
    <div class="d-flex justify-content-between">
        <form onsubmit="addPlayer(event)" class="mx-auto" id="add-player-form">
            <div class="d-flex justify-content-evenly p-2">
                <input required minlength="4" class="" type="text" name="name" placeholder="Name...">
                <input required minlength="4" class="" type="text" name="race" placeholder="Race">
            </div>
            <div class="d-flex justify-content-evenly p-2">
                <input required minlength="4" class="" type="text" name="alignment" placeholder="alignment">
                <input required minlength="4" class="" type="text" name="class_type" placeholder="class">
            </div>
            <table class="table text-center player-edit">
                <thead>
                    <th>AC</th>
                    <th>HP</th>
                    <th>Speed</th>
                    <th>LVL</th>
                </thead>
                <tbody>
                    <td><input required class="w-50" min="1" type="number" name="ac"></td>
                    <td><input required class="w-50" min="1" type="number" name="hp"></td>
                    <td><input required class="w-50" min="1" type="number" name="speed"></td>
                    <td><input required class="w-50" min="1" type="number" name="lvl"></td>
                </tbody>
            </table>
            <table class="table text-center player-edit">
                <thead>
                    <th>str</th>
                    <th>dex</th>
                    <th>int</th>
                    <th>wis</th>
                    <th>char</th>
                    <th>const</th>
                </thead>
                <tbody>
                    <td><input required class="w-50" min="1" max="30" type="number" name="str"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="dex"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="intel"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="wis"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="chars"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="const"></td>
                </tbody>
            </table>
            <div class="d-flex justify-content-evenly p-3">
                <input class="sub-btn" type="submit" value="Submit">
                <input class="sub-btn" onclick="displayPlayerForm(this)" type="button" value="Clear All">
            </div>
        </form>
    </div>
    `
}
//-----------------------------------------------------------------------------------------------

//Display Edit Player Form______________________________________________________________________
function displayPlayerEditForm(e,element){
    e.preventDefault();
    for(i=0; i<game_items.players.length; i++){
        // console.log(game_items.players[i].id);
        if(element.player_id.value == game_items.players[i].id){
            data = game_items.players[i];
        }
    }
    console.log(data);
    centerCard.innerHTML = `
    <p onclick="defaultCenterCard(this)" class="fa-solid fa-xmark"></p>
    <form id="" onsubmit="displayPlayerEditForm(event,this)" class="">
        <input type="hidden" name="player_id" value="${data.id}">
        <input class="sub-btn" value="Reset" type="submit">
    </form>
    <h1 class="text-center">Edit Character</h1>
    <div class="d-flex justify-content-between">
        <form onsubmit="updatePlayer(event)" class="mx-auto" id="edit-player-form">
            <div class="d-flex justify-content-evenly p-2">
                <input required minlength="4" class="" type="text" name="name" value="${data.name}">
                <input required minlength="4" class="" type="text" name="race" value="${data.race}">
            </div>
            <div class="d-flex justify-content-evenly p-2">
                <input required minlength="4" class="" type="text" name="alignment" value="${data.alignment}">
                <input required minlength="4" class="" type="text" name="class_type" value="${data.class_type}">
            </div>
            <table class="table text-center player-edit">
                <thead>
                    <th>AC</th>
                    <th>HP</th>
                    <th>Speed</th>
                    <th>LVL</th>
                </thead>
                <tbody>
                    <td><input required class="w-50" min="1" type="number" name="ac" value="${data.ac}"></td>
                    <td><input required class="w-50" min="1" type="number" name="hp" value="${data.hp}"></td>
                    <td><input required class="w-50" min="1" type="number" name="speed" value="${data.speed}"></td>
                    <td><input required class="w-50" min="1" type="number" name="lvl"value="${data.lvl}"></td>
                </tbody>
            </table>
            <table class="table text-center player-edit">
                <thead>
                    <th>str</th>
                    <th>dex</th>
                    <th>int</th>
                    <th>wis</th>
                    <th>char</th>
                    <th>const</th>
                </thead>
                <tbody>
                    <td><input required class="w-50" min="1" max="30" type="number" name="str" value="${data.str}"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="dex" value="${data.dex}"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="intel" value="${data.intel}"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="wis" value="${data.wis}"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="chars" value="${data.chars}"></td>
                    <td><input required class="w-50" min="1" max="30" type="number" name="const" value="${data.const}"></td>
                </tbody>
            </table>
            <div class="d-flex justify-content-evenly p-3">
                <input type="hidden" name="id" value="${data.id}">
                <input type="hidden" name="dm_id" value="${data.dm_id}">
                <input type="hidden" name="creator_id" value="${data.creator_id}">
                <input type="hidden" name="game_id" value="${data.game_id}">
                <input class="sub-btn" type="submit" value="Submit">
            </div>
        </form>
    </div>
    `
}

//Revert Center Card to Default View_____________________________________________________________
function defaultCenterCard(e){
    // e.preventDefault();
    html = `
        <h2 class="title-txt text-center border-bottom border-3 border-dark mb-4 pb-4">Notes</h2>
        <div class="d-flex justify-content-evenly align-items-center">
            <form id="note-form" onsubmit="saveNote(event)" class="d-flex flex-column p-2">
                <input required name="title" type="text" minlength="4" maxlength="15" placeholder="Title">
                <textarea required class="mt-2" minlength="10" placeholder="Content must be at least 10 characters." name="content" id="" cols="30" rows="10"></textarea>
                <input class="sub-btn mt-2" type="submit" value="save note">
            </form>
            <div id="note-table" class="notes-table p-2 w-50">
                <table class="table text-center note-tbl">
                    <thead>
                        <th>title</th>
                        <th>options</th>
                    </thead>
                    `
                for(var i=0; i<game_items.notes.length; i++){
                    html +=
                    `<tbody id="note-table-body">
                        <td>${game_items.notes[i].title}</td>
                        <td>
                            <div class="d-flex justify-content-evenly">
                                <form id="" onsubmit="noteEditForm(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="view" type="submit">
                                </form> | 
                                <form id="" onsubmit="removeNoteFromItems(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="delete" type="submit">
                                </form>
                            </div>
                        </td>
                    </tbody>`
                }
            html+= `
                </table>
            </div>
        </div>
        `
        html += `
                <div class="d-flex flex-column justify-content-center mb-2">
                    <h2 class="text-center">Spells</h2>
                    <form class="mx-auto" onsubmit="getSpellList(event,this)">
                        <div class="d-flex">
                            <select name="spellSchool" id="">
                                <option disabled selected value="">School</option>
                                <option value="conjuration">Conjuration</option>
                                <option value="necromancy">Necromancy</option>
                                <option value="evocation">Evocation</option>
                                <option value="abjuration">Abjuration</option>
                                <option value="transmutation">Transmutation</option>
                                <option value="divination">Divination</option>
                                <option value="enchantment">Enchantment</option>
                                <option value="illusion">Illusion</option>
                            </select>
                            <select name="spellLvl" id="">
                                <option disabled selected value="">Level</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <input class="sub-btn w-100 mt-3" type="submit">
                    </form>
                </div>
                `
    centerCard.innerHTML = html
}
//-----------------------------------------------------------------------------------------------

//Display Note Edit form_________________________________________________________________________
function noteEditForm(e,element){
    e.preventDefault();
    console.log(element.note_id.value)
    for(i=0; i<game_items.notes.length; i++){
        // console.log(game_items.players[i].id);
        if(element.note_id.value == game_items.notes[i].id){
            data = game_items.notes[i];
        }
    }
    html = `
        <h2 class="title-txt text-center border-bottom border-3 border-dark mb-4 pb-4">Notes</h2>
        <div class="d-flex justify-content-evenly align-items-center">
            <form id="update-note-form" onsubmit="updateNote(event)" class="d-flex flex-column p-2">
                <input required name="title" minlength="4" maxlength="15" type="text" value="${data.title}">
                <textarea required class="mt-2" minlength="10" placeholder="Content must be at least 10 characters." name="content" id="" cols="30" rows="10">${data.content}</textarea>
                <div class="d-flex justify-content-evenly">
                    <input class="sub-btn mt-2" type="submit" value="save note">
                    <input name="id" type="hidden" value="${data.id}">
                    <input class="sub-btn mt-2" onclick="defaultCenterCard(event)" type="button" value="Back">
                </div>
            </form>
            <div id="note-table" class="notes-table p-2 w-50">
                <table class="table text-center note-tbl">
                    <thead>
                        <th>title</th>
                        <th>options</th>
                    </thead>
                    `
                for(var i=0; i<game_items.notes.length; i++){
                    html +=
                    `<tbody id="note-table-body">
                        <td>${game_items.notes[i].title}</td>
                        <td>
                            <div class="d-flex justify-content-evenly">
                                <form id="" onsubmit="noteEditForm(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="view" type="submit">
                                </form> | 
                                <form id="" onsubmit="removeNoteFromItems(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="delete" type="submit">
                                </form>
                            </div>
                        </td>
                    </tbody>`
                }
            html+= `
                </table>
            </div>
        </div>
        `
    centerCard.innerHTML = html
}

//Take new note and push to game_items
function getNoteData(e,data){
    console.log(data);
    game_items.notes.push(data);
    defaultCenterCard(e);
    
}
//-------------------------------------------------------------------------------------------------------------

//Update Note in game_items_____________________________________________________________________________________
function updateNoteInItems(e,data){
    e.preventDefault();
    console.log(data.id);
    for(i=0; i<game_items.notes.length; i++){
        // console.log(game_items.players[i].id);
        if(data.id == game_items.notes[i].id){
            game_items.notes[i] = data;
            console.log(game_items.notes[i]);
        }
    }
    console.log(game_items.notes);
    defaultCenterCard(e);
}
//--------------------------------------------------------------------------------------------------------------

//Remove note from game_items____________________________________________________________________________________
function removeNoteFromItems(e,element){
    e.preventDefault();
    console.log(element.note_id.value);
    console.log(game_items.notes.length);
    for(i=0; i<game_items.notes.length; i++){
        // console.log(game_items.players[i].id);
        if(element.note_id.value == game_items.notes[i].id){
            game_items.notes.splice(i,1);
        }
    }
    console.log(game_items.notes);
    deleteNote(e,element.note_id.value);
    defaultCenterCard(e);
}
//-----------------------------------------------------------------------------------------------------------------

//Display players in game_____________________________________________________________________________________________

function displayPlayers(e){
    playerCardDiv.innerHTML = `<p class="border-bottom border-2 border-dark"><strong>There are ${game_items.players.length} players in this game</strong></p>`
    for(var i=0; i<game_items.players.length; i++){
        console.log(game_items.players[i].name);
        playerCardDiv.innerHTML += 
        `<div class="player-crd d-flex justify-content-center border-bottom border-light p-2 mt-2">
            <div class="d-flex flex-column">
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
                            <input class="sub-btn " value="View Card" type="submit">
                        </form>
                    </div>
                    <form id="" onsubmit="addPtoIni(event,this)" class=" ">
                        <input type="hidden" name="player_id" value="${game_items.players[i].id}">
                        <input class="sub-btn" value="Add to inititave" type="submit">
                    </form>
                </div>
            </div>
        </div>`
    }
}

//----------------------------------------------------------------------------------------------------------------------------------

//Take new Player and push to game_items________________________________________________________________________________
function getPlayerData(e,data){
    console.log(data);
    game_items.players.push(data);
    displayPlayers(e);
    defaultCenterCard(e);
    
}
//------------------------------------------------------------------------------------------------------------------------------

//Remove monster from game_items____________________________________________________________________________________
function removeMonsterFromItems(e,element){
    e.preventDefault();
    console.log(element.monster_idx.value);
    console.log(game_items.monsters.length)
    for(i=0; i<game_items.monsters.length; i++){
        if(element.monster_idx.value == game_items.monsters[i].index ){
            data = game_items.monsters[i].id
            game_items.monsters.splice(i,1);
        }
    }
    console.log(game_items.monsters);
    removeMonster(e,data);
    displayMonsters(e);
}
//-----------------------------------------------------------------------------------------------------------

//Remove player from game_items_________________________________________________________________________
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

//Update player in game_items__________________________________________________________________________
function updatePlayerInItems(e,data){
    e.preventDefault();
    console.log(data.id);
    for(i=0; i<game_items.players.length; i++){
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
//-----------------------------------------------------------------------------------------------------

//Display monsters in game_______________________________________________________________________ 
function displayMonsters(e){
    e.preventDefault();
    monsters.innerHTML = `<p><strong>There are ${game_items.monsters.length} monsters in this game</strong></p>`
    for(var i=0; i<game_items.monsters.length; i++){
        monsters.innerHTML+=
        `<div class="monst-crd d-flex justify-content-center border-bottom border-light p-2 mt-2">
            <div class="d-flex flex-column">
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
                            <input class="sub-btn" value="View Card" type="submit">
                        </form>
                    </div>
                    <form id="" onsubmit="addMtoIni(event,this)" class=" ">
                        <input type="hidden" name="monster_idx" value="${game_items.monsters[i].index}">
                        <input class="sub-btn" value="Add to inititave" type="submit">
                    </form>
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
    var dysInt = parseInt(game_items.game_data.day)
    clockCard.innerHTML = `
        <form id="save-clock-form" class="d-flex justify-content-between align-items-center p-2" onsubmit="saveClock(event, this)">
            <div class="col-7 d-flex justify-content-around"> 
                <input class=" clock-input mx-2" name="day" type="number" value="${dysInt}">
                <input class=" mx-2" name="time_active" type="time" min="1" max="12" placeholder="" value="${game_items.clock_data.time_active24}" >
            </div>
            <div class="col-4 d-flex">
                <input type="hidden" name="id" value="${game_items.clock_data.clock_id}">
                <input class="mx-1 sub-btn" type="submit" value="Save">
                <input class="mx-1 sub-btn" type="button" value="Back" onclick="defaultClockCard(event)">
            </div>
        </form>
    `
}

//-----------------------------------------------------------------------------------------

//Default clock Card_______________________________________________________________________
function defaultClockCard(e){
    e.preventDefault();
    console.log(game_items['clock_data']);
    clockCard.innerHTML = `
    <div>
        <h5><strong>Day:</strong> ${game_items.clock_data.day} </h5>
        <h5><strong>Time:</strong> <span id="timer">${game_items.clock_data.time_active}</span> </h5>
    </div>
    <div class="d-flex flex-column justify-content-around">
        
        <input class="sub-btn" type="submit" value="Change" onclick="changeClock(event)">
    </div>
    `
}
//------------------------------------------------------------------------------------------


//           /||||||||||||||||||--AJAX--|||||||||||||||||||\----------------------------------------

//AJAX: Display Game Data when first loading game=>
function runGame(e){
    console.log('Starting game...');
    //e.preventDefault();
    fetch('http://127.0.0.1:5000/game/run')
        .then(res => res.json() )                                          //res short for response
        
        .then (data =>
            {
            // CLOCK:
            globalThis.iniList = [];
            globalThis.game_items = data;
            console.log(game_items.notes[0])
            var time = data.clock_data.time_active;
            var days = data.clock_data.day;
            clockCard.innerHTML =
                `
                <div>
                    <h5><strong>Day:</strong> ${days} </h5>
                    <h5 ><strong>Time:</strong> <span id="timer">${time}</span> </h5>
                </div>
                <div class="d-flex flex-column justify-content-around">
                    <input class="sub-btn" type="submit" value="Change" onclick="changeClock(event)">
                </div>
            `
        // NOTES:
        function list_notes(){
            html = `
            <h2 class="title-txt text-center border-bottom border-3 border-dark mb-4 pb-4">Notes</h2>
            <div class="d-flex justify-content-evenly align-items-center">
                <form id="note-form" onsubmit="saveNote(event)" class="d-flex flex-column p-2">
                    <input required name="title" minlength="4" maxlength="15" type="text" placeholder="Title">
                    <textarea required class="mt-2" minlength="10" placeholder="Content must be at lest 10 characters" name="content" id="" cols="30" rows="10"></textarea>
                    <input class="sub-btn mt-2" type="submit" value="save note">
                </form>
                <div id="note-table" class=" p-2 w-50">
                    <table class="table text-center note-tbl">
                        <thead>
                            <th>title</th>
                            <th>options</th>
                        </thead>
                        `
                    for(var i=0; i<game_items.notes.length; i++){
                        html +=
                        `<tbody id="note-table-body">
                            <td>${game_items.notes[i].title}</td>
                            <td >
                                <div class="d-flex justify-content-evenly">
                                <form id="" onsubmit="noteEditForm(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="view" type="submit">
                                </form> | 
                                <form id="" onsubmit="removeNoteFromItems(event,this)" class="">
                                    <input type="hidden" name="note_id" value="${game_items.notes[i].id}">
                                    <input class="sub-btn " value="delete" type="submit">
                                </form>
                                </div>
                            </td>
                        </tbody>`
                    }
                html+= `
                    </table>
                </div>
            </div>
        `
                html += `
                <div class="d-flex flex-column justify-content-center mb-2">
                    <h2 class="text-center">Spells</h2>
                    <form class="mx-auto" onsubmit="getSpellList(event,this)">
                        <div class="d-flex">
                            <select name="spellSchool" id="">
                                <option disabled selected value="">School</option>
                                <option value="conjuration">Conjuration</option>
                                <option value="necromancy">Necromancy</option>
                                <option value="evocation">Evocation</option>
                                <option value="abjuration">Abjuration</option>
                                <option value="transmutation">Transmutation</option>
                                <option value="divination">Divination</option>
                                <option value="enchantment">Enchantment</option>
                                <option value="illusion">Illusion</option>
                            </select>
                            <select name="spellLvl" id="">
                                <option disabled selected value="">Level</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <input class="sub-btn w-100 mt-3" type="submit">
                    </form>
                </div>
                `
                centerCard.innerHTML = html;
            }
        
        list_notes();
        // PLAYER LIST:
        function list_chars(){ 
            playerCardDiv.innerHTML = `<p class="border-bottom border-2 border-dark"><strong>There are ${data.players.length} players in this game</strong></p>`
            for(var i=0; i<data.players.length; i++){
                console.log(data.players[i].name);
                playerCardDiv.innerHTML +=  // <= LEFT OFF HERE CREATE REMOVE & EDIT FOR PLAYERS/ REMOVE FOR MONSTERS 5/19=====================
                `<div class="player-crd d-flex justify-content-center border-bottom border-light p-2 mt-2">
                    <div class="d-flex flex-column">
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
                                <input class="sub-btn " value="View Card" type="submit">
                            </form>
                            <form id="" onsubmit="addPtoIni(event,this)" class="">
                                <input type="hidden" name="player_id" value="${data.players[i].id}">
                                <input class="sub-btn" value="Add to inititave" type="submit">
                            </form>
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
                `<div class="monst-crd d-flex justify-content-center border-bottom border-light p-2 mt-2">
                        <div class="d-flex flex-column">
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
                                        <input class="sub-btn " value="View Card" type="submit">
                                    </form>
                                </div>
                                <form id="" onsubmit="addMtoIni(event,this)" class=" ">
                                    <input type="hidden" name="monster_idx" value="${data.monsters[i].index}">
                                    <input class="sub-btn" value="Add to inititave" type="submit">
                                </form>
                            </div>
                        </div>
                    </div>`
            }
        }
        list_monst();
    })
}
//================================================================================================

//AJAX: Save Clock =>
function saveClock(e,element){
    e.preventDefault();
    var clockForm =document.getElementById(`save-clock-form`)
    var form = new FormData(clockForm);
    console.log('Clicked: saveClock()', form);
    fetch('http://127.0.0.1:5000/update/clock', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        game_items.clock_data.time_active = data.time_active;
        game_items.clock_data.day = data.day;
        console.log(game_items.clock_data)
        defaultClockCard(e);
    })
}

//AJAX: Save note =>
function saveNote(e){
    e.preventDefault();
    var noteForm =document.getElementById(`note-form`)
    var form = new FormData(noteForm);
    console.log('Clicked: saveNote()', noteForm);
    fetch('http://127.0.0.1:5000/save/note', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        getNoteData(e,data);
    })
}
//==================================================================================

//AJAX: update note =>
function updateNote(e){
    e.preventDefault();
    var noteForm =document.getElementById(`update-note-form`)
    var form = new FormData(noteForm);
    console.log('Clicked: saveNote()', noteForm);
    fetch('http://127.0.0.1:5000/update/note', {method:'Post', body: form})
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        updateNoteInItems(e,data);
    })
}
//===================================================================================

//AJAX: Remove Note from game =>
function deleteNote(e,data){
    e.preventDefault();
    console.log('Clicked: deleteNote()', data);
    fetch(`http://127.0.0.1:5000/delete/note/${data}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
}
//=================================================================================================================

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

//AJAX: get new monster data &push to gameitems list =>
function getMonsterData(e,data){
    fetch(`https://www.dnd5eapi.co/api/monsters/${data.indx}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        game_items.monsters.push(data);
        console.log(game_items.monsters);
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

//AJAX: Remove Player from game =>
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
                `<p onclick="displayPlayers(event)" class="fa-solid fa-xmark"></p>
                <h4><strong>${data.name}</strong></h4>
                <div>
                    <p><strong>alignment:</strong> ${data.alignment}</p>
                    <p><strong>Race:</strong> ${data.race}</p>
                    <p><strong>Class:</strong> ${data.class_type}</p>
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
                    <form id="" onsubmit="displayPlayerEditForm(event,this)" class="">
                        <input type="hidden" name="player_id" value="${data.id}">
                        <input class="sub-btn " value="Edit" type="submit">
                    </form>
                    <form id="" onsubmit="removePlayerFromItems(event, this)" class="">
                        <input type="hidden" name="player_id" value="${data.id}">
                        <input class="sub-btn " value="Remove" type="submit">
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

//API: Get Card for monster in game =>
function inGameMonsterCard(e,element){
    e.preventDefault();
    console.log('Clicked inGameMonsterCard()', element.monster_indx.value);
    var indx = element.monster_indx.value
    fetch(`https://www.dnd5eapi.co/api/monsters/${indx}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.name); 
        console.log(data.speed)
        var constMod = modifiers(data.constitution);
        var strMod = modifiers(data.strength);
        var intMod = modifiers(data.intelligence);
        var dexMod = modifiers(data.dexterity);
        var charMod = modifiers(data.charisma);
        var wisMod = modifiers(data.wisdom);

        // Monster Action Cards___________________________________________________________________
        function actionCards(data){
            actions.innerHTML +=`
            <h5 class="border-bottom border-dark border-2"><strong>Actions</strong></h5>
            `
            actions.innerHTML += `
            <div>
            `
            for(var num=0; num<data.actions.length; num++){
                console.log('looping...',num)
                actions.innerHTML +=
                `
                    <p>${data.actions[parseInt(num)].name}:</p>
                    <p class="border-bottom border-dark border-2">${data.actions[parseInt(num)].desc}</p>
                `
            }
            if(data.legendary_actions.length >0){
                var lenAct = data.legendary_actions;
                actions.innerHTML += `
                    <h5><strong>Legendary Actions</strong></h5>
                `
                for(var i=0; i<lenAct.length; i++){
                    actions.innerHTML += `
                    <p>${lenAct[i].name}</p>
                    <p class="border-bottom border-dark border-2">${lenAct[i].desc}</p>
                    `
                }
            }
            actions.innerHTML +=`
            </div>`
            actions.innerHTML += `
                <form id="" onsubmit="removeMonsterFromItems(event, this)" class="d-flex justify-content-center">
                    <input type="hidden" name="monster_idx" value="${data.index}">
                    <input class="sub-btn " value="remove" type="submit">
                </form>
            `
        }
        //-----------------------------------------------------------------------------------------
        //Monster stats____________________________________________________________________________
        var html = 
        `<p onclick="displayMonsters(event)" class="fa-solid fa-xmark"></p>
        <h4><strong>${data.name}</strong></h4>
        <div>
            <p><strong>alignment:</strong> ${data.alignment}</p>
            <p><strong>Race:</strong> ${data.type}</p>
            <p><strong>Size:</strong> ${data.size}</p>
        </div>
        <table class="mx-auto table w-75 text-center">
            <thead>
                <th>Challenge</th>
                <th>HP</th>
                <th>AC</th>
                <th>Initiative</th>
            </thead>
            <tbody>
                <td>${data.challenge_rating}</td>
                <td>${data.hit_points}</td>
                <td>${data.armor_class}</td>
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
        if(data.proficiencies.length > 0){
            html+=`
            <div class="border-bottom border-dark border-2">
                <p><strong>Proficiencies</strong></p>
                <p>- 
            `
            var prof = data.proficiencies
            for(i=0; i< prof.length; i++){
                html +=`
                ${prof[i].proficiency.name}(${prof[i].value}) - 
                `
            }
            html+=`
                </p>
            </div>
            `
        }
        if(data.senses){
            html += `
                <div class="border-bottom border-dark border-2">
                    <p><strong>Senses</strong></p>
                        
            `
            for(var [key,value] of Object.entries(data.senses)){
                html += `
                <p>${key}: ${value}</p>
                `
            }
            html+= `
                
                    </div>
                `
        }
        html +=`
        <div class="border-bottom border-dark border-2">
        <p><strong>Speed</strong></p>
        <p>| 
        
        `
        for(var [key,value] of Object.entries(data.speed)){
            html += `
            ${key}: ${value} 
            `
        }
        html+= `
            |</p>
        </div>
        `
        html +=`
            <div class="border-bottom border-dark border-2">
                <p><strong>Languages</strong></p>
                <p>
        `
        if(data.languages.length > 0){
        html += `${data.languages}</p>`
        }
        if(data.languages.length < 1){
            html += `None</p>`
            }
        html+=`
        </div>
        `

        if(data.condition_immunities.length > 0){
            var conIm = data.condition_immunities;
            html += `
            <div class="border-bottom border-dark border-2">
                <p><strong>Condition Immunities</strong></p>
                <p>| 
            
            `
            for(var i=0; i<conIm.length; i++){
                html+= `
                ${conIm[i].name} |
                `
            }
            html+= `
                </p>
            </div>
            `
        }
        if(data.damage_immunities.length > 0){
            var damIm = data.damage_immunities;
            html += `
            <div class="border-bottom border-dark border-2">
                <p><strong>Damage Immunities</strong></p>
                <p>| 
            `
            for(var i=0; i<damIm.length; i++){
                html += `
                ${damIm[i]} |
                `
            }
            html+= `
                </p>
            </div>
            `
        }
        if(data.damage_vulnerabilities.length > 0){
            var damV = data.damage_vulnerabilities;
            html += `
            <div class="border-bottom border-dark border-2">
                <p><strong>Damage Vulnerabilities</strong></p>
                <p>| 
            `
            for(var i=0; i<damV.length; i++){
                html += `
                ${damV[i]} |
                `
            }
            html+= `
                </p>
            </div>
            `
        }
        if(data.special_abilities.length > 0){
            var spcAbil = data.special_abilities;
            html += `
            <div>
                <h5><strong>Special Abilities</strong></h5>
                
            `
            for(var i=0; i<spcAbil.length; i++){
                html += ` 
                <p>${spcAbil[i].name}:</p>
                <p class="border-bottom border-dark border-2">${spcAbil[i].desc}</p>
                `
            }
            html+= `
            </div>
            `
        }


        monsters.innerHTML = html;
        //----------------------------------------------------------------------------
        console.log("actions length:");
        console.log(data.actions.length);
        actionCards(data);
    })
    .catch(err => console.log(err) )
}
//========================================================================================================================


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
            <p onclick="displayMonsters(event)" class="fa-solid fa-xmark"></p>
            <p  class="border-bottom border-2 border-dark"><strong>Displaying ${data.results.length} results for challenge rating ${rating}:</strong></p>`
            for(var i=0; i<data.results.length; i++){
                console.log(data.results[i].index);
                monsters.innerHTML +=
                `<div class="d-flex justify-content-between border-bottom border-dark p-2 mt-2">
                    <h5 class="text-start"><strong>${i+1}. </strong>${data.results[i].name}</h5>
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

//API: Spell Search =>
function getSpellList(e,element){
    e.preventDefault();
    console.log('Clicked getSpellList()');
    fetch(`https://www.dnd5eapi.co/api/spells?level=${element.spellLvl.value}&school=${element.spellSchool.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        var html = `
            <p onclick="defaultCenterCard(this)" class="fa-solid fa-xmark"></p>
            <div id="spell-section"  class="d-flex flex-column justify-content-center">
                <table id="spell-table" class="table note-tbl w-75 mx-auto">
                    <thead>
                        <th>${data.count} Level ${element.spellLvl.value}, ${element.spellSchool.value} Spells...</th> 
                    </thead>
        `
        for(i=0; i<data.results.length;i++){
            html+=`
                <tbody>
                    <td>
                        <form onsubmit="getSpellCard(event,this)">
                            <input type="hidden" name="spellIndex" value="${data.results[i].index}">
                            <input class="sub-btn" type="submit" value="${data.results[i].name}">
                        </form>
                    </td>
                </tbody>
            `
        }
        html+=`
            </table>
        </div>
        `
        centerCard.innerHTML += html;
    })

}
function getSpellCard(e,element){
    e.preventDefault();
    var spellSection = document.getElementById('spell-section')
    console.log('Clicked getSpellList()');
    fetch(`https://www.dnd5eapi.co/api/spells/${element.spellIndex.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        var html = `<div id="spell-table" class="mt-3 p-2">
        <h5>${data.name} | Level ${data.level} | ${data.school.name}</h5>
        `
        html +=`
            <p><strong>Class(es)</strong>: 
        `
        for(i=0; i<data.classes.length;i++){
            if(i == data.classes.length-1){
                html+= ` 
                    ${data.classes[i].name} 
                    `
            }
            
            else{
                html+= ` 
                ${data.classes[i].name}, 
            `
            }
        }
        html +=`
        </p>
        `
        html +=`
        <p><strong>${data.casting_time} | ${data.range} | ${data.duration}</strong></p>
        `
        if(data.damage){
            html +=`
                <p><strong>Damage</strong>: ${data.damage.damage_type.name}</p>
                `
        }
        
        if(data.area_of_effect){
            html += `
            <p><strong>Area of Effect</strong></p>
            `
            for(var [key,value] of Object.entries(data.area_of_effect)){
                html += `
                <p>${key}: ${value}</p>
                `
            }
        }
        html += `
        <p>|
        `
        for(i=0;i<data.components.length;i++){
            html +=`
            ${data.components[i]} |
            `
        }
        html += `
        </p>
        `
        if(data.concintration == true){
            html +=`
                <p><strong>Concentration</strong>: Required.</p>
                `
        }
        if(data.ritual == true){
            html += `
            <p><strong>Ritual</strong>: Required.</p>
            `
        }
        if(data.material != undefined){
            html += `
                <p><strong>Material(s)</strong>: ${data.material}</p>
                `
        }
        
        for(i=0;i<data.desc.length;i++){
            html += ` <p>${data.desc[i]} </p>`
        }



        html += `
        </div>
        `
        spellSection.innerHTML += html;
    })
    }
window.onload = runGame();