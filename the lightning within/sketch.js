
var maskImage
var imgClone

//var poly = []; //store the vertices for our polygon
let video;
let poseNet;
let poses = [];
var font
var sound1, sound2

function preload(){
  font = loadFont("FreeSansBold.otf")
  //https://freesound.org/people/LukeIRL/sounds/176021/
  sound1 = loadSound("26988__percy-duke__thunder (1).wav")
  sound2 = loadSound("26988__percy-duke__thunder (1).wav")
}

var canvas
function setup() {
  //canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(1280, 720);
  canvas.touchStarted( download)
  
  video = createCapture(VIDEO);
  video.size(width, height);
   textFont(font)

  maskImage = createGraphics(width, height);
  maskImage.fill("white");
   
  
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
  setupLightning()
  
  sound2.rate(0.5)
  sound2.loop()
  sound1.loop()
}

function modelReady() {
  //select('#status').html('Model Loaded');
}

function draw() {

  //background("black")

  badIsolation()
   video.mask( maskImage)
   // (imgClone = video.get() ).mask( maskImage) ;
  image(imgClone, 0, 0, width, height);  
  drawKeypoints();
  //drawSkeleton();
  //drawLightning()
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    //for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint1 = pose.keypoints[1];
      let keypoint2 = pose.keypoints[2];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint1.score > 0.01) {
        fill(255, 0, 0);
        noStroke();
        //ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
         drawLightning( createVector(keypoint1.position.x, keypoint1.position.y))
        drawLightning( createVector(keypoint2.position.x, keypoint2.position.y))

        textSize(30)
        //text(j, keypoint.position.x -6, keypoint.position.y -8)
      }
    //}
  }
}

function badIsolation(){
  stroke("yellow")
  strokeWeight(4)
  fill(50)
   for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
      let keypoint6 = pose.keypoints[6]
      let keypoint0 = pose.keypoints[0]
      let keypoint1 = pose.keypoints[1]
     
      let keypoint2 = pose.keypoints[2]
      
      let keypoint3 = pose.keypoints[3]
     let keypoint4 = pose.keypoints[4]
      let keypoint5 = pose.keypoints[5]
     
  let eyeD = keypoint1.position.x - keypoint2.position.x
  let smallD = eyeD/3
  //print(eyeDistance)
  maskImage.beginShape();
     maskImage.fill(50)
      //poly[0] = createVector(keypoint2.position.x -20,keypoint6.position.y); 
     maskImage.clear()
      maskImage.vertex(keypoint2.position.x -smallD , keypoint6.position.y+smallD  );//bot left
      maskImage.vertex(keypoint2.position.x -smallD  , keypoint6.position.y-eyeD*2);
     
      maskImage.vertex(keypoint4.position.x -eyeD, keypoint4.position.y +eyeD);
     
      maskImage.vertex(keypoint2.position.x -eyeD *1.6, keypoint2.position.y-smallD);
     
      maskImage.vertex(keypoint0.position.x, keypoint0.position.y - eyeD*3);//nose
     
      maskImage.vertex(keypoint1.position.x+eyeD* 1.6, keypoint1.position.y-smallD);

      maskImage.vertex(keypoint3.position.x +eyeD, keypoint3.position.y + eyeD);
     
     maskImage.vertex(keypoint1.position.x+smallD, keypoint5.position.y-eyeD*2.5);
     maskImage.vertex(keypoint1.position.x+smallD, keypoint6.position.y +smallD );//bot right
     
  maskImage.endShape(CLOSE);
     maskImage.textFont(font)
     maskImage.textSize(160)
     maskImage.textAlign(CENTER)
     //maskImage.text("Danger!", keypoint2.position.x +eyeD , keypoint6.position.y +eyeD * 1.5)
     
   }
 (imgClone = video.get() ).mask( maskImage) ;
  
  //imgClone.fill("black")
  

  //imgClone.rect(0,0, width, height)
  imgClone.filter(THRESHOLD)
  
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function mousePressed(){
//  print("click!");
  //bolt = new lightningBolt(random(0,width),0,random(minBoltWidth,maxBoltWidth),0,minJumpLength,maxJumpLength,boltColor);
  //bolt.draw();
  //thunderTimes.add(bolt.getThunderTime());
  saveCanvas("Sign_" + int(random(0,100)) + ".jpg")
}
function download() {
  saveCanvas("Sign_" + int(random(0,100)) + ".jpg")
}