from flask_restful import Resource
from flask_restful import request

from .score import getScore, updateScore
from .swen_344_db_utils import *



class Scores(Resource):
    def get(self):
        result = getScore()
        print("GET /scores result:", result)
        return result
    
    def put(self):
        data = request.get_json(force=True)
        score1 = data.get('player1')
        score2 = data.get('player2')

        if score1 is None or score2 is None:
            return {'message': 'Missing score values'}, 400

        updateScore(score1, score2)
        return {'message': 'Score updated successfully'}, 200

