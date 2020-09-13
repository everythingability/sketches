function setupSocket(){
	// Start the socket connection
	/*
	socket = io.connect('http://localhost:3000')

	// Callback function
	socket.on('mouse', data => {
		buffer.stroke(data.theColor)
		buffer.strokeWeight(data.strokeWidth)
		buffer.line(data.x- xDiff, data.y, data.px- xDiff , data.py)
	})

	socket.on('tool', data => {
		buffer.stroke(data.theColor)
		buffer.strokeWeight(data.strokeWidth)
		buffer.line(data.x- xDiff, data.y, data.px- xDiff , data.py)
	})

	socket.on('bg', data => {
		print("socketBG:" + data.theBackgroundColor)
		backgroundBuffer.background( data.theBackgroundColor )
	})*/
}


function sendBG(c){
	const data = {	theBackgroundColor:c}
	//socket.emit('bg', data )
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
	const data = {
		x: x,
		y: y,
		px: pX,
		py: pY,
		theColor: theColor,
		strokeWidth: strokeWidth,
	}

	//socket.emit('mouse', data)
}
