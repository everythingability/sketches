var img;
//p5.disableFriendlyErrors = true;

const maxXChange = 125;
const maxYChange = 5;
const yNoiseChange = 0.01;
const timeNoiseChange = 0.013;

var inverted = false;

function preload() {
	img = loadImage("female_cow.jpg");
}


function setup() {
	createCanvas(constrain(img.width - maxXChange * 2, 500, windowWidth), constrain(img.height - maxYChange * 2, 100, windowHeight));
	background(255);
	image(img, -maxXChange, -maxYChange);
	for (let i = 0; i < 100; i++) {
		drawStreak()
	}
}

function draw() {
	for (let i = 0; i < img.height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak()
	}
}

function drawStreak() {
	let y = floor(random(height));
	let h = floor(random(20, 30)); //floor(random(1, 100));
	let xChange = floor(map(noise(y * yNoiseChange, (mouseY * 0.3 + frameCount) * timeNoiseChange), 0.06, 0.94, -maxXChange, maxXChange)); //floor(random(-maxXChange, maxXChange));
	let yChange = floor(xChange * (maxYChange / maxXChange) * random() > 0.1 ? -1 : 1);

	if (random() < dist(pmouseX, pmouseY, mouseX, mouseY) / width * 0.3 + 0.0015) filter(POSTERIZE, floor(random(2, 6)));
	if (mouseIsPressed && abs(mouseY - y) < 60) {
		if (!inverted) filter(INVERT);
		inverted = true;
	} else {
		if (inverted) filter(INVERT);
		inverted = false
	}
	
	//if(random()<0.03)tint(random(255), random(255), random(255));
	
	//copy(img, 0, y, img.width, h, xChange - maxXChange, -maxYChange + y + yChange, img.width, h);
	image(img, xChange - maxXChange, -maxYChange + y + yChange, img.width, h, 0, y, img.width, h);
}

function keyPressed() {
	if (key == 's') save();
	if (key == 'r') console.log(frameRate());
}