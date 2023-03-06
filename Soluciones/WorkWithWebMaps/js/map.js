var mapMain;
var legendLayers;
var webmapId = '7d987ba67f4640f0869acb82ba064228';

require([
  "esri/dijit/BasemapGallery",
  "esri/dijit/Legend",
  "esri/arcgis/utils",
  "dojo/dom",
  "dojo/parser",
  "dojo/domReady!",
], function (
  BasemapGallery, Legend,
  arcgisUtils, dom,
  parser) {
    parser.parse();

    var webmap = arcgisUtils
      .createMap(webmapId, 'cpCenter')
      .then(function(response) {
        // Título del mapa
        dom.byId('title').innerHTML = response.itemInfo.item.title;
        console.log('response', response);

        // Leyenda
        var leyenda = new Legend({
          map: response.map,
        }, 'divLegend');
        leyenda.startup();

        // Basemap gallery
        var galeria = new BasemapGallery({
          map: response.map
        }, 'basemapGallery')
        galeria.startup();
      });
});
