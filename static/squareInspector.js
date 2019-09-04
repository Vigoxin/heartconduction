var squareInspectorDiv = $(`<div>
<div id="state-box" class="state-box settings-section tabbed-settings-section">
			<div class="container">
				<div class="row">
					<label>
						<input class='with-gap state-radio depo' type="radio" data-selector-type="state" name="selector" value='depo' checked='checked'> <span>Depo</span>
					</label>
					<label>
						<input class='with-gap state-radio repo' type="radio" data-selector-type="state" name="selector" value='repo'> <span>Repo</span>
					</label>
					<label>
						<input class='with-gap state-radio clear' type="radio" data-selector-type="state" name="selector" value='clear'> <span>Clear</span>
					</label>
				</div>
			</div>
		</div>

		<div id="condVel-box" class="condVel-box settings-section tabbed-settings-section">
			<div class="container">
				<div class="row">
					<label>
						<input class='with-gap condVel-radio fast' type="radio" data-selector-type="condVel" name="selector" value='fast'> <span>Fast</span>
					</label>
					<label>
						<input class='with-gap condVel-radio normal' type="radio" data-selector-type="condVel" name="selector" value='normal'> <span>Normal</span>
					</label>
					<label>
						<input class='with-gap condVel-radio slow' type="radio" data-selector-type="condVel" name="selector" value='slow'> <span>Slow</span>
					</label>
				</div>
			</div>
		</div>

		<div id="refracLength-box" class="refracLength-box settings-section tabbed-settings-section">
			<div class="container">
				<div class="row">
					<label>
						<input class='with-gap refracLength-radio long' type="radio" data-selector-type="refracLength" name="selector" value='long'> <span>Long</span>
					</label>
					<label>
						<input class='with-gap refracLength-radio normal' type="radio" data-selector-type="refracLength" name="selector" value='normal'> <span>Normal</span>
					</label>
					<label>
						<input class='with-gap refracLength-radio short' type="radio" data-selector-type="refracLength" name="selector" value='short'> <span>Short</span>
					</label>
				</div>
				<div class="row">
					<label>
						<input class="with-gap randomRefracLengths-radio on" type="radio" name="selector" value=1 data-selector-type="randomRefracLengths"> <span>Random refractory periods on</span>
					</label>
					<label>
						<input class="with-gap randomRefracLengths-radio off" type="radio" name="selector" value=0 data-selector-type="randomRefracLengths"> <span>Random refractory periods off</span>
					</label>
				</div>
			</div>
		</div>
		
		<div id="pacing-box" class="pacing-box settings-section tabbed-settings-section">
			<div class="container">
				<div class="row">
					<label>
						<input class='with-gap pacing-radio extPace' type="radio" data-selector-type="pacing" name="selector" value='extPace'> <span>External Pacing</span>
					</label>
					<label>
						<input class='with-gap pacing-radio autoFocus' type="radio" data-selector-type="pacing" name="selector" value='autoFocus'> <span>Automatic Focus</span>
					</label>
					<label>
						<input class='with-gap pacing-radio noPace' type="radio" data-selector-type="pacing" name="selector" value='noPace'> <span>No pace</span>
					</label>
				</div>
				<div class="row">
					<div class="number-label-pair">
						<input type="number" name="pacing" class="pacingInterval pacing-number"><label>Pacing interval</label>
					</div>
					<div class="number-label-pair">
						<input type="number" name="pacing" class="pacingOffset pacing-number"><label>Pacing offset</label>
					</div>
				</div>
			</div>
		</div>

		<div id="propagation-box" class="propagation-box settings-section tabbed-settings-section">
			<div class="prop-box-container">
				<div class="propagation-settings-directions-grid">
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[-1,-1]" name="top-left" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[0,-1]" name="top-center" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[1,-1]" name="top-right" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[-1,0]" name="center-left" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<div class="row">
								<label>
									<input class="with-gap prop-direction-radio on" type="radio" name="selector" value=1 data-selector-type="propagationDirectionSetting"> <span></span>
								</label>
							</div>

						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[1,0]" name="center-right" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[-1,1]" name="bottom-left" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[0,1]" name="bottom-center" checked> <span></span>
							</label>
						</div>
						<div class='prop-set-dir-grid-sec'>
							<label>
								<input class='prop-direction' type="checkbox" data-selector-type="propagationDirection" data-direction-code="[1,1]" name="bottom-right" checked> <span></span>
							</label>
						</div>

				</div>
			</div>
		</div>
</div>
`)

$('info-section').append(squareInspectorDiv);