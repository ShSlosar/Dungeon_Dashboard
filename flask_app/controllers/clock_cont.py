from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.controllers import users, game_cont
import pprint,os,requests
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)