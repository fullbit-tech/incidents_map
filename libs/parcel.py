import requests


def get_parcel(lon, lat):
    """Returns parcel data for a provided address.
       Will return an empty dict if no data was found
       the first result if more than one is returned
    """
    api_url = ('http://gis.richmondgov.com/ArcGIS/rest/services/'
               'WebMercator/Parcels/MapServer/2/query')

    resp = requests.get(
        api_url,
        params={
            'geometryType': 'esriGeometryPoint',
            'spatialRel': 'esriSpatialRelIntersects',
            'inSR': 4326,
            'geometry': '{lon},{lat}'.format(lon=lon, lat=lat),
            'returnCountOnly': 'false',
            'returnIdsOnly': 'false',
            'returnGeometry': 'true',
            'outFields': '*',
            'f': 'json',
        }
    )
    resp.raise_for_status()
    parcels = resp.json()['features']
    return parcels[0] if len(parcels) > 0 else dict()

