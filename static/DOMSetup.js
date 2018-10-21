function DOMSetup() {
	$('.canvas .preloader-wrapper').css('display', 'none');

	$('.info').slick({
		'draggable': false,
		'infinite': false,
		'lazyLoad': 'progressive'
	});
}