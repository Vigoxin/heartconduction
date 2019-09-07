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
	

			<div class="squareInspector-col-and-row-box squareInspector-settings-section">
				<label>
					<span">Col: ${this.col}</span>
				</label>
				<label>
					<span">Row: ${this.row}</span>
				</label>


				<label>
					<input class='squareInspector-highlight-checkbox with-gap' type="checkbox" data-col=${this.col} data-row=${this.row} checked> <span>Highlight</span>
				</label>

			</div>

			<div class="squareInspector-state-box squareInspector-settings-section tabbed-settings-section">
				<div class="squareInspectorSectionTitle"> State </div>
				<div class="row">
					<label>
						<input class='with-gap state-radio depo' type="radio" data-selector-type="state" data-col=${this.col} data-row=${this.row} name="squareInspectorSetting${this.col}-${this.row}" value='depo'> <span>Depo</span>
					</label>
					<label>
						<input class='with-gap state-radio repo' type="radio" data-selector-type="state" data-col=${this.col} data-row=${this.row} name="squareInspectorSetting${this.col}-${this.row}" value='repo'> <span>Repo</span>
					</label>
					<label>
						<input class='with-gap state-radio clear' type="radio" data-selector-type="state" data-col=${this.col} data-row=${this.row} name="squareInspectorSetting${this.col}-${this.row}" value='clear'> <span>Clear</span>
					</label>
				</div>
			</div>
	

			<hr class='squareInspector-settings-section' />

		`)

	}

	addDivToSquareInspector() {

		$('#squareInspectorDivs').append(this.div);
		
		this.parentSquare.highlight();

		// highlight checkbox event
		$(this.div).find('.squareInspector-highlight-checkbox').on('click', function() {
			a = $(this).data('col');
			b =$(this).data('row');
			var parentSquare = grid.squareInspectorSquareList.filter(function(sq){
				return sq.col === a && sq.row === b;
			})[0];
			// 	return sq.col === $(this).data('col') && sq.row === $(this).data('row');
			// }));

			if ($(this).is(':checked')) {
				parentSquare.highlight();
			} else {
				parentSquare.dehighlight();
			}
		})
		
	}

	


}
