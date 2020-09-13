// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
var currentDragIndex = null
class Draggable {
  constructor(i, x, y) {

    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?

    this.index = i
    this.x = x;
    this.y = y;
    // Dimensions
    this.w = 40;
    this.h = 40;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      draggables[this.index].rollover = true;
      
    } else {
      draggables[this.index].rollover = false;
    }
    
    
    
    

  }

  update() {

    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      draggables[this.index] = this
    }
    

  }

  show() {
    //translate(-width/2, -height/2)
    stroke(1);
    strokeWeight(0)
    // Different fill based on state
    
    if (this.dragging) {
      fill("black");
    } else if (this.rollover) {
      fill("orange");
    } else {
      fill("cyan");
    }
    
    //print(this.index, this.x, this.y)
    ellipse(this.x, this.y, this.w, this.h)

  }

  pressed() {
    print("pressed")
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      currentDragIndex = this.index
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      draggables[this.index] = this
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
    draggables[currentDragIndex].dragging = false 
    currentDragIndex = null
  }
}