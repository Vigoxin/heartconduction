function showTooltipFor(el) {
	elToHighlight = $(el);
	$(tooltipWrapperToUse).find(".tooltip span").text(elToHighlight.data("tooltip"));
	
	elWidth = elToHighlight[0].offsetWidth;
	elHeight = elToHighlight[0].offsetHeight;
	elTop = elToHighlight.offset().top;
	elLeft = elToHighlight.offset().left;
    tooltipWidth = $(tooltipWrapperToUse)[0].offsetWidth;
    tooltipHeight = $(tooltipWrapperToUse)[0].offsetHeight;

	$(tooltipWrapperToUse).css({
	    "top": elTop-tooltipHeight-10,
	    "left": elLeft-tooltipWidth/2+elWidth/2,
	})
	$(tooltipWrapperToUse).css({
	    "transform": "scale(1)"
	})
}

function hideTooltip() {
	$(".tooltip-wrapper, .tooltip-wrapper-2").css({"transform": "scale(0)"});
	toggleTooltipWrapperToUse();
}

var tooltipModeActive = false;
var tooltipWrapperToUse = ".tooltip-wrapper";

function toggleTooltipWrapperToUse() {
	tooltipWrapperToUse = tooltipWrapperToUse === ".tooltip-wrapper" ? ".tooltip-wrapper-2" : ".tooltip-wrapper";
}

function setTooltipEventListeners() {
	$.getJSON({
	    url: "/static/tooltipsData.json",
	    async: false,
	    success: function(data){ 
	    	for (let el in data) {
	    		$(el).data("tooltip", data[el]);
				// $("*").filter(function(i, el){return $(el).data("tooltip")!==undefined})
				$(el).mousemove(function() {
				    if (tooltipModeActive) {
					    showTooltipFor(this);
				    }
				}).mouseleave(function() {
					if (tooltipModeActive) {
						hideTooltip();
					}
				})
	    	}

			// if (sidebar.css("transform").split(", ")[4] === "0") {
			// 	if ($(this).parent().hasClass("tools-section")) {

		

	    },
	    error: function(e) {
	    	console.log("ERROR");
	    	console.log(e);
	    }
	});

	$(".tooltip-wrapper, .tooltip-wrapper-2").mousemove(function() {
	    if (tooltipModeActive) {
		    $(this).css("transform", "scale(1)");
	    }
	}).mouseleave(function() {
		if (tooltipModeActive) {
			hideTooltip();
		}
	})


	$(".tooltips-toggle").on("click", function() {
		if (tooltipModeActive) {
			$("body *").removeClass("cursor-question-mark");
			$(".tooltip-wrapper, .tooltip-wrapper-2").css("transform", "scale(0)");
			tooltipModeActive = false;
		} else {
			$("body *").addClass("cursor-question-mark");
			tooltipModeActive = true;
			// $(".tooltips-toggle").removeClass("cursor-question-mark");
			// $(".tooltips-toggle .circle-border").removeClass("cursor-question-mark");
		}
	})

}