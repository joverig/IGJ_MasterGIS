var map, bingMapsKey;

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
  // var myMap =  new Map('divMap',{ basemap: 'hybrid',
  // center : [-3,40],
  // zoom : 15})
  parser.parse();
  var myMap = new Map("divMap", {
    basemap: "hybrid",
    //center : [-3,40],
    zoom: 3,
  });
  var layer1 = new ArcGISDynamicMapServiceLayer(
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
    {
      opacity: 0.75,
    }
  );

  var layer2 = new FeatureLayer(
    "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0", { outFields: ["*"] }
  );

  console.log(layer2);

  myMap.addLayers([layer1]);
  myMap.addLayer(layer2);
  layer1.setVisibleLayers([3, 1, 2]);
  var dibujo = new Draw(myMap);
  document.getElementById("toolbar").addEventListener("click", Activartoolbar);

  var line = new SimpleLineSymbol();
  line.setColor(new Color([230, 76, 0, 1]));
  var marker = new SimpleMarkerSymbol();
  marker.setColor(new Color([230, 230, 0, 0.87]));
  marker.setOutline(line);
  marker.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);

  function init(h) {

    let li = document.createElement("li");
    let pTexto = document.createTextNode(h);
    li.appendChild(pTexto);
  

    document.getElementById("list").append(li);
  }


  function anadirelemento(h) {

    let p = document.createElement("p");
    let pTexto = document.createTextNode(h);
    p.appendChild(pTexto);

    document.getElementById("list").append(p);

}


  function Activartoolbar(evento) {
    consulta2 = new Query();

    consulta2.where = "1=2";
    layer2.selectFeatures(consulta2);
    layer2.setSelectionSymbol(marker);

    myMap.graphics.clear();
    dibujo.activate(Draw.POLYGON);
    dibujo.on("draw-end", pintarpol);
    console.log("funciona");
    console.log(evento);
  }

  function pintarpol(evento) {
    var fill = new SimpleFillSymbol();
    fill.setColor(new Color([255, 170, 0, 0.25]));

    var graphic = new Graphic(evento.geometry, fill);
    myMap.graphics.add(graphic);


    consulta = new Query();
    consulta.geometry = evento.geometry;

    layer2.selectFeatures(consulta);

    //COMO TRABAJAR CON EVENTOS, PRIMERO LO CAPTURO CON UN .ON(EVENTO, FUNCION), Y LUEGO INSTANCIO UNA FUNCION, Y EL PARAMETRO DE LA FUNCION SERA EL OBJETO DEVUELTO POR EL EVENTO
    layer2.on("selection-complete", selecionhecha)

    function selecionhecha(listquakes){
      document.getElementById("list").innerHTML=""
      var terremotos = listquakes.features
      console.log(terremotos)
      console.log(terremotos[0].attributes.PLACE)
      console.log(terremotos.length)
      for (jp of terremotos){
        init(jp.attributes.PLACE)

      }
anadirelemento("Un total de " + terremotos.length+" terremotos")

    };

    layer2.setSelectionSymbol(marker);
    dibujo.deactivate(Draw.POLYGON)
  }
});
// URL variables
// http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer
// https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer

// Construct the USA layer - Ocultar capa de estados

// Construct the Quakes layer - Mostrar solo los de magnitud mayor de 2

//  Wire the draw tool initialization function

// Inicializar la herramienta de dibujo para pintar polígonos

// Mostrar el polígono dibujado
