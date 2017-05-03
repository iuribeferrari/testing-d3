#psycopg2
from sqlalchemy import text, create_engine
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/')
@cross_origin()
def index():
    engine = create_engine('postgresql://postgres:root@postgres:5432/redmag')
    connection = engine.connect()
    result = connection.execute('SELECT AA.action_verb, count(AA.action_verb) as num FROM usuarios_usuario AS UU INNER JOIN actividad_actividad AS AA ON UU.id = AA.user_id GROUP BY AA.action_verb ORDER BY AA.action_verb ASC')
    verbs = []
    for row in result:
        verbs.append({
          'name': row['action_verb'].encode('utf-8').strip(),
          'size': row['num']
        })
    connection.close()
    return jsonify({'verbs': verbs})
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)