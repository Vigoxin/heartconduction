function pageSpecifics() {
	// Info Div changes
	infoDiv = $("<div></div>").attr({"class": "info"});
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/1.html`,
	    async: false,
	    success: function(data){ 
	    	$(infoDiv).html(data);
	    }
	});
	$(".page-specifics").append(infoDiv);

	// Grid changes
	$(".fps-slider").val(30);
	$(".fps-slider").trigger("input");
	$("canvas").css("borderRight", "1px solid #444");
	$("canvas").css("borderBottom", "1px solid #444");
	$("canvas").css("margin-bottom", "20px");

	var APDemonstration = $(`
		<div class="APDemonstration">
			<img src="/static/images/ventricular_AP.png" class="AP-img">
			<div class="AP-img-tracking-square">
		</div>
	`)
	APDemonstration.css({
		"position": "relative",
		"margin": "auto",
		"width": "500px",
	})
	APDemonstration.find(".AP-img").css({
		"width": "500px",
		"display": "block",
		"position": "relative",
		// "border": "1px solid black",
	})

	APDemonstration.find(".AP-img-tracking-square").css({
		"width": "15px",
		"height": "15px",
		"backgroundColor": "white",
		"border": "1px solid black",
		"position": "absolute",
		"top": "0px",
		"left": "0px",
	})

	$(".canvas").append(APDemonstration);

	APDemonstrationSquareCoords = [
		[120, 174],
		[126, 33],
		[131, 48],
		[141, 54],
		[150, 54],
		[162, 54],
		[167, 54],
		[178, 54],
		[189, 54],
		[198, 54],
		[204, 54],
		[216, 54],
		[229, 54],
		[245, 54],
		[260, 54],
		[276, 54],
		[294, 54],
		[308, 54],
		[318, 71],
		[333, 104],
		[342, 134],
		[356, 180],
		[365, 214],
		[377, 254],
		[389, 287],
		[423, 293],
		[458, 291],
		[485, 292],
		[21, 288],
		[40, 289],
		[63, 290],
		[88, 289],
		[111, 288]
	]

	APDidx = APDemonstrationSquareCoords.length-1;

}

var APDidx;
	
function pageSpecificChangesWithEachFrame() {
	var sq = $(".AP-img-tracking-square");

	if (grid[0][0].state === "depo") {
		APDidx = 0;
	}
	if (APDidx >= APDemonstrationSquareCoords.length) {
		APDidx = APDemonstrationSquareCoords.length-1;
	}

	var left = `${APDemonstrationSquareCoords[APDidx][0]-sq[0].offsetWidth/2}px`;
	var top = `${APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;

	sq.css("backgroundColor", decimalToRGB(grid[0][0].sprites.square.tint));
}