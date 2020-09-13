var elt;

function setup() {
  var cnv = createCanvas(windowWidth -120, 400);
  elt = document.getElementById('sketchdest');
  cnv.parent(elt);

  print("hello")
  print( elt.width )

  noStroke();
}

function draw() {
  background("#f1cd31");
  fill("black")
  ellipse(random(width), random(height), random(20, 30), random(20, 30))
}

function windowResized() {
  print( elt.width )
  resizeCanvas(windowWidth-120, 400);
}

function printSomething(){
  elt = document.getElementById('sketchdest')
  //var w = elt.attribute('width', "100%")
  console.log(elt)
  alert("hello there. " )
}

/* 
24th August blood
14th November clinic - 9am.
*/