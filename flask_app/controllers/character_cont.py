from flask_app import app
from flask import render_template,redirect,request,session,flash,jsonify
import os, threading, time, pprint, requests
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.models.monster import Monster
from flask_app.models.character import Character
from flask_app.controllers import users, game_cont, clock_cont
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/get/player', methods=['POST'])
def get_player():
    print('(Character Cont) working so far...')
    print(request.form['player_id'])
    charct = Character.get_by_id({"id" : request.form['player_id']})
    print('+==================================+')
    print('getting character BY ID')
    data = {
        "id" : charct.id,
        "lvl" : charct.lvl,
        "name" : charct.name,
        "race" : charct.race,
        "class_type" : charct.class_type,
        "alignment" : charct.alignment,
        "hp" : charct.hp,
        "ac" : charct.ac,
        "speed" : charct.speed,
        "str" : charct.str,
        "dex" : charct.dex,
        "intel" : charct.intel,
        "wis" : charct.wis,
        "const" : charct.const,
        "chars" : charct.chars,
        "creator_id" : charct.creator_id,
        "dm_id" : charct.dm_id,
        "game_id" : charct.game_id,
        "created_at" : charct.created_at,
        "updated_at" : charct.updated_at
    }
    pprint.pprint(data)
    print('_____________________________________________')
    return(data)

@app.route('/save/player', methods=['POST'])
def save_player():
    data = {
        "lvl" : request.form['lvl'],
        "name" : request.form['name'],
        "race" : request.form['race'],
        "class_type" : request.form['class_type'],
        "alignment" : request.form['alignment'],
        "hp" : request.form['hp'],
        "ac" : request.form['ac'],
        "speed" : request.form['speed'],
        "str" : request.form['str'],
        "dex" : request.form['dex'],
        "intel" : request.form['intel'],
        "wis" : request.form['wis'],
        "const" : request.form['const'],
        "chars" : request.form['chars'],
        "creator_id" : session['user_id'],
        "dm_id" : session['user_id'],
        "game_id" : session['game_id']
    }
    id = Character.save(data)
    player = Character.get_by_id({"id" : id})
    print('PLAYER:',player)
    player_data = {
        "id" : player.id,
        "lvl" : player.lvl,
        "name" : player.name,
        "race" : player.race,
        "class_type" : player.class_type,
        "alignment" : player.alignment,
        "hp" : player.hp,
        "ac" : player.ac,
        "speed" : player.speed,
        "str" : player.str,
        "dex" : player.dex,
        "intel" : player.intel,
        "wis" : player.wis,
        "const" : player.const,
        "chars" : player.chars,
        "creator_id" : player.creator_id,
        "dm_id" : player.dm_id,
        "game_id" : player.game_id,
        "created_at" : player.created_at,
        "updated_at" : player.updated_at
    }
    return(player_data)

@app.route('/delete/player/<int:id>')
def delete_player(id):
    print(id)
    data = {"id": id}
    Character.delete(data);
    return (data)

@app.route('/update/player', methods=['POST'])
def update_character():
    player_data = {
        "id" : request.form['id'],
        "lvl" : request.form['lvl'],
        "name" : request.form['name'],
        "race" : request.form['race'],
        "class_type" : request.form['class_type'],
        "alignment" : request.form['alignment'],
        "hp" : request.form['hp'],
        "ac" : request.form['ac'],
        "speed" : request.form['speed'],
        "str" : request.form['str'],
        "dex" : request.form['dex'],
        "intel" : request.form['intel'],
        "wis" : request.form['wis'],
        "const" : request.form['const'],
        "chars" : request.form['chars']
    }
    Character.update(player_data)
    updated = Character.get_by_id({'id':player_data['id']})
    print(updated)
    
    updated_player = {
        "id" : updated.id,
        "lvl" : updated.lvl,
        "name" : updated.name,
        "race" : updated.race,
        "class_type" : updated.class_type,
        "alignment" : updated.alignment,
        "hp" : updated.hp,
        "ac" : updated.ac,
        "speed" : updated.speed,
        "str" : updated.str,
        "dex" : updated.dex,
        "intel" : updated.intel,
        "wis" : updated.wis,
        "const" : updated.const,
        "chars" : updated.chars,
        "dm_id" : updated.dm_id,
        "creator_id" : updated.creator_id,
        "game_id" : updated.game_id,
        "created_at" : updated.created_at,
        "updated_at" : updated.updated_at
    }
    
    return (updated_player) 