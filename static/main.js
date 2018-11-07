// Add images to PIXI loader
for (let file of textureFiles) {
	PIXI.loader.add(file);
}
PIXI.loader.load(setup);

function setup() {

			atot = performance.now();

			a = performance.now();
	grid = new Grid('.canvas', cellSize=10, cellNum=5);
			b = performance.now(); console.log(b-a);

	grid.loadGrid(gridToLoad);
	grid.resize(12);


	DOMSetup();

	eventListeners();
			
			btot = performance.now(); console.log(btot-atot);

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