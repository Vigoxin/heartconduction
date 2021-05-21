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

	// Related to changes with each frame
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
		[389, 288],
		[423, 290],
		[458, 290],
		[485, 290],
		[21, 287],
		[40, 287],
		[63, 287],
		[88, 287],
		[111, 287]
	]
	APDidx = APDemonstrationSquareCoords.length-1;

	// Set changes with each frame function
	pageSpecificChangesWithEachFrame = pageSpecificChangesWithEachFrame1;
	
	// Set window highlight event listeners
	setHighlightOnWindowEventListeners();
}

function pageSpecificChangesWithEachFrame1() {
	var sq = $(".AP-img-tracking-square");
	var mirrorSq = grid[0][0];
	if (mirrorSq.state === "depo") {
		APDidx = 0;
	}
	if (APDidx >= APDemonstrationSquareCoords.length) {
		APDidx = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx][0]-sq[0].offsetWidth/2)*$(".AP-img")[0].offsetWidth/500}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2)*$(".AP-img")[0].offsetHeight/298}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));
}

function pageSpecificChangesWithEachFrame2() {
	var sq = $(".AP-img-tracking-square");
	var mirrorSq = grid[0][0];
	if (mirrorSq.state === "depo") {
		APDidx = 0;
	}
	if (APDidx >= APDemonstrationSquareCoords.length) {
		APDidx = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx][0]-sq[0].offsetWidth/2)*$(".AP-img")[0].offsetWidth/500}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2)*$(".AP-img")[0].offsetHeight/298}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));

	var sq = $(".AP-img-tracking-square");
	var mirrorSq = grid[9][0];
	if (mirrorSq.state === "depo") {
		APDidx = 0;
	}
	if (APDidx >= APDemonstrationSquareCoords.length) {
		APDidx = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx][0]-sq[0].offsetWidth/2)*$(".AP-img")[0].offsetWidth/500}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2)*$(".AP-img")[0].offsetHeight/298}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));
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

	// Set changes with each frame function
	pageSpecificChangesWithEachFrame = pageSpecificChangesWithEachFrame1;
	
	setHighlightOnWindowEventListeners();
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

	// Outside-of-canvas div changes
	$(".outside-of-canvas").empty();

	function addAPDemonstration() {
		var APDemonstration = $(`
			<div class="APDemonstration">
				<img src="/static/images/ventricular_AP.png" class="AP-img">
				<div class="AP-img-tracking-square">
			</div>
		`)
		APDemonstration.css({
			"position": "relative",
			"margin": "auto",
			"width": "300px",
		})
		APDemonstration.find(".AP-img").css({
			"width": "300px",
			"display": "block",
			"position": "relative",
		})

		APDemonstration.find(".AP-img-tracking-square").css({
			"width": "9px",
			"height": "9px",
			"backgroundColor": "white",
			"border": "1px solid black",
			"position": "absolute",
			"top": "0px",
			"left": "0px",
		})

		$(".outside-of-canvas").append(APDemonstration);
	}

	addAPDemonstration();
	addAPDemonstration();

	pageSpecificChangesWithEachFrame = pageSpecificsWithEachFrame2;

	setHighlightOnWindowEventListeners();
}

function pageSpecifics4() {

}