class Square {
	constructor(col=0, row=0, parentGrid=grid) {
		var a;
		var b;
														// a = performance.now();
		this.isDebugging;
		this.isInSquareInspector = false;
		this.isInTimeStripPanel = false;

		this.parentGrid = parentGrid;

		this.col = col;
		this.row = row;
		this.x = this.parentGrid.grid2pixel(this.col);
		this.y = this.parentGrid.grid2pixel(this.row);

		this.isInSquareInspector = false;
		this.squareInspectorDivWrapper = new SquareInspectorDivWrapper(this.col, this.row, this);

		this.state = this.parentGrid.masterState;
		this.APcounter = -1;
		this.isPropagating = false;
		
		this.neighbourVectors = [];
		this.neighbours = [];
		this.setNeighbours();

		this.settingsLocked = false;

		this.isPacing = false;
		this.isExtPace = false;
		this.isAutoFocus = false;
		this.pacingSetting = 'noPace';
		this.pacingTracker = 10;
		this.pacingInterval = 100;
		
		this.nonConductionRate = 0;

		this.condVelSetting = this.parentGrid.masterCondVel;
		this.condVel = this.parentGrid.condVelDict[this.condVelSetting];

		this.refracLengthSetting = this.parentGrid.masterRefracLength;
		this.refracLength = this.parentGrid.refracLengthDict[this.refracLengthSetting];

		this.randomRefracLengths = false;
		this.randomRefracRangeConstant = 0.2;
		this.masterRandomRefracRangeConstant = 0.2;
		this.refracPoint;

		this.nameLabel = `[${col.toString()}, ${row.toString()}]`;


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
		this.setSpritesPosAndSize();
														// b = performance.now(); console.log((b-a)/1000);
														// a = performance.now();
		this.addSpritesToApp();
														// b = performance.now(); console.log((b-a)/1000);
	}

	setRainbowRange() {
		this.rainbow.setNumberRange(0, this.refracLength);
	}


	setSpritesPosAndSize() {
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
		for (let sprite of this.images) {
			sprite = this.sprites[sprite];
			this.parentGrid.app.stage.addChild(sprite);
		}
	}

	actionPotential() {
		// Stores previous state in trail
			// this.stateTrail.shift();
			// this.stateTrail.push(this.state);

		// Updating of cell itself
		// Each time through the cycle, a square is either depolarised (either through a neighbour or a pacing stimulus) OR it undergoes the AP pathway - never both

		// if (this.APcounter < 0 && this.neighbours[0] && this.neighbours.some(x => x.parentGrid.APcounterGrid[x.col][x.row] === this.condVel)) {
		if (this.APcounter < 0 && this.neighbours[0] && this.neighbours.some(x => x.parentGrid.isPropagatingGrid[x.col][x.row])) {
			// If this square is repolarised (APcounter < 0) and has at least one neighbour and at least one neighbour is 'depolarised' ('at the APcounter number which is equal to what the condVel for this square is set to, i.e. whatever AP counter squares this square will receive propagation from), then depolarise this square
			var randomNumberForNonConduction = this.nonConductionRate === 0 ? 1 : Math.random();
			this.nonConductionRate === 0 ? 1 : console.log(randomNumberForNonConduction);
			if (randomNumberForNonConduction >= this.nonConductionRate) {
				this.propagationDepolarise();
			}
			// Then, if this square is an automatic focus, reset its pacingTracker
			if (this.pacingSetting === 'autoFocus') {
				this.resetPacingTracker();
			}
		} else if (this.isPacing && this.pacingTracker <= 0) {
			// Or, if this square is a pacing square and it has reached its pacing interval time
				if (this.pacingSetting === 'extPace') {
					// then if it's an externally paced square (i.e. there is a lead touching it), then depolarise this square
					this.propagationDepolarise();
				} else if (this.pacingSetting === 'autoFocus') {
					// OR if it's not externally paced, but is an automatic focal pacemaker from the cell itself, then...
					if (this.state === 'repo') {
						// only depolarise if this square is repolarised
						this.propagationDepolarise();
					}
							// The logic here is that if a cell has a pacing lead attached to it, then it will get a huge voltage of electricity that will depolarise it even if it's in its refractory period, but if the square is an automatic focus, then it won't fire again if it's already refractory				
				}

				this.resetPacingTracker();

		} else {
			// AP cycle
			// this.isDebugging ? console.log('path 3') : null;
			// this.isDebugging ? console.log('this.randomRefracLengths: ', this.randomRefracLengths) : null;
			// this.isDebugging ? console.log('this.refracPoint: ', this.refracPoint) : null;
			if (this.APcounter < 0) {
				this.APcounter = -1;
			} else if (this.APcounter === 0) {
				this.APcounter++;
			} else if ( this.APcounter >= 1 && this.APcounter < (this.randomRefracLengths ? this.refracPoint : this.refracLength) ) {
				this.APcounter++;
			} else if ( this.APcounter >= (this.randomRefracLengths ? this.refracPoint : this.refracLength) ) {
				this.APcounter = -1;
			}
		}

		// Changes this.isPropagating (whether this cell will propagate AP to neihbouring cells on the next frame)
		if (this.APcounter === this.condVel) {
			this.isPropagating = true;
		} else {
			this.isPropagating = false;
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
			this.pacingTracker--;
			// this.isDebugging ? console.log(this.pacingTracker) : 0;
		}
	}

