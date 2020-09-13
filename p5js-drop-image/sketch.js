/*
THIS IS JUST TO ILLUSTRATE A POTENTIAL BUG/FEATURE IN FILE.DROP

I added a the *fancy dancy* effects for fun :-)

So. Is it me? The p5js drop() example sort of lets an image be created (DOM-wise) and drawn to screen, but for some reason it isn't an image I can manipulate, or
grab bits from and use as fragments. 

I found, also, if I draw it to the canvas that "odd things happen", but if I
draw it to a buffer, then grab the bits from it, that I can do what I want.
It sort of makes it more "real". There's some really odd stuff going on here which if you're just sort of adding an image to a profile, then it all works OK, but if you want to do something more fun, it all breaks.

This sort of works, but it's a hell of a workaround.

INSTRUCTIONS:
Drop an image on the canvas, then another one. A very simple effect but fun.


*/

var canvas
var randX
var randY
var img; //my main image
var raw // the temp img
var otherImg // a grabbed fragment of img
var buffer //rather than drawing to canvas I draw here
var drawOnce = true // this is just so I can apply blends once, not over and over.


function setup() {
  canvas = createCanvas(600, 600);
  canvas.drop(gotFile);
  buffer = createGraphics(width, height);
  textSize(40)
  background(0)
  fill(255)
  text("Drop an image here, then another", width / 2 -120, height / 2, width/2)
}

function draw() {
  
  if (img) {
    if (drawOnce == true){
    blendMode(BLEND)
    tint(255, 150)
    image(img, 0, 0, width, height)
    //blendMode(DARKEST)
    for (i= 0; i <100; i+=10){
      image(otherImg, randX +i, randY +i)
    }
    print("Uploaded!")
      drawOnce = false
    }
  }
}



function gotFile(file) {
  print(file)
  raw = new Image();
  raw.src = file.data

  raw.onload = function() {
    img = createImage(raw.width, raw.height);
    print("huh?")
    blendMode(DARKEST)
    buffer.drawingContext.drawImage(raw, 0, 0, width, height); //what does this do? If I don't do it, stuff doesn't work?
    
    //NOTE! Without the following line img doesn't work? But does/can draw to screen...
    img = buffer.get() //does this *force* it to be p5.Image... dunno?
    //does drawing to canvas somehow make the img kosher?
    
    print("eh?")

    print(img, img.width, img.height) //this seems to be a good measure of whether
    //or not the image has loaded...
    
    //Grab a random part of the image and make a new image...
    var x = random(0, width / 2)
    var y = random(0, height / 2)
    randX = x
    randY = y
    print(randX, randY)
    var right = random(width / 2, width)
    var bottom = random(height / 2, height)

    otherImg = buffer.get(x, y, right - x, bottom - y)
    
    //blendMode(BLEND)
    //image(otherImg, 0, 0)
    print(otherImg)
    drawOnce = true
  }


}

function mousePressed(){
  saveCanvas("dropTestDummy_" + int(random(0, 100)) + ".jpg")
}