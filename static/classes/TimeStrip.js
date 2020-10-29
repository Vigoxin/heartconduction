class TimeStrip extends Array {
	constructor(mirrorSquare=grid[0][0], parentCanvas=timeStripPanel, rowInParentTimeStripPanel) {
		super();

		this.mirrorSquare = mirrorSquare;
		this.parentCanvas = parentCanvas;
		this.rowInParentTimeStripPanel = rowInParentTimeStripPanel;

		this.numOfFramesLength = this.parentCanvas.numOfFramesLength;


	// Each TimeStrip is an array of SquareForTimeStrips, but also has a 'tintList' property, 
	// which is the list of historical colours of its mirrorSquare. Each update consists of
	// an update of the tintList, and then an update of the array itself based on the tintList
		this.tintList = [];
		for (let i = 0; i < this.numOfFramesLength; i++) {
			this.tintList.push('beginning');
		}
		this.tintListCounter = mod(this.parentCanvas.wipeOverPositionCounter - 20, this.numOfFramesLength) ;

		


		for (let i = 0; i < this.numOfFramesLength; i++) {
			this.push(new SquareForTimeStrip(i, this.rowInParentTimeStripPanel, timeStripPanel, this, this.mirrorSquare.sprites.square.tint));
		}



		this.update();
	}

	update() {
		this.updateTintList();
		for (let square of this) {
			square.update();
		}
	}

	updateTintList() {
		var nextFrameColour = this.mirrorSquare.sprites.square.tint;


		this.tintList[this.tintListCounter%this.tintList.length] = nextFrameColour;
		this.tintList[(this.tintListCounter+this.parentCanvas.wipeOverOngoingOffset)%this.tintList.length] = 'beginning';
		
		this.tintListCounter = mod(this.parentCanvas.wipeOverPositionCounter - this.parentCanvas.wipeOverBeginningOffset, this.numOfFramesLength) ;
		// this.tintListCounter++;
		// console.log(this.tintListCounter);
		// console.log(this.tintList.length);
		// console.log(this.tintListCounter === this.tintList.length);
		// if (this.tintListCounter === this.tintList.length) {
		// 	this.tintListCounter = 0;
		// }


	}

}
