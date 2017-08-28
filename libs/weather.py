import requests


def get_weather(city, state, when):
    """Returns weather data from api.worldweatheronline.com
       for a given city, state, and time.
    """
    api_url = ('http://api.worldweatheronline.com/premium/v1/'
                'past-weather.ashx')

    resp = requests.get(
        api_url,
        params={
            'format': 'json',
            'q': city,
            'state': state,
            'date': when,
            'key': '05e97277c4584e308f3165121172808',
        }
    )
    resp.raise_for_status()
    return resp.json()
