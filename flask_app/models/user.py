from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_bcrypt import Bcrypt
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
        
    @staticmethod
    def validate_user(data):
        print('+==========================+')
        print('(model) Validating new user...')
        print('_______________________________________')
        is_valid = True
        if not EMAIL_REGEX.match(data['email']):
            flash("Email invalid")
            is_valid = False
        if User.get_by_email(data):
            flash("Email already taken.", "regi")
            is_valid=False
        if len(data['handle']) < 3:
            flash("User Name must be more than 3 characters", "regi")
            is_valid = False
        if len(data['first_name']) < 2:
            flash("Name must be more than 2 characters", "regi")
            is_valid = False
        if len(data['last_name']) < 2:
            flash("Name must be more than 2 characters", "regi")
            is_valid = False
        if not PASSWORD_REGEX.match(data['password']):
            flash("Password must contain at least one uppercase, one lowercase, one number, and one special character.", "regi")
            is_valid = False
        if len(data['password']) < 8:
            flash("Password must be at least 8 characters", "regi")
            is_valid = False
        if data['con_pass'] != data['password']:
            flash("Passwords must match", "regi")
            is_valid = False
        print('+==========================+')
        print('(model)Validation response:', is_valid)
        print('_______________________________________')
        return is_valid
    
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
    
    
    # @classmethod
    # def delete(cls, id):
    #     query  = "DELETE FROM users WHERE id = %(id)s;"
    #     return connectToMySQL('user_regdb').query_db(query, {"id": id} )
    
    # @classmethod
    # def update(cls,data):
    #     print("Update user ID:", id)
    #     query = """
    #     UPDATE users SET 
    #     first_name=%(f_name)s,
    #     last_name=%(l_name)s,
    #     email=%(e_mail)s
    #     WHERE id =%(id)s;"""
    #     return connectToMySQL('user_regdb').query_db(query,data)

    
    