/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.754903, -122.449282],
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = "data/map(1).geojson"

var myStyle = function(feature) {
  var collColor;
  if (feature["properties"]["POP2010"]>4000){
    collColor = 'blue'
  }
  else{collColor = 'lightblue'};
  return {fillColor: collColor};
};

var myFilter = function(feature) {
  if(feature["properties"]["POP2010"]<0){
      return false;
  }
  else{
    return true;
  };
};

var myStyle1 = function(feature) {
  var collColor;
  if (feature["properties"]["HU2010"]>2000){
    collColor = 'yellow'
  }
  else{collColor = 'lightyellow'};
  return {fillColor: collColor};
};

var myFilter1 = function(feature) {
  if(feature["properties"]["HU2010"]<0){
      return false;
  }
  else{
    return true;
  };
};

var myStyle2 = function(feature) {
  var collColor;
  if (feature["properties"]["WHITENH"]>600){
    collColor = 'green'
  };
  //else{collColor = 'lightgreen'};
  return {fillColor: collColor};
};

var myFilter2 = function(feature) {
  if(feature["properties"]["WHITENH"]<600){
      return false;
  }
  else{
    return true;
  };
};

var myStyle3 = function(feature) {
  var collColor;
  if (feature["properties"]["BLACKNH"]>600){
    collColor = 'purple'
  };
  return {fillColor: collColor};
};

var myFilter3 = function(feature) {
  if(feature["properties"]["BLACKNH"]<600){
      return false;
  }
  else{
    return true;
  };
};

var myStyle4 = function(feature) {
  var collColor;
  if (feature["properties"]["HISPAN"]>2000){
    collColor = 'red'
  }
  else{collColor = 'lightred'};
  return {fillColor: collColor};
};

var myFilter4 = function(feature) {
  if(feature["properties"]["HISPAN"]<0){
      return false;
  }
  else{
    return true;
  };
};
