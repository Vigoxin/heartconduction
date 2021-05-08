function setDOMeventListeners() {

	// Tab system
	$('.my-tab').on('click', function() {
	  var idx =  $('.my-tab').index($(this));
	  tabResponse(idx);
	})

	function tabResponse(idx) {
	  $('.panel').css('backgroundColor', '').css('display', 'none');
	  $('.my-tab').css('backgroundColor', '');
	  
	  $('.panel').eq(idx).css('display', 'block');
	  $('.panel').eq(idx).css('transition', 'all 0.3s ease-out');
	  $('.my-tab').eq(idx).css('backgroundColor', $('.panel').eq(idx).css('backgroundColor'))
	}

	tabResponse(0);

	console.log($(".expand-or-collapse-arrow").data("tooltip"));
	// Sidebar system
	$(".expand-or-collapse-arrow").on("click", function() {
		var sidebar = $(this).parent().find(".sidebar");
		var arrowIcon = $(this).find("i");

		if (sidebar.css("transform").split(", ")[4].includes("330")) {
			sidebar.css("transform", "translateX(0px)");
			if ($(this).parent().hasClass("squareInspector-section")) {
				squareInspectorSectionOpen = true;
			}
		} else if (sidebar.css("transform").split(", ")[4] === "0") {
			if ($(this).parent().hasClass("tools-section")) {
				sidebar.css("transform", "translateX(-330px)");
			} else if ($(this).parent().hasClass("squareInspector-section")) {
				squareInspectorSectionOpen = false;
				sidebar.css("transform", "translateX(330px)");
			}
		}

		if ($(this).css("transform").split(", ")[4] === "0") {
			$(this).css("transform", "translate(300px, 30px)");
		} else if ($(this).css("transform").split(", ")[4] === "300") {
			$(this).css("transform", "translate(0px, 30px)");
		}

		if (arrowIcon.hasClass("fa-angle-double-right")) {
			arrowIcon.removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
		} else if (arrowIcon.hasClass("fa-angle-double-left")) {
			arrowIcon.removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
		}

		if ($(this).data("tooltip").includes("Open")) {
			$(this).data("tooltip", $(this).data("tooltip").replace("Open", "Close"));
		} else if ($(this).data("tooltip").includes("Close")) {
			$(this).data("tooltip", $(this).data("tooltip").replace("Close", "Open"));
		}
	});

	squareInspectorSectionOpen = false;
	// $(".expand-or-collapse-arrow").first().click();
	// $(".expand-or-collapse-arrow").last().click();

}
