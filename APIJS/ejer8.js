require([
    "esri/arcgis/utils",
    "dojo/parser",
    "esri/map", 
    "esri/tasks/locator",
    
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ], function ( arcgisUtils,parser, Map, Locator,dom, on) {
    parser.parse();

    
    var webmap = new Map('cpCenter',{
     basemap: 'hybrid',
    center : [-117.19,34.05],
    zoom : 15})
           


    var btn = document.getElementById("btnLocate")
var casilla = document.getElementById("casilla")
    btn.addEventListener("click",buscarDireccion)
    

    function buscarDireccion(){
    console.log("hola")
    direccion = casilla.value
    console.log(direccion)
     
    var localizador = new Locator ("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer")
    var direccion = {address:{
        "Singleline": direccion
      },
    outFields:['*']
    };

     localizador.addressToLocations(direccion, zoom)
     function zoom(objeto){
        console.log(objeto[0].location)
        nuevascoordenadasx = objeto[0].location.x
        nuevascoordenadasy = objeto[0].location.y
        nuevascoordenadas = [nuevascoordenadasx,nuevascoordenadasy]
        console.log(nuevascoordenadas)
        webmap.centerAt(nuevascoordenadas)
        console.log(objeto)

     }
}
  });