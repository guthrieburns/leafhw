
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoicnd6bG9jayIsImEiOiJjamlkdmVuaWYwZnZjM2twZWs3eWY4MTdyIn0." +
  "PZhghkJRnVia5SkmmtnuyA").addTo(myMap);


function markerSize(magnitude) {
  return magnitude*magnitude*magnitude * 5000;
}
function markerColor(magnitude) {
    if (2.5 <= magnitude && magnitude <= 2.9) {return "yellow"}

    else if (2.9 < magnitude && magnitude <=3.3) {return "orange"}  

    else if (3.3 < magnitude && magnitude <=3.7) {return "red"}
        
    else if (3.7 < magnitude && magnitude <=4.1) {return "green"}
        
    else if (4.1 < magnitude && magnitude <=4.5) {return "blue"}
        
    else if (4.5 < magnitude && magnitude <=5) {return "purple"}
        
    else if (5 < magnitude && magnitude <=5.5) {return "navy"}
        
    else if (5.5 < magnitude && magnitude <=6) {return "brown"}
        
    else if (magnitude > 6) {return "black"}
        
    else {return "white"}      
}


d3.json(queryUrl, function(data) {
  var earthquakeData = data.features;
  createEarthquakes(earthquakeData)
});

function createEarthquakes(earthquakeData) {

  var earthquakes = []

  for (var i = 0; i < earthquakeData.length-1; i++) {
    var earthquake_dict = 
    {
      name: earthquakeData[i].properties.place,
      location: [ earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0] ],
      magnitude: earthquakeData[i].properties.mag
    }
    earthquakes.push(earthquake_dict)
  }
  console.log(earthquakes)
  console.log(earthquakes[0].magnitude)

  createFeatures(earthquakes)
}

function createFeatures(earthquakes) {
  for (var j = 0; j < earthquakes.length; j++) {
    console.log(earthquakes[j].magnitude)
    L.circle(earthquakes[j].location, {
      fillOpacity: 0.75,
      color: markerColor(earthquakes[j].magnitude),
      fillColor: markerColor(earthquakes[j].magnitude),

      radius: markerSize(earthquakes[j].magnitude)
    }).bindPopup("<h1>" + earthquakes[j].name + "</h1> <hr> <h3>Magnitude: " + earthquakes[j].magnitude + "</h3>").addTo(myMap);
  }
}

