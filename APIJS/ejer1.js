// domready permite que se cargue todo el dom, y luego ya carga el mapa, y el script, para que no de errores.

require(
    ["esri/map", "dojo/domReady!"],
    function(Map){
     var myMap =  new Map('divMap',{ basemap: 'hybrid',
    center : [-3,40],
    zoom : 15})
    document.getElementById("boton").addEventListener("click",zoomchile)
    function zoomchile(){
        console.log("hola");
        myMap.centerAt([20,20])
        
    }
    }
);