from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import user, clock, game
import re
import pprint
database = "dun_dashdb"

class Character:
    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']
        self.lvl = data['lvl']
        self.race = data['race']
        self.class_type = data['class_type']
        self.alignment = data['alignment']
        self.hp = data['hp']
        self.ac = data['ac']
        self.speed = data['speed']
        self.str = data['str']
        self.dex = data['dex']
        self.intel = data['intel']
        self.wis = data['wis']
        self.const = data['const']
        self.chars = data['chars']
        self.creator_id = data['creator_id']
        self.dm_id = data['dm_id']
        self.game_id = data['game_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @classmethod
    def save(cls, data ):
        query = """
        INSERT INTO characters 
        (name, lvl, race, class_type, 
        alignment, hp, ac, speed, 
        str, dex, intel, wis, const, 
        chars, creator_id, dm_id, game_id) 
        VALUES ( 
        %(name)s, %(lvl)s, %(race)s, 
        %(class_type)s, %(alignment)s, %(hp)s,
        %(ac)s, %(speed)s, %(str)s, %(dex)s,
        %(intel)s, %(wis)s, %(const)s, %(chars)s,
        %(creator_id)s, %(dm_id)s, %(game_id)s
        );"""
        return connectToMySQL(database).query_db( query, data )
    
    @classmethod
    def get_by_id(cls,data):
        query = """
        SELECT * FROM characters
        WHERE id = %(id)s;
        """
        result = connectToMySQL(database).query_db( query, data )
        
        return cls(result[0])

    @classmethod
    def update(cls,data):
        pass

    @classmethod
    def delete(cls,data):
        query  = "DELETE FROM characters WHERE id = %(id)s;"
        return connectToMySQL(database).query_db(query, data)
    
    @classmethod
    def update(cls,data):
        query= """
        UPDATE characters SET
        name=%(name)s, lvl=%(lvl)s, 
        race=%(race)s, class_type=%(class_type)s, 
        alignment=%(alignment)s, 
        hp=%(hp)s, ac=%(ac)s, speed=%(speed)s, 
        str=%(str)s, dex=%(dex)s,
        intel=%(intel)s, wis=%(wis)s, 
        const=%(const)s, chars=%(chars)s
        WHERE id = %(id)s
        """
        return connectToMySQL(database).query_db(query, data)