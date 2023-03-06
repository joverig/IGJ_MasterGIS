require([
    "esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
  
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
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
    SimpleRenderer,
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
    var line = new SimpleLineSymbol();
    line.setWidth(0);
    var symbolTerremoto = new SimpleMarkerSymbol();
    symbolTerremoto.setOutline(line);
    symbolTerremoto.setColor(new Color([230, 0, 0, 0.5]));
    var rendererTerremoto = new SimpleRenderer(symbolTerremoto);
    var tamañoVV = {
        type: "sizeInfo",
        field: "MAGNITUDE",
        minDataValue: 2,
        maxDataValue: 9,
        minSize: 6,
        maxSize: 100
    };
    rendererTerremoto.setVisualVariables([tamañoVV]);
    lyrQuakes.setRenderer(rendererTerremoto);
    mapMain.addLayers([lyrUSA, lyrQuakes]);
  });