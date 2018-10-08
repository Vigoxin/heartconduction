class Grid extends Array {
	constructor(canvasElement='.canvas', cellSize=10, cellDim=60) {
		// Inherit from Array
		super();

		// Sets constants
			// constants specific to class
		this.cellSize = cellSize;
		this.cellDim = cellDim;
		this.masterState = 'repo';
		this.clickSelector;
		this.toPropagateTogether = [];

		this.paceTracker = 0;

		this.selector = 'depo';
		this.selectorType = 'state';

		this.diagonalPropagation = true;
			
			// pixi constants
		this.cWidth = this.cellSize*this.cellDim;
		this.cHeight = this.cellSize*this.cellDim;

		// Initialises PIXI Application f
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
		$(canvasElement)[0].prepend(this.pixiapp.view);

		// Transforms grid into a two dimensional grid of Square objects
		for (var i=0; i<this.cellDim; i++) {
			this[i] = [];
			for (var j=0; j<this.cellDim; j++) {
				this[i].push(new Square(i, j, this));
			}
		}

		// Adding all the squares to the app
		for (let col of this) {
			for (let square of col) {
				for (let sprite in square.sprites) {
					sprite = square.sprites[sprite];
					this.pixiapp.stage.addChild(sprite);
				}
			}
		}

		// Setting neighbours
		for (let col of this) {
			for (let square of col) {
				square.setNeighbours();
			}
		}

		this.stateColorMapping = {
			'repo': 0xffffff,
			'depo': 0xff0000,
			'clear': 0x333333,
			'refrac': 0xff8e00
		}

		// setting event listeners
		this.pixiapp.stage.interactive = true;

		this.pixiapp.stage.mousemove = (e) => {
			this.click(e);
		}

		this.pixiapp.stage.mousedown = (e) => {
			this.click(e);
		}

	}

	play() {

		// this.paceTracker++;

		// this.toPropagate = [];
		
		this.APcounterGrid = this.map2drray('APcounter');

		for (let col of this) {
			for (let square of col) {
				if (square.state !== 'clear') {
					square.actionPotential();
				}
			}
		}

		// for (let square of this.toPropagate) {
		// 	square.APcounter = 0;
		// }

		// console.log(grid[0][0].APcounter);



		for (let col of this) {
			for (let square of col) {
				if (square.state !== 'clear') {
					square.changeState();
				}
			}
		}

		// console.log(grid[0][0].state);

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

	map2drray(string) {
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