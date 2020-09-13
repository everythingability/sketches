/*
Tom Smith
https://everythingability.com/
Iliterate buffon: https://www.rev.com/blog/transcripts/donald-trump-voting-remarks-in-nc-transcript-september-2

*/


var font
var lines = []
var lineNo = 0
var theLine = ""
var theSeconds = 0.2
var tSize = 18
var w
var h

function preload() {
  font = loadFont("Franklin Gothic Book.ttf")
  lines = loadStrings("trumpscripts.txt")
}

function nextLine() {
  if (lineNo == lines.length) {
    theLine = lines[lines.length-1]
    //tSize = tSize - 0.1 // haha! the text breaks at different points
    
  } else {
    
    theLine = lines[lineNo]
    tSize = constrain(fitTextToRect(theLine, w, h), 18, 600)
    lineNo++
  }

}

function setup() {
  var canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent("#child")
  
  w = width-10
  h = height-10
  smooth()
  textFont(font)
  theLine = lines[0]
  strokeWeight(10)
  setInterval(nextLine, theSeconds * 1000)

  tSize = constrain(fitTextToRect(theLine, w, h), 18, 600)
}

function draw() {
  background(0);
  fill(220)
  try{
      push()
          noStroke()
          textAlign(CENTER, CENTER)
          textSize(tSize)
          textLeading(textLeading() * 0.7)//squish it a bit, looks nicer
          translate(10, -10)
          text(theLine, 0, 0, w, h)
      pop()
  }catch(e){
    
  }

}


//Do all of this in its own buffer perhaps, and look for whiite pixels popping out the bottom?
function fitTextToRect(theText, theWidth, theHeight) {
  // First pass

  textSize(18) //got to start somewhere
  tSize = textSize()
  try{
  theText = theText.toString()
  if (theText.length > 0) {
    
    var theArea = int(theWidth * theHeight) //this is the area of the Rect
    var multiplier = 0.01 //this is by how much we want to grow the textSize until its too big
    var withinReason = theArea * 0.3 //this is how much we reduce the are because of line breaks etc
    //how are 0.01 and 0.3 linked?

    var thisArea = 0 // start with nothing and grow it until it's too big
    while (thisArea <= withinReason) {
      textSize(tSize)
      let bbox = font.textBounds(theText, 0, 0, tSize);
      thisArea = int(bbox.w * bbox.h)
      tSize = textSize() + multiplier
    }
    print("whoo hoo!", thisArea, withinReason, int(tSize), theLine)
  } else {
    return "Error"
  }
  }catch(e){
    print(e)
    return tSize
    
  }
  return tSize

}