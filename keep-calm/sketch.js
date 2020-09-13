
var slogans = []
var slen = 0
var sloganStr = ""
var n = 0
var r= 0
var currSlogan =""
var randSlogan =""
var font
var img
var tSize = 14
var buffer

function preload(){
    slogans = loadJSON( "https://script.google.com/macros/s/AKfycbz_5qI076pvA7px_-Dl03tLWF7uutjWM6Ipz9SvBehuZQFCtz8/exec")
    font = loadFont("Franklin Gothic Medium.ttf")
    img = loadImage("crown.png")
}
var canvas
function setup() {
  var canvas = createCanvas(900, (900*1.1414))
  canvas.parent("#child")
  buffer = createGraphics(canvas.width, canvas.height, SVG)

  smooth()

  //print(slogans)
  slen = slogans.length
  print(slen)
  currSlogan = slogans[0][0]
  textFont(font)
  buffer.textFont(font)

  textSize(60)
  buffer.textSize(60)

  textStyle(BOLD);
  buffer.textStyle(BOLD)

  textAlign( CENTER, CENTER)
  buffer.textAlign( CENTER, CENTER )
  imageMode(CENTER);
  buffer.imageMode(CENTER);



  setInterval(nextSlogan, 4000)
  r = int(random(0, 70))
}

function nextSlogan(){
  n = n+1 
   r = int(random(0, 52))
  if (n == slogans.length){
    n=0
  }

  
}

function draw() {
  
  background("red");
  buffer.background("red");

  fill("white")
  buffer.fill("white")


  textSize(50)
  buffer.textSize(50)

  currSlogan = slogans[n][0]
  //currSlogan = currSlogan.replace("\n", "\\n")
  //var tW = textWidth(currSlogan)/2
  image(img, (width/2)+15, 100, 120, 90)
  buffer.image(img, (width/2)+15, 100, 120, 90)
  
  //First line
  var rectWidth = 500
  var rectHeight = 200 
  var tSize = fitTextToRect(currSlogan, rectWidth, rectHeight)
  translate(0, 0)
  buffer.translate(0, 0)

  var x = width/4
  push()
  buffer.push()   
    
    var y = 200
    //print(x, y, rectWidth, rectHeight, tSize)
    //translate(0,0)
    translate(x, y)
    buffer.translate( x, y )
    
    textSize(tSize)
    buffer.textSize( tSize )
    textAlign(  CENTER, BOTTOM)
    buffer.textAlign(  CENTER, BOTTOM)

    text(currSlogan, 0, 0, rectWidth, rectHeight)
    buffer.text(currSlogan, 0, 0, rectWidth, rectHeight)
  pop()
  buffer.pop()

  translate(0,0)
  buffer.translate(0,0)

  // And
  push()
  buffer.push()
  
    fill('white')
    textSize(30)
    buffer.textSize(30)

    textAlign(  CENTER, CENTER)
    buffer.textAlign(  CENTER, CENTER)

    translate(x, 326)
    buffer.translate(x, 326)

    text("AND", 0, 0, rectWidth, rectHeight)
    buffer.text("AND", 0, 0, rectWidth, rectHeight)

  pop()
  buffer.pop()

  translate(0,0)
  buffer.translate(0,0)

  ///*Secondline
  randSlogan = slogans[r][0]
  textSize(50)
  buffer.textSize( 50 )

  var tSize = fitTextToRect(randSlogan, rectWidth, rectHeight)
  push()
  buffer.push()

    translate(x, 460)
    buffer.translate( x, 460)

    //print(randSlogan, x, 460, tSize)
    textAlign(  CENTER, TOP)
    buffer.textAlign( CENTER, TOP)

    textSize(tSize)
    buffer.textSize(tSize)

    text(randSlogan, 0 , 0, rectWidth, rectHeight*2)
    buffer.text(randSlogan, 0 , 0, rectWidth, rectHeight*2)

  pop()//*/
  buffer.pop()

  dullify()
  
}


  function keyTyped() {

   
    if (key === 's'){
      print("Saving as SVG")
      buffer.save("KEEP_CALM_" + int(random(0,1000)));
    }
}

function dullify(){
  translate(0,0)
   	for (var gradient3A = 0, gradient3B = 0; gradient3A < width; gradient3A ++, gradient3B ++) {
		stroke(gradient3B / width  * 255, 20);
		line(gradient3A, 0, gradient3A, height);
	}//*/
  filter(BLUR)
  filter(ERODE)
}

function windowResized() { 
  resizeCanvas(windowWidth, windowHeight); 
} 

//Do all of this in its own buffer?
function fitTextToRect(theText, theWidth, theHeight) {
  // First pass
  theText = theText.toString()
  lines = []
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



