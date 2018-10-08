function setupBlankGrid() {
	// grid = new Array(cellDim).fill().map(i => new Array(cellDim).fill());
	// for (var i=0; i<cellDim; i++) {
	// 	for (var j=0; j<cellDim; j++) {
	// 		grid[i][j] = new Square(i, j);
	// 	}
	// }

	// for (let col of grid) {
	// 	for (let square of col) {
	// 		for (let sprite in square.sprites) {
	// 			sprite = square.sprites[sprite];
	// 			app.stage.addChild(sprite);
	// 		}
	// 	}
	// }
	grid = new Grid(app);
}