PIXI.loader.add('/static/textures/square.png');
PIXI.loader.add('/static/textures/square copy.png');

PIXI.loader.load(setup)

function setup() {
	var app = new PIXI.Application(50, 50, {backgroundColor : 0xff00ff});
	document.body.appendChild(app.view);

	// create a new Sprite from an image path
	var bunny = new PIXI.Sprite(PIXI.loader.resources['/static/textures/square.png'].texture);
	app.stage.addChild(bunny);
	bunny.vel = 1;
	// Listen for animate update
	app.ticker.add(function(delta) {
	    // just for fun, let's rotate mr rabbit a little
	    // delta is 1 if running at 100% performance
	    // creates frame-independent transformation
		bunny.x += bunny.vel;
		if (bunny.x > app.screen.width - bunny.width || bunny.x < 0) {
			bunny.vel *= -1;
		}
	});

	var app2 = new PIXI.Application(50, 50, {backgroundColor : 0x00ff00});
	document.body.appendChild(app2.view);

	// create a new Sprite from an image path
	var bunny2 = new PIXI.Sprite(PIXI.loader.resources['/static/textures/square copy.png'].texture);
	app2.stage.addChild(bunny2);
	bunny2.vel = 1;
	// Listen for animate update
	app2.ticker.add(function(delta) {
	    // just for fun, let's rotate mr rabbit a little
	    // delta is 1 if running at 100% performance
	    // creates frame-independent transformation
		bunny2.x += bunny2.vel;
		if (bunny2.x > app2.screen.width - bunny2.width || bunny2.x < 0) {
			bunny2.vel *= -1;
			console.log('asdf');
		}
	});
}

