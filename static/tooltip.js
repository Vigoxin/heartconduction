function showTooltipFor(el) {
	elToHighlight = $(el);
	$(".tooltip span").text(elToHighlight.data("tooltip"));
	
	elWidth = elToHighlight[0].offsetWidth;
	elHeight = elToHighlight[0].offsetHeight;
	elTop = elToHighlight.offset().top;
	elLeft = elToHighlight.offset().left;
    tooltipWidth = $(".tooltip-wrapper")[0].offsetWidth;
    tooltipHeight = $(".tooltip-wrapper")[0].offsetHeight;

	$(".tooltip-wrapper").css({
	    "top": elTop-tooltipHeight-5,
	    "left": elLeft-tooltipWidth/2+elWidth/2,
	})
	$(".tooltip-wrapper").css({
	    "transform": "scale(1)"
	})
}

function hideTooltip() {
	$(".tooltip-wrapper").css({"transform": "scale(0)"});
}

function setTooltipEventListeners() {
	$(".tooltippable").hover(function() {
	    if (tooltipModeActive) {
		    showTooltipFor(this);
	    }
	}, function() {
		if (tooltipModeActive) {
			// hideTooltip();
		}
	})
}