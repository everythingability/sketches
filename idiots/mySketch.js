/* Thanks Reona, always an inspiration https://www.openprocessing.org/user/13276

PUTTING WORDS IN THEIR MOUTHS
Tom Smith https://www.instagram.com/everythingability/
*/

let faceapi;
let img;
let detections;
let mic, amplitude;

let isStarted = false;

let mouthX, mouthY, mouthW, mouthH = 60
let mouthOpenH;
let mouthOpenImage;

// 対象画像(ランダム3種)//"monalisa.jpg", "mucha.png",
const imageNames = ["Boris_Johnson.jpg",  "trump.jpg"];

const detection_options = {
	withLandmarks: true,
	withDescriptors: false,
}

function preload() {
	let targetImage = random(imageNames);
	img = loadImage(targetImage);
}



function setup() {
	let canvasH = windowHeight;
	let canvasW = img.width * canvasH / img.height;
	createCanvas(canvasW, canvasH);
	img.resize(width, height);
	
	textAlign(CENTER, CENTER);
	textSize(height * 0.05);
	strokeJoin(ROUND);
	
	//Add audio stuff
	mic = new p5.AudioIn();
    mic.start();
	amplitude = new p5.Amplitude();
  amplitude.setInput(mic);

	faceapi = ml5.faceApi(detection_options, modelReady);
}

function draw() {
	background(200);
	image(img, 0, 0);
	
	if (isStarted) {
		fill(0);
		noStroke();
		rect(mouthX, mouthY, mouthW * 0.95, mouthH * 0.99);
		
    var level = amplitude.getLevel();
		mouthOpenH = map(level, 0, 1, 0, mouthH);
		image(mouthOpenImage, mouthX - 0.5, mouthY + mouthOpenH * 2);
		
	} else {
		fill(0, 200);
		noStroke();
		rect(0, 0, width, height);
		fill(0, 255, 0);
		strokeWeight(2);
		stroke(0, 255, 0);
		textSize(32)
		text("Loading... ", width / 2, height / 2);
		textSize(18)
		text("then speak to animate", width / 2 , height / 2 + 100);
	}
}

function modelReady() {
	faceapi.detectSingle(img, gotResults)
}

function gotResults(err, result) {
	if (err) {
		// console.log(err)
		return
	}
	detections = result;

	background(255);
	image(img, 0, 0, width, height);

	const mouth = detections.parts.mouth;
	const nose = detections.parts.nose;

	mouthW = mouth[6]._x - mouth[0]._x;
	mouthH = (mouth[14]._y - nose[6]._y) * 2;

	mouthOpenImage = get(mouth[0]._x, mouth[0]._y, mouthW, mouthH);

	mouthX = mouth[0]._x;
	mouthY = mouth[0]._y;

	isStarted = true;
}