import json
from flask import (Flask, render_template, request, jsonify)
from flask_pymongo import PyMongo

from libs.weather import get_weather
from libs.parcel import get_parcel


app = Flask(__name__)
mongo = PyMongo(app)


@app.route('/', methods=['GET'])
def index():
    """Render index template"""
    return render_template('index.html')


@app.route('/incidents', methods=['GET', 'POST'])
def incidents():
    """List incidents and allows users to add incidents"""
    if request.method == 'POST' and 'incident-file' in request.files:
        try:
            incident = json.loads(request.files['incident-file'].read())
            incident['weather'] = get_weather(
                incident['address']['city'],
                incident['address']['state'],
                incident['description']['event_opened'],
            )['data']['weather'][0]
            incident['parcel'] = get_parcel(
                incident['address']['longitude'],
                incident['address']['latitude'])
        except (TypeError, ValueError):
            return jsonify({'error': 'Unable to parse incident data'})
        mongo.db.incidents.insert(incident, check_keys=False)
    incidents = list(mongo.db.incidents.find({}, {'_id': False}))
    return jsonify(incidents)
