var canvas
var title = ""
var line1 = "Does this text"
var line2 = "make your eyes"

var color1 = "#FF0038" //red 
var color2 = "#FF8CE6"//"#FF53D7"//"#FF66FE" //"#FF00E9" //pink
var color3 = "#5800B6"//"#6400ED" //"#C400FF" //purlple
var color4 = "#0069FF" //blue
var colorArray1 = []
var colorArray2 = []
var font
var tSize = 100
var spaceSize = 8
var colorShift =6 //how many steps we need in the lerp

function preload() {
  //font = loadFont("Franklin Gothic Heavy Italic.ttf")
  //font = loadFont("NimbusSanL-Reg.otf")
  font= loadFont("NimbusSanL-Bol.otf")
}

function setup() {
  createCanvas(1200, 1000);
  colorArray1 = createColorArray(color2, color1, colorShift)
  colorArray2 = createColorArray(color1, color3, colorShift)
  angleMode(DEGREES)
  
  textFont(font)
  textSize(tSize)
  textAlign(LEFT)
  smooth()


  //noCanvas()
  let params = getURLParams(); //e.g Add params /index.html?line1=YOU%20ARE%20TOTALLY&line2=HOPELESS
  console.log(params)
  if (Object.keys(params).length > 0) { //There are some params

    //var div1 = select('#line1')
    //line1 = decodeURIComponent(params.line1)
    //div1.html(  line1 )

    //var div2 = select('#line2')
    //var line2 = decodeURIComponent(params.line2)
    //div2.html ( line2 )

    
  }
  title = line1 + " " + line2
  
  noStroke()
  noLoop()
}

function drawLine(theText, x, y, angle) {
  var positions = []
  var amount = 0.5
  var len = colorArray2.length
  var mul = len * amount
    //translate(x, y)
  
  var w = x
  var newX = x
  var strSoFar = ""
  var previousWidth = 0
  var xSoFar = 0 
  var spaceSoFar = 0
  
  for(var c = 0; c < theText.length; c++){//For each character
    var character= theText.charAt(c)
    var charWidth = textWidth(character)
    strSoFar += character
    for (i=0; i < len; i++){//do the repeated letters, ro
       fill(colorArray1[i])
       var end1 = pointToRotatedPoint(0, 0, len-i ,-angle-90)
       text(character, x+xSoFar+end1.x, y+end1.y)

       var end2 = pointToRotatedPoint(0, 0, len-i ,-angle+90)
       fill(colorArray2[len-i-1])
       text(character, x+xSoFar-end1.x, y-end1.y)   
    }
   
 
    //text( character, x+xSoFar-end1.x, y-end1.y)
    positions.push({character:character, x:x+xSoFar-end1.x, y:y-end1.y} )
    print(xSoFar, "xSoFar")
    angle += i * 5
    spaceSoFar += spaceSize
    xSoFar = textWidth(strSoFar) +spaceSoFar
  }
  
 return positions
  

}


function draw() {
  background(color4);
  var p1s = drawLine(line1, 50, 100, 45)
  var p2s = drawLine(line2, 50, 200 , -45)
  var p3s = drawLine("wobble all", 50, 300 , 45)
  var p4s = drawLine("over the place?", 50, 400 , -45)
  var p5s = drawLine("It does mine", 50, 520 , 45)
  var p4s = drawLine("FINALLY!!!", 50, 640 , -50)
  filter(BLUR, 3)
  fill(color1)
  //fill("yellow")

  //sharpeners, redraw the letters
  /*
  for (i=0; i<p1s.length; i++){
    var p = p1s[i]
    text(p.character, p.x, p.y)
  }
  
  for (i=0; i<p2s.length; i++){
    var p = ps[i]
    text(p.character, p.x, p.y)
  }*/
  
  
  
}

function mousePressed() {
  //Nothing here saveCanvas("slogan.jpg")
  saveCanvas(title + ".jpg")
  /*
 html2canvas(document.body).then(function(canvas) {
  //var elt = document.body.appendChild(canvas);
  saveCanvas(canvas, title + ".png")
});*/
}


function createColorArray(color1, color2, numColors) {
  var from = color(color1)
  var to = color(color2)
  var colors = []

  for (let i = 0; i < numColors; i++) {
    var incr = map(i, 0, numColors - 1, 0, 1)
    var c = lerpColor(from, to, incr)
    colors.push(c)
  }
  chunkWidth = int(width / colors.length)
  return colors
}



function colorToHex(c) {
  var r = red(c);
  var g = green(c);
  var b = blue(c);

  var hx = "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);

  return hx

}

function pointToRotatedPoint(x, y, len, rot){
   translate(x, y)
  
  var start = createVector(0,0)
  var end = createVector(0, len)
  
  
  end.rotate( -180+rot)
  /*print(start.x, start.y, end.x, end.y)
  
  fill("red")
  ellipse(start.x, start.y, 10, 10)
  stroke("cyan")
  line(start.x, start.y, end.x, end.y)*/
  resetMatrix()
  return end
  
}



/////////////////////
/*
var color1 = "#FF0038"
var color2 = "#FF00E9"
var chunkWidth








function draw() {  
  background(100, 90, 130);
  
  for (let i=0; i < numColors;i++) {
    var c = colors[i]
    print( colorToHex(c))
    fill(c)
    //print(i*chunkWidth, 0, chunkWidth, height)
    rect(i*chunkWidth, 0, chunkWidth, height);
    
  }
  

}



*/