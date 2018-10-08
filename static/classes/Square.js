class Square {
	constructor(col=0, row=0, parentGrid=grid) {
		this.parentGrid = parentGrid;

		this.col = col;
		this.row = row;
		this.x = this.parentGrid.grid2pixel(this.col);
		this.y = this.parentGrid.grid2pixel(this.row);

		this.state = this.parentGrid.masterState;
		this.stateTrail = new Array(20).fill();
		this.APcounter = -1;
		

		this.neighbours = [];

		this.refracLengthSetting = 'normal';
		this.condVelSetting = 'slow';

		this.refracLengthDict = {
			'short': 5,
			'normal': 10,
			'long': 20
		}

		this.condVelDict = {
			'normal': 0,
			'slow': 1,
			'very slow': 3
		}

		this.refracLength = this.refracLengthDict[this.refracLengthSetting];
		this.condVel = this.condVelDict[this.condVelSetting];


		// Setting up the sprites needed to display the square
		this.images = ['square', 'plus']; // update as more features added
		this.sprites = {};
		for (let image of this.images) {
			if (PIXI.loader.resources[texturesPath+image+'10'+'.png']) {
				this.sprites[image] = new PIXI.Sprite(PIXI.loader.resources[texturesPath+image+'10'+'.png'].texture);	
			}	
		}

		// Setting the sprites' positions
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			[sprite.position.x, sprite.position.y] = [this.x, this.y];
			[sprite.width, sprite.height] = [this.parentGrid.cellSize, this.parentGrid.cellSize];
		}

		// // Setting the sprites' positions
		// for (let sprite in this.sprites) {
		// 	sprite = this.sprites[sprite];
		// 	sprite.width = this.parentGrid.cellSize;
		// 	sprite.height = this.parentGrid.cellSize;
		// }	

		// Setting up visibility of different sprites
		this.sprites.square.visible = true;
		this.sprites.plus.visible = false;
		this.sprites.plus.tint = 0x0000ff;
	}

	actionPotential() {
		// Stores previous state in trail
		this.stateTrail.shift();
		this.stateTrail.push(this.state);

		// Updating of cell itself - with this setup, depo + refrac = refracLength. So the refracLength includes the depo state.
		if (this.APcounter < 0 && this.neighbours[0] && this.neighbours.some(x => x.parentGrid.APcounterGrid[x.col][x.row] === this.condVel)) {
			this.state = 'depo';
			this.APcounter = 0;
			// this.parentGrid.toPropagate.push(this);
		} else {
			if (this.APcounter < 0) {
				this.APcounter = -1;
			} else if (this.APcounter === 0) {
				this.APcounter ++;
			} else if ( this.APcounter >= 1 && this.APcounter < this.refracLength) {
				this.APcounter ++;
			} else if ( this.APcounter >= this.refracLength ) {
				this.APcounter = -1;
			}
		}
	}

	changeState() {
		if (this.APcounter < 0) {
			this.state = 'repo';
		} else if (this.APcounter === 0) {
			this.state = 'depo';
		} else if ( this.APcounter > 0) {
			this.state = 'refrac';
		}
	}

	display() {
		this.sprites.square.tint = this.parentGrid.stateColorMapping[this.state];


		// Debugging speed:
			// var colors = [0xff0000, 0x00ff00, 0x0000ff];
			// this.sprites.square.tint = randFromArray(colors);
			// if (this.parentGrid.paceTracker % this.parentGrid.cellDim - this.row === 0) {
			// 	this.sprites.square.tint = 0xff0000;
			// } else {
			// 	this.sprites.square.tint = 0xffffff;
			// }

	}

	clickSet() {
		if (this.parentGrid.selectorType === 'state') {
			if (this.parentGrid.selector === 'clear') {
				this.state = 'clear';
				this.APcounter = -1;
				this.display();
			} else if (this.parentGrid.selector === 'depo') {
				this.clickDepolarise();
			} else if (this.parentGrid.selector === 'repo') {
				this.clickRepolarise();
			}
		}
	}

	clickDepolarise() {
		this.state = 'depo';
		this.APcounter = 0;
		this.display();
	}
	
	clickRepolarise() {
		this.state = 'repo';
		this.APcounter = -1;
		this.display();
	}








	setNeighbours() {
		
		var vectors = [[-1, 0], [0, -1], [0, 1], [1, 0]];
		if (this.parentGrid.diagonalPropagation) {
			var vectors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
		}

		for (let vector of vectors) {
			try {
				this.neighbours.push(this.parentGrid[this.col+vector[0]][this.row+vector[1]]);
			} catch {
			}

			this.neighbours = this.neighbours.filter(x => x !== undefined);
		}

	}









	copy() {
		return Object.assign(new Square(this.col, this.row, this.parentGrid), this);
	}

}