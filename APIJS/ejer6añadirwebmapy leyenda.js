require(["esri/dijit/Search",
"esri/dijit/Legend",
    "esri/arcgis/utils",
    "dojo/parser",
    "dojo/domReady!",
  ], function (Search, Legend, arcgisUtils,parser) {
    parser.parse();

    var webMapItemID = "7d987ba67f4640f0869acb82ba064228";
    var webmap = arcgisUtils.createMap(webMapItemID, "cpCenter");
//createMap aparte de crear el mapa , devuelve un objeto que podemos acceder con .then()
    webmap.then(function (response) {
        console.log('res' ,response.itemInfo.item.title)
        document.getElementById("title").innerHTML = response.itemInfo.item.title
        
//metodo 1 de añadir legenda, usamos el mapa de la respuesta para configurar la leyenda
        var legendLayers = new Legend( {map : response.map},"divLegend");
        legendLayers.startup();

        //metodo 2 de leyenda ( investiga por que esto no es correcto)

        // var legends2 = arcgisUtils.geet
        // console.log("espacio",legendLayers)

           
    });
    var busqueda = new Search({map: webmap
            
    } , "divsearch")
  });
  