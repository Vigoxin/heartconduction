class SquareInspectorDivWrapper {
	constructor(col=0, row=0, parentSquare=grid[0][0]) {
		this.parentSquare = parentSquare;

		this.col = col;
		this.row = row;

		this.div;
		this.createSquareInspectorDiv();
	}


	createSquareInspectorDiv() {
		this.div = $(`<div class='squareInspectorDiv' data-col=${this.col} data-row=${this.row}>
	

			<div class="squareInspector-col-and-row-box squareInspector-settings-section row">
				<label>
					<span">Col: ${this.col}</span>
				</label>
				<label class='row'>
					<span">Row: ${this.row}</span>
				</label>


				<label>
					<input class='squareInspector-highlight-checkbox with-gap' type="checkbox" data-col=${this.col} data-row=${this.row} checked> <span>Highlight</span>
				</label>

			</div>

			<div class="squareInspector-state-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle"> State </div>
				<div class="row">
					<label>
						<input class='state-radio simpleSelectorRadio depo with-gap' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='depo' data-col=${this.col} data-row=${this.row}> <span>Depo</span>
					</label>
					<label>
						<input class='state-radio simpleSelectorRadio repo with-gap' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='repo' data-col=${this.col} data-row=${this.row}> <span>Repo</span>
					</label>
					<label>
						<input class='state-radio simpleSelectorRadio clear with-gap' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='clear' data-col=${this.col} data-row=${this.row}> <span>Clear</span>
					</label>
				</div>
			</div>

			<div class="squareInspector-condVel-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle"> Conduction Velocity </div>
				<div class="row">
					<label>
						<input class='condVel-radio simpleSelectorRadio fast with-gap' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='fast' data-col=${this.col} data-row=${this.row}> <span>Fast</span>
					</label>
					<label>
						<input class='condVel-radio simpleSelectorRadio normal with-gap' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <span>Normal</span>
					</label>
					<label>
						<input class='condVel-radio simpleSelectorRadio slow with-gap' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='slow' data-col=${this.col} data-row=${this.row}> <span>Slow</span>
					</label>
				</div>
			</div>

			<div class="squareInspector-condVel-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle"> Refractory Period </div>
				<div class="row">
					<label>
						<input class='with-gap simpleSelectorRadio refracLength-radio long' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='long' data-col=${this.col} data-row=${this.row}> <span>Long</span>
					</label>
					<label>
						<input class='with-gap simpleSelectorRadio refracLength-radio normal' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <span>Normal</span>
					</label>
					<label>
						<input class='with-gap simpleSelectorRadio refracLength-radio short' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='short' data-col=${this.col} data-row=${this.row}> <span>Short</span>
					</label>
				</div>
				<div class="squareInspectorSectionTitle"> Refractory Period Range? </div>
				<div class="row">
					<label>
						<input class="with-gap simpleSelectorRadio randomRefracLengths-radio on" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=1 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <span>Range on</span>
					</label>
					<label>
						<input class="with-gap simpleSelectorRadio randomRefracLengths-radio off" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=0 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <span>Range off</span>
					</label>
				</div>
			</div>
			


	

			<hr class='squareInspector-settings-section row' />

		`)

	}

	addDivToSquareInspector() {

		$('#squareInspectorDivs').append(this.div);
		
		this.parentSquare.highlight();
		this.parentSquare.applySquareInspectorDivChanges();

		// highlight checkbox event
		$(this.div).find('.squareInspector-highlight-checkbox').on('click', function() {
			a = $(this).data('col');
			b = $(this).data('row');
			var tempParentSquare = grid.squareInspectorSquareList.filter(function(sq){
				return sq.col === a && sq.row === b;
			})[0];

			if ($(this).is(':checked')) {
				tempParentSquare.highlight();
			} else {
				tempParentSquare.dehighlight();
			}
		})

		// state event
		$(this.div).find(`.simpleSelectorRadio`).on('click', function() {
			a = $(this).data('col');
			b = $(this).data('row');
			var tempParentSquare = grid.squareInspectorSquareList.filter(function(sq){
				return sq.col === a && sq.row === b;
			})[0];

			tempParentSquare.clickAndMoveSet($(this).data('selectorType'), $(this).val());
		})

	}

	


}
