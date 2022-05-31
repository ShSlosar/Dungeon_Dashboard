from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import user, clock, game
import re
import pprint
database = "dun_dashdb"

class Monster:
    def __init__(self,data):
        self.id = data['id']
        self.indx = data['indx']
        self.dm_id = data['dm_id']
        self.game_id = data['game_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @classmethod
    def save(cls, data ):
        query = """
        INSERT INTO npcs 
        (indx, dm_id, game_id) 
        VALUES (%(indx)s, %(dm_id)s, %(game_id)s);"""
        return connectToMySQL(database).query_db( query, data )
    
    @classmethod
    def get_by_id(cls,data):
        print('+=========================+')
        print('(monster model) Getting monster by ID:', data)
        query="""
        SELECT * FROM npcs
        WHERE id = %(id)s
        """
        print('___________________________')
        return connectToMySQL(database).query_db( query, data )


    @classmethod
    def update(cls,data):
        pass

    @classmethod
    def delete(cls,data):
        query  = "DELETE FROM npcs WHERE id = %(id)s;"
        return connectToMySQL(database).query_db(query, data )
    
    @classmethod
    def delete_in_game(cls,data):
        query  = "DELETE FROM npcs WHERE game_id = %(id)s;"
        return connectToMySQL(database).query_db(query, data)
