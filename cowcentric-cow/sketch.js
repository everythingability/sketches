let renderer;
let ctx;
let canvas;
let img;
let centerX, centerY;

function preload() {
	img = loadImage("cow.jpg");
}

function setup() {
	renderer = createCanvas(img.height, img.height);
	ctx = renderer.drawingContext;
	background(255);
	
	centerX = width/2;
	centerY = height/2;
	
	canvas = createGraphics(width, height);
	canvas.noStroke();
	canvas.translate(centerX, centerY);
	canvas.scale(-1, 1);
	canvas.translate(-centerX, -centerY);
	canvas.image(img, 0, 0);
}

function draw() {
	let angle = mouseX/width*TWO_PI;
	
	
	
	let space = mouseY/height*30+15;
	const start = 100;
	let maskImage = createGraphics(width,height);
	maskImage.ellipse(centerX, centerY, start, start);
	maskImage.noFill();
	maskImage.strokeWeight(space);
	for(let i = start+space; i < width; i += space*4){
		maskImage.ellipse(centerX, centerY, i, i);
	}
	
	ctx.save();
	ctx.globalCompositeOperation="source-in";
	translate(width/2, height/2);
	rotate(angle);
	translate(-width/2, -height/2);
	image(maskImage, 0, 0);
	image(canvas, 0, 0);
	ctx.globalCompositeOperation="destination-atop";
	translate(width/2, height/2);
	rotate(-angle*2);
	translate(-width/2, -height/2);
	image(img, 0, 0);
	ctx.restore();
}

function ease(t) { return t*t*t*t*t*t*t }

function mousePressed(){
  saveCanvas("cowcentric_" + int(random(0,100))+ ".jpg")
}



