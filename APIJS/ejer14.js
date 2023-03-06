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
          "esri/symbols/SimpleFillSymbol"
          ],
    function(dom, array, Color, Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){

      var map, gp;

      /*Initialize map, GP*/

        map = new Map("mapDiv", {
          basemap: "topo-vector",
          center: [-122.436, 37.73],
          zoom: 11
        });

        gp = new Geoprocessor("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed");
        gp.setOutputSpatialReference({
          wkid: 102100
        });
        map.on("click", computeViewShed);

      function computeViewShed(evt) {
        map.graphics.clear();
        var pointSymbol = new SimpleMarkerSymbol();
        pointSymbol.setSize(14);
        pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1));
        pointSymbol.setColor(new Color([0, 255, 0, 0.25]));

        var graphic = new Graphic(evt.mapPoint, pointSymbol);
        map.graphics.add(graphic);

        var elemento = [];
        elemento.push(graphic);
        var featureSetprueba = new FeatureSet();
        featureSetprueba.features = elemento;

        var vsDistance = new LinearUnit();
        vsDistance.distance = 5;
        vsDistance.units = "esriMiles";

        var params = {
          "Input_Observation_Point": featureSetprueba,
          "Viewshed_Distance": vsDistance
        };

        gp.execute(params, drawViewshed);
      }

      function drawViewshed(results, messages) {
        console.log(results)
        
        var polySymbol = new SimpleFillSymbol();
        polySymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.5]), 1));
        polySymbol.setColor(new Color([255, 127, 0, 0.7]));

        var features = results[0].value.features;
        for (var f = 0, fl = features.length; f < fl; f++) {
          var feature = features[f];
          feature.setSymbol(polySymbol);
          map.graphics.add(feature);
        }
        console.log(map)
        map.setExtent(graphicsUtils.graphicsExtent(map.graphics.graphics), true);
      }
});
