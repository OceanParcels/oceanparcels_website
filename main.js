const TEXT = {
	animation_start: "START ANIMATION",
	animation_pause: "PAUSE ANIMATION",
	select_drifter: "SELECT DRIFTER BY NAME",
	drifter_prompt: "Which drifter do you want to select?",
	drifter_date: "Drifters on",
	no_referrer: "Please try to access this map on https://galapagosplasticfree.nl/ instead ;)"
};

const DATA_URL = "https://oceanparcels.org/";

class VLayer {
	constructor() {
		this.layer = new ol.layer.Vector({});
		this.features = [];
		this.named = {};
	}

	add(feature, name="") {
		this.features.push(feature);
		this.named[name] = feature;
	}

	addTo(map, z = 2) {
		map.addLayer(this.layer);
		this.layer.setZIndex(z);
	}

	clear() {
		this.features = [];
		this.named = {};
	}

	update() {
		this.layer.setSource(new ol.source.Vector({features: this.features}));
	}
}


class DrifterApp {
	constructor(center, zoom) {
		this.begin = null;
		this.data = null;
		this.selection = null;

		this.animating = false;
		this.anim_t = null;
		this.anim_0 = null;
		this.anim_s = 24 * 3600 * 1000;

		this.data_source = null;

		let controls = [];

		let playControl;
		[this.playButton, playControl] = this.createOLButton(TEXT.animation_start, this.toggleAnimate.bind(this));
		controls.push(playControl);		//animation button

		controls.push(this.createOLButton(TEXT.select_drifter, this.createSearchModal.bind(this))[1]);

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

		this.setupSocialButtons();

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

		this.openlayersUnselectableFix()
	}

	start() {
		this.readQuery();

		let self = this;

		this.refreshDrifters(function (data) {
			self.processDrifters(data);

			self.zoomToRelevant();

			if (self.animating)
			{
				self.startAnimate();
			}
			else {
				self.drawDrifters(self.data);
			}
		});
	}
	
	readQuery() {
		this.animating = Number.parseInt(urlParams.get("a"));
		let selection = urlParams.get("s");
		
		if (selection)
		{
			this.selected = selection.split(",");
		}
		else
		{
			this.selected = [];
		}
		
		this.begin = Date.parse(urlParams.get("b")) || 0;
	}

	generateQueryURL(escape=false) {
		urlParams.set("s", this.selected.join(","));
		urlParams.set("a", (this.animating ? 1 : 0).toString());

		let ret = baseUrl + "?" + urlParams.toString();
		return escape ? encodeURIComponent(ret) : ret;
	}

	updateDate(timestamp) {
		let date = new Date(timestamp);

		document.getElementById("date").innerHTML = TEXT.drifter_date + " " + date.toDateString();
	}

	processDrifters(data) {
		for (let drifter of Object.values(data))
		{
			for (let evt of drifter)
			{
				evt[0] = Date.parse(evt[0]);
			}
		}

		let new_data = {};

		for (let [name, path] of Object.entries(data))
		{
			let trimmed = path.filter(e => e[0] > this.begin);
			if (trimmed.length)
			{
				new_data[name] = trimmed;
			}
		}

		this.data = new_data;
	}

	refreshDrifters(callback) {
		if (this.data_source) {
			$.getJSON(DATA_URL + this.data_source, callback).catch(e => $.getJSON(DATA_URL + data_default, callback));
		}
		else
		{
			$.getJSON(DATA_URL + data_default, callback);
		}
	}

	createOLButton(text, callback) {
		let button = document.createElement('button');
		button.innerHTML = text;

		button.addEventListener('click', callback, false);
		button.className = "ol-button";

		let container = document.createElement('div');
		container.className = 'ol-unselectable ol-control';
		container.appendChild(button);

		return [button, new ol.control.Control({
			element: container
		})];
	}

	createSearchModal() {
		let search = prompt(TEXT.drifter_prompt);

		if (search === null)
		{
			return;
		}

		let result = this.searchDrifterByName(search);

		if (result.length)
		{
			this.showAutocorrectModal(result)
		}

	}

	showAutocorrectModal(result) {
		let modalButtons = $(".correct-buttons")[0];
		modalButtons.innerHTML = "";

		let self = this;

		for (let name of result)
		{
			let button = document.createElement("button");
			button.innerHTML = name;
			button.addEventListener("click", function (event) {self.setSelected([name]); modal.style.display = "none"});
			modalButtons.appendChild(button);
		}

		let modal = $(".correct-modal")[0];
		modal.style.display = "block";
	}

