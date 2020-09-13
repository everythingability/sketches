var img
var fragments = []
var N = 2; //Number of recursive steps

function preload() {
  img = loadImage("sheep flock_27.jpg")
}

function setup() {
  createCanvas(img.width, img.height);
  //img.loadPixels()
  blendMode(BLEND)
  
   piet(0, 0, width, height, N) 
   for (f in fragments) {
    var fragment = fragments[f]
    tint(255, 100)
    image(fragment, random(width), random(height))
     
  }
}

function draw() {
 
}

function keyPressed(){
  setup()
}

function mousePressed(){
  saveCanvas("sheep_wat_" + int(random(0,1000)) + ".jpg")
}



