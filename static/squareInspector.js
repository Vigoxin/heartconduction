function addSquareInspectorDiv(col, row) {
	var squareInspectorDiv = $(`<div class='squareInspectorDiv' data-col=${col} data-row=${row}>
	
	<div class="squareInspector-col-and-row-box">
		<div class="container">
			<label>
				<span">Col: ${col}</span>
			</label>
			<label>
				<span">Row: ${row}</span>
			</label>
		</div>
	</div>

	<div class="squareInspector-state-box squareInspector-settings-section tabbed-settings-section">
				<div class="container">
					<div class="row">
						<label>
							<input class='with-gap state-radio depo' type="radio" data-selector-type="state" name="squareInspectorSetting${col}-${row}" value='depo'> <span>Depo</span>
						</label>
						<label>
							<input class='with-gap state-radio repo' type="radio" data-selector-type="state" name="squareInspectorSetting${col}-${row}" value='repo'> <span>Repo</span>
						</label>
						<label>
							<input class='with-gap state-radio clear' type="radio" data-selector-type="state" name="squareInspectorSetting${col}-${row}" value='clear'> <span>Clear</span>
						</label>
					</div>
				</div>
			</div>
	</div>
	


	`)

	$('#squareInspectorDivs').append(squareInspectorDiv);
}
