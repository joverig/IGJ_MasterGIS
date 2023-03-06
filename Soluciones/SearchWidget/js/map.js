require([
    "esri/map", "esri/dijit/Search",
    "dojo/parser", "dojo/domReady!"], 
    function (Map, Search, parser) {
        // Parse DOM nodes decorated with the data-dojo-type attribute
        parser.parse();

        var map = new Map('cpCenter', {
            basemap: 'satellite',
            center: [-3, 40],
            zoom: 8
        });

        var busqueda = new Search({
            map: map, 
            maxSuggestions: 2,
            minCharacters: 4
        }, 'divSearch');
        busqueda.startup();

    }
);
