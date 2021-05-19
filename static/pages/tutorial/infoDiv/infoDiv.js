function infoDiv() {
	infoDiv = $("<div></div>").attr({"class": "info"});
	$.ajax({
	    url: `/static/pages/${page["serverName"]}/infoDiv/infoDiv.html`,
	    async: false,
	    success: function(data){ 
	    	$(infoDiv).html(data);
	    }
	});
	$(".page-specifics").append(infoDiv);
}