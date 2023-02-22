require(["esri/dijit/Search",
"esri/dijit/Legend",
    "esri/arcgis/utils",
    "dojo/parser",
    "dojo/domReady!",
  ], function (Search, Legend, arcgisUtils,parser) {
    parser.parse();

    var webMapItemID = "7d987ba67f4640f0869acb82ba064228";
    var webmap = arcgisUtils.createMap(webMapItemID, "divMap");

           

    var busqueda = new Search({
        map: webmap            
    } ,
     "divsearch")
  });
  