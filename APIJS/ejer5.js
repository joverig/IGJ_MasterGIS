var map, bingMapsKey;

require([
  "esri/arcgis/utils",
  "esri/map", "dojo/domReady!"
  ], function (arcgisUtils, Map) {
    // var myMap =  new Map('divMap',{ basemap: 'hybrid',
    // center : [-3,40],
    // zoom : 15})
    
    var deferred;
    var createMapOptions = {
      mapOptions: {
        slider: true
      },
      usePopupManager: true, // since version 3.10
      bingMapsKey: bingMapsKey,
      geometryServiceURL: "https://www.example.com/arcgis/rest/services/Geometry/GeometryServer"
    };
    var webMapItemID = "941d9c153b7b4ac8957711e4595719d3";
    deferred = arcgisUtils.createMap(webMapItemID, "divMap", createMapOptions);
// el .then() se usa para seguir trabajando con lo que devuelve la funcion, en este caso response sera el objeto respondido.

    deferred.then(function (response) {
    console.log('res' ,response)
    //   map = response.map;
    // }, function (error) {
    //      console.log("Error: ", error.code, " Message: ", error.message);
    //      deferred.cancel();
    });
});