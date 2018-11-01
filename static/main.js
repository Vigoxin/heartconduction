// Add images to PIXI loader
for (let file of textureFiles) {
	PIXI.loader.add(file);
}
PIXI.loader.load(setup);

function setup() {
	grid = new Grid('.canvas', cellSize=10, cellNum=50);
	
	// grid.loadGrid(gridToLoad);
	grid.resize(12);
	DOMSetup();

	eventListeners();
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
}