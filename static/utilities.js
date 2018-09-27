function pixel2grid(x) {
	// converts pixel coordinates to grid coordinates
	return Math.floor(x/cellSize);
}

function grid2pixel(x) {
	// converts grid coordinates to pixel coordinates
	return x * cellSize;
}

function randFromArray(items) {
	return items[Math.floor(Math.random()*items.length)];
}