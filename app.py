import json
from flask import (Flask, render_template, request, jsonify)

from libs.weather import get_weather
from libs.parcel import get_parcel



app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/incidents', methods=['GET', 'POST'])
def incidents():
    incidents = []
    if request.method == 'POST' and 'incident-file' in request.files:
        try:
            incident = json.loads(request.files['incident-file'].read())
            incident['weather'] = get_weather(
                incident['address']['city'],
                incident['address']['state'],
                incident['description']['event_opened'],
            )['data']['weather'][0]
            incident['parcel'] = get_parcel(
                incident['address']['address_line1'])
            incidents.append(incident)
        except (TypeError, ValueError):
            return jsonify({'error': 'Unable to parse incident data'})
    return jsonify(incidents)
