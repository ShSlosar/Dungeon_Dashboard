from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.controllers import monster_cont, clock_cont,character_cont,note_cont
import pprint
from datetime import datetime,time
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    print('+==================+')
    print('(server)rendering template: index.html')
    print('______________________________________')
    return render_template('index.html')

@app.route('/user')
def show():
    if 'user_id' not in session:
        print('=======================')
        print('(server) User not in session')
        print('______________________________________')
        return redirect('/')
    data = {
        "id" : session['user_id']
    }
    if 'game_id' in session:
        session.pop('game_id',None)
    print('+==================+')
    print('(server)rendering template: dashboard.html')
    print('______________________________________')
    return render_template("dashboard.html", user=User.get_by_id(data))

@app.route('/create_user',methods=["POST"])
def create_user():
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    pprint.pprint(pw_hash)
    data = {
        "handle" : request.form["handle"],
        "first_name" : request.form["first_name"],
        "last_name" : request.form["last_name"],
        "password" : pw_hash,
        "email" : request.form["email"]
    }
    session['user_id'] = User.save(data)
    print("+======================+")
    print("(server)Adding user:")
    pprint.pprint(data)
    print('_________________________________')
    return redirect('/user')

@app.route('/validate/user',methods=['POST'])
def user_val():
    pprint.pprint(request.form)
    messages = User.validate_user(request.form)
    print (len(messages))
    if len(messages) < 1:
        return "true"
    return messages
    # return "true"

@app.route('/login', methods=['POST'])
def login():
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    session['user_id'] = user_in_db.id
    return redirect('/user')

@app.route('/validate/login', methods=['POST'])
def login_val():
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    message = {
        "alert" : "*Invalid Login credentials*"
    }
    
    if not user_in_db:
        return message
    
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        return message
    
    return "true"

@app.route('/logout')
def logout():
    print('===========================')
    print('(server)Logging out...')
    print('______________________________________')
    session.clear()
    return redirect('/')

@app.route('/user/dash')
def get_user_data():
    usr = User.get_by_id({"id": session['user_id']})
    data ={
        'user_data' :{
            "id" : usr.id,
            "first_name" :usr.first_name,
            "last_name" :usr.last_name,
            'handle' : usr.handle,
            'email' : usr.email,
            "created_at" : usr.created_at,
            "updated_at" : usr.updated_at
        },
        'games' : []
    }
    temp = []
    games = Game.get_all()
    for game in games:
        if session['user_id'] == game.dm_id:
            temp.append(game.id)
            
    if len(temp)>0:
        res = User.get_with_data({"id":session['user_id']})
        print('Results:')
        pprint.pprint(res)
        for game in res.games:
            time24 = datetime.strptime(str(game.gclock.time_active) , "%H:%M:%S")
            time12 = time24.strftime("%I:%M:%S %p")
            timeVal = time24.strftime("%H:%M:%S")
            date_t =  game.created_at.strftime("%a %d %b %Y")
            print('CreatedAT:::', date_t)
            game_data = {
                'game_data' : {
                    'name' : game.name,
                    'time_active' : time12,
                    'day' : game.gclock.day,
                    'id' : game.id,
                    'created_at' : date_t
                },
                'players' :len(game.players),
                'monsters' :len(game.monsters)
            }
            data['games'].append(game_data)
        return(data)
    else:
        return(data)

@app.route('/user/update',methods=['POST'])
def update_user():
    id = request.form['id']
    user_in_db = User.get_by_id({"id": id})
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        flash("Invalid Password")
        print('+============================+')
        print('(server)Failed updata *password*')
        print('____________________________________')
        return "Invalid Password"
    print('===============')
    print("From server update info request:", request.form)
    User.update(request.form)
    usr = User.get_by_id({"id": id})
    user_data = {
        "id" : usr.id,
        "first_name" :usr.first_name,
        "last_name" :usr.last_name,
        'handle' : usr.handle,
        'email' : usr.email,
        "created_at" : usr.created_at,
        "updated_at" : usr.updated_at
    }
    return (user_data)

@app.route('/user/delete',methods=['POST'])
def del_user():
    id= request.form['id']
    print(id)
    print(session['user_id'])
    if 'user_id' not in session:
        print('=======================')
        print('(server) User not in session')
        print('______________________________________')
        return redirect('/')
    user_in_db = User.get_by_id({"id": id})
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        flash("Invalid Password")
        print('+============================+')
        print('(server)Failed updata *password*')
        print('____________________________________')
        return "invalid Password"
    print(f'======DELETE USER: {id}=========')
    session.clear()
    User.delete({"id":id})
    return redirect('/')

# @app.route('/user/update/<int:id>')
# def update_page(id):
#     user=User.get_one(id)
#     return render_template("editpage.html",id=id, user=user)