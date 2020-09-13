var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var dragX, dragY, dragW, dragH;          // Location and size
var dragLat, dragLng
var offsetX, offsetY;    // Mouseclick offset

function setupDrag(){
    // Starting location
  dragX = 100;
  dragY = 100;
  // Dimensions
  dragW = 50;
  dragH = 50;

  dragLng = map(dragX, 0,width,  mostLeft, mostRight)
  dragLat = map(dragY,  0, height,mostTop, mostBottom)


}

function drawDrag(){
  // Is mouse over object
  if (mouseX > dragX && mouseX < dragX + dragW && mouseY > dragY && mouseY < dragY + dragH) {
    rollover = true;
  }
  else {
    rollover = false;
  }

  // Adjust location if being dragged
  if (dragging) {
    dragX = mouseX + offsetX;
    dragY = mouseY + offsetY;
  }

  stroke(0);
  // Different fill based on state
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill("yellow");
  } else {
    fill(175, 200);
  }
  dragLat = map(dragX, 0, height, mostTop, mostBottom)
  dragLng = map(dragY, width,0,  mostLeft, mostRight)
  ellipse(dragX, dragY, dragW, dragH);
  textSize(18)
  fill("red")
  text(dragLng , dragX-60, dragY)
  text(dragLat , dragX-60, dragY+dragH)
}

function mousePressed() {
  hasClicked = true
  // Did I click on the rectangle?
  if (mouseX > dragX && mouseX < dragX + dragW && mouseY > dragY && mouseY < dragY + dragH) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = dragX-mouseX;
    offsetY = dragY-mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
