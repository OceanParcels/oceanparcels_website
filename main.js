class RLayer {
	constructor(layer) {
		this.layer = layer;
		this.features = [];
		this.named = {};
	}

	add(feature, name="") {
		this.features.push(feature);
		this.layer.setSource(new ol.source.Vector({features: this.features}));
		this.named[name] = feature;
	}

	addTo(map, z = 2) {
		map.addLayer(this.layer);
		this.layer.setZIndex(z);
	}
}


class DrifterApp {
	constructor(center, zoom, selection) {
		this.map = new ol.Map({
			target: 'map',
			layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
			view: new ol.View({center: center, zoom: zoom})
		});

		let markers = new ol.layer.Vector({});
		this.markers = new RLayer(markers);
		this.markers.addTo(this.map, 3);

		let lines = new ol.layer.Vector({});
		this.lines = new RLayer(lines);
		this.lines.addTo(this.map, 2);

		if (selection)
		{
			this.selected = selection.split(",");
		}
		else
		{
			this.selected = [];
		}
	}

	loadDrifters() {
		this.refreshDrifters(this.drawDrifters.bind(this))
	}
	
	refreshDrifters(callback) {
		$.getJSON("grouped.json", callback);
	}

	colourMap(name, i, n) {
		if (this.selected.length && !this.selected.includes(name))
		{
			return "rgb(127, 127, 127)";
		}
		else {
			let h = parseFloat(i) / (n + 1) * 360;
			h = h.toFixed(2);

			return `hsl(${h}, 100%, 50%)`;
		}
	}
	
	drawDrifters(data) {
		let i = 0;
		let n = Object.keys(data).length;

		// undraw all existing features

		for (let [name, path] of Object.entries(data))
		{
			let colour = this.colourMap(name, i, n);
			let last = path[path.length - 1];
			let [_, lat, lng] = last;

			let mark = this.createMarker(colour, lat, lng);
			let line = this.createLine(colour, path);

			this.markers.add(mark, name);
			this.lines.add(line, name);

			++i;
		}
	}
	
	createMarker(colour, lat, lng) {
		[lat, lng] = [parseFloat(lat), parseFloat(lng)];

		let marker = new ol.Feature({
			name: "marker",
			type: "icon",
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
		});

		marker.setStyle(new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 1],
				src: "marker.svg",
				scale: 0.8,
				color: colour
        	})
    	}));

		return marker;
	}
	
	createLine(colour, path) {
		let points = [];

		for (let p of path) {
			let [_, lat, lng] = p;
			points.push(ol.proj.fromLonLat([lng, lat]));
		}

		let line = new ol.Feature({geometry: new ol.geom.LineString(points)});
		line.setStyle(new ol.style.Style({stroke: new ol.style.Stroke({ color: colour, width: 2 })}));

		return line;
	}
	
	drawTooltip() {
		
	}
	
	hideTooltip() {
		
	}
	
	mainloop(animate = false) {
		
	}
}


const GALAPAGOS = [ -90.8770522, -0.246927];

const urlParams = new URLSearchParams(window.location.search);
let selection = urlParams.get("s");

let app = new DrifterApp(ol.proj.fromLonLat(GALAPAGOS), 7.0, selection);
app.loadDrifters();