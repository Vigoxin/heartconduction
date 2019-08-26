// Add images to PIXI loader
for (let file of textureFiles) {
	PIXI.loader.add(file);
}
PIXI.loader.load(setup);

function setup() {

								atot = performance.now();

			a = performance.now();
	grid = new Grid('.canvas', cellSize=15, cellNum=60);
			b = performance.now(); console.log((b-a)/1000);
			
			a = performance.now();
	if (typeof gridToLoad !== 'undefined') {
		grid.loadGrid(gridToLoad);
	}
			b = performance.now(); console.log((b-a)/1000);


	DOMSetup();

	eventListeners();
			
								btot = performance.now(); console.log((btot-atot)/1000);

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