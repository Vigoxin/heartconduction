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

// Sidebar system
$(".expand-or-collapse-arrow").on("click", function() {
	var sidebar = $(this).parent().find(".sidebar");
	var arrowIcon = $(this).find("i");
	if (sidebar.css("width") === "0px") {
		sidebar.css("width", "100%");
		sidebar.css("visibility", "visible");
		$(this).css("transform", "translateX(300px)");
		arrowIcon.css("transform", "rotate(-180deg) translateY(2px)");
	} else {
		sidebar.css("width", "0");
		sidebar.css("visibility", "hidden");
		$(this).css("transform", "translateX(0px)")
		arrowIcon.css("transform", "rotate(0deg) translateY(-4px)");
	}

})