function tutorial() {
	infoDiv = $("<div></div>").attr({"class": "info"});
	$.ajax({
	    url: "/static/arrhythmias/normal_conduction/tutorial/tut.txt",
	    async: false,
	    success: function(data){ 
	    	$(infoDiv).text(data);
	    }
	});
	$(".arrhythmia-specifics").append(infoDiv);
}