class VLayer {
	constructor() {
		this.layer = new ol.layer.Vector({});
		this.features = [];
		this.named = {};
	}

	add(feature, name="") {
		this.features.push(feature);
		this.refresh();
		this.named[name] = feature;
	}

	addTo(map, z = 2) {
		map.addLayer(this.layer);
		this.layer.setZIndex(z);
	}

	clear() {
		this.features = [];
		this.named = {};
		this.refresh();
	}

	refresh() {
		this.layer.setSource(new ol.source.Vector({features: this.features}));
	}
}


class DrifterApp {
	constructor(center, zoom, selection) {
		let controls = [];

		controls.push(this.createButton(">", this.toggleAnimate.bind(this)));		//animation button
		controls.push(this.createButton('E', this.exportSelection.bind(this)));	//export selection button

		this.container = document.getElementById('popup');
		this.content = document.getElementById('popup-content');
		this.closer = document.getElementById('popup-closer');

		this.overlay = new ol.Overlay({
		  element: this.container,
		  autoPan: true,
		  autoPanAnimation: {
			duration: 250,
		  },
		});

		this.closer.onclick = this.hideTooltip.bind(this);

		this.map = new ol.Map({
			target: 'map',
			controls: controls,
			overlays: [this.overlay],
			layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
			view: new ol.View({center: center, zoom: zoom})
		});

		this.map.on('singleclick', this.click.bind(this));

		this.markers = new VLayer();
		this.markers.addTo(this.map, 3);

		this.lines = new VLayer();
		this.lines.addTo(this.map, 2);

		this.data = undefined;

		if (selection)
		{
			this.selected = selection.split(",");
		}
		else
		{
			this.selected = [];
		}

		this.timeline = undefined;
		this.keyframes = [];
		this.animating = false;
		this.anim_i = 0;
		this.anim_h = -1;
	}

	loadDrifters() {
		this.refreshDrifters(this.drawDrifters.bind(this))
	}
	
	refreshDrifters(callback) {
		$.getJSON("grouped.json", callback);
	}

	createButton(text, callback) {
		let button = document.createElement('button');
		button.innerHTML = text;

		button.addEventListener('click', callback, false);

		let container = document.createElement('div');
		container.className = 'play-button ol-unselectable ol-control';
		container.appendChild(button);

		return new ol.control.Control({
			element: container
		});
	}

	colourMap(name, i, n) {
		if (this.selected.length && !this.selected.includes(name))
		{
			return ["rgba(127, 127, 127, 0.4)", 0.4, 0];
		}
		else {
			let h = parseFloat(i) / (n + 1) * 360;
			h = h.toFixed(2);

			return [`hsl(${h}, 100%, 50%)`, 1.0, 1];
		}
	}

	redrawDrifters() {
		this.markers.clear();
		this.lines.clear();
		this.drawDrifters(this.data);
	}
	
	drawDrifters(data) {
		let i = 0;
		let n = Object.keys(data).length;
		this.data = data;

		// undraw all existing features

		for (let [name, path] of Object.entries(data))
		{
			let [colour, opacity, zindex] = this.colourMap(name, i, n);
			let last = path[path.length - 1];
			let [_, lat, lng] = last;

			let mark = this.createMarker(colour, lat, lng, opacity, zindex);
			let line = this.createLine(colour, path, opacity, zindex);

			mark.drifterName = name;
			line.drifterName = name;

			this.markers.add(mark, name);
			this.lines.add(line, name);

			++i;
		}
	}

	svgAlphaFix(colour, opacity) {
		if (opacity < 1.0) { // svgs have a quirky interaction with rgba opacity, so avoid that
			let match = colour.match("rgba\\((.*),(.*),(.*),(.*)\\)");

			if (match) {
				let [_, r, g, b, a] = match;

				colour = `rgb(${r}, ${g}, ${b})`;
				opacity = parseFloat(a);
			}
		}

		return [colour, opacity];
	}
	
