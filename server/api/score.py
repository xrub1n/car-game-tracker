from .swen_344_db_utils import *


def getScore():
    selectsql = """
        SELECT score1, score2
        FROM count
    """
    rows = exec_get_all(selectsql)
    if not rows:
        return {'player1': 0, 'player2': 0}
    
    row = rows[0]
    # Since row is a tuple, use numeric indexes:
    return {'player1': row[0], 'player2': row[1]}



def updateScore(score1, score2):
    updatesql = """
        UPDATE count
        SET score1 = %s, score2 = %s
    """
    exec_commit(updatesql, (score1, score2))