class Grid extends Array {
	constructor(canvasElementSelector='.canvas', cellSize=10, cellNum=60) {
		// Inherit from Array
		super();

		// Sets constants
			// constants specific to class
		this.cellSize = cellSize;
		this.cellNum = cellNum;
		this.masterState = 'repo';
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
		this.cWidth = this.cellSize*this.cellNum;
		this.cHeight = this.cellSize*this.cellNum;
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
			'slow': 8
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
		for (var i=0; i<this.cellNum; i++) {
			this[i] = [];
			for (var j=0; j<this.cellNum; j++) {
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
		this.app.stage.interactive = true;

		this.app.stage.mousemove = (e) => {
			this.click(e);
		}

		this.app.stage.mousedown = (e) => {
			this.click(e);
		}

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
			// width: 1200,
			// height: 1200,
			antialias: true,			// default: false
			transparent: false, 		// default: false
			resolution: 1,			 	// default: 1
			backgroundColor: 0xff00ff,
			clearBeforeRender: false,
			preserveDrawingBuffer: true
		})
		this.app.renderer.autoresize = true;

		// Adds the PIXI Application to the css selector element specified in the constructor
		$(this.canvasElementSelector)[0].prepend(this.app.view);
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

	resize(size) {
		this.cellSize = size;
		[this.cWidth, this.cHeight] = [this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1];
		this.app.renderer.resize(this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1);
		for (let col of this) {
			for (let square of col) {
				square.resize();
			}
		}
	}

	renum(num, masterState) {
		this.masterState = masterState;
		
		if (num > this.cellNum) {
			var l = this.length;
			
			for (var i=0; i<num; i++) {
				if (i >= l) {
					this.push([]);
				}
				for (var j=0; j<num; j++) {
					if (i < l) {
						if (j >= l) {
							this[i].push(new Square(i, j, this));
						}
					} else if (i >= l) {
						this[i].push(new Square(i, j, this));
					}
				}
			}


		} else if (num < this.cellNum) {
			var l = num;

			for (var i=this.cellNum-1; i>=0; i--) {
				if (i >= l) {
					for (var j=this.cellNum-1; j>=0; j--) {
						this[i][j].destroy();						
					}
					this.pop();
				} else if (i < l) {
					for (var j=this.cellNum-1; j>=l; j--) {
						this[i][j].destroy();
						this[i].pop();
					}					
				}

			}
		}

		this.cellNum = this.length;
		[this.cWidth, this.cHeight] = [this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1];
		this.app.renderer.resize(this.cellSize*this.cellNum+1, this.cellSize*this.cellNum+1);

		for (var i=0; i<this.cellNum; i++) {
			for (var j=0; j<this.cellNum; j++) {
				this[i][j].setNeighbours();
			}
		}

		$('.resize-slider').prop({
			'max': grid.resizeMax,
			'min': grid.resizeMin,
		});
	}

	click(e) {
		var mouseX = e.data.global.x;
		var mouseY = e.data.global.y;
		if (e.data.originalEvent.altKey) {
			console.log(`x: ${mouseX}, y: ${mouseY}`);
		}
		if (mouseX < this.app.view.width && mouseX > 0 && mouseY < this.app.view.height && mouseY > 0) {
			var col = this.pixel2grid(mouseX);
			var row = this.pixel2grid(mouseY);
			if (this[col] && this[col][row]) {
				var clickedSquare = this[col][row];
			}
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

	



	// addSpritesToApp() {
	// 	for (let col of this) {
	// 		for (let square of col) {
	// 			for (let sprite of square.images) {
	// 				sprite = square.sprites[sprite];
	// 				this.app.stage.addChild(sprite);
	// 			}
	// 		}
	// 	}	
	// }

	saveGrid() {

		
		var toSave = Object.assign({}, this);
		console.log('toSave: ', toSave);

		var squareKeysToExclude = ['neighbours', 'parentGrid', 'sprites'];
		var saved2dArray = {};
		for (var i=0; i<toSave.cellNum; i++) {
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

		var gridKeysToExclude = ['app'];
		var savedGridProperties = {};

		for (let key in toSave) {
			if (!$.isNumeric(key)) {
				!(gridKeysToExclude.includes(key)) ? savedGridProperties[key] = toSave[key] : null;
			}
		}
		
		console.log(savedGridProperties);

		// for (var i=0; i<toSave.cellNum; i++) {
		// 	var col = toSave[i];
		// 	for (let square of col) {
		// 		square.neighbours = [];
		// 		square.sprites = [];
		// 		square.parentGrid = undefined;					
		// 	}
		// }
		// tempPixiApp = toSave.app;
		// toSave.app = undefined;


		var json = JSON.stringify([saved2dArray, savedGridProperties]);
	
		// this.rescueGrid();

		return json;
		
	}



	loadGrid(json) {

		var saved2dArray = JSON.parse(json)[0];
		var savedGridProperties = JSON.parse(json)[1];

		var cellNum = savedGridProperties.cellNum || savedGridProperties.cellDim;
		console.log(cellNum);
		this.renum(cellNum);
		var cellSize = savedGridProperties.cellSize;
		console.log(cellSize);
		this.resize(cellSize);

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

		this.app = tempPixiApp;
	}


	copy2Darray() {
		var a = [];
		for (let i=0; i<this.cellNum; i++) {
			a.push([]);
			for (let j=0;j<this.cellNum; j++) {
				a[i].push(this[i][j].copy());
			}
		}
		return a;
	}

	map2Darray(string) {
		var a = [];
		for (let i=0; i<this.cellNum; i++) {
			a.push([]);
			for (let j=0;j<this.cellNum; j++) {
				a[i].push(this[i][j][string]);
			}
		}
		return a;
	}

}