// Initalize Map
var map = L.map('map').setView([37.5407, -77.4360], 13);

// Add street tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY21vcmdhbjg1MDYiLCJhIjoiY2o2dzlmbzl1MTU3ZzJ4dWhqd3hkdGNvbiJ9.n7Q-WylQW7_6sPO-BsBvPA'
}).addTo(map);



