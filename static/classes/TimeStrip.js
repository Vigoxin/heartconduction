class TimeStrip extends Array {
	constructor(canvasElement='.canvas', parentGrid, mirrorSquare, timeLength) {
		super();

		// Sets constants
			// constants specific to class
		this.mirrorSquare = mirrorSquare;
			
			// pixi constants
		this.cWidth = 100;
		this.cHeight = timeLength;

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
		$(canvasElement)[0].append(this.pixiapp.view);

		for (i=0; i<timeLength; i++) {
			this.push(undefined);
		}

	}
}