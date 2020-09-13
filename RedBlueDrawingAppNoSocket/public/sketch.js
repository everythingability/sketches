let socket
let theColor
let theBackgroundColor = "#0069FF"
let strokeWidth = 4
let cv, buffer, backgroundBuffer

var w, h
var yDiff = 120
var xDiff = 240


function calculateCanvasSize(){
	h = window.innerHeight * 0.95 //scale it down a bit
	w = h * 1.414
}

var canvas
function setup() {
  changeColor('#ff0082')
	calculateCanvasSize()

	buffer = createGraphics(w,h) //The main drawing area?
	buffer.strokeCap(ROUND);
	buffer.strokeJoin(ROUND)

	backgroundBuffer = createGraphics(w,h) // The background colour?
	backgroundBuffer.background( theBackgroundColor )

	canvas = createCanvas(w + xDiff, h ) //The entire stage
	centerCanvas()
	canvas.background('lightgray')
	canvas.drop(gotFile);

	canvas.mousePressed(startPath)
	canvas.mouseReleased(endPath)
	
  setupInterface()
  noFill()
  setMidShade();
}



function draw(){
	background('lightgray')
	strokeWidth= rSlider.value();
	//ellipse(160, yDiff -30,strokeWidth,strokeWidth ) //this is how you "paint" draw...

   //image(backgroundBuffer, xDiff, 0)

   if (img == undefined){
		 //backgroundBuffer.clear()
		  // backgroundBuffer.background(theBackgroundColor) //
  }else{
  //  backgroundBuffer.image(img)

 }
   image(backgroundBuffer, xDiff, 0)
	 drawVectorDrawing() //writes to buffer
   image(buffer, xDiff, 0)

}

function changeColor(c){
	theColor = c
}

function setPaintColor() {
	changeColor(this.value())
}

function setMidShade() {
  // Finding a shade between the two
//  let commonShade = lerpColor(inp1.color(), inp2.color(), 0.5);
  //fill(commonShade);
//  rect(20, 20, 60, 60);
}

function setBgColor() {

	print("bg:"+ this.value() )
	theBackgroundColor = this.value()
	backgroundBuffer.background( theBackgroundColor )
	sendBG(theBackgroundColor)
}

function windowResized() {
	centerCanvas()
//	cv.resizeCanvas(windowWidth / 2, windowHeight / 2)
}

function centerCanvas() {
	const x = (windowWidth - width) / 2
	const y = (windowHeight - height) / 2
	canvas.position(x, y)
}


function mouseDragged() {
	// Draw
	buffer.stroke(theColor)
	buffer.strokeWeight(strokeWidth)
	buffer.line(mouseX- xDiff, mouseY, pmouseX-xDiff, pmouseY)

	// Send the mouse coordinates to the socket
	sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

function randomChoice(x, y){

    return Math.random() < 0.5 ? x : y;
}
