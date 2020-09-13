/*
I got a Austin Kleon book for Christmas....

a. Find a short text, maybe 4 or 5 sentences... and save to a text file.
b. Drag it onto the screen
c. Share this link with people https://editor.p5js.org/remarkability/full/5mDI9DHOH
d. Click the words to make them disappear (or reappear)
e. Type 's' to save a picture of your Blackout poem
f. File > Duplicate (after registering) to make your very own version

Tom Smith http://everythingability.com

*/

var wordRects = {}
var theText = ""
var font
var lines = []
var xOffset = 30
var yOffset
var hasDropped = false

var screenWidth, screenHeight


function fitTextToRect(theText, theWidth, theHeight) {
  // First pass
  runningY = 0
  var leading = textLeading()
  
  theText = theText.replace(/\s\s/g, ' ')
  var words = theText.split(" ")

  while (runningY < theHeight - (leading)) {
    //background("white")
    var asc = textAscent()
    leading = textLeading()

    var runningX = 0
    runningY = leading

    for (var n in words) {
      var word = words[n]
      var w = textWidth(word)

      if (w + runningX > theWidth) {
        runningX = 0 //move it back to the left
        runningY = runningY + leading //create a new line
      }

      var spaceWidth = textWidth(" ") / 2
      runningX = runningX + spaceWidth
      runningX = runningX + w

    }
    textSize(textSize() + 1)

  }
  var tSize = textSize()

  //So now we know the text size let's do it ALL AGAIN, slightly differently...
  var line = []
  var currWord = 0
  textSize(tSize)

  runningX = 0

  for (var n in words) {
    word = words[n]
    w = textWidth(word)
    if (w + runningX > theWidth) {
      //print(currWord, n)
      line = words.slice(currWord, Number(n))
      lines.push(line)
      currWord = Number(n)
      runningX = 0 //move it back to the left
      runningY = runningY + leading //create a new line
    }

    spaceWidth = textWidth(" ")

    runningX = runningX + w + spaceWidth / 2

  }

  //Don't forget the remainders
  line = words.slice(currWord, words.length)
  lines.push(line)
  //print(lines)



  return tSize
}

function stringLoaded(strArray) {
  theText = ""
  theText = strArray.join(" ")
}

function loadTheText() {
  loadStrings("theText.txt", stringLoaded)
}

function preload() {
  font = loadFont("Franklin Gothic Heavy Italic.ttf")
  //This only gets the first line...
  loadTheText()

}



function scaleText() {
  textSize(1) ///Needs a starting point
  textFont(font)

  var rectSize = window.innerHeight

  var tSize = fitTextToRect(theText, screenWidth, screenHeight)
  textAlign(CENTER, CENTER)

  textSize(tSize * 0.9) //NASTY HACK
  fill("yellow")

  //Now a THIRD time to calculate areas!
  var xOffset = 20
  fill("black")
  spaceWidth = textWidth(" ") / 2
  textAlign(LEFT)
  yOffset = textLeading()
  fill("black")
  for (l in lines) {
    var x = 0
    var line = lines[l]
    for (w in line) {
      var word = line[w]
      var y = textLeading() * Number(l)
      let bbox = font.textBounds(word, xOffset + x, yOffset + y, textSize());
      wordRects[l + "_" + w] = {
        name: word,
        bbox: bbox,
        display: true
      }
      x = x + textWidth(word) + spaceWidth
    }

  }
  textSize(textSize() * 0.8) //hack

}

function setup() {
  screenWidth = window.innerWidth
  screenHeight = window.innerHeight

  canvas = createCanvas(screenWidth, screenHeight);
  canvas.drop(gotFile);
  scaleText()
}



function draw() {
  background(30)
  textAlign(LEFT, CENTER)
  for (var n in wordRects) {
    var display = wordRects[n].display
    if (display == true) {
      var word = wordRects[n].name
      var x = wordRects[n].bbox.x
      var y = wordRects[n].bbox.y
      var w = wordRects[n].bbox.w
      var h = wordRects[n].bbox.h
      //fill(255,0, 0 , 50)
      //rect(x, y, w, h)
      fill("white")
      rect(x + xOffset - 5, y + textSize() - 15, w, h + 8) //hack
      fill("black")
      //print (word, x, y, w, h)
      text(word, x + xOffset - 4, y + textSize() - 5) //hack
    }

  }
  if (hasDropped == true){
  }else{
    
    fill("yellow")
    text( "Drop a text file here to make your own, type 's' to save",20, 20)
}}



function gotFile(file) {
  // If it's an image file
  if (file.type === 'text') {
    // Create an image DOM element but don't show it
    print(file)
    theText = file.data
    wordRects = {}
    lines = []
    scaleText()
    hasDropped = true
    
  } else {
    alert('Not a text file!');
  }
}

////////////////////////////////////////////////////

function mousePressed() {

  var mx = mouseX - xOffset
  var my = mouseY - 20 //hack
  print(mx, my)

  var b = 12
  for (var n in wordRects) {
    var word = wordRects[n].name
    var bbox = wordRects[n].bbox
    if (mx > bbox.x - b &
        mx < bbox.x + bbox.w + b &
        my > bbox.y - b &
        my < bbox.y + bbox.h + b) {
      
      print("Deleting: " + word)
      
      wordRects[n].display = !wordRects[n].display
    }
  }




}

function keyPressed() {
  if (key == 's') {
    var fname = ""
    for (var n in wordRects) {
      if (wordRects[n].display == true) {
        fname += wordRects[n].name + " "
      }
    }
    saveCanvas(fname + ".jpg")
  } else if (key == "r") {
    print("reloading")

    loadTheText()
    setup()
  }

}