	searchDrifterByName(search) {
		// do we process regex? if we would, assume no autocorrect, as the user knows what they're doing
		let names = Object.keys(this.data);

		let exact = names.filter(x => x === search);
		if (exact.length) {
			this.setSelected(exact);
			return [];
		}

		let close = names.filter(x => levenshtein(x, search) < 4);

		if (close.length) {
			if (close.length === 1)
			{	//if it's close and the only one eligible, assume it's that one
				this.setSelected(close);
				return [];
			}

			return close;
		}

		return [];
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
		this.markers.clear();
		this.lines.clear();

		let i = 0;
		let n = Object.keys(data).length;
		let now = 0;

		for (let [name, path] of Object.entries(data))
		{
			let [colour, opacity, zindex] = this.colourMap(name, i, n);
			let last = path[path.length - 1];

			if (!last)
			{
				continue;
			}

			let [t, lat, lng] = last;

			if (t > now)
			{
				now = t;
			}

			let mark = this.createMarker(colour, lat, lng, opacity, zindex);
			let line = this.createLine(colour, path, opacity, zindex);

			mark.drifterName = name;
			line.drifterName = name;

			this.markers.add(mark, name);
			this.lines.add(line, name);

			++i;
		}

		this.updateDate(now);

		this.markers.update();
		this.lines.update();
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

	markerScale(mstyle, istyle, feature, resolution) {
		resolution = Math.max(400, Math.min(resolution, 2000));

		let base = 400;
		istyle.setScale(base / (1 + resolution));

		return [mstyle];
	}

	createMarker(colour, lat, lng, opacity=1.0, z=1) {
		[lat, lng] = [parseFloat(lat), parseFloat(lng)];

		let marker = new ol.Feature({
			name: "marker",
			type: "icon",
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat]))
		});

		[colour, opacity] = this.svgAlphaFix(colour, opacity);

		let iconStyle = new ol.style.Icon({
				anchor: [0.5, 0.5],
				src: "marker.svg",
				scale: 0.1,
				opacity: opacity,
				color: colour
		});

		let markerStyle = new ol.style.Style({
			image: iconStyle,
			zIndex: z
    	});

		marker.setStyle(this.markerScale.bind(this, markerStyle, iconStyle));

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

				this.setSelected(this.selected);

				if (!this.animating) {
					this.redrawDrifters();
				}

				return this.hideTooltip(evt);
			}
			else
			{
				this.setSelected([feature.drifterName]);
				return this.showTooltip(feature.drifterName);
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
			if (!this.animating) {
				this.redrawDrifters();
			}
		}
	}

	showTooltip(drifterName) {
		let feature = this.markers.named[drifterName];

		let coordinate = feature.getGeometry().getCoordinates();

		let name = feature.drifterName;
		let hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

		this.content.innerHTML = `<p><b>Name:</b> ${name}<br><b>Coordinates:</b> ${hdms}`;
	    this.overlay.setPosition(coordinate);
	}

	hideTooltip(evt) {
		  this.overlay.setPosition(undefined);
		  this.closer.blur();
		  return false;
	}

	toggleAnimate(e) {
		if (this.animating) {
			this.stopAnimate();
		}
		else if (this.anim_t !== null) {
			this.animating = true;
			this.playButton.innerHTML = TEXT.animation_pause;
			this.stepAnimate();
		}
		else {
			this.startAnimate();
		}
	}

	startAnimate() {
		this.animating = true;

		if (this.anim_t) {
			return;
		}

		this.playButton.innerHTML = TEXT.animation_pause;

		this.anim_t = Number.POSITIVE_INFINITY;
		let _, t;
		for (let drifter of Object.values(this.data))
		{
			[t, _, _] = drifter[0];
			if (t < this.anim_t)
			{
				this.anim_t = t;
			}
		}

		if (!this.selected.length)
		{
			this.setSelected(Object.keys(this.data));
		}

		this.anim_0 = this.anim_t;

		this.stepAnimate()
	}

	stopAnimate() {
		this.animating = false;
		this.playButton.innerHTML = TEXT.animation_start;
		clearTimeout(this.anim_h);
	}

	stepAnimate() {
		const deselectDead = true;
		const deathTimeout = 2 * this.anim_s;

		if (this.animating) {
			let trimmed = {};
			let alive = [];
			let finished = true;

			for (let [name, path] of Object.entries(this.data))
			{
				if (path.length)
				{
					let lastTime = path[path.length - 1][0];

					if (lastTime > this.anim_t) {
						finished = false;
					}

					if (lastTime + deathTimeout > this.anim_t)
					{
						alive.push(name)
					}
				}

				let earlier = path.filter(v => v[0] <= this.anim_t);

				if (earlier.length)
				{
					trimmed[name] = earlier;
				}
			}

			if (deselectDead)
			{
				this.setSelected(this.selected.filter(n => alive.includes(n)));
			}

			this.updateDate(this.anim_t);
			this.drawDrifters(trimmed);

			if (finished)
			{
				this.anim_t = this.anim_0;
			}
			else
			{
				this.anim_t += this.anim_s;
			}

			this.anim_h = setTimeout(this.stepAnimate.bind(this), 1000);
		}
	}

	zoomToRelevant() {
		let relevant = this.selected.length ? this.selected : Object.keys(this.data);
		let relevantData = relevant.map(n => this.data[n]);

		function select1(prev, curr)  // select min/max lng/lat from trail
		{
			return [Math.min(prev[0], curr[1]), Math.min(prev[1], curr[2]), Math.max(prev[2], curr[1]), Math.max(prev[3], curr[2])];
		}

		function select4(prev, curr)  // select min/max lng/lat from Array<Array[4]> of min/max lng/lat
		{
			return [Math.min(prev[0], curr[0]), Math.min(prev[1], curr[1]), Math.max(prev[2], curr[2]), Math.max(prev[3], curr[3])];
		}

		let def = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
		let bounds = relevantData.map(d => d.reduce(select1, def)).reduce(select4);

		function scale(m, a) {
			let c = (a[0] + a[1]) / 2;
			return a.map(x => m * (x - c) + c)
		}

		let upper = [bounds[1], bounds[0]];
		let lower = [bounds[3], bounds[2]];

		let scaleF = 1.5;

		upper = ol.proj.fromLonLat(upper);
		lower = ol.proj.fromLonLat(lower);

		let lng = [lower[0], upper[0]];
		let lat = [lower[1], upper[1]];

		lng = scale(scaleF, lng);
		lat = scale(scaleF, lat);

		let bbox = [lng[1], lat[1], lng[0], lat[0]];

		this.map.getView().fit(bbox);
	}

	copyShareableURL(e) {
		navigator.clipboard.writeText(this.generateQueryURL(false)).catch(this.showCopyModal.bind(this));
	}

	showCopyModal(e) {
		prompt("Copy to clipboard: CTRL+C", this.generateQueryURL(false))
	}

	setupSocialButtons() {
		$(".twitter")[0].onclick = e => window.open(`https://twitter.com/share?url=${this.generateQueryURL(true)}`);
		$(".linkedin")[0].onclick = e => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.generateQueryURL(true)}`);
		$(".facebook")[0].onclick = e => window.open(`https://www.facebook.com/sharer.php?u=${this.generateQueryURL(true)}&t=${this.generateQueryURL(true)}`);

		let copypaste = $(".copypaste")[0];
		copypaste.onclick = this.copyShareableURL.bind(this)
	}

	openlayersUnselectableFix() {
		// OpenLayers unselectables, are not really unselectable, so we make them (note the pointer-events: all on the buttons themselves)
		for (let el of $(".ol-control"))
		{
			el.style = "pointer-events: none";
		}
	}
}


