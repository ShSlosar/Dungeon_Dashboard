from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_app.models.user import User
import pprint
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
    print('+==================+')
    print('(server)rendering template: dashboard.html')
    print('______________________________________')
    return render_template("dashboard.html",users=User.get_all(), user=User.get_by_id(data))

@app.route('/create_user',methods=["POST"])
def create_user():
    if not User.validate_user(request.form):
        return redirect('/')
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

@app.route('/login', methods=['POST'])
def login():
    print("+=============================+")
    print("(server)attempting to log in...")
    
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    
    if not user_in_db:
        flash("Invalid Email/Password","login")
        print('+============================+')
        print('(server)Failed Login *email*')
        print('____________________________________')
        return redirect("/")
    
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        flash("Invalid Email/Password", "login")
        print('+============================+')
        print('(server)Failed Login *password*')
        print('____________________________________')
        return redirect('/')
    
    pprint.pprint(user_in_db)
    print('User found!')
    print('_________________________________')
    
    session['user_id'] = user_in_db.id
    return redirect('/user')


@app.route('/logout')
def logout():
    print('===========================')
    print('(server)Logging out...')
    print('______________________________________')
    session.clear()
    return redirect('/')


# @app.route('/user/update',methods=['POST'])
# def update():
#     print('===============')
#     print("From server update info request:", request.form)
#     User.update(request.form)
#     id = request.form['id']
#     return redirect(f'/user/show/{id}')

# @app.route('/user/delete/<int:id>')
# def delete(id):
#     User.delete(id)
#     return redirect('/')

# @app.route('/user/update/<int:id>')
# def update_page(id):
#     user=User.get_one(id)
#     return render_template("editpage.html",id=id, user=user)