/*
 * slitscan with video file (4)
 * an informal catalogue of Slit-Scan Video Artworks and Research
 * http://www.flong.com/texts/lists/slit_scan
 */

/*
 * convert mov to mp4
 * you use HandBrake https://handbrake.fr (video transcoder)
 * convert mp4 to webm
 * 1) https://cloudconvert.com/mp4-to-webm
 * 2) https://www.aconvert.com/video/mp4-to-webm
 */

let cam
let pg
let w = 320
let h = 240
let running = true
let counter = 0
let isVideo = false;
function setup() {
  createCanvas(800,600);
  //ComeOnSheep_small.mp4
  //sheep_meh_small.mp4
	cam = createVideo(['ComeOnSheep_small.mp4'], videoLoadComplete);
  //cam.size(w, h);
	//cam.hide();
	pg = createGraphics(2,h)
  console.log("loading..")
  background(255)
}

function draw() {
  if(isVideo) {
	//pg.image(cam,0,0,2,h, mouseX,mouseY,2,h )
    pg.image(cam,0,0,2,h, width/2,0,2,h )
	if(running) {
		counter+=1
		counter %= width
	}
	image(pg,counter,0, 1, height)
  } else {
  	background(255)
  }
}

function videoLoadComplete() {
  isVideo = true;
  console.log("Video ok.")
  cam.play()
  cam.loop()	
  cam.hide()
}

function keyPressed() {
	if(key==' ') {
		running = !running;
	}
}
function mousePressed(){
  saveCanvas("simple_slitscan_" + int(random(0, 100)) + ".jog")
}

