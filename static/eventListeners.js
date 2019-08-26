function eventListeners() {
	console.log(grid);

	// Play settings
	isPlaying = true;
	$('.play-button').on('click', () => {isPlaying = !isPlaying});
	$('.frame-button').on('click', drawFrame);

	fpsMax = 80;
	$('.fps-slider').prop({
		'max': fpsMax,
		'min': 1,
		'value': fps
	});
	$('.fps-slider').on('input', function() {
		$('.fps-number').val($(this).val());
		fps = parseInt($(this).val());
	})

	$('.fps-number').prop({
		'max': fpsMax,
		'min': 1,
		'value': fps
	});
	$('.fps-number').on('input', function() {
		$('.fps-slider').val($(this).val());
		fps = parseInt($(this).val());
	})

	// Resize settings
	grid.resizeMin = 5;
	grid.resizeMax = 100;
	$('.resize-slider').prop({
		'max': grid.resizeMax,
		'min': grid.resizeMin,
		'value': grid.cellSize
	});
	$('.resize-slider').on('input', function() {
		$('.resize-number').val($(this).val());
		grid.resize(parseInt($(this).val()));
	})

	$('.resize-number').prop({
		'max': grid.resizeMax,
		'min': grid.resizeMin,
		'value': grid.cellSize
	});
	$('.resize-number').on('input', function() {
		$('.resize-slider').val($(this).val());
		grid.resize(parseInt($(this).val()));
	})

	// Renumber settings
	grid.renumMin = 1;
	grid.renumMax = 100;
	$('.renum-slider').prop({
		'max': grid.renumMax,
		'min': grid.renumMin,
		'value': grid.cellNum
	});
	
	$('.renum-slider').on('change', function() {
		grid.renum(parseInt($(this).val()), 'repo');
	})
	$('.renum-slider').on('input', function() {	
		$('.renum-number').val($(this).val());
	})

	$('.renum-number').prop({
		'max': grid.renumMax,
		'min': grid.renumMin,
		'value': grid.cellNum
	});
	$('.renum-number').on('change', function() {
		$('.renum-slider').val($(this).val());
		grid.renum(parseInt($(this).val()), 'repo');
	})

	// Setting state, condVel and refracLengths
	$("input[name='selector']").on('click', function() {
		grid.selector = $("input[name='selector']:checked").val();
		grid.selectorType = $(this).data('selectorType');
		console.log(`current selector value:\n${grid.selector}, type: ${grid.selectorType}`);
	})
	grid.selector = $("input[name='selector']:checked").val();
	grid.selectorType = $("input[name='selector']:checked").data('selectorType');

	// Apply to all box
	$('.apply-to-all-button').on('click', function() {
		for (let col of grid) {
			for (let square of col) {
				if (square.state !== 'clear') {square.clickSet()};
			}
		}
	})

	$('.unclear-all-cells-button').on('click', function() {
		for (let col of grid) {
			for (let square of col) {
				if (square.state === 'clear') (square.clickRepolarise());
			}
		}
	})

	// Save Load box
	$('.save-button').on('click', function() {
		gridInStorage = grid.saveGrid();
		console.log('"' + gridInStorage + '"');
	})

	$('.load-button').on('click', function() {
		grid.loadGrid(gridInStorage);
	})

	// Pacing numbers
	$('.pacingInterval').prop({
		'value': 100,
		'min': 1
	})

	$('.pacingOffset').prop({
		'value': 0
	})

	
	// Rainbow box
	$('.rainbow-checkbox').on('click', function() {
		grid.rainbowTrails = $(this).is(':checked');		
	})


}