let flip = 0;  // set flip = 1 before saving an image or thumbnail, then flip = 0.
let imgs = [];
let gra;
let lapse = 0;    // mouse timer

function preload(){
	const imgNum = 1;
	for(let i = 0; i < imgNum; i++){
		imgs[i] = loadImage("sheep.png");
	}
}

function setup() {
	createCanvas(1000, 640, WEBGL);
	imageMode(CENTER);
	
	//activate alpha blend
	var gl = this._renderer.GL; 
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	//gra
	gra = createGraphics(width, height);
  gra.noStroke();
  for (let i = 0; i < 30000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01)*width*0.002;
    gra.fill(255,2);
    gra.rect(x, y, s, s);
		gra.fill(90, 70, 10);
		gra.rect(0, 2*height/3, width, height);
  } 
	noLoop();
}

function draw() {
	if (flip == 1) scale(1, -1);
	background(100, 180, 220);
	//orbitControl();
	rotateX(-0.2);
	noStroke();
	const size = width;
	const maxHeight = -height;
	const noiseScale = 0.005;
	const noiseOff = random(1000);
	const step = 6;
	const imgRatio = step/imgs[0].width;
	for(let z = -size/2; z<size/2; z += step){
		for(let x = -size/2; x < size/2; x += step){
			let y = map((noise((x + noiseOff) * noiseScale, (z + noiseOff) * noiseScale) + noise((x + noiseOff) * noiseScale * 10,(z + noiseOff) * noiseScale * 10)*0.1),0,1.2,0,maxHeight) + height/2;
			let zOff = map(x,-size/2,size/2,0,step);
			push();
			translate(x,y,z + zOff);
			let ratio = imgRatio * random(2,4);
			let w = imgs[0].width * ratio;
			let h = imgs[0].height * ratio;
			image(random(imgs),0,-h/2,w,h);
			pop();
		}
		push();
		translate(random(100),random(100),z+step*0.1);
		tint(255);
		image(gra,0,0,width*1.2,height*1.2);
		pop();
	}
}

function mousePressed(){
  // prevents mouse press from registering twice
  if (millis() - lapse > 500){
    save('pix.jpg');
    lapse = millis();
  } 
} 