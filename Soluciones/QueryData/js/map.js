require([
  "esri/map",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/FeatureLayer",

  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",

  "esri/toolbars/draw",
  "esri/graphic",
  "esri/Color",
  "esri/tasks/query",

  "dojo/parser",
  "dojo/domReady!",
], function (
  Map,
  ArcGISDynamicMapServiceLayer,
  FeatureLayer,
  SimpleFillSymbol,
  SimpleLineSymbol,
  SimpleMarkerSymbol,
  Draw,
  Graphic,
  Color,
  Query,
  parser
) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  var sUrlUSAService =
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
  var sUrlQuakesLayer =
    "http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0";

  // Create the map
  var mapMain = new Map("divMap", {
    basemap: "topo",
    center: [-119.65, 36.87],
    zoom: 4,
  });

  // Construct the USA layer
  var lyrUSA = new ArcGISDynamicMapServiceLayer(sUrlUSAService, {
    opacity: 0.5,
  });
  lyrUSA.setVisibleLayers([0, 1, 3]);
  var lyrQuakes = new FeatureLayer(sUrlQuakesLayer, {
    outFields: ["FID", "MAGNITUDE"]
  });

  mapMain.addLayers([lyrUSA, lyrQuakes]);
  mapMain.on("load", initDrawTool);

  function initDrawTool() {
    /*
     * Step: Implement the Draw toolbar
     */
    var tbDraw = new Draw(mapMain);
    tbDraw.activate(Draw.POLYGON);
    tbDraw.on("draw-end", displayPolygon);
  }

  function displayPolygon(evt) {
    // Get the geometry from the event object
    var geometryInput = evt.geometry;

    // Define symbol for finished polygon
    var tbDrawSymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_DASHDOT,
        new Color([255, 255, 0]),
        2
      ),
      new Color([255, 255, 0, 0.2])
    );

    var graphicPolygon = new Graphic(geometryInput, tbDrawSymbol);
    mapMain.graphics.clear();

    mapMain.graphics.add(graphicPolygon);

    selectEarthquakes(evt.geometry)
  }

  // Filtro con geometría
  function selectEarthquakes (geoInput) {
    // console.log('geo', geoInput);
    var consulta = new Query();
    consulta.geometry = geoInput;

    lyrQuakes.selectFeatures(consulta);

    var marker = new SimpleMarkerSymbol();
    marker.setStyle(SimpleMarkerSymbol.STYLE_X);

    lyrQuakes.setSelectionSymbol(marker);
  }

  lyrQuakes.on('selection-complete', listQuakes);

  function listQuakes (results) {
    var terremotos = results.features;
    console.log('listQuakes terremotos', terremotos);
    document.getElementById('lista').innerHTML = ''
    terremotos.forEach(function (terremoto) {
      console.log(terremoto);
      
      var elementLi = document.createElement('li');
      var text = `Terremoto ${terremoto.attributes.FID} de magnitud ${terremoto.attributes.MAGNITUDE}`;

      elementLi.innerHTML = text;

      document.getElementById('lista').appendChild(elementLi);
    })


  }








  // function listQuakes(results) {
  //   var listado = document.getElementById('lista');
  //   listado.innerHTML = ''
  //   results.features.map(terremoto => {
  //     var list = document.createElement('li');
  //     list.innerHTML = `Terremoto: ${terremoto.attributes.FID} de magnitud ${terremoto.attributes.MAGNITUDE}`;
      
  //     listado.appendChild(list)
  //   });
  // }

});
