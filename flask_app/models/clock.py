from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import user
import re
import pprint
database = "dun_dashdb"

class Clock:
    def __init__(self,data):
        self.id = data['id']
        self.day = data['day']
        self.time_active = data['time_active']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.dm_id = data['dm_id']
        self.game_id = data['game_id']
    
    @staticmethod
    def validate_clock(data):
        print('+==========================+')
        print('(model --clock-- ) Validating new clock...')
        print('_______________________________________')
        is_valid = True
        if len(data['time_active']) < 2:
            flash("Please enter a valid time", "clock")
            is_valid = False
        print('+==========================+')
        print('(model --clock-- )Validation response:', is_valid)
        print('_______________________________________')
        return is_valid
    
    
    @classmethod
    def save(cls, data ):
        print('____________________________')
        print(data)
        query = """
        INSERT INTO clocks 
        ( day, game_id,  dm_id, time_active ) 
        VALUES ( %(day)s, %(game_id)s, %(dm_id)s, %(time_active)s);"""
        return connectToMySQL(database).query_db(query,data)
    
    @classmethod
    def update(cls,data):
        query = """
        UPDATE clocks SET
        day=%(day)s,time_active=%(time_active)s
        WHERE id=%(id)s
        """
        return connectToMySQL(database).query_db(query,data)
    
    @classmethod
    def get_by_id(cls,data):
        query = """
        SELECT * FROM clocks
        WHERE id=%(id)s
        """
        result = connectToMySQL(database).query_db(query,data)
        new_clock = cls(result[0])
        return new_clock