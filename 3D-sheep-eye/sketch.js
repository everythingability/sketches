
var x ;
var y;
var size;
var img;
var font;


function preload(){
  var imgName ="double_offset.jpg";
  //"Another Sheep Filter -_ Offset.jpg"
img = loadImage(imgName);
//font = loadFont("Clockopia.ttf")
}
var gutter = 12;
function setup() {
   
x = windowWidth-gutter;
y = windowHeight-gutter;
  createCanvas(x, y, WEBGL);
  normalMaterial();
  ellipseMode(CENTER);
  //textFont(font)
  textSize(40);
  size = width * 0.55;
  colorMode(HSB,150);
  //emissiveMaterial(255, 0, 0);
}
function windowResized() {
  x = windowWidth-gutter;
  y = windowHeight-gutter;
  size = width * 0.55;
  resizeCanvas(x, y);
}

function mousePressed(){
  print(size); 
} 
function draw() {
  background(50);
  //orbitControl();

  //var zoom = map(mouseX, 0, width, 0.1, 4);
  
  push();
    texture(img);
    let rad = millis() / 10000;
 
    let ct = cos(rad);
    let st = sin(rad);
    // Matrix for rotation around the Y axis
    applyMatrix(  ct, 0.0,  st,  0.0,
               st, 1.0, 0.0,  0.0,
               -st, 0.0,  ct,  0.0,
               0.0, 0.0, 0.0,  1.0);
               
    sphere(size);
    //cylinder(size, height*2);

  pop();
  
} 