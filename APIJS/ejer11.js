var map;
      require([
        "esri/map", "esri/layers/FeatureLayer", "esri/InfoTemplate",
        "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
        "esri/renderers/UniqueValueRenderer", "esri/Color",
        "esri/dijit/Legend",
        "dojo/domReady!"
      ], function(
        Map, FeatureLayer, InfoTemplate,
        SimpleLineSymbol, SimpleFillSymbol,
        UniqueValueRenderer, Color, Legend
      ) {
        map = new Map("map", {
          basemap: "gray",
          center: [-2, 40],
          zoom: 6,
          slider: false
        });
        map.on("load", addFeatureLayer);

        function addFeatureLayer() {
          var defaultSymbol = new SimpleLineSymbol().setStyle(SimpleLineSymbol.STYLE_SOLID);
         // defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);

          //create renderer
          var renderer = new UniqueValueRenderer(defaultSymbol, "claseD");

          //add symbol for each possible value
          renderer.addValue("Autopista", new SimpleLineSymbol().setColor(new Color([255, 0, 0, 1])));
          renderer.addValue("Autovía", new SimpleLineSymbol().setColor(new Color([0, 255, 0, 1])));
          renderer.addValue("Carretera multicarril", new SimpleLineSymbol().setColor(new Color([0, 0, 255, 1])));
          renderer.addValue("Urbano", new SimpleLineSymbol().setColor(new Color([255, 0, 255, 1])));
          renderer.addValue("Camino", new SimpleLineSymbol().setColor(new Color([255, 255, 100, 0.75])));
          renderer.addValue("Carril bici", new SimpleLineSymbol().setColor(new Color([0, 255, 255, 1])));
          renderer.addValue("Senda", new SimpleLineSymbol().setColor(new Color([255, 255, 0, 1])));
          renderer.addValue("Other", new SimpleLineSymbol().setColor(new Color([127, 127, 0, 1])));
          renderer.addValue("W S Cen", new SimpleLineSymbol().setColor(new Color([0, 0, 0, 1])));

          var featureLayer = new FeatureLayer("https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Red_de_carreteras_en_Espa%c3%b1a/FeatureServer/0", {
            //infoTemplate: new InfoTemplate("", "claseD"),
            //mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"]
          });
          console.log(featureLayer)

          featureLayer.setRenderer(renderer);
          map.addLayer(featureLayer);
          var legendLayers = new Legend( {map : map},"divLegend");
          legendLayers.startup();
        }
      });