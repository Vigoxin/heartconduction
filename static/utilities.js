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

function isCyclic (obj) {
  var seenObjects = [];

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          console.log(obj, 'cycle at ' + key);
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}