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
	    "top": elTop-tooltipHeight-10,
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
	$("[data-tooltip]").mousemove(function() {
	    if (tooltipModeActive) {
		    showTooltipFor(this);
	    }
	}).mouseleave(function() {
		if (tooltipModeActive) {
			hideTooltip();
		}
	})

	$(".tooltip-wrapper").mousemove(function() {
	    if (tooltipModeActive) {
		    $(this).css("transform", "scale(1)");
	    }
	}).mouseleave(function() {
		if (tooltipModeActive) {
			hideTooltip();
		}
	})
}