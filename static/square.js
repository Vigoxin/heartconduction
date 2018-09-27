class Square {
	constructor(col, row) {
		this.col = col;
		this.row = row;
		this.x = grid2pixel(col);
		this.y = grid2pixel(row);

		this.state = masterState;

		this.sprites = {}
		for (let image of images) {
			this.sprites[image] = new PIXI.Sprite(textures[image]);
		}
		for (let sprite in this.sprites) {
			sprite = this.sprites[sprite];
			[sprite.position.x, sprite.position.y] = [this.x, this.y];
		}
	}

	display() {
		this.sprites.square.tint = randFromArray([0xff0000, 0x00ff00, 0x0000ff]);
	}

	actionPotential() {
		// Updating of cell itself
	}

	propagate() {
		// Updating of neighbouring cells' states
	}


}