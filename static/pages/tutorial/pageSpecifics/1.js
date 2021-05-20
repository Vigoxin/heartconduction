function pageSpecifics() {
	// Update related pages section
	$(".related-pages .page-list").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/relatedPAges.html`,
	    async: false,
	    success: function(data){ 
			$(".related-pages .page-list").append(data);
	    }
	});

	// Info Div changes
	$(".info").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/1.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});

	// Change next and prev button links
	$(".info-footer-button").css("visibility", "visible");
	$(".info-footer-button").off("click");
	
	$(".info-footer-previous").css("visibility", "hidden");
	$(".info-footer-next").on("click", pageSpecifics2);

	$(".info-section-footer .page-num").text("Page 1");

	// Grid changes
	$(".fps-slider").val(30);
	$(".fps-slider").trigger("input");
	$(".canvas canvas").css("borderRight", "1px solid #444");
	$(".canvas canvas").css("borderBottom", "1px solid #444");
	$(".canvas canvas").css("margin-bottom", "20px");

	// Outside-of-canvas div changes
	$(".outside-of-canvas").empty();

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

	$(".outside-of-canvas").append(APDemonstration);

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

function pageSpecifics2() {
	// Info Div changes
	$(".info").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/2.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});

	// Change next and prev button links
	$(".info-footer-button").css("visibility", "visible");
	$(".info-footer-button").off("click");
	
	$(".info-footer-previous").on("click", pageSpecifics);
	$(".info-footer-next").on("click", pageSpecifics3);

	$(".info-section-footer .page-num").text("Page 2");

}

function pageSpecifics3() {
	// Info Div changes
	$(".info").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/3.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".info-footer-button").css("visibility", "visible");
	$(".info-footer-button").off("click");
	
	$(".info-footer-previous").on("click", pageSpecifics2);
	$(".info-footer-next").on("click", pageSpecifics4);

	$(".info-section-footer .page-num").text("Page 3");
}

function pageSpecifics4() {
	
}