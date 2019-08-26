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

function constrain(n, low2, high2) {
	var low = Math.min(low2, high2);
	var high = Math.max(low2, high2);
    return Math.max(Math.min(n, high), low);
}

function mapRange(n, inputStart, inputEnd, outputStart, outputEnd) {
  return (n - inputStart) / (inputEnd - inputStart) * (outputEnd - outputStart) + outputStart;

}