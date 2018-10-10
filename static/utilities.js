function randFromArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function between(target, min, max) {
	if (min <= target && max >= target) {
		return true;
	} else {
		return false;
	}
}