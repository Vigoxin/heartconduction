class SquareInspectorDivWrapper {
	constructor(col=0, row=0, parentSquare=grid[0][0]) {
		this.parentSquare = parentSquare;

		this.col = col;
		this.row = row;

		this.div;
	}


	assignSquareInspectorDiv() {
		this.div = $(`
			<div class='squareInspectorDiv' data-col=${this.col} data-row=${this.row}>
				<div class="squareInspector-col-and-row-box squareInspector-settings-section row">
					<div class="label-input-pair nameLabelLabelInputPair">
						<label>Label:</label>
						<input class='input longer nameLabel-input' type='text' value='${this.parentSquare.nameLabel}'>
					</div>

					<label class="squareInspector-highlight-checkbox-label">
						<input class='squareInspector-highlight-checkbox' type="checkbox" data-col=${this.col} data-row=${this.row} checked> <span>Highlight</span>
					</label>

					<label class="removeSquareInspectorDivLabel">
						<button class='removeSquareInspectorDiv btn btn-custom' data-col=${this.col} data-row=${this.row}>Remove</button>
					</label>

				</div>

				<div class="squareInspector-state-box squareInspector-settings-section">
					<div class="squareInspectorSectionTitle collapsible-state active"> Activation state </div>
					<div class="radio-row collapsible-content">
							<input id='state-radio-depo-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio depo simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='depo' data-col=${this.col} data-row=${this.row}> <label for='state-radio-depo-squareInspector-${this.col}-${this.row}'>Depo</label> 
							<input id='state-radio-refrac-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio refrac simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='refrac' data-col=${this.col} data-row=${this.row} disabled> <label for='state-radio-refrac-squareInspector-${this.col}-${this.row}'>Refrac</label> 
							<input id='state-radio-repo-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio repo simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='repo' data-col=${this.col} data-row=${this.row}> <label for='state-radio-repo-squareInspector-${this.col}-${this.row}'>Repo</label> 
							<input id='state-radio-clear-squareInspector-${this.col}-${this.row}' class='toggle-button-radio state-radio clear simpleSelectorRadio' type="radio" data-selector-type="state" name="squareInspectorSetting-state-${this.col}-${this.row}" value='clear' data-col=${this.col} data-row=${this.row}> <label for='state-radio-clear-squareInspector-${this.col}-${this.row}'>Clear</label> 
					</div>
				</div>

				<div class="squareInspector-condVel-box squareInspector-settings-section">
					<div class="squareInspectorSectionTitle collapsible-condVel active"> Conduction Velocity </div>
					<div class="radio-row collapsible-content">
							<input id='condVel-radio-normal-squareInspector-${this.col}-${this.row}' class='toggle-button-radio condVel-radio normal simpleSelectorRadio' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <label for='condVel-radio-normal-squareInspector-${this.col}-${this.row}'>Normal</label> 
							<input id='condVel-radio-slow-squareInspector-${this.col}-${this.row}' class='toggle-button-radio condVel-radio slow simpleSelectorRadio' type="radio" data-selector-type="condVel" name="squareInspectorSetting-condVel-${this.col}-${this.row}" value='slow' data-col=${this.col} data-row=${this.row}> <label for='condVel-radio-slow-squareInspector-${this.col}-${this.row}'>Slow</label> 
					</div>
				</div>

				<div class="squareInspector-refrac-box squareInspector-settings-section">
					<div class="squareInspectorSectionTitle collapsible-refracLength active"> Refractory Period </div>
					<div class="radio-row collapsible-refracLength active">
							<input id='refracLength-radio-short-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio short simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='short' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-short-squareInspector-${this.col}-${this.row}'>Short</label> 
							<input id='refracLength-radio-normal-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio normal simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='normal' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-normal-squareInspector-${this.col}-${this.row}'>Normal</label> 
							<input id='refracLength-radio-long-squareInspector-${this.col}-${this.row}' class='toggle-button-radio refracLength-radio long simpleSelectorRadio' type="radio" data-selector-type="refracLength" name="squareInspectorSetting-refracLength-${this.col}-${this.row}" value='long' data-col=${this.col} data-row=${this.row}> <label for='refracLength-radio-long-squareInspector-${this.col}-${this.row}'>Long</label> 
					</div>
					<div class="squareInspectorSectionTitle collapsible-randomRefracLengths active"> Random refractory period? </div>
					<div class="radio-row collapsible-content">
							<input id='randomRefracLengths-radio-off-squareInspector-${this.col}-${this.row}' class="toggle-button-radio randomRefracLengths-radio off simpleSelectorRadio" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=0 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <label for='randomRefracLengths-radio-off-squareInspector-${this.col}-${this.row}'>Off</label> 
							<input id='randomRefracLengths-radio-on-squareInspector-${this.col}-${this.row}' class="toggle-button-radio randomRefracLengths-radio on simpleSelectorRadio" type="radio" name="squareInspectorSetting-randomRefracLengths-${this.col}-${this.row}" value=1 data-selector-type="randomRefracLengths" data-col=${this.col} data-row=${this.row}> <label for='randomRefracLengths-radio-on-squareInspector-${this.col}-${this.row}'>On</label> 
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
								<div class="label-input-pair pacingIntervalLabelInputPair-squareInspector-${this.col}-${this.row}">
									<label>Pacing interval:</label><input type="number" name="squareInspector-pacingInterval-${this.col}-${this.row}" value=${this.parentSquare.pacingInterval} class="input squareInspector-pacingInterval squareInspector-pacingNumber" data-col=${this.col} data-row=${this.row}>
								</div>
								<div class="label-input-pair pacingTrackerLabelInputPair-squareInspector-${this.col}-${this.row}">
									<label>Pacing timer:</label><input type="number" name="squareInspector-pacingTracker-${this.col}-${this.row}" value=${this.parentSquare.pacingTracker} class="input squareInspector-pacingTracker squareInspector-pacingNumber" data-col=${this.col} data-row=${this.row}>
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
										<img src="/static/textures/square.png" class="complete-the-square" alt="" />
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
						<div class="label-input-pair nonConductionRateLabelInputPair">
							<label>Non-conduction rate:</label><input type="number" name="nonConduction" class="nonConductionRate input" min="0" max="1.0" step="0.05">
						</div>
					</div>
				</div>

	

				<hr class='squareInspector-settings-section row' />

			</div>

		`)

	}

	addDivToSquareInspector() {
		
	// Add div to #squareInspectorDivs
		$('#squareInspectorDivs').append(this.div);
		var div = this.div;

	// Highlight square
		// this.parentSquare.highlight();
		
	// Change settings to correspond with square's current settings
		this.parentSquare.applySquareInspectorDivChanges();
		this.parentSquare.applySquareInspectorDivChangesInitialOnly();
		var col = this.col;
		var row = this.row;

	// Add tab to #squareInspectorDivs tabSystem
		var tabHTML = `<div class='tab' data-col=${this.col} data-row=${this.row}>${this.parentSquare.nameLabel}</div>`;
		$('.squareInspector-section .tabSystem').append(tabHTML);
		var tab = $('.squareInspector-section .tabSystem .tab').filter(function(i, el){
			return $(this).data("col") === col && $(this).data("row") === row;
		}).first();

		// Change nameLabel input event
		var ps = this.parentSquare;
		$(div).find('.nameLabel-input').on('input', function() {
			tab.text($(this).val());
			ps.nameLabel = $(this).val();
			$(`.timeStrips-menu-tab[data-col="${ps.col}"][data-row="${ps.row}"]`).find('.nameLabel-input').val($(this).val());
		})

		// Set tab events for tabSystem
		tab.on('click', () => {
			$('.squareInspectorDiv').css('display', 'none');
			div.css('display', 'block');
			$('.squareInspector-section .tabSystem .tab').removeClass('tabActive');
			tab.addClass('tabActive');
			for (let square of grid.squareInspectorSquareList) {
				square.highlight();
				// square.dehighlight();
				// console.log(square.squareInspectorDivWrapper.div.find(".squareInspector-highlight-checkbox"));
				// square.squareInspectorDivWrapper.div.find(".squareInspector-highlight-checkbox").prop("checked", false);
			}
			this.parentSquare.highlight(0x00ff00);
			// this.parentSquare.squareInspectorDivWrapper.div.find(".squareInspector-highlight-checkbox").prop("checked", true);
		})
		tab.click();

		// Set up collapsible sections
		var squareInspectorSections = [
			['.collapsible-state', 'flex'],
			['.collapsible-condVel', 'flex'],
			['.collapsible-refracLength', 'flex'],
			['.collapsible-randomRefracLengths', 'flex'],
			['.collapsible-pacing', 'block'],
			['.collapsible-propagation', 'grid']
		]

		for (let el of squareInspectorSections) {
			var collapsible = div.find(el[0]);
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

	// Set events for squareInspectorDivs content
		// highlight checkbox event
		$(div).find('.squareInspector-highlight-checkbox').on('click', function() {
			if ($(this).is(':checked')) {
				grid[col][row].highlight();
			} else {
				grid[col][row].dehighlight();
			}
		})

		// remove button event
		$(div).find('.removeSquareInspectorDiv').on('click', () => {
			this.parentSquare.removeFromSquareInspector();
			this.parentSquare.removeFromTimeStripPanel();
		})

		// state, conduction velocity, refracLength and randomRefracLengths, and pacingSetting event
		$(div).find(`.simpleSelectorRadio`).on('click', function() {
			grid[col][row].clickAndMoveSet($(this).data('selectorType'), $(this).val(), '.squareInspectorDiv');
		})

		// propagation direction box
		$(div).find('input.prop-direction').on('change', function() {
			console.log("running event for prop dir box");
			grid[col][row].clickAndMoveSet($(this).data('selectorType'), 'propagation direction', '.squareInspectorDiv');
		})

		$(div).find('input.nonConductionRate').on('change', function() {
			console.log("running event for nonConduction rate");
			grid[col][row].clickAndMoveSet("propagationDirectionSetting", 'propagation direction', '.squareInspectorDiv');
		})

		// pacingTracker and pacingInterval events
		$(div).find('.squareInspector-pacingNumber').on('change', function() {
			grid[col][row].clickAndMoveSet('pacing', grid[col][row].squareInspectorDivWrapper.div.find('.pacing-radio:checked').val(), '.squareInspectorDiv');
		})

		// Tooltip functionality for this squareInspectorDiv and tab only
		var tooltipsDict = {
			".nameLabelLabelInputPair": "Label the cell so it's easier to identify (e.g. 'SA node'). The default label is its grid coordinates",
			".squareInspector-highlight-checkbox-label": "Add/remove highlighting of this cell",
			".removeSquareInspectorDivLabel": "Remove this cell from Cell Inspector",

			".propagation-settings-directions-grid": "Determines which neighbours this cell receives propagation from (useful for simulating unidirectional conduction block).",
			".nonConductionRateLabelInputPair": "Sets the probability (between 0 and 1) that this cell will not depolarise when receiving propagation from a neighbouring cell"
		}
		tooltipsDict[`#state-radio-depo-squareInspector-${this.col}-${this.row}+label`] = "Depolarise this cell";
		tooltipsDict[`#state-radio-repo-squareInspector-${this.col}-${this.row}+label`] = "Repolarise this cell";
		tooltipsDict[`#state-radio-refrac-squareInspector-${this.col}-${this.row}+label`] = "Shows when this cell is in a refractory period (you cannot manually set the cell as refractory)";
		tooltipsDict[`#state-radio-clear-squareInspector-${this.col}-${this.row}+label`] = "Change this cell into a non-conductive, fully insulated cell (a barrier to propagation)";
		
		tooltipsDict[`#condVel-radio-normal-squareInspector-${this.col}-${this.row}+label`] = "Makes conduction velocity maximum (immediate depolarisation upon depolarisation of a neighbouring cell)";
		tooltipsDict[`#condVel-radio-slow-squareInspector-${this.col}-${this.row}+label`] = "Makes conduction velocity slow (waits before receiving propagation from neighbouring cell)";
		
		tooltipsDict[`#refracLength-radio-short-squareInspector-${this.col}-${this.row}+label`] = "Makes the refractory period of this cell's action potential short";
		tooltipsDict[`#refracLength-radio-normal-squareInspector-${this.col}-${this.row}+label`] = "Makes the refractory period of this cell's action potential medium length";
		tooltipsDict[`#refracLength-radio-long-squareInspector-${this.col}-${this.row}+label`] = "Makes the refractory period of this cell's action potential long";
		
		tooltipsDict[`#randomRefracLengths-radio-off-squareInspector-${this.col}-${this.row}+label`] = "Makes the refractory period fixed to the number assigned by the length above";
		tooltipsDict[`#randomRefracLengths-radio-on-squareInspector-${this.col}-${this.row}+label`] = "Makes the refractory period differ randomly around the number assigned by the length above";

		tooltipsDict[`#pacing-radio-extPace-squareInspector-${this.col}-${this.row}+label`] = "Makes this cell pace at a fixed interval (the number assigned below). This interval will not reset when the cell receives propagation from a neighbouring cell (similar to if there was a pacing lead on this cell)";
		tooltipsDict[`#pacing-radio-autoFocus-squareInspector-${this.col}-${this.row}+label`] = "Makes this cell pace at a fixed interval (the number assigned below). This interval will reset when the cell receives propagation from a neighbouring cell (similar to any cell that exhibits automaticity)";
		tooltipsDict[`#pacing-radio-noPace-squareInspector-${this.col}-${this.row}+label`] = "Removes any pacing function from this cell";

		tooltipsDict[`.pacingIntervalLabelInputPair-squareInspector-${this.col}-${this.row}`] = "The cycle length (in frames) at which this cell will pace";
		tooltipsDict[`.pacingTrackerLabelInputPair-squareInspector-${this.col}-${this.row}`] = "The current pacing timer of this cell (counts down with each frame and paces when it reaches 0)";

		console.log($(`.squareInspectorDiv[data-col="${ps.col}"][data-row="${ps.row}"]`));
		for (let selector in tooltipsDict){
			$(`.squareInspectorDiv[data-col="${ps.col}"][data-row="${ps.row}"]`).find(selector).data("tooltip", tooltipsDict[selector]);
			$(`.squareInspectorDiv[data-col="${ps.col}"][data-row="${ps.row}"]`).find(selector).on("mousemove", function(){
				if (tooltipModeActive) {
					showTooltipFor(this);
				}
			}).on("mouseleave", function(){
				if (tooltipModeActive) {
					hideTooltip();
				}
			});
		}

		$(`.tab[data-col="${ps.col}"][data-row="${ps.row}"]`).data("tooltip", "Select which cell to inspect (when you have added multiple cells to the Cell Inspector)");
		$(`.tab[data-col="${ps.col}"][data-row="${ps.row}"]`).on("mousemove", function(){
			if (tooltipModeActive) {
				showTooltipFor(this);
			}
		}).on("mouseleave", function(){
			if (tooltipModeActive) {
				hideTooltip();
			}
		});

		if (tooltipModeActive) {
			$(`.squareInspectorDiv[data-col="${ps.col}"][data-row="${ps.row}"]`).find("*").addClass("cursor-question-mark");
		}

	}
}
