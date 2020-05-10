/* =====================
setup
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

/* =====================
main
===================== */

var dataset = "https://raw.githubusercontent.com/sofia-hu/692final/master/data/onlinejsonconvert.geojson"

var hold = true;
  var myHold = function(feature) {
    if(hold){
      if (feature["properties"]["holdOut"]=="0"){return false;  }
      else{return true; }
    }
    else{
      if (feature["properties"]["holdOut"]=="0"){return true;  }
      else{return false;}
    };
  }

/*var myStyle = function(feature) {
  var collColor;
  if (feature["properties"]["holdOut"]=="0"){
    collColor = 'blue';
  }
  else{collColor = 'red';}
  return {fillColor: collColor};
};*/

var price = 1;
var myPrice = function(feature) {
  if(feature["properties"]["SalePrice"]<price){
      return true;
  }
  else{
    return false;
  };
};

var predict = 1;
var myPredict = function(feature) {
  if(feature["properties"]["predict"]<price){
      return true;
  }
  else{
    return false;
  };
};

var myFilter = function(feature){
  if(myHold(feature)){
    if(hold){
      if(myPredict(feature))
          {return true;}
          else{return false;}
    }
    else{
      if(myPrice(feature))
          {return true;}
          else{return false;}
    }
  }
  else{  return false; }
}

var featureGroup;
var parsedData;

var loadSlide = function() {
  //load all data
  $(document).ready(function() {
      $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      featureGroup = L.geoJson(parsedData,{
        //style: myStyle,
        filter: myHold
      }
    ).addTo(map);
    });
  });
};

loadSlide();

var cprice=0;
var cpredict=0;

function onEachFeature(feature, layer) {
  layer.on('click', function (e) {
    console.log(e);
    cprice=e.target.feature.properties.SalePrice;
    cpredict=e.target.feature.properties.predict;
    console.log(cprice);
    console.log(cpredict);

    if(hold){
      $('#pricebb').val(cpredict);
    }
    else{$('#pricebb').val(cprice);}

if(hold){
  if(cpredict<695001){
    $('#percent').val("25% cheapest");}
    else{
      if(cpredict<930003){
        $('#percent').val("50% cheapest");}
        else{
          if(cpredict<1380002){
              $('#percent').val("50% most expensive");}
              else{
                $('#percent').val("25% most expensive");
              }
        }
  }
}
else{
  if(cprice<695001){
    $('#percent').val("25% cheapest");}
    else{
      if(cprice<930003){
        $('#percent').val("50% cheapest");}
        else{
          if(cprice<1380002){
              $('#percent').val("50% most expensive");}
              else{
                $('#percent').val("25% most expensive");
              }
        }
  }
}

    map.flyTo([e.latlng.lat, e.latlng.lng], 16);
  });
}

var plotData = function(){
  $(document).ready(function() {
      $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      featureGroup = L.geoJson(parsedData,{
        //style: myStyle,
        filter: myFilter,
        onEachFeature: onEachFeature
      }
    ).bindPopup(function (layer) {
    return "<br><b>Address:</b> " + layer.feature.properties.Address
    + "<br><b>Built Year:</b> " + layer.feature.properties.BuiltYear
    + "<br><b>Bedrooms:</b> " + layer.feature.properties.Beds
    + "<br><b>Bathrooms:</b> " + layer.feature.properties.Baths
    + "<br><b>Lot Area:</b> " + layer.feature.properties.LotArea + "<b> sqft</b> "
    + "<br><b>Prop Area:</b> " + layer.feature.properties.PropArea + "<b> sqft</b> ";
}).addTo(map);
    });
  });
  };

var resetMap = function(data){
  map.removeLayer(data);
};

$('button#updateb').click(function(e) {
  price = $('#priceb').val();
  console.log("price", price);

  predict = $('#priceb').val();
  console.log("predict", predict);

  hold = $('#holdb')[0].checked;
  console.log("hold", hold);

  resetMap(featureGroup);
  map.flyTo([37.754903, -122.449282], 12);
  plotData();

});
