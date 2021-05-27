function highlightElementOnWindow(el) {
	elToHighlight = $(el);
	elWidth = elToHighlight[0].offsetWidth;
	elHeight = elToHighlight[0].offsetHeight;
	elTop = elToHighlight.offset().top;
	elLeft = elToHighlight.offset().left;
	overHang = 0.2;

	$(".highlight-on-window").css({
	    "width": elWidth+2*elWidth*overHang,
	    "height": elHeight+2*elWidth*overHang,
	    "top": elTop-(elWidth*overHang),
	    "left": elLeft-(elWidth*overHang)
	}).removeClass("dn");
}

function highlightGridSectionOnWindow(squares) {
	elToHighlight = $(".canvas-parent canvas");
    cellSize = grid.cellSize;
    elLeft = elToHighlight.offset().left+grid[squares[0][0]][squares[0][1]].x;
    // elLeft = elToHighlight.offset().left+1;
    elTop = elToHighlight.offset().top+grid[squares[0][0]][squares[0][1]].y;
    // elTop = elToHighlight.offset().top+1;
    elWidth = grid[squares[1][0]][squares[1][1]].x-grid[squares[0][0]][squares[0][1]].x+cellSize+1;
    elHeight = grid[squares[1][0]][squares[1][1]].y-grid[squares[0][0]][squares[0][1]].y+cellSize+1;

	$(".highlight-on-window").css({
	    "width": elWidth,
	    "height": elHeight,
	    "top": elTop,
	    "left": elLeft
	}).removeClass("dn");
}

function dehighlightElementOnWindow() {
	$(".highlight-on-window").addClass("dn");
}

function setHighlightOnWindowEventListeners() {
	$(".will-highlight-element-on-window").hover(function() {
	    highlightElementOnWindow($(this).data("elToHighlight"));
	}, function() {
		dehighlightElementOnWindow();
	})

	$(".will-highlight-grid-section-on-window").hover(function() {
	    highlightGridSectionOnWindow($(this).data("gridSectionToHighlight"));
	}, function() {
		dehighlightElementOnWindow();
	})
}