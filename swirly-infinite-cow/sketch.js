// Sketch: Glitchy Stairs
// Author: Pavel Kuprin
// Photo: https://unsplash.com/photos/YfCVCPMNd38

let slices = [];
let angle = 0;
let stairs;

function preload() {
  stairs = loadImage('cow.jpg');
}

function setup() {
  createCanvas(stairs.height, stairs.height);
  imageMode(CENTER);

  for (let i = 960; i > 30; i *= 0.67) {
    let mask = createGraphics(960, 960);
    mask.ellipse(960 / 2, 960 / 2, i, i);

    let buffer = stairs.get();
    buffer.mask(mask);

    slices.push(buffer);
  }
}

function draw() {
  translate(width / 2, height / 2);
	
  let time = constrain(mouseX / width, 0, 1);
  let targetAngle = time * TWO_PI;
	angle += (targetAngle - angle) * 0.05;
	
	let delta = abs(targetAngle - angle) * 0.2;
	scale(1 + delta);

  for (let slice of slices) {
    rotate(angle);
    image(slice, 0, 0);
  }
}

function mousePressed(){
  saveCanvas("swirly_" + int(random(0,100))+ ".jpg")
}