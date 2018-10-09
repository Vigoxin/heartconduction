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

		this.refracLengthSetting = this.parentGrid.masterRefracLength;
		this.refracLength = this.parentGrid.refracLengthDict[this.refracLengthSetting];
		
		this.condVelSetting = this.parentGrid.masterCondVel;
		this.condVel = this.parentGrid.condVelDict[this.condVelSetting];



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
		// this.sprites.square.visible = true;
		// this.sprites.plus.visible = false;
		// this.sprites.plus.tint = 0x00ff00;
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
		// State
		this.sprites.square.tint = this.parentGrid.stateColorMapping[this.state];
		
		// refracLength

		// condVel
		if (this.state === 'clear') {
			for (let sprite of Object.keys(this.sprites).filter(x => x !== 'square')) {
				sprite = this.sprites[sprite];
				sprite.visible = false;
			}
		} else {
			if (this.condVelSetting !== 'normal') {
				this.sprites.plus.visible = true;
				this.sprites.plus.tint = this.parentGrid.condVelColorMapping[this.condVelSetting];
			} else {
				this.sprites.plus.visible = false;
			}		
		}

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
				this.clickClear();
			} else if (this.parentGrid.selector === 'depo') {
				this.clickDepolarise();
			} else if (this.parentGrid.selector === 'repo') {
				this.clickRepolarise();
			}
		} else if (this.parentGrid.selectorType === 'condVel' && this.state !== 'clear') {
			this.condVelSetting = this.parentGrid.selector;
			this.applyCondVelSetting();
		} else if (this.parentGrid.selectorType === 'refracLength' && this.state !== 'clear') {
		
		}
	}

	clickClear() {
		console.log(`(${this.col}, ${this.row}) - Clearing`);
		this.state = 'clear';
		this.APcounter = -1;
		this.display();
	}

	clickDepolarise() {
		console.log(`(${this.col}, ${this.row}) - Depolarising`);
		this.state = 'depo';
		this.APcounter = 0;
		this.display();
	}
	
	clickRepolarise() {
		console.log(`(${this.col}, ${this.row}) - Repolarising`);
		this.state = 'repo';
		this.APcounter = -1;
		this.display();
	}



	applyCondVelSetting() {
		console.log(`(${this.col}, ${this.row}) - Setting conduction velocity to ${this.condVelSetting}`);
		this.condVel = this.parentGrid.condVelDict[this.condVelSetting];
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