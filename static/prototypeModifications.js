Array.prototype.removeFromArray = function(target) {
	this.splice(this.indexOf(target), 1);
}

Array.prototype.removeArrayFromArray = function(target) {
	for (var i=0; i<this.length; i++) {
		if (arraysEqual(this[i], target)) {
			this.splice(i, 1);
		}
	}

	function arraysEqual(arr1, arr2) {
	    if(arr1.length !== arr2.length)
	        return false;
	    for(var i = arr1.length; i--;) {
	        if(arr1[i] !== arr2[i])
	            return false;
	    }

	    return true;
	}
}