from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
import os

from api.swen_344_db_utils import exec_sql_file
from api.scores import Scores

app = Flask(
    __name__,
    static_folder='../frontend/dist/assets',  # Path to React's static assets (css/js)
    template_folder='../frontend/dist'        # Path to React's index.html location
)
CORS(app)

api = Api(app)

api.add_resource(Scores, '/scores')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
        # Serve static files like CSS, JS, images
        return send_from_directory(app.template_folder, path)
    else:
        # Serve index.html for React router to handle routes
        return send_from_directory(app.template_folder, 'index.html')


if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('scores.sql')
    print("Starting flask")
    app.run(host='0.0.0.0', port=10000, debug=True)
