// Daniel Shiffman
// https://thecodingtrain.com
// https://youtu.be/WCJM9WIoudI
// https://youtu.be/YqVbuMPIRwY
let video;

let x = 0;


var y = 0;

function preload(){
   video = createVideo(['ComeOnSheep_small.mp4']);
  video.hide(); // 
 
}


function setup() {
  createCanvas(800, 400);
  pixelDensity(1);
  
  video.size(320, 400);
  video.loop()
  background(51);
}

function draw() {
  video.loadPixels();
  let w = video.width;
  let h = height;
  copy(video, 
       //from 
       w/2, 0, 1, h,
       //to
       x, 0, 1, h);
  
    copy(video, 
       //from 
       w/2, 0, 1, h,
       //to
       width-x, 0, 1, h);
  
  x = x + 1;
  if (x > width) {
    x = 0;
  }
  
  tint(255, 5)
  image(video, 0, 0, width, height)
}

function mousePressed(){
  saveCanvas("Sheep_" + int(random(0,100)) + ".jpg")
}