	createMarker(colour, lat, lng, opacity=1.0, z=1) {
		[lat, lng] = [parseFloat(lat), parseFloat(lng)];

		let marker = new ol.Feature({
			name: "marker",
			type: "icon",
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
		});

		[colour, opacity] = this.svgAlphaFix(colour, opacity);

		marker.setStyle(new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 1],
				src: "marker.svg",
				scale: 0.8,
				opacity: opacity,
				color: colour
        	}),
			zIndex: z
    	}));

		return marker;
	}

	moveMarker(name, lat, lng) {
		let marker = this.markers.named[name];

		if (marker) {
			marker.setGeometry(new ol.geom.Point(ol.proj.fromLonLat([lng, lat])));
		}
	}
	
	createLine(colour, path, opacity=1.0, z=1) {
		let points = [];

		for (let [_, lat, lng] of path) {
			points.push(ol.proj.fromLonLat([lng, lat]));
		}

		let line = new ol.Feature({geometry: new ol.geom.LineString(points)});
		line.setStyle(new ol.style.Style({
			stroke: new ol.style.Stroke({ color: colour, width: 2}),
			opacity: opacity,
			zIndex: z
		}));

		return line;
	}

	click(evt) {
		let pixel = evt.pixel;
		let feature = this.map.forEachFeatureAtPixel(pixel, function (f) {return f;});

		let shiftDown = evt.originalEvent.shiftKey;

		if (feature) {
			if (shiftDown)
			{
				let name = feature.drifterName;

				if (this.selected.includes(name))
				{
					this.selected = this.selected.filter(s => s !== name);
				}
				else {
					this.selected.push(feature.drifterName);
				}

				this.redrawDrifters();
				return this.hideTooltip(evt);
			}
			else
			{
				this.setSelected([feature.drifterName]);
				return this.showTooltip(feature);
			}
		}
		else
		{
			if (!shiftDown) {
				this.setSelected([]);
			}

			return this.hideTooltip(evt);
		}
	}

	setSelected(selection) {
		let prev = this.selected;
		this.selected = selection;

		if (!(prev.length === selection.length && prev.every(e => selection.includes(e)))) {
			this.redrawDrifters();
		}
	}
	
	showTooltip(feature) {
		let coordinate = feature.getGeometry().getCoordinates();

		let name = feature.drifterName;
		let hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

		this.content.innerHTML = `<p>Name: ${name}<br>Coordinates: ${hdms}`;
	    this.overlay.setPosition(coordinate);
	}
	
	hideTooltip(evt) {
		  this.overlay.setPosition(undefined);
		  this.closer.blur();
		  return false;
	}

	exportSelection() {
		urlParams.set("s", this.selected.join(","));
		let baseUrl = window.location.origin + window.location.pathname;
		window.location.href = baseUrl + "?" + urlParams.toString();
	}

	toggleAnimate(e) {
		if (this.animating) {
			this.stopAnimate();
		}
		else {
			this.startAnimate();
		}
	}
	
	startAnimate() {
		if (this.animating) {
			return;
		}

		this.playButton.innerHTML = "||";

		if (!this.timeline) {
			this.timeline = {}; // may or may not be cleaner than just seeking at each step

			for (let [name, path] of Object.entries(this.data))
			{
				for (let [time, lat, lng] of path) {
					this.timeline[time] = this.timeline[time] || [];
					this.timeline[time].push([name, lat, lng]);
				}
			}
		}

		this.keyframes = Object.keys(this.timeline).sort();

		this.animating = true;
		this.stepAnimate()
	}

	stopAnimate() {
		this.animating = false;
		this.playButton.innerHTML = ">";
		clearTimeout(this.anim_h);
	}

	stepAnimate() {
		if (this.animating) {
			let key = this.keyframes[this.anim_i];
			this.anim_i = (this.anim_i + 1) % this.keyframes.length;

			let events = this.timeline[key];

			for (let [name, lat, lng] of events)
			{
				this.moveMarker(name, lat, lng);
			}

			// doing timeout here, for now, as it may be a little cleaner for pausing and continuing animations through user interaction
			this.anim_h = setTimeout(this.stepAnimate.bind(this), 1000)
		}
	}
}


const GALAPAGOS = [ -90.8770522, -0.246927];

const urlParams = new URLSearchParams(window.location.search);
let selection = urlParams.get("s");

let app = new DrifterApp(ol.proj.fromLonLat(GALAPAGOS), 7.0, selection);
app.loadDrifters();