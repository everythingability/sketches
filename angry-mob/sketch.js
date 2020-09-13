var boxSz = 1200;
var numSpheres = 1200;
var x = [];
var y = [];
var z = [];
var s = []
var r = []
var a = []

var t = 0.0;
let img;
let vid
let angle = 0;

function preload(){
  img = loadImage("gnash.png")
  vid =  createVideo(['gnash.mp4']);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();
  
}

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0);
  noStroke()

  var p = -200
  for (var i = 0; i < numSpheres; i++) {
    x[i] = random(-boxSz, boxSz);
    y[i] = p + random(-25, 0)
    z[i] = random(-boxSz, boxSz);
    s[i] = random(80, 100)
    a[i] =  int(map(z[i], -boxSz, boxSz , 255, 0))
     r[i] = random(-5, 5)
  }
  // println(x);
  // println(y);
  // println(z);
  rotateZ(150)
  angleMode(DEGREES)
  print(a)
}

function draw() {
  background('#FF0038');
  
  for (i = 0; i < numSpheres; i++) {
     x[i] =  x[i]  + random(-1, 1)
  }
  
  translate(0,0,-100);
   //blendMode(BLEND)
  
 texture(img);
   var rotateAmount = map(mouseY, 0, height, -40, -17)
  //print(rotateAmount)
       let h = map(sin(angle), -1, 1,  -40, -17); // 100 maxheight

 rotateX(h)
  for (var i = 0; i < numSpheres; i++) {
    push();
    
    //fill(0,0,0,255-a[i]); 
    
      //fill(255, a[i])
      translate(x[i], y[i], z[i]);
      rotateX(-rotateAmount)
      rotate(r[i])
      plane(s[i])
       //texture(vid);
    pop();
  }
 angle += 1
}

function mousePressed(){
  saveCanvas("ANGRY_" + floor(random(0,100)) +".jpg")
}