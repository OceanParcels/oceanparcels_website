let map;
let drifters;
let markers;

function loadDrifters() {
    $.getJSON("grouped.json", drawDrifters)
}

function drawDrifters(data) {
    drifters = data;

    markers = [];
    lines = [];

    let i = 0;
    let n = Object.keys(drifters).length;
    for (let key in drifters)
    {
        let path = drifters[key];
        let last = path[path.length - 1];
        let [_, lat, lng] = last;

        let colour = hslMap(i, n);

        let icon = createMarkerSymbol(colour);
        let line = drawTrail(map, path, colour);

        ++i;

        let mark = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            icon: icon
        });

        markers.push(mark);
        lines.push(line);
    }
}

function drawTrail(map, path, hslColour) {
    latlngPath = [];

    for (let i in path) {
        let p = path[i];
        let [_, lat, lng] = p;

        latlngPath.push({lat: lat, lng: lng})
    }

    let line = new google.maps.Polyline({
        map: map,
        path: latlngPath,
        strokeColor: hslColour
    });

    return line
}

function hslMap(i, n) {
    let h = parseFloat(i) / (n + 1) * 360;
    h = h.toFixed(2);

    return `hsl(${h}, 100%, 50%)`;
}

function createMarkerSymbol(hslColour) {
    let svgSym = {
        path:
          "m 12.498047,-0.00195313 c -2.9529008,0 -5.8818186,1.40132583 -8.1660158,3.53906253 C 3.4099134,4.3288681 2.6487611,5.2387072 2.0546875,6.2519531 0.78097778,8.2099633 -0.00159796,10.443191 0,12.691406 c 6.8195633e-4,0.997898 0.87011581,3.291747 2.21875,6.027344 0.4032234,0.847335 0.9089877,1.801742 1.4960938,2.847656 0.16336,0.294801 0.3279171,0.587597 0.4980468,0.884766 0.1123534,0.1944 0.2328989,0.399397 0.3515625,0.601562 0.1465322,0.25041 0.2870558,0.49986 0.4375,0.75 2.7496668,4.57183 5.5340949,10.421833 6.1894529,13 l 1.039063,4.080078 0.109375,0.607422 0.02344,-0.08789 0.02149,0.08789 1.55664,-5.068359 c 0.856422,-2.787591 3.694141,-8.677106 6.306641,-13.087891 0.386874,-0.653168 0.758498,-1.313336 1.119141,-1.972656 1.01923,-1.762576 1.74467,-3.20631 2.228515,-4.470703 0.864886,-1.952026 1.402344,-3.539427 1.402344,-4.287109 0,-2.403317 -0.9154,-4.8045123 -2.388672,-6.8593754 -0.619897,-0.93839 -1.387611,-1.7835244 -2.292969,-2.5214844 -2.236201,-1.9571964 -5.025597,-3.22460933 -7.818359,-3.22460933 z m 0,7.99414063 c 0.175599,0 0.362788,0.034416 0.554687,0.085937 1.068994,0.096877 2.088457,0.4575975 2.746094,1.1152344 2.804999,2.8049771 0.690948,7.7988281 -3.300781,7.7988281 -1.155001,0 -2.6407814,-0.539238 -3.3007814,-1.199218 C 8.5252206,15.120924 8.1645696,14.071192 8.078125,12.976562 8.030851,12.800535 7.998047,12.633993 7.998047,12.492188 c 0,-0.175822 0.03429,-0.36253 0.085937,-0.554688 C 8.181027,10.868925 8.5398636,9.8507614 9.1972656,9.1933594 9.8549025,8.5357225 10.874365,8.175002 11.943359,8.078125 c 0.1919,-0.051522 0.379089,-0.085937 0.554688,-0.085937 z",
        fillColor: hslColour,
        fillOpacity: 1.0,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.8,
        anchor: new google.maps.Point(15, 30),
    };

    return svgSym;
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -0.246927, lng: -90.8770522 },
        zoom: 7.0,
        mapId: "d315b7ffc2a2258a"
    });

    loadDrifters();
}