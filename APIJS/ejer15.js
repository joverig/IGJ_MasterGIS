require(["dojo/dom",
          "dojo/_base/array",
          "esri/Color",
          
          "esri/map",
          "esri/graphic",
          "esri/graphicsUtils",
          "esri/tasks/Geoprocessor",
          "esri/tasks/FeatureSet",
          "esri/tasks/LinearUnit",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/tasks/GeometryService",
          "esri/units",
          "esri/tasks/BufferParameters",
          "esri/SpatialReference",
          "esri/toolbars/draw"
          ],
    function(dom, array, Color, Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, GeometryService, units,BufferParameters, SpatialReference, Draw){

        var myMap = new Map("divMap", {
            basemap: "topo-vector",
            center: [20,3],
            zoom: 6
          });
          myMap.spatialReference = new SpatialReference({wkid: 32662})
        geometricalservice = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer")

        bufferparams = new BufferParameters()

        bufferparams.distances = [90];
        bufferparams.unit = GeometryService.UNIT_KILOMETER;
        bufferparams.bufferSpatialReference = new SpatialReference({wkid: 32662});
        bufferparams.outSpatialReference = myMap.spatialReference;
        
console.log(myMap.spatialReference)
        

        var dibujo = new Draw(myMap);
        
      


       // myMap.graphics.clear();
        dibujo.activate(Draw.POLYGON);
        dibujo.on("draw-end", pintarpol);

        function pintarpol(evento) {
            //myMap.graphics.clear();
            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([255, 0, 0, 0.5]));
        
            var graphic = new Graphic(evento.geometry, fill);
            myMap.graphics.add(graphic);

            bufferparams.geometries = [evento.geometry]

            geometricalservice.buffer(bufferparams, pintarbuffer)
        }



        function pintarbuffer(evento){

            var fill = new SimpleFillSymbol();
            fill.setColor(new Color([55, 170, 230, 0.4]));
            console.log(evento[0])
            console.log(evento)
            var graphic = new Graphic(evento[0], fill);
            myMap.graphics.add(graphic)



        }

function saluda(){
    console.log("hola Nacho")
}


    })