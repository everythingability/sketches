var shrinking_squares = []
var expanding_squares = []
var maskImage, maskImageBuffer
var shrinking_boolean = true
var expanding_boolean = true
var othershrinking_squares =[]
var otherBoolean = true
var buffer
var theShapeImage
var font
var tSize = 200
var color1 = "#FF0038"
var color2 = "#074CFF"
//var color1 = "black"
//var color2 = "white"


function preload(){
  font = loadFont("Franklin Gothic Heavy Italic.ttf")

}

function mousePressed() {
	//s1.dimension = 1;
  //redraw();
  // saveCanvas("RedBlue_" + int(random(0,100)) + ".png")
  let fs = fullscreen();
    fullscreen(!fs);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textFont(font)
  textSize(tSize)

  maskImageBuffer = createGraphics(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight);
  createMask()//makes the black and white theShapeImage

  //Create the squares
  createShrinkingSquare()
  createExpandingSquare()
  
  stroke(0,0,255)
  strokeWeight(50)

  noFill()
  setInterval(createShrinkingSquare, 500)
  setInterval(createExpandingSquare, 500)
}

function createShrinkingSquare(){
  s1 = new ShrinkingSquare();
  shrinking_squares.push(s1)

}
function createExpandingSquare(){
  s1 = new ExpandingSquare();
  expanding_squares.push(s1)
  
}

function draw() {
  background(color2)
  //background("yellow")

  for (s in shrinking_squares){
    var s1 = shrinking_squares[s]
    s1.shrink();
  	s1.display();
    if (s1.dimension < 10){
      shrinking_squares.splice(s, 1); 
    }
  }
  

  //do this to a buffer...
  
  for (e in expanding_squares){
    var s1 = expanding_squares[e]
    s1.grow();
  	s1.display();
    if (s1.dimension > width){
      expanding_squares.splice(e, 1); 
    }
  }
  theShapeImage = buffer.get()
  theShapeImage.mask(maskImage);
  //image(maskImage, 0, 0)
  image(theShapeImage, 0, 0,width, height )
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function ShrinkingSquare() {
  this.x = windowWidth/2;
  this.y = windowHeight/2;
  
  this.bool = !shrinking_boolean
  shrinking_boolean = !shrinking_boolean

  this.dimension = width;

  if (this.bool){
    this.colour = color1
  }else{
    this.colour = color2
  }

  this.grow = function() {
    this.dimension +=2;
  };
  this.shrink = function() {
    this.dimension -=2;
  };

  //Draw to stage
  this.display = function() {
  	stroke(this.colour);
  	strokeWeight(30);
  	rectMode(CENTER);
    noFill()
    rect(this.x, this.y, this.dimension, this.dimension);
    
  };
}

function ExpandingSquare() {
  this.x = windowWidth/2;
  this.y = windowHeight/2; 
  this.bool = !expanding_boolean
  expanding_boolean = !expanding_boolean //flip
  this.dimension = 1;

  if (this.bool){
    this.colour = color1
  }else{
    this.colour = color2
  }
  this.grow = function() {
    this.dimension +=2;
  };
  this.shrink = function() {
    this.dimension -=2;
  };

  this.display = function() {
  	buffer.stroke(this.colour);
  	buffer.strokeWeight(30);
  	buffer.rectMode(CENTER);
    buffer.noFill()
    buffer.rect(this.x, this.y, this.dimension, this.dimension);
    
  };
}



function createMask(){
  
  maskImageBuffer.clear()
  maskImageBuffer.fill("black")

  //draw a circle
  maskImageBuffer.ellipseMode(CENTER)
 // maskImageBuffer.ellipse(width/2, height/2, width/3, width/3)
  
  maskImageBuffer.textFont(font)
  maskImageBuffer.textSize(tSize)
  maskImageBuffer.textAlign(CENTER)
  var textString = "DANGER!"
  let bbox = font.textBounds(textString, tSize, 0, 0);
  let h = bbox.h/2
  maskImageBuffer.text(textString, width/2 , height/2+h)
  print(maskImageBuffer.textSize())
  maskImage = maskImageBuffer.get()
   
  //(imgClone = video.get() ).mask( maskImage) ; //copy a video frame
  //imgClone.fill("black")
  //imgClone.rect(0,0, width, height)
  //imgClone.filter(THRESHOLD)
 
}