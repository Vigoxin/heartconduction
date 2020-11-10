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
			this.tintList.push('initial');
		}

		for (let i = 0; i < this.numOfFramesLength; i++) {
			this.push(new SquareForTimeStrip(i, this.rowInParentTimeStripPanel, timeStripPanel, this, this.mirrorSquare.sprites.square.tint));
		}
		
		this.update();

		this.assignDiv();
		this.addDivToTimeStripMenu();
	}

	assignDiv() {
		this.div =	$(`
				<div class="timeStrips-menu-tab" data-col=${this.mirrorSquare.col} data-row=${this.mirrorSquare.row}>
					<div class="row">
						<label class="drag-handle"><i class="material-icons">drag_handle</i></label>
						<label>
							<button class='removeTimeStripDiv btn btn-custom btn-small' data-col=${this.mirrorSquare.col} data-row=${this.mirrorSquare.row}>Remove</button>
						</label>
						<input class='input longer nameLabel-input' type='text' value='${this.mirrorSquare.nameLabel}'>
					</div>
				</div>
		`);
	}

	addDivToTimeStripMenu() {
		$(".timeStrips-menu").append(this.div);
		
		// Change y position for div, to line up with timeStrip sprites
		$(this.div).css("top", this.parentCanvas.cellHeight*this.rowInParentTimeStripPanel);

		// Set draggable event for div
		// $(this.div).find(".drag-handle").on("mousedown", dragTimeStripMenuTab);
		makeTimeStripMenuTabDraggable($(this.div)[0], this);

		var removeButton = $(this.div).find(".removeTimeStripDiv");
		removeButton.on("click", () => {
			this.mirrorSquare.removeFromTimeStripPanel();
		});


	}

	removeDivFromTimeStripMenu() {
		$(".timeStrips-menu").find(`.timeStrips-menu-tab[data-col="${this.mirrorSquare.col}"][data-row="${this.mirrorSquare.row}"]`).remove();
	}

	removeSquaresFromTimeStripPanel() {
		for (let sq of this) {
			sq.removeSpriteFromApp();
		}
	}

	addSquaresToTimeStripPanel() {
		for (let sq of this) {
			sq.addSpriteToApp();
		}
	}

	setY(y) {
		for (let sq of this) {
			sq.sprite.y = y;
		}
	}

	update() {
		this.updateTintList();
		for (let square of this) {
			square.update();
		}
	}

	updateTintList() {
		var nextFrameColour = this.mirrorSquare.sprites.square.tint;

		this.tintList[this.parentCanvas.counterHead] = this.mirrorSquare.state === 'depo' ? nextFrameColour : 0xffffff ;
		this.tintList[this.parentCanvas.counterTail] = 'initial';
	}

}
