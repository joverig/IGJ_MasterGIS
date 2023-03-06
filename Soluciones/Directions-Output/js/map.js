require([
  "esri/map",
  "esri/dijit/Directions",
  "dojo/parser", "dojo/domReady!"], function (
    Map, Directions, parser) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  var mapMain = new Map("cpCenter", {
    basemap: "topo",
    center: [-117.19, 34.05],
    zoom: 13
  });

  var dijitDirections = new Directions({
    map: mapMain,
    routeTaskUrl: "http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World"
  }, "divDirections");
  dijitDirections.startup();
});
