from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from api.swen_344_db_utils import exec_sql_file
from api.scores import Scores

app = Flask(__name__) #create Flask instance
CORS(app)

api = Api(app) #api router

api.add_resource(Scores,'/scores')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('scores.sql')
    print("Starting flask")
    app.run(debug=True), #starts Flask



