from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import user, clock, game
import re
import pprint
database = "dun_dashdb"

class Note:
    def __init__(self,data):
        self.id = data['id']
        self.title = data['title']
        self.content = data['content']
        self.dm_id = data['dm_id']
        self.game_id = data['game_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @classmethod
    def save(cls,data):
        query = """
        INSERT INTO notes 
        (title, content, dm_id, game_id) 
        VALUES (%(title)s, %(content)s, %(dm_id)s, %(game_id)s);"""
        return connectToMySQL(database).query_db( query, data )
    
    @classmethod
    def get_by_id(cls,data):
        query="""
        SELECT * FROM notes
        WHERE id = %(id)s
        """
        result = connectToMySQL(database).query_db( query, data )
        return cls(result[0])
    
    @classmethod
    def update(cls,data):
        query= """
        UPDATE notes SET
        title=%(title)s, content=%(content)s
        WHERE id = %(id)s
        """
        return connectToMySQL(database).query_db(query, data)
    
    @classmethod
    def delete(cls,data):
        query  = "DELETE FROM notes WHERE id = %(id)s;"
        return connectToMySQL(database).query_db(query, data)
    
    @classmethod
    def delete_in_game(cls,data):
        query  = "DELETE FROM notes WHERE game_id = %(id)s;"
        return connectToMySQL(database).query_db(query, data)
    