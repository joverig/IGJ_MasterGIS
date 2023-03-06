var map;
require(["esri/map", "esri/layers/FeatureLayer", 
"esri/tasks/query", 
"esri/symbols/SimpleMarkerSymbol",
"esri/renderers/SimpleRenderer",
"esri/Color",
"dojo/domReady!"], function (
  Map,
  FeatureLayer,
  Query,
  SimpleMarkerSymbol,
  SimpleRenderer,
  Color
) {
  map = new Map("map", {
    basemap: "streets-vector",
    center: [-3, 40],
    zoom: 5,
  });

  var marker = new SimpleMarkerSymbol();
  marker.setColor(new Color([0, 77, 168, 1]));    

  var rendererHospitales = new SimpleRenderer(marker);

  var capaHospitales = new FeatureLayer(
    "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0"
  );
  capaHospitales.renderer = rendererHospitales;

  map.addLayer(capaHospitales);

  document.getElementById("selectProv").addEventListener("change", selectHospitales);

  function selectHospitales() {
    var select = document.getElementById("selectProv").value
    console.log('cambio de provincia', select);
    // Definir consulta
    var consulta = new Query(); 
    consulta.where = "CODPROV = " + select;
    // consulta.where = `CODPROV = ${select}`;
    // Ejecuto consulta
    capaHospitales.selectFeatures(consulta);

    //Defino simbología
    var marker = new SimpleMarkerSymbol();
    marker.setColor(new Color([163, 255, 115, 1]));
    marker.setStyle(SimpleMarkerSymbol.STYLE_DIAMOND);
    // Aplico simbología a elementos seleccionados
    capaHospitales.setSelectionSymbol(marker);
  }
});
