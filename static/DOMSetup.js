function DOMSetup() {
	// When the page finally loads, the loading spinning pic is no longer displayed
	$('.canvas .loader-to-remove').css('display', 'none');

	// Load page specifics into .infoDiv
	if (typeof infoDiv !== 'undefined') {
		infoDiv();
	}
}