function levenshtein(a, b, i=null, j=null, m=null) {
	if (i === null) {
		i = a.length - 1;
	}

	if (j === null) {
		j = b.length - 1;
	}

	if (m === null) {
		m = [];
	}

	if (i in m && j in m[i]) {
		return m[i][j];
	}

	if (i === -1)
	{
		return j + 1;
	}

	if (j === -1)
	{
		return i + 1;
	}

	if (!(i in m))
	{
		m[i] = [];
	}

	m[i][j] = Math.min(
		levenshtein(a, b, i - 1, j, m) + 1,
		levenshtein(a, b, i, j - 1, m) + 1,
		levenshtein(a, b, i - 1, j - 1, m) + (a[i] === b[j] ? 0 : 1));

	return m[i][j];
}


let modal = $(".correct-modal")[0];
let span = $(".correct-close")[0];

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


const GALAPAGOS = [ -90.8770522, -0.246927];

let referrer = document.referrer;
let query;
let iframeQuery;
let baseUrl;

if (referrer)
{
	baseUrl = referrer || window.location.origin + window.location.pathname;

	let split = baseUrl.split("/");
	split = split[split.length - 1];
	if (split.includes("?")) {
		split = split.split("?");
		query = split[split.length - 1];
	}
	else
	{
		query = "";
	}

	iframeQuery = document.location.search;
}
else
{
	baseUrl = window.location.origin + window.location.pathname;
	console.log(TEXT.no_referrer);
	query = window.location.search;
	iframeQuery = query;
}
baseUrl = baseUrl.split("?")[0];

const urlParams = new URLSearchParams(query);
const iframeParams = new URLSearchParams(iframeQuery);

let app = new DrifterApp(ol.proj.fromLonLat(GALAPAGOS), 7.0);
let data_default = "grouped.json";
app.data_source = iframeParams.get("fn");

app.start();

