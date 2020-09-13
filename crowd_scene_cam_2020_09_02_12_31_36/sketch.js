//Thank you: https://github.com/aferriss/p5jsShaderExamples

let camShader;
let cam;
let cowImg;
let crowdScene 
let tracker

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');

  cowImg = loadImage('female_cow.jpg');
  crowdScene = loadImage("crowd_scene.png")
}

function setup() {
  // shaders require WEBGL mode to work
  background("yellow")
  var canvas = createCanvas(800, 600, WEBGL);
  canvas.touchEnded(touchEnded)
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(800, 600);
  
  //{stopOnConvergence : true}
  tracker = new clm.tracker();
  tracker.init();
    tracker.start( cam );
  // hide the html element that createCapture adds to the screen
  //cam.hide();

}

function draw() {  
  // shader() sets the active shader with our shader
  //shader(camShader);
  //camShader.setUniform('tex0', cam);
  //camShader.setUniform('tex1', cowImg);
  //camShader.setUniform('amt', 0.17); //0 to 0.2
  // rect gives us some geometry on the screen
  //rect(0,0,width, height);
  translate(0,0)
  image(crowdScene, -width/2, -height/2);
  
  
    positions = tracker.getCurrentPosition();
  print( positions)

  if (positions.length > 0) {

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    const head = {
      outline: [23, 63, 24, 64, 25, 65, 26, 66].map(getPoint),
      center: getPoint(63),
      top: getPoint(33),
      bottom: getPoint(7),
      left:getPoint(1),
      right:getPoint(14)
    };

   for(i=0; i<positions.length ; i++){
     var position = positions[i]
     fill("yellow")
     rect(position.left.x,
       position.left.y,
       position.bottom.x - position.top.x,
       position.right.y-position.left.y)
   }


  
  }
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed(){
  saveCanvas("A_BEAST_OF_THE_FIELD_" +int(random(0,1000)) + ".jpg")
}

function touchStarted(){
  //saveCanvas("A_BEAST_OF_THE_FIELD_" +int(random(0,1000)) + ".jpg")
}
function touchEnded(){
  saveCanvas("A_BEAST_OF_THE_FIELD_" +int(random(0,1000)) + ".jpg")
}