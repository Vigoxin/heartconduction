class Grid extends Array {
	constructor(canvasElementSelector='.canvas', cellSize=10, cellDim=60) {
		// Inherit from Array
		super();

		// Sets constants
			// constants specific to class
		this.cellSize = cellSize;
		this.cellDim = cellDim;
		this.masterState = 'clear';
		this.masterRefracLength = 'normal';
		this.masterCondVel = 'normal';
		this.clickSelector;

		this.masterPacingTracker = 0;
		
		this.masterPacingIntervalSelector = 100;
		this.masterPacingOffsetSelector = 0;

		this.selector = 'depo';
		this.selectorType = 'state';

		this.diagonalPropagation = true;
			
			// pixi constants
		this.cWidth = this.cellSize*this.cellDim;
		this.cHeight = this.cellSize*this.cellDim;
		this.canvasElementSelector = canvasElementSelector;

		// Initialises PIXI Application f
		this.initialisePIXIapp();
		

		// dicts and mappings for the squares
		
		this.stateColorMapping = {
			'repo': 0xffffff,
			'depo': 0xff0000,
			'clear': 0x333333,
			'refrac': 0xff8e00
		}

		this.refracLengthDict = {
			'short': 10,
			'normal': 20,
			'long': 50
		}

		this.refracLengthColorMapping = {
			'long': 0x056afa,
			'short': 0xff8e00
		}

		this.condVelDict = {
			'fast': 0,
			'normal': 0,
			'slow': 4
		}

		this.condVelColorMapping = {
			'fast': 0x00aa00,
			'slow': 0xff0000
		}

		this.pacingColorMapping = {
			'autoFocus': 0x00aa00,
			'extPace': 0x0000ff
		}





		// Transforms grid into a two dimensional grid of Square objects
		for (var i=0; i<this.cellDim; i++) {
			this[i] = [];
			for (var j=0; j<this.cellDim; j++) {
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
		this.pixiapp.stage.interactive = true;

		this.pixiapp.stage.mousemove = (e) => {
			this.click(e);
		}

		this.pixiapp.stage.mousedown = (e) => {
			this.click(e);
		}

		for (let col of this) {
			for (let square of col) {
				square.display();
			}
		}
		

	}

	play() {
		// console.log(this.masterPacingTracker);
		// this.masterPacingTracker++;
		// this[0][0].isDebugging = true;

		this.APcounterGrid = this.map2Darray('APcounter');

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
					square.changeState();
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


	}

	pixel2grid(x) {
		// converts pixel coordinates to grid coordinates
		return Math.floor(x/this.cellSize);
	}

	grid2pixel(x) {
		// converts grid coordinates to pixel coordinates
		return x * this.cellSize;
	}

	click(e) {

		var mouseX = e.data.global.x;
		var mouseY = e.data.global.y;
		if (mouseX < this.cWidth && mouseX > 0 && mouseY < this.cHeight && mouseY > 0) {
			var col = this.pixel2grid(mouseX);
			var row = this.pixel2grid(mouseY);
			var clickedSquare = this[col][row];
		}

		if (clickedSquare) {
			if (e.data.originalEvent.buttons === 1) {
				if (e.data.originalEvent.altKey) {
					console.log(mouseX, mouseY, e.data.originalEvent);
				}
				if (e.data.originalEvent.shiftKey) {
					console.log(clickedSquare);
				} else {
					clickedSquare.clickSet();
				}
			}
		}
	}

	




	initialisePIXIapp() {
		this.pixiapp = new PIXI.Application({
			width: this.cWidth+1,
			height: this.cHeight+1,
			antialias: true,			// default: false
			transparent: false, 		// default: false
			resolution: 1,			 	// default: 1
			backgroundColor: 0xff00ff,
			clearBeforeRender: false,
			preserveDrawingBuffer: true
		})

		// Adds the PIXI Application to the css selector element specified in the constructor
		$(this.canvasElementSelector)[0].prepend(this.pixiapp.view);
	}

	// addSpritesToApp() {
	// 	for (let col of this) {
	// 		for (let square of col) {
	// 			for (let sprite of square.images) {
	// 				sprite = square.sprites[sprite];
	// 				this.pixiapp.stage.addChild(sprite);
	// 			}
	// 		}
	// 	}	
	// }

	saveGrid() {

		
		var toSave = Object.assign({}, this);
		console.log('toSave: ', toSave);

		var squareKeysToExclude = ['neighbours', 'parentGrid', 'sprites'];
		var saved2dArray = {};
		for (var i=0; i<toSave.cellDim; i++) {
			saved2dArray[i] = [];
			for (var j=0; j<toSave[0].length; j++) {
				// console.log(toSave[i][j][key]);
				saved2dArray[i].push({});
				for (let key in toSave[i][j] ) {
					!(squareKeysToExclude.includes(key)) ? saved2dArray[i][j][key] = toSave[i][j][key] : null;
				}
			}
		}

		console.log(saved2dArray);

		var gridKeysToExclude = ['pixiapp'];
		var savedGridProperties = {};

		for (let key in toSave) {
			if (!$.isNumeric(key)) {
				!(gridKeysToExclude.includes(key)) ? savedGridProperties[key] = toSave[key] : null;
			}
		}
		
		console.log(savedGridProperties);

		// for (var i=0; i<toSave.cellDim; i++) {
		// 	var col = toSave[i];
		// 	for (let square of col) {
		// 		square.neighbours = [];
		// 		square.sprites = [];
		// 		square.parentGrid = undefined;					
		// 	}
		// }
		// tempPixiApp = toSave.pixiapp;
		// toSave.pixiapp = undefined;


		var json = JSON.stringify([saved2dArray, savedGridProperties]);
	
		// this.rescueGrid();

		return json;
		
	}



	loadGrid(json) {

		var saved2dArray = JSON.parse(json)[0];
		var savedGridProperties = JSON.parse(json)[1];

		for (let key in savedGridProperties) {
			if (!$.isNumeric(key)) {
				this[key] = savedGridProperties[key];
			}
		}

		var firstLim = Math.max(...Object.keys(saved2dArray).map(x => Number(x)))+1;
		for (var i=0; i<firstLim; i++) {
			for (var j=0; j<saved2dArray[0].length; j++) {
				this[i][j] = new Square(i, j, this);
				for (let key in saved2dArray[i][j]) {
					this[i][j][key] = saved2dArray[i][j][key];
				}
			}
		}


		for (let col of this) {
			for (let square of col) {
				square.display();
			}
		}

		// this.rescueGrid();
	}


	rescueGrid() {
		// Obsolete now

		for (let col of grid) {
			for (let square of col) {
				square.parentGrid = this;
			}
		}

		for (let col of grid) {
			for (let square of col) {
				square.setNeighboursFromNeighbourVectors();				
			}
		}

		for (let col of grid) {
			for (let square of col) {
				square.setSprites();				
			}
		}
		this.addSpritesToApp();

		for (let col of grid) {
			for (let square of col) {
				square.display();				
			}
		}

		this.pixiapp = tempPixiApp;
	}

	copy2Darray() {
		var a = [];
		for (let i=0; i<this.cellDim; i++) {
			a.push([]);
			for (let j=0;j<this.cellDim; j++) {
				a[i].push(this[i][j].copy());
			}
		}
		return a;
	}

	map2Darray(string) {
		var a = [];
		for (let i=0; i<this.cellDim; i++) {
			a.push([]);
			for (let j=0;j<this.cellDim; j++) {
				a[i].push(this[i][j][string]);
			}
		}
		return a;
	}

}