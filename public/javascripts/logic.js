// Console.log to check see if code is working
console.log("The code is working!");

// Create a map object with a center & zoom level
let map = L.map("mapid").setView([53.523967492390, -113.514],15);

// Add a marker to the map for Sugarbowl
let marker = L.marker([53.524426716541306, -113.51327746908228]);

// Create tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add the "graymap" tile layer to the map
streets.addTo(map);
marker.addTo(map);