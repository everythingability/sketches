var squares = []
var boolean1 = true
var otherSquares =[]
var otherBoolean = true

var s1;
function newSquare(){
   s1 = new Square();
  squares.push(s1)
  print(squares.length)
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  s1 = new Square();
  squares.push(s1)
  
  s2 = newSquare()
  otherSquares.push(s2)
  
  stroke(0,0,255)
  strokeWeight(50)
  noFill()
  setInterval(newSquare, 500)
}

function draw() {
  for (s in squares){
    var s1 = squares[s]
    s1.grow();
  	s1.display();
    if (s1.dimension > width){
      squares.splice(s, 1); 
    }
  }
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Square() {
  this.x = windowWidth/2;
  this.y = windowHeight/2;
  
  this.bool = !boolean1
  boolean1 = !boolean1
  this.dimension = 1;
  if (this.bool){
    this.colour = "#FF0038"
  }else{
    this.colour = "#074CFF"
  }
  this.grow = function() {
    this.dimension +=2;
  };
  this.shrink = function() {
    this.dimension -=2;
  };

  this.display = function() {
  	stroke(this.colour);
  	strokeWeight(30);
  	rectMode(CENTER);
    noFill()
    rect(this.x, this.y, this.dimension, this.dimension);
    
  };
}

function mousePressed() {
	//s1.dimension = 1;
	//redraw();
}

function createMask(){
 
  maskImage.beginShape();
      //poly[0] = createVector(keypoint2.position.x -20,keypoint6.position.y); 
     maskImage.clear()
     
  maskImage.endShape(CLOSE);
  maskImage.ellipseMode(CENTER)
  maskImage.ellipse(width/2, height/2, width/3, width/3)
     maskImage.textFont(font)
     maskImage.textSize(160)
     maskImage.textAlign(CENTER)
     //maskImage.text("Danger!", keypoint2.position.x +eyeD , keypoint6.position.y +eyeD * 1.5)
     
   
 (imgClone = video.get() ).mask( maskImage) ;
  
  //imgClone.fill("black")
  

  //imgClone.rect(0,0, width, height)
  //imgClone.filter(THRESHOLD)
  
}