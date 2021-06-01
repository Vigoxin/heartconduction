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
	var top = `${(APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2)*$(".AP-img")[0].offsetHeight/298.33-2}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));
}

function pageSpecificChangesWithEachFrame2() {
	var sq = $(".APDemonstration").first().find(".AP-img-tracking-square");
	var mirrorSq = grid[8][0];
	if (mirrorSq.state === "depo") {
		APDidx = 0;
	}
	if (APDidx >= APDemonstrationSquareCoords.length) {
		APDidx = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx][0]-sq[0].offsetWidth/2)*$(".AP-img")[0].offsetWidth/500-2}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx][1]-sq[0].offsetHeight/2)*$(".AP-img")[0].offsetHeight/298.33-2}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));

	var sq = $(".APDemonstration").eq(1).find(".AP-img-tracking-square");
	var mirrorSq = grid[9][0];
	if (mirrorSq.state === "depo") {
		APDidx2 = 0;
	}
	if (APDidx2 >= APDemonstrationSquareCoords.length) {
		APDidx2 = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx2][0]-sq[0].offsetWidth/2)*$(".AP-img")[1].offsetWidth/500-2}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx2][1]-sq[0].offsetHeight/2)*$(".AP-img")[1].offsetHeight/298.33-2}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx2++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));

	var sq = $(".APDemonstration").last().find(".AP-img-tracking-square");
	var mirrorSq = grid[10][0];
	if (mirrorSq.state === "depo") {
		APDidx3 = 0;
	}
	if (APDidx3 >= APDemonstrationSquareCoords.length) {
		APDidx3 = APDemonstrationSquareCoords.length-1;
	}

	var left = `${(APDemonstrationSquareCoords[APDidx3][0]-sq[0].offsetWidth/2)*$(".AP-img")[1].offsetWidth/500-2}px`;
	var top = `${(APDemonstrationSquareCoords[APDidx3][1]-sq[0].offsetHeight/2)*$(".AP-img")[1].offsetHeight/298-2}px`;
	sq.css("top", top);
	sq.css("left", left);

	APDidx3++;
	sq.css("backgroundColor", decimalToRGB(mirrorSq.sprites.square.tint));
}

function resetPageSpecifics() {
	// Info Div changes
	$(".info").empty();

	// Change next and prev button links
	$(".reset-page-specifics-page").off("click");
	$(".info-footer-button").css("visibility", "visible");
	$(".info-footer-button").off("click");

	// Grid section changes
	$(".fps-slider").val(30);
	$(".fps-slider").trigger("input");
	$(".canvas-parent canvas").css("borderRight", "1px solid #444");
	$(".canvas-parent canvas").css("borderBottom", "1px solid #444");

	// Grid changes
	isPlaying = true;

	// Outside-of-canvas div changes
	$(".outside-of-canvas").empty();

	// Tools section changes
	$(".tools-section *").css("visibility", "");
	$(".tools-section *").css("display", "");

	// Extra changes with each frame - starts off as none
	pageSpecificChangesWithEachFrame = undefined;

}

function pageSpecifics() {
	resetPageSpecifics();

	// Update related pages section
	$(".related-pages .page-list").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/relatedPages.html`,
	    async: false,
	    success: function(data){ 
			$(".related-pages .page-list").append(data);
	    }
	});

	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/1.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);	
	    }
	});
	$(".square-as-div").css("backgroundColor", function(){
		return decimalToRGB(grid.stateColorMapping[$(this).data("state")]);
	});

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics);
	
	$(".info-footer-previous").css("visibility", "hidden");
	$(".info-footer-next").on("click", pageSpecifics2);

	$(".info-section-footer .page-num").text("Page 1");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/grid.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});	

	// Outside-of-canvas div changes
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
		"height": "298.33px",
		"display": "block",
		"position": "relative",
	})

	APDemonstration.find(".AP-img-tracking-square").css({
		"width": "15px",
		"height": "15px",
		"backgroundColor": "white",
		"border": "1px solid black",
		"position": "absolute",
	})

	$(".outside-of-canvas").append(APDemonstration);
	$(".APDemonstration").css("margin-top", "20px");

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
	APDidx2 = APDemonstrationSquareCoords.length-1;
	APDidx3 = APDemonstrationSquareCoords.length-1;

	// Set changes with each frame function
	pageSpecificChangesWithEachFrame = pageSpecificChangesWithEachFrame1;
	pageSpecificChangesWithEachFrame1();

	// Set window highlight event listeners
	setHighlightOnWindowEventListeners();
}

// function pageSpecifics2() {
// 	resetPageSpecifics();

// 	// Info Div changes
// 	$.ajax({
// 	    url: `/static/pages/${page["serverName"]}/pageSpecifics/2.html`,
// 	    async: false,
// 	    success: function(data){ 
// 			$(".info").append(data);
// 	    }
// 	});

// 	// Change next and prev button links
// 	$(".reset-page-specifics-page").on("click", pageSpecifics2);
	
