class TimeStripPanel {
	constructor(canvasElementSelector='#timeStripsDiv', parentGrid=grid) {
		// Sets PIXI constants
		this.canvasElementSelector = canvasElementSelector;

		// Sets constants
		this.cellHeight = 50;
		this.timeStripHeight = 50;
		this.verticalOneSidedMargin = (this.timeStripHeight-this.cellHeight)/2;

		this.cellWidth = 1;

		this.cHeight = 400;
		this.cWidth = parseInt($(canvasElementSelector).css('width'));
		this.numOfFramesLength = Math.floor(this.cWidth / this.cellWidth);
		
		this.counterGap = 4;


		// Initialises array for timeStrips
		this.timeStripArray = [];

		// Initialises PIXI Application
		this.app;
		this.initialisePIXIapp();
		this.canvas = this.app.view;

		// Sets up calipers
		this.caliper;
		this.setCaliperEvent();


	}

	initialisePIXIapp() {
		this.app = new PIXI.Application({
			width: this.cWidth+1,
			height: this.cHeight+1,
			antialias: true,			// default: false
			transparent: true, 		// default: false
			resolution: 1,			 	// default: 1
			backgroundColor: 0x000000,
			clearBeforeRender: true,
			preserveDrawingBuffer: true
		})

		// Adds the PIXI Application to the css selector element specified in the constructor
		$(this.canvasElementSelector)[0].append(this.app.view);
	}

	setCaliperEvent() {
		// $(this.canvas).on("mousemove", function(e){
		// 	if (e.buttons === 1) {
		// 		console.log('asdf');
		// 	}
		// })
		makeCaliperDraggable($(".caliper")[0]);
		makeCaliperRightHandleDraggable($(".caliper .rightHandle")[0]);
		makeCaliperLeftHandleDraggable($(".caliper")[0]);
	}

	update() {
		for (let timeStrip of this.timeStripArray) {
			timeStrip.update();
		}
		this.incrementCounter();
	}


	incrementCounter() {
		this.counterHead++;
		this.counterHead = mod(this.counterHead, this.numOfFramesLength);
		this.counterTail++;
		this.counterTail = mod(this.counterTail, this.numOfFramesLength);
	}


	addTimeStrip(mirrorSquare) {
		if (this.timeStripArray.length === 0) {
			this.counterHead = 1;
			this.counterTail = (this.counterHead+this.counterGap);
			this.counterTail = mod(this.counterTail, this.numOfFramesLength);
		}

		this.timeStripArray.push(new TimeStrip(mirrorSquare, this, (this.timeStripArray.length-1)+1));
	}

	removeTimeStrip(mirrorSquare) {
		// Identify the ts to remove
		var timeStripToRemove = this.timeStripArray.filter((ts) => {
			return ts.mirrorSquare === mirrorSquare;
		})[0];

		// Remove the specific timeStripMenuTab
		timeStripToRemove.removeDivFromTimeStripMenu();
		// Remove the actual timeStrip square sprites
		timeStripToRemove.removeSquaresFromTimeStripPanel();

		this.timeStripArray.splice(this.timeStripArray.indexOf(timeStripToRemove), 1);
	}


	activateCalipers() {

	}


	grid2pixel(x, y) {
		var xresult = x * this.cellWidth;
		// var yresult = this.verticalOneSidedMargin + (y * (this.cellHeight + 2*this.verticalOneSidedMargin));
		var yresult = (y * (this.cellHeight + 2*this.verticalOneSidedMargin));
		return {
			'x': xresult,
			'y': yresult
		}
	}





}
