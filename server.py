from flask_app.controllers import users, game_cont, clock_cont, note_cont, monster_cont,character_cont
from flask_app import app

if __name__ == "__main__":
    app.run(debug=True)