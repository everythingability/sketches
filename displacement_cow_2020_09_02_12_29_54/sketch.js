//Thank you: https://github.com/aferriss/p5jsShaderExamples

let camShader;
let cam;
let cowImg;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');

  cowImg = loadImage('female_cow.jpg');
}

function setup() {
  // shaders require WEBGL mode to work
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.touchEnded(touchEnded)
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

}

function draw() {  
  // shader() sets the active shader with our shader
  shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);
  camShader.setUniform('tex1', cowImg);

  camShader.setUniform('amt', 0.17); //0 to 0.2
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
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