var mapMain;

require([
        "esri/map",
        "dojo/parser",
        "dojo/domRedy!"],
    function (Map,  parser) {
            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();


            // Create the map
            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 12
            });

           
    });