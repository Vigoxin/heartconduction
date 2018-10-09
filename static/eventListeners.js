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

// State settings
$("input[name='selector']").on('click', function() {
	grid.selector = $("input[name='selector']:checked").val();
	grid.selectorType = $(this).data('selectorType');
	console.log(`current selector value:\n${grid.selector}, type: ${grid.selectorType}`);
})

// condVel settings
$('.condVel-radio').on('click', function() {
	grid.selector = $(".condVel-radio:checked").val();
	grid.selectorType = $(this).data('selectorType');
})