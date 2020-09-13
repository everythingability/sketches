var color1 = "#FF0038" //red 
var color2 = "#FF8CE6"//"#FF53D7"//"#FF66FE" //"#FF00E9" //pink
var color3 = "#5800B6"//"#6400ED" //"#C400FF" //purlple
var color4 = "#0069FF" //blue
var color5 ="#F00"
var color6 ="#FF009E"
var rot = 0
var strokeW = 4

var canvas
function setup() {
  pixelDensity(4)
  var w = 1400
  var h = w /1.414 //The proportion of A4
  canvas = createCanvas(w, h);
  canvas.mouseMoved(doPaint)

  background("#0069FF"); //blue
  stroke(color1) //crimsonish
  fill(color1);
  strokeWeight(strokeW) //the line thickness
  strokeCap(ROUND); //how the line ends
  strokeJoin(ROUND); //how it's connected

  angleMode(DEGREES)
}

function doPaint(){
  var d = strokeW/2
  if (mouseIsPressed){
    strokeWeight(strokeW) //the line thickness

    stroke(color1) //crimsonish
    line(pmouseX, pmouseY, mouseX, mouseY)

    stroke(color5)
    var p = pointToRotatedPoint(pmouseX, pmouseY, d, rot)
    var m = pointToRotatedPoint(mouseX, mouseY, d, rot)
    line(mouseX+m.x, mouseY+m.y, pmouseX+p.x, pmouseY+p.y)

    var p = pointToRotatedPoint(pmouseX, pmouseY, d, rot+45)
    var m = pointToRotatedPoint(mouseX, mouseY, d, rot)
    line(mouseX+m.x, mouseY+m.y, pmouseX+p.x, pmouseY+p.y)
    

    stroke(color6)
    var p = pointToRotatedPoint(pmouseX, pmouseY, d, rot+180)
    var m = pointToRotatedPoint(mouseX, mouseY, d, rot+180)
    line(mouseX+m.x, mouseY+m.y, pmouseX+p.x, pmouseY+p.y)

    var p = pointToRotatedPoint(pmouseX, pmouseY, d, rot+45+180)
    var m = pointToRotatedPoint(mouseX, mouseY, d, rot+180)
    line(mouseX+m.x, mouseY+m.y, pmouseX+p.x, pmouseY+p.y)
    
     stroke(color1) //crimsonish
     line(mouseX, mouseY, pmouseX, pmouseY)
     line(pmouseX, pmouseY, mouseX, mouseY)
     fill(color1)
     //fill("yellow")
     noStroke()
     ellipse(mouseX, mouseY, strokeW*2, strokeW*2 )
     
  }
}
function draw() {
  rot +=3.9 % 360
 
}

function keyPressed(){
  if (key == 's'){
    var answer = prompt("Save as", "Red-blue.jpg");

   if (answer != null) {
      saveCanvas(answer)
    }

  }else if (key =='c'){
    background("#0069FF"); //blue
  }else if (key =='='){
    strokeW ++
    print(strokeW)
  }else if (key =='-'){
    strokeW --
    if (strokeW < 1) strokeW ==1

    print(strokeW)
  }
}

///////////
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