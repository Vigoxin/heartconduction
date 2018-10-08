function randFromArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function between(target, min, max) {
	if (min <= target && max >= target) {
		return true;
	} else {
		return false;
	}
}