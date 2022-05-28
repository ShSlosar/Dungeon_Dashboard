from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import user, clock, character, monster,note
import re
import pprint
database = "dun_dashdb"


class Game:
    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.dm_id = data['dm_id']
        self.gclock = None
        self.monsters = []
        self.players = []
        self.notes= []
    
    
    @staticmethod
    def validate_game(data):
        print('+==========================+')
        print('(model --game-- ) Validating new game...')
        print('_______________________________________')
        is_valid = True
        if len(data['name']) < 2:
            flash("Name must be more than 2 characters", "game")
            is_valid = False
        print('+==========================+')
        print('(model --game-- )Validation response:', is_valid)
        print('_______________________________________')
        return is_valid
    
    
    @classmethod
    def save(cls, data ):
        query = """
        INSERT INTO games 
        ( name, dm_id ) 
        VALUES ( %(name)s, %(dm_id)s);"""
        return connectToMySQL(database).query_db( query, data )
    
    @classmethod
    def method():
        pass
    
    @classmethod
    def get_by_id(cls,data):
        query  = """
        SELECT * FROM games 
        JOIN clocks ON clocks.game_id = games.id
        LEFT JOIN characters ON characters.game_id = games.id
        WHERE games.id = %(id)s""";
        query2 = """
        SELECT * FROM games
        LEFT JOIN npcs ON npcs.game_id = games.id
        WHERE games.id = %(id)s
        """
        query3 = """
        SELECT * FROM games
        LEFT JOIN notes ON notes.game_id = games.id
        WHERE games.id = %(id)s
        """
        result = connectToMySQL(database).query_db(query, data)
        result2 = connectToMySQL(database).query_db(query2, data)
        result3 = connectToMySQL(database).query_db(query3, data)
        one_game = cls(result[0])
        for row in result:
            if row['characters.id']:
                character_data = {
                    "id" : row['characters.id'],
                    "name" : row['characters.name'],
                    "lvl" : row['lvl'],
                    "race" : row['race'],
                    "class_type" : row['class_type'],
                    "alignment" : row['alignment'],
                    "hp" : row['hp'],
                    "ac" : row['ac'],
                    "speed" : row['speed'],
                    "str" : row['str'],
                    "dex" : row['dex'],
                    "intel" : row['intel'],
                    "wis" : row['wis'],
                    "const" : row['const'],
                    "chars" : row['chars'],
                    "creator_id" : row['creator_id'],
                    "dm_id" : row['characters.dm_id'],
                    "game_id" : row['characters.game_id'],
                    "created_at" : row['characters.created_at'],
                    "updated_at" : row['characters.updated_at']
                }
                one_game.players.append(character.Character(character_data))
            else:
                break
            
        for row in result2:
            if row['npcs.id']:
                monster_data = {
                    "id" : row['npcs.id'],
                    "indx" : row['indx'],
                    "dm_id" : row['npcs.dm_id'],
                    "game_id" : row['game_id'],
                    "created_at" : row['npcs.created_at'],
                    "updated_at" : row['npcs.updated_at']
                }
                one_game.monsters.append(monster.Monster(monster_data))
            else:
                break
            
        for row in result3:
            if row['notes.id']:
                note_data = {
                "id" : row['notes.id'],
                "title" : row['title'],
                "content" : row['content'],
                "dm_id" : row['notes.dm_id'],
                "game_id" : row['game_id'],
                "created_at" : row['notes.created_at'],
                "updated_at" : row['notes.updated_at']
                }
                one_game.notes.append(note.Note(note_data))
            else:
                break

        clock_data = {
            "id" : result[0]["clocks.id"],
            "day" : result[0]["day"],
            "time_active" : result[0]["time_active"],
            "created_at" : result[0]["clocks.created_at"],
            "updated_at" : result[0]["clocks.updated_at"],
            "game_id" : result[0]['game_id'],
            "dm_id" : result[0]["clocks.dm_id"]
        }
        print('+==============================+')
        print(f'players in game {one_game.id}:',one_game.players)
        print('_____________________________________________________')
        print('+==============================+')
        print(f'Monsters in game {one_game.id}:',one_game.monsters)
        print('_____________________________________________________')
        one_game.gclock = clock.Clock( clock_data )
        print("=======================")
        print("(model)get one game by ID:")
        # pprint.pprint(clock_data, sort_dicts=False)
        pprint.pprint(one_game, sort_dicts=False)
        print('______________________________________')
        return one_game

