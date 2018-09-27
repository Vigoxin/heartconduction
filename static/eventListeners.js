var isPlaying = false;
$('.play-button').on('click', () => {isPlaying = !isPlaying});

$('.fps-slider').prop({
	'max': 60,
	'min': 1,
	'value': fps
});
$('.fps-slider').on('input', function() {
	$('.fps-number').val($(this).val());
	fps = parseInt($(this).val());
})

$('.fps-number').prop({
	'max': 60,
	'min': 1,
	'value': fps
});
$('.fps-number').on('input', function() {
	$('.fps-slider').val($(this).val());
	fps = parseInt($(this).val());
})