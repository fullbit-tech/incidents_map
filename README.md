# Incident Map Application
Plots incidents on a map and provides data for the incident, including:

* Weather at the time of the incident.
* Parcel data for the location of the incident.

# Install
1. Install python [2.7.6](https://www.python.org/download/releases/2.7.6/)
2. [Install virtualenv](https://virtualenv.pypa.io/en/stable/installation/) and create an env `virtualenv incidents`(optional)
3. If you created a virtualenv, acivate it. `cd incidents` `. ./bin/activate`
4. Clone the repository `git clone https://github.com/fullbit-tech/incidents_map.git`
5. Enter directory and install python requirements `cd incidents_map` `pip install -r requirements.txt`
6. Install [mongodb](https://docs.mongodb.com/manual/installation/)

# Run
1. Start the server with `FLASK_APP=app.py flask run -h 0.0.0.0 -p 5000` if you need remote access, otherwise `FLASK_APP=app.py flask run`
2. Point your browser to http://localhost:5000 or http://<your_server_ip>:5000

# Notes
The application allows you to upload `.json` files using a form to add incidents to the map.
For historical weather data, it uses `http://api.worldweatheronline.com`.

If no parcel data exists, the data will not attempt to display. For both provided test data files, I was unable
to get parcel results using the incident address. I queried for existing results, changed the address strings to them and it worked. So you may want to check to make sure your test cases have parcel entries in the API to make sure you'll get to see the data being retrieved.

# TODOs

* Needs significantly better validation and error handling.
* Edge case handling needs to be implemented for third-party API libs.
* A unique constaint needs to be added to prevent the same incident from being added multiple times.
* The map needs to adjust it's zoom to consider all placed incidents.
