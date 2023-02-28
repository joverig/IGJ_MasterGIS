require([
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/arcgis/utils",
    "esri/map",
    "dojo/parser",
    "esri/dijit/Legend",
    "esri/layers/FeatureLayer",
    "esri/toolbars/draw",
    "esri/symbols/FillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/symbols/SimpleFillSymbol",
    "esri/graphic",
    "esri/tasks/query",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
  ], function (
    ArcGISDynamicMapServiceLayer,
    arcgisUtils,
    Map,
    parser,
    Legend,
    FeatureLayer,
    Draw,
    FillSymbol,
    SimpleLineSymbol,
    Color,
    SimpleFillSymbol,
    Graphic,
    Query,
    SimpleMarkerSymbol
  ) {
    parser.parse();
  map = new Map("map", {
    basemap: "streets-vector",
    center: [-3, 40],
    zoom: 5,
  });
  var hospitales = new FeatureLayer(
    "https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer/0"
  );
  map.addLayer(hospitales)
  


  var line = new SimpleLineSymbol();
  line.setColor(new Color([230, 76, 0, 1]));
  var marker = new SimpleMarkerSymbol();
  marker.setColor(new Color([230, 230, 0, 0.87]));
  marker.setOutline(line);
  marker.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);


  document.getElementById("toolbar").addEventListener("click", buscarProvincia);

  function buscarProvincia(){
    var provinviaconsultada = "PROVINCIAS = \'" + document.getElementById("myselect").value +"\'"
    console.log(provinviaconsultada)
    


    consulta = new Query();
    consulta.where = provinviaconsultada
    
    hospitales.selectFeatures(consulta);
    hospitales.setSelectionSymbol(marker);
  }

  // https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer  
});
