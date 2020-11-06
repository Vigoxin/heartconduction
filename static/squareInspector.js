class SquareInspectorDivWrapper {
	constructor(col=0, row=0, parentSquare=grid[0][0]) {
		this.parentSquare = parentSquare;

		this.col = col;
		this.row = row;

		this.div;
	}


	assignSquareInspectorDiv() {
		this.div = $(`<div class='squareInspectorDiv' data-col=${this.col} data-row=${this.row}>
	

			<div class="squareInspector-col-and-row-box squareInspector-settings-section row">
				<label>
					<span">Col: ${this.col}</span>
				</label>
				<label class='row'>
					<span">Row: ${this.row}</span>
				</label>


				<label>
					<input class='squareInspector-highlight-checkbox' type="checkbox" data-col=${this.col} data-row=${this.row} checked> <span>Highlight</span>
				</label>

				<label>
					<button class='removeSquareInspectorDiv btn btn-custom' data-col=${this.col} data-row=${this.row}>Remove</button>
				</label>

			</div>

			<div class="squareInspector-state-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle collapsible-state active"> Activation state </div>
				<div class="radio-row collapsible-content">
						<input id='state-radio-depo-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio depo simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='depo' data-col=${this.col} data-row=${this.row}> <label for='state-radio-depo-squareInspector-${this.col}-${this.row}'>Depo</label> 
						<input id='state-radio-repo-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio repo simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='repo' data-col=${this.col} data-row=${this.row}> <label for='state-radio-repo-squareInspector-${this.col}-${this.row}'>Repo</label> 
						<input id='state-radio-clear-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio clear simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='clear' data-col=${this.col} data-row=${this.row}> <label for='state-radio-clear-squareInspector-${this.col}-${this.row}'>Clear</label> 
				</div>
			</div>

			<div class="squareInspector-condVel-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle collapsible-condVel active"> Conduction Velocity </div>
				<div class="radio-row collapsible-content">
						<input id='condVel-radio-fast-squareInspector-${this.col}-${this.row}' class='toggle-button-radio condVel-radio fast simpleSelectorRadio' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='fast' data-col=${this.col} data-row=${this.row}> <label for='condVel-radio-fast-squareInspector-${this.col}-${this.row}'>Fast</label> 
						<input id='condVel-radio-normal-squareInspector-${this.col}-${this.row}' class='toggle-button-radio condVel-radio normal simpleSelectorRadio' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <label for='condVel-radio-normal-squareInspector-${this.col}-${this.row}'>Normal</label> 
						<input id='condVel-radio-slow-squareInspector-${this.col}-${this.row}' class='toggle-button-radio condVel-radio slow simpleSelectorRadio' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='slow' data-col=${this.col} data-row=${this.row}> <label for='condVel-radio-slow-squareInspector-${this.col}-${this.row}'>Slow</label> 
				</div>
			</div>

			<div class="squareInspector-refrac-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle collapsible-refracLength active"> Refractory Period </div>
				<div class="radio-row collapsible-refracLength active">
						<input id='refracLength-radio-long-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio long simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='long' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-long-squareInspector-${this.col}-${this.row}'>Long</label> 
						<input id='refracLength-radio-normal-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio normal simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-normal-squareInspector-${this.col}-${this.row}'>Normal</label> 
						<input id='refracLength-radio-short-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio short simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='short' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-short-squareInspector-${this.col}-${this.row}'>Short</label> 
				</div>
				<div class="squareInspectorSectionTitle collapsible-randomRefracLengths active"> Refractory Period Range? </div>
				<div class="radio-row collapsible-content">
						<input id='randomRefracLengths-radio-on-squareInspector-${this.col}-${this.row}' class="toggle-button-radio randomRefracLengths-radio on simpleSelectorRadio" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=1 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <label for='randomRefracLengths-radio-on-squareInspector-${this.col}-${this.row}'>On</label> 
						<input id='randomRefracLengths-radio-off-squareInspector-${this.col}-${this.row}' class="toggle-button-radio randomRefracLengths-radio off simpleSelectorRadio" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=0 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <label for='randomRefracLengths-radio-off-squareInspector-${this.col}-${this.row}'>Off</label> 
				</div>
			</div>
			
			<div class="squareInspector-pacing-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle collapsible-pacing active"> Pacing </div>
					<div class="collapsible-content">
						<div class="radio-row">
								<input id='pacing-radio-extPace-squareInspector-${this.col}-${this.row}' class='toggle-button-radio pacing-radio extPace simpleSelectorRadio' type="radio" data-selector-type="pacing" name="squareInspectorSetting-pacing-${this.col}-${this.row}" value='extPace' data-col=${this.col} data-row=${this.row}> <label for='pacing-radio-extPace-squareInspector-${this.col}-${this.row}'>External Pacing</label> 
								<input id='pacing-radio-autoFocus-squareInspector-${this.col}-${this.row}' class='toggle-button-radio pacing-radio autoFocus simpleSelectorRadio' type="radio" data-selector-type="pacing" name="squareInspectorSetting-pacing-${this.col}-${this.row}" value='autoFocus' data-col=${this.col} data-row=${this.row}> <label for='pacing-radio-autoFocus-squareInspector-${this.col}-${this.row}'>Automatic Focus</label> 
								<input id='pacing-radio-noPace-squareInspector-${this.col}-${this.row}' class='toggle-button-radio pacing-radio noPace simpleSelectorRadio' type="radio" data-selector-type="pacing" name="squareInspectorSetting-pacing-${this.col}-${this.row}" value='noPace' data-col=${this.col} data-row=${this.row}> <label for='pacing-radio-noPace-squareInspector-${this.col}-${this.row}'>No pace</label> 
						</div>
						<div class="row">
							<div class="number-label-pair">
								<input type="number" name="squareInspector-pacingInterval-${this.col}-${this.row}" value=${this.parentSquare.pacingInterval} class="squareInspector-pacingInterval squareInspector-pacingNumber" data-col=${this.col} data-row=${this.row}><label>Pacing interval</label>
							</div>
							<div class="number-label-pair">
								<input type="number" name="squareInspector-pacingTracker-${this.col}-${this.row}" value=${this.parentSquare.pacingTracker} class="squareInspector-pacingTracker squareInspector-pacingNumber" data-col=${this.col} data-row=${this.row}><label>Pacing timer</label>
							</div>
						</div>
					</div>
			</div>

			<div class="squareInspector-propagation-box squareInspector-settings-section">
				<div class="squareInspectorSectionTitle collapsible-propagation active"> Receives propagation from... </div>
				<div class="prop-box-container">
					<div class="propagation-settings-directions-grid">
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[-1,-1]" name="top-left"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[0,-1]" name="top-center"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[1,-1]" name="top-right"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[-1,0]" name="center-left"> <span></span>
								</label>
							</div>

							<div class='prop-set-dir-grid-sec'>
								<div class="row">
									<img src="/static/textures/square.png" alt="" />
								</div>
							</div>

							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[1,0]" name="center-right"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[-1,1]" name="bottom-left"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[0,1]" name="bottom-center"> <span></span>
								</label>
							</div>
							<div class='prop-set-dir-grid-sec'>
								<label>
									<input class='prop-direction' type="checkbox" data-selector-type="propagationDirectionSetting" data-direction-code="[1,1]" name="bottom-right"> <span></span>
								</label>
							</div>

					</div>
				</div>
			</div>

	

			<hr class='squareInspector-settings-section row' />

		`)

	}

	addDivToSquareInspector() {

		$('#squareInspectorDivs').append(this.div);
		
		this.parentSquare.highlight();
		this.parentSquare.applySquareInspectorDivChanges();
		this.parentSquare.applySquareInspectorDivChangesInitialOnly();
		var col = this.col;
		var row = this.row;

	// Set events
		// highlight checkbox event
		$(this.div).find('.squareInspector-highlight-checkbox').on('click', function() {
			if ($(this).is(':checked')) {
				grid[col][row].highlight();
			} else {
				grid[col][row].dehighlight();
			}
		})

		// remove button event
		$(this.div).find('.removeSquareInspectorDiv').on('click', () => {
			this.parentSquare.removeFromSquareInspector();
		})

		// state, conduction velocity, refracLength and randomRefracLengths, and pacingSetting event
		$(this.div).find(`.simpleSelectorRadio`).on('click', function() {
			grid[col][row].clickAndMoveSet($(this).data('selectorType'), $(this).val(), '.squareInspectorDiv');
		})

		// propagation direction box
		$(this.div).find('input.prop-direction').on('change', function() {
			console.log("running event for prop dir box");
			grid[col][row].clickAndMoveSet($(this).data('selectorType'), 'propagation direction', '.squareInspectorDiv')
		})

		// pacingTracker and pacingInterval events
		$(this.div).find('.squareInspector-pacingNumber').on('change', function() {
			grid[col][row].clickAndMoveSet('pacing', grid[col][row].squareInspectorDivWrapper.div.find('.pacing-radio:checked').val(), '.squareInspectorDiv');
		})

		var squareInspectorSections = [
			['.collapsible-state', 'flex'],
			['.collapsible-condVel', 'flex'],
			['.collapsible-refracLength', 'flex'],
			['.collapsible-randomRefracLengths', 'flex'],
			['.collapsible-pacing', 'block'],
			['.collapsible-propagation', 'grid']
		]

		for (let el of squareInspectorSections) {
			var collapsible = this.div.find(el[0]);
			collapsible.on('click', function() {
				this.classList.toggle('active');
			    var content = this.nextElementSibling;
				if (content.style.display !== 'none') {
					console.log($(el[0]).nextAll());
					$(el[0]).nextAll().css('display', 'none');
				} else {
					$(el[0]).nextAll().css('display', el[1]);
				}
			})
		}


	}

	


}
