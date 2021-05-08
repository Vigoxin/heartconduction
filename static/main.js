// Add images to PIXI loader
for (let file of textureFiles) {
	PIXI.loader.add(file);
}
PIXI.loader.load(setup);

function setup() {

								// atot = performance.now();
	
	timeStripPanel = new TimeStripPanel();

			// a = performance.now();
	grid = new Grid('.canvas', cellSize=15, cellNum=60);
			// b = performance.now(); console.log((b-a)/1000);

			// a = performance.now();
	if (typeof arrhythmia["gridToLoad"] !== 'undefined') {
		grid.loadGrid(arrhythmia["gridToLoad"]);
	}
			// b = performance.now(); console.log((b-a)/1000);

	DOMSetup();

	setEventListeners();

	if (typeof tutorial !== 'undefined') {
		tutorial();
	}
	setHighlightOnWindowEventListeners();

	setTooltipEventListeners();
			
								// btot = performance.now(); console.log((btot-atot)/1000);

	drawingFunction();
}

function drawingFunction() {
	setTimeout(function() {
		requestAnimationFrame(drawingFunction);
		if (isPlaying) {
			drawFrame();
		}
	}, 1000/fps)
}

function drawFrame() {
	grid.play();
	masterFrameCount++;
	$(".master-frame").text(masterFrameCount);
}
