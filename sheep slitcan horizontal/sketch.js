let video;
let lineCounter = 0;

function preload(){
   video = createVideo(['ComeOnSheep_small-1.mp4']);
  video.loop()
   
}


function setup() {
    //video.hide()
	
	video.size(600,400);
	createCanvas(video.width, video.height);
	
    
}

function draw() {
	copy(video,
         0,lineCounter,video.width,lineCounter+1,
         0,lineCounter,video.width,lineCounter+1);
	lineCounter+=1;
	lineCounter%=video.height;
	stroke(255,0,0)
	line(0,lineCounter+2, width, lineCounter+2);
}

function mousePressed(){
  saveCanvas("horizontal_sheep_" + int(random(0, 100)) + ".jpg")
}