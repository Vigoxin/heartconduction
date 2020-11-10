class SquareForTimeStrip {
	constructor(col=0, row=0, parentCanvas=timeStripPanel, parentTimeStrip, tint) {
		this.parentCanvas = parentCanvas;
		this.parentTimeStrip = parentTimeStrip;

		this.col = col;
		this.row = row;
		this.x = this.parentCanvas.grid2pixel(this.col, this.row).x;
		this.y = this.parentCanvas.grid2pixel(this.col, this.row).y;

		// Setting up the sprites needed to display the square
		this.setSprite();
		this.addSpriteToApp();

		this.update();
	}


	setSprite() {
		// setting sprite to be from a texture
		this.sprite = new PIXI.Sprite(PIXI.loader.resources['/static/textures/square copy.png'].texture);
		
		// Setting the sprite's position and dimensions
		// console.log(this.x);
		[this.sprite.x, this.sprite.y] = [this.x, this.y];
		[this.sprite.width, this.sprite.height] = [this.parentCanvas.cellWidth, this.parentCanvas.cellHeight];
	}

	addSpriteToApp() {
		this.parentCanvas.app.stage.addChild(this.sprite);
	}

	removeSpriteFromApp() {
		this.parentCanvas.app.stage.removeChild(this.sprite);
	}

	update() {
		this.getTintFromParentTimeStrip();
		this.display();
	}

	getTintFromParentTimeStrip() {
		this.tint = this.parentTimeStrip.tintList[this.col];
	}

	display() {
		if (this.tint !== 'initial') {
			this.sprite.visible = true;
			this.sprite.tint = this.tint;
		} else if (this.tint === 'initial') {
			this.sprite.visible = false;
		}
	}

}