	resetPacingTracker() {
		this.pacingTracker = this.pacingInterval;
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


	applySquareInspectorDivChanges() { //properties that can change with every frame
		// state
		this.squareInspectorDivWrapper.div.find(`.state-radio[value=${this.state}]`).prop('checked', true)

		// pacingTracker
		this.squareInspectorDivWrapper.div.find(`.squareInspector-pacingTracker`).val(this.pacingTracker);
	}

	applySquareInspectorDivChangesInitialOnly() { //properties that only the user changes - they don't change on their own with the action potential
		// conduction velocity
		this.squareInspectorDivWrapper.div.find(`.condVel-radio[value=${this.condVelSetting}]`).prop('checked', true);
		
		// refracLength
		this.squareInspectorDivWrapper.div.find(`.refracLength-radio[value=${this.refracLengthSetting}]`).prop('checked', true);

		// randomRefracLengths
		this.squareInspectorDivWrapper.div.find(`.randomRefracLengths-radio[value=${+this.randomRefracLengths}]`).prop('checked', true);

		// pacingSetting
		this.squareInspectorDivWrapper.div.find(`.pacing-radio[value=${this.pacingSetting}]`).prop('checked', true);

		// pacingInterval
		this.squareInspectorDivWrapper.div.find(`.squareInspector-pacingInterval`).val(this.pacingInterval);

		// propdir
		var neighbourVectorStrings = this.neighbourVectors.map(v => `[${v.toString()}]` );
		for (let inp of this.squareInspectorDivWrapper.div.find('input.prop-direction')) {
			var dirCode = `[${$(inp).data('directionCode').toString()}]`;
			if (neighbourVectorStrings.includes(dirCode)) {
				$(inp).prop('checked', true);
			} else {
				$(inp).prop('checked', false);
			}
		}

		this.squareInspectorDivWrapper.div.find("input.nonConductionRate").val(this.nonConductionRate);
	}

	clickAndMoveSet(selectorType=this.parentGrid.selectorType, selector=this.parentGrid.selector, via='.settings-section') {
		console.log("clickAndMoveSet");
		if (selectorType === 'state') {
			if (selector === 'clear') {
				if (this.settingsLocked) { // If a square's settings are locked, then only depolarisation should be possible
					return;
				}
				this.clickClear();
			} else if (selector === 'depo') {
				this.clickDepolarise();
				if (this.pacingSetting === 'autoFocus') { // if this is an automatic focus cell, reset its pacing tracker
					this.resetPacingTracker();
				}
			} else if (selector === 'repo') {
				this.clickRepolarise();
			}
		} else if (this.settingsLocked) { // If a square's settings are locked, then only depolarisation should be possible (above)
			if (selector === "lockSettings") {
				this.settingsLocked = false;
			} else {
				return;
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
			this.randomRefracRangeConstant = this.masterRandomRefracRangeConstant;
		} else if (selectorType === 'propagationDirectionSetting') {
			// Makes neighbourVectors an array of vectors (e.g. [-1, 1])
			var propDirBox = via === '.settings-section' ? $('#propagation-box') : $('.squareInspector-propagation-box') ;
			console.log(propDirBox);
			this.neighbourVectors = Array.from(propDirBox.find('input.prop-direction:checked')).map(function(el){
				return $(el).data('directionCode');
			})
			this.setNeighboursFromNeighbourVectors();

			console.log(parseFloat(propDirBox.find(".nonConductionRate").val()));
			this.nonConductionRate = parseFloat(propDirBox.find(".nonConductionRate").val());
		} else if (selectorType === 'pacing' && this.state !== 'clear') {
			this.pacingSetting = selector;
			if (selector !== 'noPace')	{
				this.isPacing = true;
				console.log(via);
				var pacingIntervalInput = via === '.settings-section' ? $('#pacing-box').find('.pacingInterval') : this.squareInspectorDivWrapper.div.find('.squareInspector-pacingInterval');
				console.log(pacingIntervalInput);
				var pacingTrackerInput = via === '.settings-section' ? $('#pacing-box').find('.pacingTracker') : this.squareInspectorDivWrapper.div.find('.squareInspector-pacingTracker');
				console.log(pacingTrackerInput);
				this.pacingInterval = parseInt(pacingIntervalInput.val());
				this.pacingTracker = parseInt(pacingTrackerInput.val());
				
			} else {
				this.isPacing = false;
			}
			
			this.display();
			// console.log(`(${this.col}, ${this.row}) - Changing pacing setting to ${this.pacingSetting}`);
		}

		if (this.isInSquareInspector) {
			this.applySquareInspectorDivChangesInitialOnly();
		}

		if (typeof pageSpecificChangesWithEachFrame !== 'undefined') {
			pageSpecificChangesWithEachFrame();
		}

	}

	onlyClickSet(selectorType=this.parentGrid.selectorType, selector=this.parentGrid.selector) {
		if (selectorType === 'squareInspectorSelector') {
			if (!this.isInSquareInspector) {
				if (!squareInspectorSectionOpen) {
					$(".expand-or-collapse-arrow").last().click();
				}
				this.addToSquareInspector();
				this.addToTimeStripPanel();
			} else if (this.isInSquareInspector) {
				this.removeFromSquareInspector();
				this.removeFromTimeStripPanel();
			}
		} else if (selectorType === 'timeStripPanelSelector') {
			if (!this.isInTimeStripPanel) {
				this.addToTimeStripPanel();
			} else if (this.isInTimeStripPanel) {
				this.removeFromTimeStripPanel();
			}
		}
	}

	addToSquareInspector() {
		// change this.isInSquareInspector
		this.isInSquareInspector = true;
		// add to SquareInspectorSquareList
		this.parentGrid.squareInspectorSquareList.push(this);
		if (grid.squareInspectorSquareNumberList.filter(x => x[0] === this.col && x[1] === this.row).length === 0) {
			this.parentGrid.squareInspectorSquareNumberList.push([this.col, this.row]);
		}
		// Create and add squareInspectorDiv for this specific square to squareInspector
		this.squareInspectorDivWrapper.assignSquareInspectorDiv();
		this.squareInspectorDivWrapper.addDivToSquareInspector();
		// Highlight square
		this.highlight(0x00ff00);	
	}

	removeFromSquareInspector() {
		// change this.isInSquareInspector
		this.isInSquareInspector = false;
		// remove from SquareInspectorSquareList
		this.parentGrid.squareInspectorSquareList = this.parentGrid.squareInspectorSquareList.filter((el) => {
			return !(el.col === this.col && el.row === this.row);
		});
		this.parentGrid.squareInspectorSquareNumberList = this.parentGrid.squareInspectorSquareNumberList.filter((el) => {
			return !(el[0] === this.col && el[1] === this.row);
		});

		var squareInspectorDiv = $(`.squareInspectorDiv[data-col="${this.col}"][data-row="${this.row}"]`);
		var tabToRemove = $(`.squareInspector-section .tabSystem .tab[data-col="${this.col}"][data-row="${this.row}"]`);
		if (squareInspectorDiv.css("display") === "none") {
			// If this square's squareInspectorDiv is not currently showing, then simply
			// remove the squareInspectorDiv, remove the tab corresponding to the square, and dehighlight the (purple) square
			squareInspectorDiv.remove();
			tabToRemove.remove();
			this.dehighlight();
		} else {
			// If this square's squareInspectorDiv is currently showing (i.e. it is the currently inspected square) 
			// then remove the squareInspectorDiv, remove the tab corresponding to the square and dehighlight the (green) square...
			squareInspectorDiv.remove();
			tabToRemove.remove();
			this.dehighlight();
			
			// ...but then now there will be no active squareInspectorDiv
			// so make the last remaining tab and its corresponding squareInspectorDiv the active/inspected one
			var lastRemainingTab = $('.squareInspector-section .tabSystem .tab').last();			
			squareInspectorDiv.css("display", "none");
			$(`.squareInspectorDiv[data-col="${lastRemainingTab.data("col")}"][data-row="${lastRemainingTab.data("row")}"]`).css("display", "block");
			lastRemainingTab.addClass("tabActive");
		}

	}

	addToTimeStripPanel() {
		// change this.isInTimeStripPanel
		this.isInTimeStripPanel = true;
		// add to timeStripSquareList
		this.parentGrid.timeStripSquareList.push(this);
		// Add timeStrip for this specific square to timeStripPanel and add div to timeStrips-menu
		timeStripPanel.addTimeStrip(this);
		
		// (Highlighting is handled by squareInspector)
	}

	removeFromTimeStripPanel() {
		// change this.isInTimeStripPanel
		this.isInTimeStripPanel = false;
		// remove from timeStripSquareList
		this.parentGrid.timeStripSquareList = this.parentGrid.timeStripSquareList.filter((el) => {
			return !(el.col === this.col && el.row === this.row);
		});		
		// Remove timeStrip for this specific square from timeStripPanel and remove div from timeStrips-menu
		timeStripPanel.removeTimeStrip(this);
		
		// (Dehighlighting is handled by squareInspector)
	}

	clickDepolarise() {
		// console.log(`(${this.col}, ${this.row}) - Depolarising`);
		this.state = 'depo';
		
		this.APcounter = 0;
		// Changes this.isPropagating (whether this cell will propagate AP to neihbouring cells on the next frame)
		if (this.APcounter === this.condVel) {
			this.isPropagating = true;
		} else {
			this.isPropagating = false;
		}
		
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


	highlight(color) {
		this.sprites.highlight.visible = true;
		if (typeof color !== 'undefined') {
		    this.sprites.highlight.tint = color;
		} else {
			this.sprites.highlight.tint = 0xA020F0;
		}
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
		if (this.parentGrid.diagonalPropagation) {
			this.neighbourVectors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
		} else {
			this.neighbourVectors = [[-1, 0], [0, -1], [0, 1], [1, 0]];
		}

	}

	setNeighboursFromNeighbourVectors() {
		this.neighbours = [];
		for (let vector of this.neighbourVectors) {
			this.neighbours.push(this.getNeighbourFromVector(vector));
			this.neighbours = this.neighbours.filter(x => x !== undefined);
		}		
	}

	setNeighbours() {
		this.setNeighbourVectors();
		this.setNeighboursFromNeighbourVectors();	
	}

	highlightNeighbours() {
		for (let sq of this.neighbours) {
			sq.highlight();
		}
	}

	dehighlightNeighbours() {
		for (let sq of this.neighbours) {
			sq.dehighlight();
		}
	}

	getNeighbourFromVector(vec) {
		if (this.parentGrid[this.col+vec[0]]){
			return this.parentGrid[this.col+vec[0]][this.row+vec[1]];
		} else {
			return undefined;
		}
	}
	

	resize() {
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			[sprite.width, sprite.height] = [this.parentGrid.cellSize, this.parentGrid.cellSize];
			[sprite.x, sprite.y] = [this.parentGrid.grid2pixel(this.col), this.parentGrid.grid2pixel(this.row)];
		}
		[this.x, this.y] = [this.parentGrid.grid2pixel(this.col), this.parentGrid.grid2pixel(this.row)]
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
