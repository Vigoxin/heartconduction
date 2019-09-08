class Square {
	constructor(col=0, row=0, parentGrid=grid) {
		var a;
		var b;

														// a = performance.now();
		this.isDebugging;
		this.isInSquareInspector = false;

		this.parentGrid = parentGrid;

		this.col = col;
		this.row = row;
		this.x = this.parentGrid.grid2pixel(this.col);
		this.y = this.parentGrid.grid2pixel(this.row);

		this.isInSquareInspector = false;
		this.squareInspectorDivWrapper = new SquareInspectorDivWrapper(this.col, this.row, this);

		this.state = this.parentGrid.masterState;
		this.APcounter = -1;
		

		this.neighbourVectors = [];
		this.neighbours = [];
		this.setNeighbours();

		this.pacingTracker = 0;
		this.isPacing = false;
		this.isExtPace = false;
		this.isAutoFocus = false;
		this.pacingSetting = 'noPace';
		this.pacingInterval = 100;
		

		this.condVelSetting = this.parentGrid.masterCondVel;
		this.condVel = this.parentGrid.condVelDict[this.condVelSetting];

		this.refracLengthSetting = this.parentGrid.masterRefracLength;
		this.refracLength = this.parentGrid.refracLengthDict[this.refracLengthSetting];

		this.randomRefracLengths = false;
		this.randomRefracRangeConstant = 0.8;
		this.refracPoint;
														// b = performance.now(); console.log((b-a)/1000);
														// a = performance.now();
		this.setRefracPoint();
														// b = performance.now(); console.log((b-a)/1000);
		
														// a = performance.now();
		this.rainbow = new Rainbow();
		this.rainbow.setSpectrum('red', 'orange', 'ffc966');
		this.setRainbowRange();
														// b = performance.now(); console.log((b-a)/1000);

														// a = performance.now();
		this.images = ['square', 'plus', 'circle', 'border', 'highlight']; // update as more features added
		// Setting up the sprites needed to display the square
		this.setSprites();
														// b = performance.now(); console.log((b-a)/1000);
														// a = performance.now();
		this.addSpritesToApp();
														// b = performance.now(); console.log((b-a)/1000);
	}

	setRainbowRange() {
		this.rainbow.setNumberRange(0, this.refracLength);
	}


	setSprites() {
		this.sprites = {};
		for (let image of this.images) {
			var fullImage = '/'+texturesPath+image+'.png';
			if (PIXI.loader.resources[fullImage]) {
				this.sprites[image] = new PIXI.Sprite(PIXI.loader.resources[fullImage].texture);
			}
		}

		// Setting the sprites' positions
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			[sprite.x, sprite.y] = [this.x, this.y];
			[sprite.width, sprite.height] = [this.parentGrid.cellSize, this.parentGrid.cellSize];
		}

		this.sprites['highlight'].tint = 0xA020F0;
		this.sprites['highlight'].visible = false;
	}

	addSpritesToApp() {
		var a; var b;
		for (let sprite of this.images) {
			sprite = this.sprites[sprite];
			// this.parentGrid.app.stage.children = [];
														// a = performance.now();
			// // Remove sprites which already exist - i.e. those with same x and y positions AND made from the same image file/texture:
			// _.remove(this.parentGrid.app.stage.children, function(a) {
			// 	return (
			// 		a.x === sprite.x &&
			// 		a.y === sprite.y &&
			// 		a.texture.baseTexture.textureCacheIds[0] === sprite.texture.baseTexture.textureCacheIds[0]
			// 	)
			// })
														// b = performance.now(); console.log((b-a)/1000);
				
														// a = performance.now();
			this.parentGrid.app.stage.addChild(sprite);
														// b = performance.now(); console.log((b-a)/1000);
		}
		// console.log(this.parentGrid.app.stage.children);
	}

	actionPotential() {
		// Stores previous state in trail
			// this.stateTrail.shift();
			// this.stateTrail.push(this.state);

		this.isDebugging ? console.log(this.pacingInterval) : null;
		this.isDebugging ? console.log(this.pacingTracker) : null;
	

		// Updating of cell itself
		// Each time through the cycle, a square is either depolarised (either through a neighbour or a pacing stimulus) OR it undergoes the AP pathway - never both

		if (this.APcounter < 0 && this.neighbours[0] && this.neighbours.some(x => x.parentGrid.APcounterGrid[x.col][x.row] === this.condVel)) {
			// If this square is repolarised (APcounter < 0) and at least one neighbour is 'depolarised' ('at the APcounter number which is equal to what the condVel for this square is set to, i.e. what AP counter squares this square will receive propagation from), then depolarise this square
			this.propagationDepolarise();
			// Then, if this square is an automatic focus, reset its pacingTracker
			if (this.pacingSetting === 'autoFocus') {
				this.resetPacingTracker();
			}
		} else if (this.isPacing && this.pacingTracker === this.pacingInterval) {
			// Or, if this square is a pacing square and it has reached its pacing interval time
				if (this.pacingSetting === 'extPace') {
					// then if it's an external paced square (i.e. there is a lead touching it), then depolarise this square
					this.propagationDepolarise();
					this.resetPacingTracker();
				} else if (this.pacingSetting === 'autoFocus') {
					// OR if it's not externally paced, but is an automatic focal pacemaker from the cell itself, then...
					if (this.state === 'repo') {
						// only depolarise if this square is repolarised
						this.propagationDepolarise();
						this.resetPacingTracker();
					}
							// The logic here is that if a cell has a pacing lead attached to it, then it will get a huge voltage of electricity that will depolarise it even if it's in its refractory period, but if the square is an automatic focus, then it won't fire again if it's already refractory				
				}
		} else {
			// AP cycle
			// this.isDebugging ? console.log('path 3') : null;
			// this.isDebugging ? console.log('this.randomRefracLengths: ', this.randomRefracLengths) : null;
			// this.isDebugging ? console.log('this.APcounter: ', this.APcounter) : null;
			// this.isDebugging ? console.log('this.refracLength: ', this.refracLength) : null;
			// this.isDebugging ? console.log('this.refracPoint: ', this.refracPoint) : null;
			if (this.APcounter < 0) {
				this.APcounter = -1;
			} else if (this.APcounter === 0) {
				this.APcounter ++;
			} else if ( this.APcounter >= 1 && this.APcounter < (this.randomRefracLengths ? this.refracPoint : this.refracLength) ) {
				this.APcounter ++;
			} else if ( this.APcounter >= (this.randomRefracLengths ? this.refracPoint : this.refracLength) ) {
				this.APcounter = -1;
			}
		}
	}


	propagationDepolarise() {
		this.state = 'depo';
		this.APcounter = 0;
		if (this.randomRefracLengths) {
			this.setRefracPoint();
		}

	}

	setRefracPoint() {
		var min = this.refracLength * (1-this.randomRefracRangeConstant);
		var max = this.refracLength * (1+this.randomRefracRangeConstant);
		this.refracPoint = randInt(min, max);
	}

	changeStateBasedOnAPcounter() {
		if (this.APcounter < 0) {
			this.state = 'repo';
		} else if (this.APcounter === 0) {
			this.state = 'depo';
		} else if ( this.APcounter > 0) {
			this.state = 'refrac';
		}
	}

	changePacingTracker() {
		if (this.isPacing) {
			this.pacingTracker++;
			// this.isDebugging ? console.log(this.pacingTracker) : 0;
		}
	}

	resetPacingTracker() {
		this.pacingTracker = 0;
	}

	display() {
		// State
		if (this.state === 'refrac') {
			if (this.parentGrid.rainbowTrails) {
				this.sprites.square.tint = parseInt('0x' + this.rainbow.colorAt(this.APcounter));
			} else {
				this.sprites.square.tint = this.parentGrid.stateColorMapping[this.state];
			}
		} else {
			this.sprites.square.tint = this.parentGrid.stateColorMapping[this.state];
		}
		

		// If state is clear, remove all sprites (other than the main square) from view
		if (this.state === 'clear') {
			for (let sprite of Object.keys(this.sprites).filter(x => !['square', 'highlight'].includes(x))) {
				sprite = this.sprites[sprite];
				sprite.visible = false;
			}			
		}

		// refracLength
		if (this.state !== 'clear') {
			if (this.refracLengthSetting !== 'normal') {
				this.sprites.plus.visible = true;
				this.sprites.plus.tint = this.parentGrid.refracLengthColorMapping[this.refracLengthSetting];
			} else {
				this.sprites.plus.visible = false;
			}
		}


		// condVel
		if (this.state !== 'clear') {
			if (this.condVelSetting !== 'normal') {
				this.sprites.circle.visible = true;
				this.sprites.circle.tint = this.parentGrid.condVelColorMapping[this.condVelSetting];
			} else {
				this.sprites.circle.visible = false;
			}		
		}

		// pacing
		if (this.state !== 'clear') {
			if (this.isPacing) {
				this.sprites.border.visible = true;
				this.sprites.border.tint = this.parentGrid.pacingColorMapping[this.pacingSetting];
			} else {
				this.sprites.border.visible = false;
			}		
		}


		// Square Inspector Div
		if (this.isInSquareInspector) {
			this.applySquareInspectorDivChanges();
		}

	}


	applySquareInspectorDivChanges() {
		// state
		this.squareInspectorDivWrapper.div.find(`.state-radio[value=${this.state}]`).prop('checked', true)
	}

	applySquareInspectorDivChangesInitialOnly() {
		// conduction velocity
		this.squareInspectorDivWrapper.div.find(`.condVel-radio[value=${this.condVelSetting}]`).prop('checked', true)
		
		// refracLength
		this.squareInspectorDivWrapper.div.find(`.refracLength-radio[value=${this.refracLengthSetting}]`).prop('checked', true)

		// randomRefracLengths
		this.squareInspectorDivWrapper.div.find(`.randomRefracLengths-radio[value=${+this.randomRefracLengths}]`).prop('checked', true)
	}

	clickAndMoveSet(selectorType=this.parentGrid.selectorType, selector=this.parentGrid.selector) {
		if (selectorType === 'state') {
			if (selector === 'clear') {
				this.clickClear();
			} else if (selector === 'depo') {
				this.clickDepolarise();
			} else if (selector === 'repo') {
				this.clickRepolarise();
			}
		} else if (selectorType === 'condVel' && this.state !== 'clear') {
			this.condVelSetting = selector;
			this.applyCondVelSetting();
			this.display();
		} else if (selectorType === 'refracLength' && this.state !== 'clear') {
			this.refracLengthSetting = selector;
			this.applyRefracLengthSetting();
			this.display();
		} else if (selectorType === 'randomRefracLengths') {
			this.randomRefracLengths = !!parseInt(selector);
		} else if (selectorType === 'propagationDirectionSetting') {
			// Makes neighbourVectors an array of vectors (e.g. [-1, 1])
			this.neighbourVectors = Array.from($('input.prop-direction:checked')).map(function(el){
				return $(el).data('directionCode');
			})
			this.setNeighboursFromNeighbourVectors();
		} else if (selectorType === 'pacing' && this.state !== 'clear') {
			this.pacingSetting = selector;
				
			if (selector !== 'noPace')	{
				this.isPacing = true;
				this.pacingInterval = parseInt($('.pacingInterval').val());
				this.pacingTracker = this.pacingInterval-parseInt($('.pacingOffset').val());
				// if (this.pacingTracker === 0) {

				// }
			} else {
				this.isPacing = false;
			}
			
			this.display();
			// console.log(`(${this.col}, ${this.row}) - Changing pacing setting to ${this.pacingSetting}`);
		}
	}

	onlyClickSet(selectorType=this.parentGrid.selectorType, selector=this.parentGrid.selector) {
		if (selectorType === 'squareInspectorSelector') {
			if (!this.isInSquareInspector) {
				this.addToSquareInspector();
				// this.isInSquareInspector = true;
				// this.parentGrid.squareInspectorSquareList.push(this);
				// this.squareInspectorDivWrapper.assignSquareInspectorDiv();
				// this.squareInspectorDivWrapper.addDivToSquareInspector();
				// this.highlight();
			} else if (this.isInSquareInspector) {
				this.removeFromSquareInspector();
				// this.isInSquareInspector = false;
				// this.parentGrid.squareInspectorSquareList = this.parentGrid.squareInspectorSquareList.filter((el) => {
				// 	return !(el.col === this.col && el.row === this.row);
				// })
				// $(`.squareInspectorDiv[data-col="${this.col}"][data-row="${this.row}"]`).remove();
				// this.dehighlight();
			}
		}
	}

	addToSquareInspector() {
		this.isInSquareInspector = true;
		this.parentGrid.squareInspectorSquareList.push(this);
		this.squareInspectorDivWrapper.assignSquareInspectorDiv();
		this.squareInspectorDivWrapper.addDivToSquareInspector();
		this.highlight();		
	}

	removeFromSquareInspector() {
		this.isInSquareInspector = false;
		this.parentGrid.squareInspectorSquareList = this.parentGrid.squareInspectorSquareList.filter((el) => {
			return !(el.col === this.col && el.row === this.row);
		})
		$(`.squareInspectorDiv[data-col="${this.col}"][data-row="${this.row}"]`).remove();
		this.dehighlight();
	}

	clickDepolarise() {
		// console.log(`(${this.col}, ${this.row}) - Depolarising`);
		this.state = 'depo';
		this.APcounter = 0;
		this.display();
	}
	
	clickClear() {
		// console.log(`(${this.col}, ${this.row}) - Clearing`);
		this.state = 'clear';
		this.APcounter = -1;
		this.display();
	}

	clickRepolarise() {
		// console.log(`(${this.col}, ${this.row}) - Repolarising`);
		this.state = 'repo';
		this.APcounter = -1;
		this.display();
	}


	highlight() {
		this.sprites.highlight.visible = true;
	}

	dehighlight() {
		this.sprites.highlight.visible = false;
	}


	applyCondVelSetting() {
		console.log(`(${this.col}, ${this.row}) - Setting conduction velocity to ${this.condVelSetting}`);
		this.condVel = this.parentGrid.condVelDict[this.condVelSetting];
	}

	applyRefracLengthSetting() {
		console.log(`(${this.col}, ${this.row}) - Setting refractory period length to ${this.refracLengthSetting}`);
		this.refracLength = this.parentGrid.refracLengthDict[this.refracLengthSetting];
		this.rainbow.setNumberRange(0, this.refracLength);
	}


	setNeighbourVectors() {
		
		this.neighbourVectors = [[-1, 0], [0, -1], [0, 1], [1, 0]];
		if (this.parentGrid.diagonalPropagation) {
			this.neighbourVectors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
		}

	}

	setNeighboursFromNeighbourVectors() {
		this.neighbours = [];
		for (let vector of this.neighbourVectors) {
			if (this.parentGrid[this.col+vector[0]] && this.parentGrid[this.col+vector[0]][this.row+vector[1]]) {
				this.neighbours.push(this.parentGrid[this.col+vector[0]][this.row+vector[1]]);
			} else {
				// console.log(`col: ${this.col}, row: ${this.row}.`, 'neighbour col and/or neighbour row not present');
			}

			this.neighbours = this.neighbours.filter(x => x !== undefined);
		}		
	}

	setNeighbours() {
		this.setNeighbourVectors();
		this.setNeighboursFromNeighbourVectors();	
	}


	

	resize() {
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			[sprite.width, sprite.height] = [this.parentGrid.cellSize, this.parentGrid.cellSize];
			[sprite.x, sprite.y] = [this.parentGrid.grid2pixel(this.col), this.parentGrid.grid2pixel(this.row)];
		}
	}



	destroy() {
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			sprite.visible = false;
			// sprite.destroy({children:true, texture:true, baseTexture:true});
		}
	}

	copy() {
		return Object.assign(new Square(this.col, this.row, this.parentGrid), this);
	}

}