// 	$(".info-footer-previous").on("click", pageSpecifics);
// 	$(".info-footer-next").on("click", pageSpecifics3);

// 	$(".info-section-footer .page-num").text("Page 2");

// 	// Grid changes
// 	$.ajax({
// 	    url: `/static/pages/${page["serverName"]}/grid.txt`,
// 	    async: false,
// 	    success: function(data){ 
// 			grid.loadGrid(data);
			// grid.masterFrameCount = 0;
			// $(".master-frame").text(grid.masterFrameCount);
// 	    }
// 	});

// 	// Outside-of-canvas div changes
// 	var APDemonstration = $(`
// 		<div class="APDemonstration">
// 			<img src="/static/images/ventricular_AP.png" class="AP-img">
// 			<div class="AP-img-tracking-square">
// 		</div>
// 	`)
// 	APDemonstration.css({
// 		"position": "relative",
// 		"margin": "auto",
// 		"width": "500px",
// 	})
// 	APDemonstration.find(".AP-img").css({
// 		"width": "500px",
// 		"height": "298.33px",
// 		"display": "block",
// 		"position": "relative",
// 	})

// 	APDemonstration.find(".AP-img-tracking-square").css({
// 		"width": "15px",
// 		"height": "15px",
// 		"backgroundColor": "white",
// 		"border": "1px solid black",
// 		"position": "absolute",
// 	})

// 	$(".outside-of-canvas").append(APDemonstration);
// 	$(".APDemonstration").css("margin-top", "20px");

// 	// Related to changes with each frame
// 	APDemonstrationSquareCoords = [
// 		[120, 174],
// 		[126, 33],
// 		[131, 48],
// 		[141, 54],
// 		[150, 54],
// 		[162, 54],
// 		[167, 54],
// 		[178, 54],
// 		[189, 54],
// 		[198, 54],
// 		[204, 54],
// 		[216, 54],
// 		[229, 54],
// 		[245, 54],
// 		[260, 54],
// 		[276, 54],
// 		[294, 54],
// 		[308, 54],
// 		[318, 71],
// 		[333, 104],
// 		[342, 134],
// 		[356, 180],
// 		[365, 214],
// 		[377, 254],
// 		[389, 288],
// 		[423, 290],
// 		[458, 290],
// 		[485, 290],
// 		[21, 287],
// 		[40, 287],
// 		[63, 287],
// 		[88, 287],
// 		[111, 287]
// 	]
// 	APDidx = APDemonstrationSquareCoords.length-1;
// 	APDidx2 = APDemonstrationSquareCoords.length-1;
// 	APDidx3 = APDemonstrationSquareCoords.length-1;

// 	// Set changes with each frame function
// 	pageSpecificChangesWithEachFrame = pageSpecificChangesWithEachFrame1;
// 	pageSpecificChangesWithEachFrame();

// 	// Set window highlight event listeners
// 	setHighlightOnWindowEventListeners();
// }

function pageSpecifics2() {
	pageSpecifics();
	
	$(".info").empty();
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/2.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").off("click");
	$(".reset-page-specifics-page").on("click", pageSpecifics2);
	
	$(".info-footer-button").off("click");
	$(".info-footer-button").css("visibility", "visible");
	$(".info-footer-previous").on("click", pageSpecifics);
	$(".info-footer-next").on("click", pageSpecifics3);

	$(".info-section-footer .page-num").text("Page 2");

	setHighlightOnWindowEventListeners();
}

function pageSpecifics3() {
	resetPageSpecifics();

	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/3.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics3);

	$(".info-footer-previous").on("click", pageSpecifics2);
	$(".info-footer-next").on("click", pageSpecifics4);

	$(".info-section-footer .page-num").text("Page 3");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/grid3.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});
	isPlaying = false;

	// Outside-of-canvas div changes
	$(".outside-of-canvas").append($("<div></div>").attr({
		"class": "APDemonstrationsWrapper",
	}))
	function addAPDemonstration(alignSelf) {
		var APDemonstration = $(`
			<div class="APDemonstration">
				<img src="/static/images/ventricular_AP.png" class="AP-img">
				<div class="AP-img-tracking-square">
			</div>
		`)
		APDemonstration.css({
			"position": "relative",
			"width": "150px",
			"alignSelf": alignSelf,
		})
		APDemonstration.find(".AP-img").css({
			"width": "150px",
			"height": "89.5px",
			"display": "block",
			"position": "relative",
		})

		APDemonstration.find(".AP-img-tracking-square").css({
			"width": "5px",
			"height": "5px",
			"backgroundColor": "white",
			"border": "1px solid black",
			"position": "absolute",
		})

		$(".APDemonstrationsWrapper").append(APDemonstration);
	}
	addAPDemonstration("flex-start");
	addAPDemonstration("center");
	addAPDemonstration("flex-end");


	APDemonstrationsHeight = 200;
	$(".APDemonstrationsWrapper").css({
		"display": "flex",
		"justify-content": "space-around",
		"height": APDemonstrationsHeight,
	})

	$(".APDemonstration").css("margin-top", "50px");

		// Add lines from AP image to mirror squares
	svgString = `
		<svg style="
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: ${$(".canvas")[0].offsetWidth}px;
		    height: ${APDemonstrationsHeight}px;
		">
	`

	coordsForLines = [
		[37, 96-50, 230, 0],
		[184, 117, 251, 0],
		[363, 142, 270, 0],
		[489, 120, 289, 0],
	]
	for (let line of coordsForLines) {
		svgString += `<line x1="${line[0]}" y1="${line[1]}" x2="${line[2]}" y2="${line[3]}" style="stroke:black; stroke-width:2; stroke-dasharray: 10,5" />`		
	}
	svgString += "</svg>"
	$(".outside-of-canvas").prepend($(svgString));



	pageSpecificChangesWithEachFrame = pageSpecificChangesWithEachFrame2;
	pageSpecificChangesWithEachFrame2();

	setHighlightOnWindowEventListeners();
}

