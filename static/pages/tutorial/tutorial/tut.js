function tutorial() {
	infoDiv = $("<div></div>").attr({"class": "info"});
	$.ajax({
	    url: "/static/arrhythmias/normal_conduction/tutorial/tut.html",
	    async: false,
	    success: function(data){ 
	    	$(infoDiv).html(data);
	    }
	});
	$(".arrhythmia-specifics").append(infoDiv);
}	