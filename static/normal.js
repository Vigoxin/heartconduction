// Constants
var cellSize = 5;
var cellDim = 100;
var cWidth = cellSize*cellDim;
var cHeight = cellSize*cellDim;
var fps = 40;

var masterState = 'repo';

var grid;

// Initialising PIXI app
let app = new PIXI.Application({
	width: cWidth+1,
	height: cHeight+1,
	antialias: true,			// default: false
	transparent: false, 		// default: false
	resolution: 1,			 	// default: 1
	backgroundColor: 0x00ff00,
	clearBeforeRender: false,
	preserveDrawingBuffer: true
})

// Append PIXI app to div with class 'canvas'
$('.canvas')[0].append(app.view);

// Add images to PIXI loader
var texturesDir = '/static/textures/';
var images = ['square', 'plus']
var files = {};
for (let image of images) {
	files[image] = texturesDir + image + cellSize + '.png';
}
for (let image of images) {
	PIXI.loader.add(files[image]);
}
PIXI.loader.load(setup);

// 

function setup() {
	// Boilerplate
	textures = {}
	for (let image of images) {
		textures[image] = PIXI.loader.resources[files[image]].texture
	}

	// What comes next within this function is similar to the setup function of p5js
	setupBlankGrid();

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
	for (let col of grid) {
		for (let square of col) {
			square.display();
		}
	}
}
