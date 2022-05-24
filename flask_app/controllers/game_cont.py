from flask_app import app
from flask import render_template,redirect,request,session,flash,jsonify
import os, threading, time, pprint, requests
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.models.clock import Clock
from flask_app.models.monster import Monster
from flask_app.models.note import Note
from flask_app.controllers import monster_cont, clock_cont, users,character_cont,note_cont
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/game/dashboard/<int:game_id>')
def load_game(game_id):
    if 'user_id' not in session:
        print('=======================')
        print('(server) User not in session')
        print('______________________________________')
        return redirect('/')
    data = {
        'id' : session['user_id']
    }
    session['game_id'] = game_id
    gametemp = Game.get_by_id({'id' : game_id})
    t= Game.get_by_id({'id' : game_id}).gclock.time_active
    print(t)
    t24 = {
        "time": t
    }
    time24 = datetime.strptime(str(t) , "%H:%M:%S")
    time12 = time24.strftime("%I:%#M:%S %p")
    # new_time = str(time12) + timedelta(seconds=1)
    # def set_interval(func, sec):
    #     def printsomthing():
    #         print("12")
    print('+================+')
    print("time24:", time24)
    print("time12:", time12)
    # pprint("updoot:", new_time)
    print('___________________')
    
    return render_template('gameDashboard.html',
    game=Game.get_by_id({'id' : game_id}), 
    time12=time12,
    time24=time24,
    dm=User.get_by_id(data))
    

@app.route('/create/game', methods=['POST'])
def new_game():
    game_data = {
        'name' : request.form['name'],
        'dm_id' : session['user_id']
    }
    if not Game.validate_game(game_data):
        return redirect('/user')
    print("+======================+")
    print("(server --game_cont--)creating game:")
    pprint.pprint(game_data)
    print('_________________________________')
    game_id = Game.save(game_data)
    print(request.form['time_active'])
    clock_data = {
        'time_active' : request.form['time_active'], 
        'dm_id' : session['user_id'],
        'game_id' : game_id,
        'day' : request.form['day']
    }
    if not Clock.validate_clock(clock_data):
        return redirect('/user')
    print("+======================+")
    print("(server --game_cont--)creating clock:")
    pprint.pprint(clock_data)
    print('_________________________________')
    Clock.save(clock_data)
    return redirect(f'/game/dashboard/{game_id}')



#AJAX Routes:

@app.route('/game/run')
def run_game():
    print(session['game_id'])
    current_game = Game.get_by_id({'id' : session['game_id']})
    print('+================+')
    print(current_game.players)
    print(')))))))))))))))))))))))))))))))))))))')
    current_user = User.get_by_id({'id' : session['user_id']})
    time24 = datetime.strptime(str(current_game.gclock.time_active) , "%H:%M:%S")
    time12 = time24.strftime("%I:%M:%S %p")
    timeVal = time24.strftime("%H:%M:%S")
        
    print(time24)
    data = {
        'game_data' : {
                'name' : current_game.name,
                'time_active' : time12,
                'day' : current_game.gclock.day,
                'id' : current_game.id
        },
        'clock_data' :{
            'clock_id' : current_game.gclock.id,
            'time_active24': timeVal,
            'time_active' : time12,
            'day' : current_game.gclock.day
        },
        'dm_data' : {
            'id' : current_user.id,
            'handle' : current_user.handle,
            'first_name' : current_user.first_name,
            'last_name' : current_user.last_name,
            'email' : current_user.email
        },
        'players' :[],
        'monsters' :[],
        'notes' :[]
        }
    print('Length', len(current_game.monsters))
    for i in range (0,len(current_game.monsters)):
    # for monster in current_game.monsters:
        r = requests.get(f"https://www.dnd5eapi.co/api/monsters/{current_game.monsters[i].indx}")
        data['monsters'].append(r.json())
        data['monsters'][i]['id'] = current_game.monsters[i].id
        pprint.pprint(current_game.monsters[i].id, sort_dicts=False)
    for players in current_game.players:
        player = {
            "id" : players.id,
            "lvl" : players.lvl,
            "name" : players.name,
            "race" : players.race,
            "class_type" : players.class_type,
            "alignment" : players.alignment,
            "hp" : players.hp,
            "ac" : players.ac,
            "speed" : players.speed,
            "str" : players.str,
            "dex" : players.dex,
            "intel" : players.intel,
            "wis" : players.wis,
            "const" : players.const,
            "chars" : players.chars,
            "creator_id" : players.creator_id,
            "dm_id" : players.dm_id,
            "game_id" : players.game_id,
            "created_at" : players.created_at,
            "updated_at" : players.updated_at
        }
        data['players'].append(player)
        
    for notes in current_game.notes:
        note = {
            "id" : notes.id,
            "title" :notes.title,
            "content" :notes.content,
            "dm_id" : notes.dm_id,
            "game_id" : notes.game_id,
            "created_at" : notes.created_at,
            "updated_at" : notes.updated_at
        }
        data['notes'].append(note)
    # print('+================+')
    # print("game:")
    # print("dm:")
    # pprint.pprint(data, sort_dicts=False )
    # print('___________________')
    # session['monsters'] = data['monsters']
    # pprint.pprint(session['monsters'], sort_dicts=False)
    return (data)

# @app.route('/game/players')
# def get_players_in_game():
#     current_game = Game.get_by_id({'id' : session['game_id']})
#     data ={
#         'players' :[]
#     }
#     for players in current_game.players:
#         player = {
#             "id" : players.id,
#             "lvl" : players.lvl,
#             "name" : players.name,
#             "race" : players.race,
#             "class_type" : players.class_type,
#             "alignment" : players.alignment,
#             "hp" : players.hp,
#             "ac" : players.ac,
#             "speed" : players.speed,
#             "str" : players.str,
#             "dex" : players.dex,
#             "intel" : players.intel,
#             "wis" : players.wis,
#             "const" : players.const,
#             "chars" : players.chars,
#             "creator_id" : players.creator_id,
#             "dm_id" : players.dm_id,
#             "game_id" : players.game_id,
#             "created_at" : players.created_at,
#             "updated_at" : players.updated_at
#         }
#         data['players'].append(player)
#     # print('+=========================================+')
#     # print('(server--game_cont--) players in game:')
#     # pprint.pprint(data)
#     # print('__________________________________________________________')
#     return(data)


# @app.route('/game/monsters')
# def get_monsters_in_game():
#     current_game = Game.get_by_id({'id' : session['game_id']})
#     data ={
#         'monsters' :[]
#     }
#     for monsters in current_game.monsters:
#         r = requests.get(f"https://www.dnd5eapi.co/api/monsters/{monsters.indx}")
#         data['monsters'].append(r.json())
#     # print('+=========================================+')
#     # print('(server--game_cont--) monsters in game:')
#     # pprint.pprint(data)
#     # print('__________________________________________________________')
#     return(data)

    # for monsters in current_game.monsters:
    #     monster = {
    #         "id" : monsters.id,
    #         "index" : monsters.index,
    #         "dm_id" : monsters.dm_id,
    #         "game_id" : monsters.game_id,
    #         "created_at" : monsters.created_at,
    #         "updated_at" : monsters.updated_at
    #     }
        