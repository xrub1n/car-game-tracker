from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import os

from api.swen_344_db_utils import exec_sql_file
from api.scores import Scores

app = Flask(__name__) #create Flask instance
CORS(app)

api = Api(app) #api router

@app.route('/')
def index():
    return "Welcome to the Score Tracker API! Use /scores endpoint."


api.add_resource(Scores,'/scores')


if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('scores.sql')
    print("Starting flask")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

