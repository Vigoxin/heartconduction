class Grid extends Array {
	constructor(canvasElementSelector='.canvas', cellSize=10, cellNumX=60, cellNumY=60) {
		// Inherit from Array
		super();

		// Sets constants
			// constants specific to class
		this.cellSize = cellSize;
		// this.cellNum = cellNum;
		this.cellNumX = cellNumX;
		this.cellNumY = cellNumY;
		this.masterState = 'repo';
		this.masterRefracLength = 'normal';
		this.masterCondVel = 'normal';
		this.clickSelector;

		// this.masterPacingTracker = 10;
		
		// this.masterPacingIntervalSelector = 100;
		// this.masterPacingTrackerSelector = 0;

		this.masterFrameCount = 0;

		this.selector = 'depo';
		this.selectorType = 'state';
		
		this.squareInspectorSquareList = [];
		this.squareInspectorSquareNumberList = [];
		this.timeStripSquareList = [];

		this.tempSelecting = {};
		this.tempHighlighted = [];

		this.diagonalPropagation = false;
		this.rainbowTrails = true;

			// pixi constants
		this.cWidth = this.cellSize*this.cellNumX;
		this.cHeight = this.cellSize*this.cellNumY;
		this.canvasElementSelector = canvasElementSelector;

		// Initialises PIXI Application f
		this.initialisePIXIapp();
		

		// dicts and mappings for the squares
		
		this.stateColorMapping = {
			'repo': 0x333333,
			'depo': 0xf94466,
			'clear': 0x333333,
			'refrac': 0xff8e00
		}

		this.refracLengthDict = {
			'short': 10,
			'normal': 87,
			'long': 100
		}

		this.refracLengthColorMapping = {
			'long': 0x056afa,
			'short': 0xff8e00
		}

		this.condVelDict = {
			'fast': 0,
			'normal': 0,
			'slow': 10
		}

		this.condVelColorMapping = {
			'fast': 0x00aa00,
			'slow': 0xf94466
		}

		this.pacingColorMapping = {
			'autoFocus': 0x00aa00,
			'extPace': 0x0000ff
		}





		// Transforms grid into a two dimensional grid of Square objects
		for (var i=0; i<this.cellNumX; i++) {
			this[i] = [];
			for (var j=0; j<this.cellNumY; j++) {
				this[i].push(new Square(i, j, this));
			}
		}

		// Adding all the squares to the app
		// this.addSpritesToApp();

		// Setting neighbours
		for (let col of this) {
			for (let square of col) {
				square.setNeighbours();
			}
		}

		// setting event listeners
			// Setting so that events only trigger when inside sprite
			this.app.renderer.plugins.interaction.moveWhenInside = true;
		
		this.app.stage.interactive = true;

		this.app.stage.on('pointerdown', (e) => {
			var {shiftKey, altKey, buttons} = e.data.originalEvent;
			var {x:mouseX, y:mouseY} = e.data.global;
			var square = this[this.pixel2grid(mouseX)][this.pixel2grid(mouseY)];

			if (altKey && buttons) {
				if (mouseX < this.app.view.width && mouseX > 0 && mouseY < this.app.view.height && mouseY > 0) {
					var col = this.pixel2grid(mouseX);
					var row = this.pixel2grid(mouseY);
					if (this[col] && this[col][row]) {
						var clickedSquare = this[col][row];
						console.log(clickedSquare);
					}
				}
			} else if (shiftKey) {
				this.tempSelecting.square1 = square;
				this.tempSelecting.square2 = square;
				this.multipleHighlight(this.tempSelecting);
			} else {
				square.clickAndMoveSet();
				square.onlyClickSet();
			}

		})

		this.app.stage.on('pointermove', (e) => {
			var {shiftKey, altKey, buttons} = e.data.originalEvent;
			var {x:mouseX, y:mouseY} = e.data.global;
			var square = this[this.pixel2grid(mouseX)][this.pixel2grid(mouseY)];
			
			if (altKey && buttons) {
				if (mouseX < this.app.view.width && mouseX > 0 && mouseY < this.app.view.height && mouseY > 0) {
					var col = this.pixel2grid(mouseX);
					var row = this.pixel2grid(mouseY);
					if (this[col] && this[col][row]) {
						var clickedSquare = this[col][row];
						console.log(clickedSquare);
					}
				}
			} else if (shiftKey) {
				if (buttons === 1) {			
					var col = constrain(this.pixel2grid(mouseX), 0, this.cellNumX-1);
					var row = constrain(this.pixel2grid(mouseY), 0, this.cellNumY-1);
					var square = this[col][row];
					this.tempSelecting.square2 = square;
					this.multipleHighlight(this.tempSelecting);
				}
			} else {
				if (buttons === 1) {
					square.clickAndMoveSet();
				}
			}		
		})

		this.app.stage.on('pointerup', (e) => {
			this.dragEnd(e);
		})

		this.app.stage.on('pointerupoutside', (e) => {
			this.dragEnd(e);
		})

		for (let col of this) {
			for (let square of col) {
				square.display();
			}
		}
		

	}



	initialisePIXIapp() {
		this.app = new PIXI.Application({
			width: this.cWidth+1,
			height: this.cHeight+1,
			antialias: true,			// default: false
			transparent: false, 		// default: false
			resolution: 1,			 	// default: 1
			backgroundColor: 0xff00ff,
			clearBeforeRender: false,
			preserveDrawingBuffer: true
		})
		this.app.renderer.autoresize = true;

		// Adds the PIXI Application to the css selector element specified in the constructor
		$(this.canvasElementSelector)[0].append(this.app.view);
	}


	play() {
		// console.log(this.masterPacingTracker);
		// this.masterPacingTracker++;
		// this[25][29].isDebugging = true;
		// this[26][49].isDebugging = true;

		// this.APcounterGrid = this.map2Darray('APcounter');
		this.isPropagatingGrid = this.map2Darray('isPropagating')

		for (let col of this) {
			for (let square of col) {
				if (square.state !== 'clear') {
					square.actionPotential();
				}
			}
		}


		for (let col of this) {
			for (let square of col) {
				if (square.state !== 'clear') {
					square.changeStateBasedOnAPcounter();
				}
			}
		}

		for (let col of this) {
			for (let square of col) {
				if (square.state !== 'clear') {
					square.changePacingTracker();
				}
			}
		}

		for (let col of this) {
			for (let square of col) {
				square.display();
			}
		}

		timeStripPanel.update();

	}

	pixel2grid(x) {
		// converts pixel coordinates to grid coordinates
		return Math.floor(x/this.cellSize);
	}

	grid2pixel(x) {
		// converts grid coordinates to pixel coordinates
		return x * this.cellSize;
	}

	resize(size) {
		this.cellSize = size;
		[this.cWidth, this.cHeight] = [this.cellSize*this.cellNumX+1, this.cellSize*this.cellNumY+1];
		this.app.renderer.resize(this.cWidth, this.cHeight);
		for (let col of this) {
			for (let square of col) {
				square.resize();
			}
		}
	}

	// renum(num, masterState) {
	// 	this.masterState = masterState;
		
	// 	if (num > this.cellNum) {
	// 		var l = this.length;
			
	// 		for (var i=0; i<num; i++) {
	// 			if (i >= l) {
	// 				this.push([]);
	// 			}
	// 			for (var j=0; j<num; j++) {
	// 				if (i < l) {
	// 					if (j >= l) {
	// 						this[i].push(new Square(i, j, this));
	// 					}
	// 				} else if (i >= l) {
	// 					this[i].push(new Square(i, j, this));
	// 				}
	// 			}
	// 		}


	// 	} else if (num < this.cellNum) {
	// 		var l = num;

	// 		for (var i=this.cellNum-1; i>=0; i--) {
	// 			if (i >= l) {
	// 				for (var j=this.cellNum-1; j>=0; j--) {
	// 					this[i][j].destroy();						
	// 				}
	// 				this.pop();
	// 			} else if (i < l) {
	// 				for (var j=this.cellNum-1; j>=l; j--) {
	// 					this[i][j].destroy();
	// 					this[i].pop();
	// 				}					
	// 			}

	// 		}
	// 	}

	// 	this.cellNum = this.length;
	// 	[this.cWidth, this.cHeight] = [this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1];
	// 	this.app.renderer.resize(this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1);

	// 	for (var i=0; i<this.cellNum; i++) {
	// 		for (var j=0; j<this.cellNum; j++) {
	// 			this[i][j].setNeighbours();
	// 		}
	// 	}

	// 	$('.resize-slider').prop({
	// 		'max': grid.resizeMax,
	// 		'min': grid.resizeMin,
	// 	});
	// }

	renum(numX, numY) {
		this.cellNumX = this.length;
		this.cellNumY = this[0].length;

		if (numX < this.cellNumX) {
			for (var i=this.cellNumX-1; i>-1; i--) {
				if (i>=numX) {
					for (var j=this.cellNumY-1; j>=0; j--) {
						this[i][j].destroy();						
					}
					this.pop();
				}
			}
		}
		if (numY < this.cellNumY) {
			for (var i=0; i<this.length; i++) {
				for (var j=this.cellNumY-1; j>-1; j--) {
					if (j>=numY) {
						this[i][j].destroy();
						this[i].pop();
					}
				}
			}
		}
		this.cellNumX = this.length;
		this.cellNumY = this[0].length;
		
		if (numX > this.cellNumX) {
			for (var i=0; i<numX; i++) {
				if (i >= this.cellNumX) {
					this.push([]);
					for (var j=0; j<this.cellNumY; j++) {
						this[i].push(new Square(i, j, this));
					}
				}
			}
		}
		if (numY > this.cellNumY) {
			for (var i=0; i<this.length; i++) {
				for (var j=0; j<numY; j++) {
					if (j >= this.cellNumY) {
						this[i].push(new Square(i, j, this));
					}
				}
			}
		}
		this.cellNumX = this.length;
		this.cellNumY = this[0].length;
		this.cellNum = this.cellNumX;

		[this.cWidth, this.cHeight] = [this.cellSize*this.cellNumX+1, this.cellSize*this.cellNumY+1];
		this.app.renderer.resize(this.cWidth, this.cHeight);

		for (var i=0; i<this.cellNumX; i++) {
			for (var j=0; j<this.cellNumY; j++) {
				this[i][j].setNeighbours();
			}
		}
	}

	dragStart(e) {

	}

	dragEnd(e) {
		var {shiftKey, altKey, buttons} = e.data.originalEvent;
		var {x: mouseX, y: mouseY} = e.data.global;

		var col = constrain(this.pixel2grid(mouseX), 0, this.cellNumX-1);
		var row = constrain(this.pixel2grid(mouseY), 0, this.cellNumY-1);
		var square = this[col][row];
		
			this.tempSelecting.square2 = square;
		if (shiftKey) {
			this.multipleSet(this.tempSelecting);
		} else {
			// do nothing
		}
			this.tempSelecting = [];
			this.multipleHighlight(this.tempSelecting);
	}

 // click shortcuts
	multipleSet({square1, square2}) {
		var colStart = Math.min(square1.col, square2.col);
		var colEnd = Math.max(square1.col, square2.col)+1;
		var rowStart = Math.min(square1.row, square2.row);
		var rowEnd = Math.max(square1.row, square2.row)+1;
		for (var i=colStart; i<colEnd; i++) {
			for (var j=rowStart; j<rowEnd; j++) {
				grid[i][j].clickAndMoveSet();
			}
		}
	}

	multipleHighlight({square1, square2}) {
			// Dehighlight the 4 squares that should already be highlighted
			this.tempHighlighted.forEach(square => {
				square.dehighlight();
			})

			// Remove the 4 squares from this.tempHighlighted
			this.tempHighlighted = [];
			
			if (square1 && square2) {
				this.tempHighlighted.push(square1);
				this.tempHighlighted.push(square2);
				this.tempHighlighted.push(this[square1.col][square2.row]);
				this.tempHighlighted.push(this[square2.col][square1.row]);


				// Highlight them
				this.tempHighlighted.forEach(square => {
					square.highlight();
				});
			}
	}


// Saving and loading grid
	saveGrid() {

		
		var toSave = Object.assign({}, this);
		console.log('toSave: ', toSave);

		var squareKeysToExclude = ["allPossibleNeighbours", 'neighbours', 'parentGrid', 'sprites', 'rainbow', 'squareInspectorDivWrapper', 'isInSquareInspector', 'isInTimeStripPanel'];
		var saved2dArray = {};
		for (var i=0; i<this.cellNumX; i++) {
			saved2dArray[i] = [];
			for (var j=0; j<toSave[0].length; j++) {
				saved2dArray[i].push({});
				for (let key in toSave[i][j] ) {
					// if (i == 0 && j == 0) {console.log(key, !squareKeysToExclude.includes(key) ? 'yes' : 'no')} // debugging 

					!(squareKeysToExclude.includes(key)) ? saved2dArray[i][j][key] = toSave[i][j][key] : null;
				}
			}
		}

		var gridKeysToExclude = ['app', 'selector', 'selectorType', 'squareInspectorSquareList', "timeStripSquareList"];
		var savedGridProperties = {};

		for (let key in toSave) {
			if (!$.isNumeric(key)) {
				!(gridKeysToExclude.includes(key)) ? savedGridProperties[key] = toSave[key] : null;
			}
		}

		// console.log(Object.keys(saved2dArray[0][0]))

		// console.log(saved2dArray);
		// console.log(isCyclic(saved2dArray));
		
		// console.log(savedGridProperties);
		// console.log(isCyclic(savedGridProperties));
		
		var json = JSON.stringify([saved2dArray, savedGridProperties]);

		return json;
		
	}



	loadGrid(json) {
	var a;
	var b;

		// Load data
		var saved2dArray = JSON.parse(json)[0];
		var savedGridProperties = JSON.parse(json)[1];


		// Repopulate cells
		var cellNumX = savedGridProperties.cellNumX;
		var cellNumY = savedGridProperties.cellNumY;
		this.renum(cellNumX, cellNumY);


		// Resize cells
		var cellSize = savedGridProperties.cellSize;
		this.resize(cellSize);

				
		// Change all properties of the grid itself
		for (let key in savedGridProperties) {
			if (!$.isNumeric(key)) {
				this[key] = savedGridProperties[key];
			}
		}

		// Clearing the stage for the Pixi app, to let new sprites in from the newly created Squares
												a = performance.now();
		// while (this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }
		this.app.stage.children = [];
												b = performance.now(); console.log((b-a)/1000);

		
		// Change all the properties of all the squares in the grid
												a = performance.now();
		var firstLim = Math.max(...Object.keys(saved2dArray).map(x => Number(x)))+1;
		for (var i=0; i<firstLim; i++) {

			for (var j=0; j<saved2dArray[0].length; j++) {
												// a = performance.now();
				this[i][j] = new Square(i, j, this);
												// b = performance.now(); console.log((b-a)/1000);
												// a = performance.now();
				for (let key in saved2dArray[i][j]) {
					this[i][j][key] = saved2dArray[i][j][key];
				}
												// b = performance.now(); console.log((b-a)/1000);
				this[i][j].setRainbowRange();
			}

		}


		for (let col of this) {
			for (let square of col) {
				square.setNeighbours();
			}
		}
		for (let col of this) {
			for (let square of col) {
				square.setAllPossibleNeighbours();
			}
		}
										b = performance.now(); console.log((b-a)/1000);

		for (let col of this) {
			for (let square of col) {
				square.display();
			}
		}
				
		for (let square of this.squareInspectorSquareList) {
			square.removeFromSquareInspector();
			square.removeFromTimeStripPanel();
		}
		for (let coords of this.squareInspectorSquareNumberList) {
			console.log(coords[0], coords[1]);
			console.log(this[coords[0]][coords[1]]);
			this[coords[0]][coords[1]].addToSquareInspector();
			this[coords[0]][coords[1]].addToTimeStripPanel();
		}

	}


// Some utilities

	copy2Darray() {
		var a = [];
		for (let i=0; i<this.cellNumX; i++) {
			a.push([]);
			for (let j=0;j<this.cellNumY; j++) {
				a[i].push(this[i][j].copy());
			}
		}
		return a;
	}

	map2Darray(string) {
		var a = [];
		for (let i=0; i<this.cellNumX; i++) {
			a.push([]);
			for (let j=0;j<this.cellNumY; j++) {
				a[i].push(this[i][j][string]);
			}
		}
		return a;
	}

}
