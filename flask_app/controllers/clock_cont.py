from flask_app import app
from flask import render_template,redirect,request,session,flash,jsonify
from flask_app.models.user import User
from flask_app.models.game import Game
from flask_app.models.clock import Clock
from flask_app.controllers import users, game_cont
import pprint,os,requests,time
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


@app.route('/update/clock', methods=['POST'])
def update_clock():
    # timestr = f"{request.form['hour']}:{request.form['minute']}:{request.form['second']} {request.form['amPm']}"
    # timeobj = datetime.strptime(timestr, "%I:%M:%S %p")
    # timeobj2 = datetime.strftime( timeobj, "%I:%M:%S %p")
    # print('TIME: ',timeobj2)
    data = {
        'id': int(request.form['id']),
        'day': request.form['day'],
        'time_active': request.form['time_active']
    }
    Clock.update(data)
    updated_clock = Clock.get_by_id({'id': request.form['id']})
    print(updated_clock)
    time24 = datetime.strptime(str(updated_clock.time_active),"%H:%M:%S")
    time12 = time24.strftime("%I:%M:%S %p")
    print(time12)
    clock_dat = {
        "clock_id" : updated_clock.id,
        "day" : updated_clock.day,
        "time_active" : time12
    }
    return(clock_dat)