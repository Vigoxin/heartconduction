// Play settings
var isPlaying = true;
$('.play-button').on('click', () => {isPlaying = !isPlaying});
$('.frame-button').on('click', drawFrame);

var fpsMax = 80;
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

// Setting state, condVel and refracLengths
$("input[name='selector']").on('click', function() {
	grid.selector = $("input[name='selector']:checked").val();
	grid.selectorType = $(this).data('selectorType');
	console.log(`current selector value:\n${grid.selector}, type: ${grid.selectorType}`);
})

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
			square.clickRepolarise();
		}
	}
})