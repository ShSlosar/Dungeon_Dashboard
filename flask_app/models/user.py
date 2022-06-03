from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
from flask_app.models import game,clock,monster,character,note
import re
import pprint   
bcrypt = Bcrypt(app) 
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')    
PASSWORD_REGEX = re.compile(r'^(?:(?=.*\d)(?=.*\W+)(?=.*[a-z])(?=.*[A-Z]).*)$')
database = "dun_dashdb"

class User:
    def __init__( self , data ):
        self.id = data['id']
        self.handle = data['handle']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.games = []
        self.players = []
        
    @staticmethod
    def validate_user(data):
        print('+==========================+')
        print('(model) Validating new user...')
        print('_______________________________________')
        validation_messages = {
        }
        is_valid = True
        if not EMAIL_REGEX.match(data['email']):
            validation_messages["email_re"] = "*Email invalid.*"
            is_valid = False
        if User.get_by_email(data):
            validation_messages["db_email"] = "*Email already taken.*"
            is_valid=False
        if len(data['handle']) < 3:
            validation_messages["handle_len"] = "*User Name must be more than 3 characters.*"
            is_valid = False
        if len(data['first_name']) < 2:
            validation_messages["fname_len"] = "*Name must be more than 2 characters.*"
            is_valid = False
        if len(data['last_name']) < 2:
            validation_messages["lname_len"] = "*Name must be more than 2 characters.*"
            is_valid = False
        if not PASSWORD_REGEX.match(data['password']):
            validation_messages["password_re"] = "*Password must contain at least one uppercase, one lowercase, one number, and one special character.*"
            is_valid = False
        if len(data['password']) < 8:
            validation_messages["password_len"] = "*Password must be at least 8 characters.*"
            is_valid = False
        if data['con_pass'] != data['password']:
            validation_messages["con_pass"] = "*Passwords must match.*"
            is_valid = False
        print('+==========================+')
        print('(model)Validation response:', is_valid)
        print(validation_messages)
        print('_______________________________________')
        
        return validation_messages
    
    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL(database).query_db(query,data)
        print('+==========================+')
        print('(model)Attempting to get user by email...')
        pprint.pprint(result)
        print('_______________________________________')
        if len(result) < 1:
            return False
        return cls(result[0])
    
    @classmethod
    def save(cls, data ):
        query = """
        INSERT INTO users 
        ( handle, first_name , last_name, password , email) 
        VALUES ( %(handle)s, %(first_name)s , %(last_name)s , %(password)s, %(email)s);"""
        return connectToMySQL(database).query_db( query, data )
    
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL(database).query_db(query)
        users = []
        for user in results:
            users.append( cls(user) )
        print("======================")
        print("(model)get all users:")
        pprint.pprint(users)
        print('_____________________________________')
        return users
    
    @classmethod
    def get_by_id(cls,data):
        query  = """
        SELECT * FROM users 
        WHERE id = %(id)s""";
        result = connectToMySQL(database).query_db(query, data)
        print("=======================")
        print("(model)get one user by ID:")
        pprint.pprint(result)
        print('______________________________________')
        return cls(result[0])
    
    @classmethod
    def get_with_data(cls,data):
        query  = """
        SELECT * FROM users 
        LEFT JOIN games ON
        users.id = games.dm_id
        WHERE users.id = %(id)s""";
        result = connectToMySQL(database).query_db(query, data)
        # pprint.pprint(result)
        one_user = cls(result[0])
        for row in result:
            one_user.games.append(game.Game.get_by_id({"id":row['games.id']}))
        print(one_user)
        
        return (one_user)
    
    @classmethod
    def update(cls,data):
        print("Update user ID:", id)
        query = """
        UPDATE users SET 
        handle=%(handle)s,
        first_name=%(first_name)s,
        last_name=%(last_name)s,
        email=%(email)s
        WHERE id =%(id)s;"""
        return connectToMySQL(database).query_db(query,data)
    
    @classmethod
    def delete(cls, data):
        query  = "DELETE FROM users WHERE id = %(id)s;"
        return connectToMySQL(database).query_db(query,data)
    

    
    