function pageSpecifics4() {
	resetPageSpecifics();
	
	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/4.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics4);

	
	$(".info-footer-previous").on("click", pageSpecifics3);
	$(".info-footer-next").on("click", pageSpecifics5);

	$(".info-section-footer .page-num").text("Page 4");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/grid4.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});

	// Tools section changes
	$(".tools-box").css("visibility", "hidden");
	$("#state-box").css("visibility", "");
	$("#condVel-box").css("visibility", "");
	
		// Start off with tools section closed
	var sidebar = $(".tools-section .sidebar");
	if (sidebar.css("transform").split(", ")[4] === "0") {
		$(".tools-section .expand-or-collapse-arrow").click();
	}

	setHighlightOnWindowEventListeners();
}

function pageSpecifics5() {
	resetPageSpecifics();

	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/5.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics5);

	$(".info-footer-previous").on("click", pageSpecifics4);
	$(".info-footer-next").on("click", pageSpecifics6);

	$(".info-section-footer .page-num").text("Page 5");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/grid5.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});

	// Tools section changes
	$(".tools-box").css("visibility", "hidden");
	$("#state-box").css("visibility", "");
	$("#condVel-box").css("visibility", "");
	$("#refracLength-box").css("visibility", "");

	$("#refracLength-box>.container>*").eq(1).css("display", "none");
	$("#refracLength-box>.container>*").eq(2).css("display", "none");
	
		// Start with tools section open
	var sidebar = $(".tools-section .sidebar");
	if (sidebar.css("transform").split(", ")[4].includes("330")) {
		$(".tools-section .expand-or-collapse-arrow").click();
	}

	setHighlightOnWindowEventListeners();

}

function pageSpecifics6() {
	resetPageSpecifics();

	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/6.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics6);

	$(".info-footer-previous").on("click", pageSpecifics5);
	$(".info-footer-next").on("click", pageSpecifics7);

	$(".info-section-footer .page-num").text("Page 6");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/grid6.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});

	// Tools section changes
	$(".tools-box").css("visibility", "hidden");
	$("#state-box").css("visibility", "");
	$("#condVel-box").css("visibility", "");
	$("#refracLength-box").css("visibility", "");
	
		// Start with tools section open
	var sidebar = $(".tools-section .sidebar");
	if (sidebar.css("transform").split(", ")[4].includes("330")) {
		$(".tools-section .expand-or-collapse-arrow").click();
	}

	setHighlightOnWindowEventListeners();

}

function pageSpecifics7() {
	resetPageSpecifics();

	// Info Div changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/7.html`,
	    async: false,
	    success: function(data){ 
			$(".info").append(data);
	    }
	});	

	// Change next and prev button links
	$(".reset-page-specifics-page").on("click", pageSpecifics7);

	$(".info-footer-previous").on("click", pageSpecifics6);
	$(".info-footer-next").on("click", pageSpecifics8);

	$(".info-section-footer .page-num").text("Page 7");

	// Grid changes
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/pageSpecifics/grid7.txt`,
	    async: false,
	    success: function(data){ 
			grid.loadGrid(data);
			grid.masterFrameCount = 0;
			$(".master-frame").text(grid.masterFrameCount);
	    }
	});

	// Tools section changes
	$(".tools-box").css("visibility", "hidden");
	$("#state-box").css("visibility", "");
	$("#condVel-box").css("visibility", "");
	$("#refracLength-box").css("visibility", "");
	$("#pacing-box").css("visibility", "");
	$("#square-inspector-toggle-box").css("visibility", "");
	
		// Start with tools section open
	var sidebar = $(".tools-section .sidebar");
	if (sidebar.css("transform").split(", ")[4].includes("330")) {
		$(".tools-section .expand-or-collapse-arrow").click();
	}

	setHighlightOnWindowEventListeners();
}

function pageSpecifics8() {

}