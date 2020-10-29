class TimeStripPanel extends Array {
	constructor(canvasElementSelector='#timeStripsDiv', parentGrid=grid) {
		super();

		// Sets PIXI constants
		this.canvasElementSelector = canvasElementSelector;

		// Sets constants
		this.numberOfStrips = 0;
		this.cellHeight = 20;
		this.verticalGapSize = 50;

		this.cellWidth = 1;

		// this.cHeight = (this.cellHeight + this.verticalGapSize) * this.numberOfStrips;
		this.cHeight = 500;
		this.cWidth = 420;
		this.numOfFramesLength = this.cWidth / this.cellWidth;

		this.wipeOverPositionCounter = 0;
		this.wipeOverOngoingOffset = 2;
		this.wipeOverBeginningOffset = 20;

		// Initialises PIXI Application
		this.initialisePIXIapp();



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

		// var bunny = new PIXI.Sprite(PIXI.loader.resources['/static/textures/square copy.png'].texture);
		// this.app.stage.addChild(bunny);
		// bunny.vel = 1;
		// var app = this.app;
		// // Listen for animate update
		// this.app.ticker.add(function(delta) {
		//     // just for fun, let's rotate mr rabbit a little
		//     // delta is 1 if running at 100% performance
		//     // creates frame-independent transformation
		// 	bunny.x += bunny.vel;
		// 	if (bunny.x > app.screen.width - bunny.width || bunny.x < 0) {
		// 		bunny.vel *= -1;
		// 	}
		// });

		// var bunny2 = new PIXI.Sprite(PIXI.loader.resources['/static/textures/square copy.png'].texture);
		// bunny2.y = 20;
		// this.app.stage.addChild(bunny2);
		// bunny2.vel = 1;
		// var app = this.app;
		// // Listen for animate update
		// this.app.ticker.add(function(delta) {
		//     // just for fun, let's rotate mr rabbit a little
		//     // delta is 1 if running at 100% performance
		//     // creates frame-independent transformation
		// 	bunny2.x += bunny2.vel;
		// 	if (bunny2.x > app.screen.width - bunny2.width || bunny2.x < 0) {
		// 		bunny2.vel *= -1;
		// 	}
		// });

	}

	update() {
		for (let timeStrip of this) {
			timeStrip.update();
		}
		this.moveOverWipePosition();
	}


	moveOverWipePosition() {
		this.wipeOverPositionCounter++;
		this.wipeOverPositionCounter = this.wipeOverPositionCounter % this.numOfFramesLength;
	}


	addTimeStrip(mirrorSquare) {

		if (this.numberOfStrips === 0) {
			this.wipeOverPositionCounter = 20;
			this.wipeOverOngoingOffset = 2;
			this.wipeOverBeginningOffset = 20;
		}
		this.push(new TimeStrip(mirrorSquare, this, (this.length-1)+1));
		this.numberOfStrips++;
	}

	removeTimeStrip(mirrorSquare) {
		
		// ________________

		this.numberOfStrips--;
	}



	grid2pixel(x, y) {
		var xresult = x * this.cellWidth;
		var yresult = y * (this.cellHeight + this.verticalGapSize);
		return {
			'x': xresult,
			'y': yresult
		}
	}





}