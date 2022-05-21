from flask_app import app
from flask import render_template,redirect,request,session,flash,jsonify
import os, threading, time, pprint, requests
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.models.monster import Monster
from flask_app.controllers import users, game_cont, clock_cont
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/search/monsters', methods=['POST'])
def mon_search():
    print('working so far')
    print(request.form['monster_indx'])
    r = requests.get(f"https://www.dnd5eapi.co/api/monsters/{request.form['monster_indx']}")
    print(r)
    # pprint.pprint(r.json(), sort_dicts=False)
    data = jsonify(r.json())
    return (data)

@app.route('/search/monsters/ch', methods=['POST'])
def ch_src():
    print('working so far')
    print(request.form['monster_rating'])
    chal_rate = request.form['monster_rating']
    r = requests.get(f"https://www.dnd5eapi.co/api/monsters?challenge_rating={request.form['monster_rating']}")
    # pprint.pprint(r.json(), sort_dicts=False)
    data = jsonify(r.json())
    return (data)

@app.route('/save/monster', methods=['POST'])
def save_to_game():
    data = {
        "indx" : request.form['monster_indx'],
        "dm_id" : session['user_id'],
        "game_id" : session['game_id']
    }
    # print('+===========================+')
    # print('(monster-cont) Saving monster to game:')
    # pprint.pprint(data, sort_dicts=False)
    monster_id = Monster.save(data)
    # monster =  Monster.get_by_id(monster_id)
    # print('___________________________________________')
    return (data) #<=============== Left off here, next todo:get_by_id()

@app.route('/delete/monster/<int:id>')
def delete_monster(id):
    print(id)
    data = {"id": id}
    Monster.delete(data);
    return (data)


#  Challenge Rating search Query!!!!
# f"https://www.dnd5eapi.co/api/monsters?challenge_rating={num}"