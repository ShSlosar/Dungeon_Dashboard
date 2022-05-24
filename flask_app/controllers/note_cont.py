from flask_app import app
from flask import render_template,redirect,request,session,flash,jsonify
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.models.clock import Clock
from flask_app.models.note import Note
from flask_app.controllers import users, game_cont
import pprint,os,requests,time
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


@app.route('/save/note', methods=['POST'])
def save():
    data = {
        "title" :request.form['title'],
        "content" :request.form['content'],
        "dm_id" : session['user_id'],
        "game_id" : session['game_id']
    }
    id = Note.save(data)
    saved_note = Note.get_by_id({"id":id})
    note_data= {
        "id" : saved_note.id,
        "title" :saved_note.title,
        "content" :saved_note.content,
        "dm_id" :saved_note.dm_id,
        "game_id" :saved_note.game_id,
        "created_at" :saved_note.created_at,
        "updated_at" :saved_note.updated_at
    }
    return(note_data)





@app.route('/update/note', methods=['POST'])
def update():
    data = {
        "id" :request.form['id'],
        "title" :request.form['title'],
        "content" :request.form['content']
    }
    Note.update(data)
    updated_note = Note.get_by_id({"id":request.form['id']})
    note_data= {
        "id" : updated_note.id,
        "title" :updated_note.title,
        "content" :updated_note.content,
        "dm_id" :updated_note.dm_id,
        "game_id" :updated_note.game_id,
        "created_at" :updated_note.created_at,
        "updated_at" :updated_note.updated_at
    }
    return(note_data)

@app.route('/delete/note/<int:id>')
def delete(id):
    print(id)
    data = {"id": id}
    Note.delete(data);
    return (data)