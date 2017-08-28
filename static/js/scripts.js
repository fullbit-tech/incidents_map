$(document).ready(function () {
  // Initalize Map
  var map = L.map('map').setView([37.5407, -77.4360], 13);

  // Add street tile layer
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiY21vcmdhbjg1MDYiLCJhIjoiY2o2dzlmbzl1MTU3ZzJ4dWhqd3hkdGNvbiJ9.n7Q-WylQW7_6sPO-BsBvPA'
  }).addTo(map);

  //  Create popup content for an incident
  function getPopupContent(incident) {
    var weather = parcel = "";

    var details = "<div>" +
        "<h3>Incident</h3>" +
        "<hr />" +
        "<p>Address: " + incident.address.address_line1 + "</p>" +
        "<p>City: " + incident.address.city + "</p>" +
        "<p>State: " + incident.address.state + "</p>" +
        "<p>Opened: " + incident.description.event_opened + "</p>" +
        "<p>Closed: " + incident.description.event_closed + "</p>" +
      "</div>";

    if (incident.weather) {
      weather = "<div>" +
          "<h3>Weather</h3>" +
          "<hr />" +
          "<p>Low: " + incident.weather.mintempF + "&#8457;</p>" +
          "<p>High: " + incident.weather.mintempF + "&#8457;</p>" +
          "<p>UV Index: " + incident.weather.uvIndex + "</p>";
        "</div>";
    }
    if (incident.parcel.attributes) {
      parcel = "<div>" +
          "<h3>Parcel</h3>" +
          "<hr />" +
          "<p>Land Sqft: " + incident.parcel.attributes.LandSqFt + "</p>" +
          "<p>Land Value: " + incident.parcel.attributes.LandValue + "</p>" +
          "<p>Land Value: " + incident.parcel.attributes.LandValue + "</p>" +
          "<p>Owner Name: " + incident.parcel.attributes.OwnerName + "</p>" +
        "</div>";
    }
    return "<div>" + details + weather + parcel + "</div>";
  }

  // Add Markers
  function addMarkers(instances) {
    for (var i=0; i < instances.length; i++) {
      var incident = instances[i];
      var marker = L.marker(
        [incident.address.latitude, incident.address.longitude]
      ).addTo(map);

      // Add popup on click
      marker.bindPopup(getPopupContent(incident));
    }
  }

  // Load incidents
  $.ajax({type: "GET", url: '/incidents', success: addMarkers});


  // Add a new incident
  $('#incident-form').submit(function(ev) {
    ev.preventDefault();
    var data = new FormData($(this)[0]);
    $.ajax({
      type: 'POST',
      url: '/incidents',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: addMarkers
    });
  });
});
