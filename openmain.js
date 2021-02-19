const GALAPAGOS = [ -90.8770522, -0.246927];

let markerLayer;
let markers;
let markerFeatures = [];

let lineLayer;
let lines;
let lineFeatures = [];

function init() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(GALAPAGOS),
            zoom: 7.0
        })
    });

    markerLayer = new ol.layer.Vector();
    map.addLayer(markerLayer);
    markerLayer.setZIndex(3);

    lineLayer = new ol.layer.Vector();
    map.addLayer(lineLayer);
    lineLayer.setZIndex(2);

    var tooltip = document.getElementById('tooltip');
    var overlay = new ol.Overlay({
      element: tooltip,
      offset: [10, 0],
      positioning: 'bottom-left'
    });
    map.addOverlay(overlay);

    function displayTooltip(evt) {
      var pixel = evt.pixel;
      var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
      });
      tooltip.style.display = feature ? '' : 'none';
      if (feature) {
        overlay.setPosition(evt.coordinate);
        tooltip.innerHTML = feature.get('name');
      }
    }

    map.on('pointermove', displayTooltip);

    loadDrifters();
}

function loadDrifters() {
    $.getJSON("grouped.json", drawDrifters);  // replace drawDrifters with a slow update loop
}

function drawDrifters(drifters) {
    markers = {};
    lines = {};

    let i = 0;
    let n = Object.keys(drifters).length;

    for (let [name, path] of Object.entries(drifters))
    {
        let last = path[path.length - 1];
        let [_, lat, lng] = last;

        let col = hslMap(i, n);

        markers[name] = drawMarker(lat, lng, col);
        lines[name] = drawTrail(path, col);

        ++i;
    }
}

function hslMap(i, n) {
    let h = parseFloat(i) / (n + 1) * 360;
    h = h.toFixed(2);

    return `hsl(${h}, 100%, 50%)`;
}

function drawMarker(lat, lng, colour) {
    let opts = {
        name: "marker",
        type: "icon",
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
    };
    let marker = new ol.Feature(opts);

    marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: "marker.svg",
            scale: 0.8,
            color: colour
        })
    }));

    markerFeatures.push(marker);

    markerLayer.setSource(new ol.source.Vector({
        features: markerFeatures
    }));

    return marker;
}

function drawTrail(path, colour) {
    let points = [];

    for (let p of path) {
        let [_, lat, lng] = p;
        points.push(ol.proj.fromLonLat([lng, lat]));
    }

    let featureLine = new ol.Feature({
        geometry: new ol.geom.LineString(points)
    });

    featureLine.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({ color: colour, width: 2 })
    }));

    lineFeatures.push(featureLine);

    let vectorLine = new ol.source.Vector({
        features: lineFeatures
    });

    lineLayer.setSource(vectorLine);

    return featureLine
}


init();