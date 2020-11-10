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

Array.prototype.indexesOf = function(target) {
		let index = [];
		// For each element, index pushed in index[]
		this.forEach((el, i) => {
				if (el === target) index.push(i)
		});
		return index;
}

// Fixes the "Javascript modulo bug" where -a%b is -a when it should be b-a (e.g. -2 mod 10 should ideally be 8, but it's -2 in javascript)
function mod(n, m) {
	return ((n % m) + m) % m;
}


function makeTimeStripMenuTabDraggable(elmnt, timeStrip) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	$(elmnt).find(".drag-handle")[0].onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos2 = pos4 - e.clientY;
		pos4 = e.clientY;
		// set the element's new position:
		var newPosition = constrain(elmnt.offsetTop - pos2, 0, parseInt($('#timeStripsDiv canvas').css("height")) - timeStripPanel.cellHeight );
		elmnt.style.top = newPosition + "px";
		timeStrip.setY(newPosition);
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


function makeCaliperDraggable(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var toDrag = $(elmnt).find(".middle")[0];
	toDrag.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		cursorToCaliperLeft = e.clientX-toDrag.getBoundingClientRect().x;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		canvasWidth = parseInt($('#timeStripsDiv canvas').css("width"));
		canvasHeight = parseInt($('#timeStripsDiv canvas').css("height"));
		mouseXInCanvas = e.clientX-$('#timeStripsDiv canvas')[0].getBoundingClientRect().x;
		mouseYInCanvas = e.clientY-$('#timeStripsDiv canvas')[0].getBoundingClientRect().y;
		if (mouseXInCanvas < 0 || mouseYInCanvas < 0 
			|| mouseXInCanvas > canvasWidth || mouseYInCanvas > canvasHeight) {
			return;
		}

		// calculate the new cursor position:
		xDist = e.clientX - pos3; // the distance from previous x to current x
		yDist = e.clientY - pos4; // the distance from previous y to current y
		pos3 = e.clientX; // current x
		pos4 = e.clientY; // current y
		// set the element's new position:
									// elmnt.offsetTop/offsetLeft is basically the position relative to where top is 0
		xmin = 0;
		ymin = 0 + parseInt($(elmnt).find(".leftHandle").css('height'))/2;
		xmax = parseInt($('#timeStripsDiv').css('width')) - toDrag.offsetWidth;
		ymax = parseInt($('#timeStripsDiv').css('height')) - ymin;
		elmnt.style.top = constrain(elmnt.offsetTop + yDist, ymin, ymax) + "px";
		elmnt.style.left = constrain(elmnt.offsetLeft + xDist, xmin, xmax) + "px";
		// elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		// elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function makeCaliperRightHandleDraggable(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var middleWidth, prevMiddleWidth;
	var middle = $(elmnt).siblings(".middle")[0];
	var caliper = $(elmnt).parent()[0];
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		prevMiddleWidth = parseInt(middle.offsetWidth);
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		canvasWidth = parseInt($('#timeStripsDiv canvas').css("width"));
		mouseXInCanvas = e.clientX-$('#timeStripsDiv canvas')[0].getBoundingClientRect().x;
		if (mouseXInCanvas < 0 || mouseXInCanvas > canvasWidth) {
			return;
		}
		if (mouseXInCanvas < caliper.offsetLeft) {
			return;
		}

		// calculate the new cursor position:
		xDist = e.clientX - pos3; // the distance from previous x to current x
		widthChange = xDist;
		pos3 = e.clientX; // current x
		pos4 = e.clientY; // current y
		prevMiddleWidth = parseInt(middle.offsetWidth);
		// set the element's new position:
		xmin = 	0;
		xmax = widthMax = parseInt($('#timeStripsDiv').css('width')) - $(elmnt).parent()[0].offsetLeft;
		elmnt.style.left = constrain(elmnt.offsetLeft + xDist, xmin, xmax) + "px";
		
		// Change width of middle
		currentMiddleWidth = parseInt(middle.offsetWidth);
		middle.style.width = constrain(currentMiddleWidth + widthChange, 0, widthMax) + "px";


		// Change interval text
		$(elmnt).siblings('.text').find('.intervalNum').text(middle.offsetWidth/2);

		// Change interval text position
		$(elmnt).siblings('.text')[0].style.left = currentMiddleWidth / 2 + 'px';


	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function makeCaliperLeftHandleDraggable(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var toDrag = leftHandle = $(elmnt).find(".leftHandle")[0];
	var middle = $(elmnt).find(".middle")[0];
	var rightHandle = $(elmnt).find(".rightHandle")[0];
	toDrag.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		canvasWidth = parseInt($('#timeStripsDiv canvas').css("width"));
		mouseXInCanvas = e.clientX-$('#timeStripsDiv canvas')[0].getBoundingClientRect().x;
		if (mouseXInCanvas < 0 || mouseXInCanvas > canvasWidth) {
			return;
		}
		if (mouseXInCanvas > elmnt.offsetLeft + rightHandle.offsetLeft) {
			return;
		}

		// calculate the new cursor position:
		xDist = e.clientX - pos3; // the distance from previous x to current x
		pos3 = e.clientX; // current x
		
		// set whole caliper's new position:
									// elmnt.offsetTop/offsetLeft is basically the position relative to where top is 0
		prevLeft = elmnt.offsetLeft;
		xmin = 0;
		// xmax = parseInt($('#timeStripsDiv').css('width')) - toDrag.offsetWidth;
		xmax = elmnt.offsetLeft + rightHandle.offsetLeft;
		toMoveLeft = constrain(elmnt.offsetLeft + xDist, xmin, xmax);
		elmnt.style.left = toMoveLeft + "px";
		finalDiff = prevLeft - toMoveLeft;

		// Change right Handle left
		rightHandle.style.left = rightHandle.offsetLeft + finalDiff + "px";

		// Change middle width
		middle.style.width = middle.offsetWidth + finalDiff + "px";

		// Change interval text
		$(elmnt).find('.text').find('.intervalNum').text(middle.offsetWidth/2);

		// Change interval text position
		$(elmnt).find('.text')[0].style.left = middle.offsetWidth / 2 + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}