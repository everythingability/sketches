let rgbShader, sineShader, slidesShader;
let textSrc;
let shaderLayer;

let amtX = 50;
let amtY = 50;
let txtSize = 200;

let testText = 'Positive / Negative'

let input;

let mode = 2;
let shaderSelect;

function preload(){
  rgbShader = loadShader("basic.txt", "rgb.txt");
  sineShader = loadShader("basic.txt", "sine.txt");
  slidesShader = loadShader("basic.txt", "slides.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  shaderLayer = createGraphics(width, height, WEBGL);
  shaderLayer.noStroke();
  textSrc = createGraphics(width*2, height*2);

  input = createInput('');
  input.position(10,10);
  input.input(updateText);

  shaderSelect = createSelect();
  shaderSelect.position(10, 50);
  shaderSelect.option("Slides");
  shaderSelect.option("Wavy");
  shaderSelect.option("RGB Split");
  shaderSelect.changed(chooseMode);
}

function draw() {

  textSrc.background(0);
  textSrc.textSize(txtSize);
  textSrc.textAlign(CENTER, CENTER);
  textSrc.fill(255);
  textSrc.text(testText, -200, -400, width*2, height*2);

  let pixelSizeX = 1/width;
  let pixelSizeY = 1/height;
  
  if(mode == 0){
    shaderLayer.shader(rgbShader);
    rgbShader.setUniform("tex0", textSrc);
    let offsetX = map(mouseX, 0, width, -pixelSizeX * amtX, pixelSizeX * amtX);
    let offsetY = map(mouseY, 0, height, -pixelSizeY * amtY, pixelSizeY * amtY);
    rgbShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0,0,width, height);
  }

  if(mode == 1){
    shaderLayer.shader(sineShader);
    sineShader.setUniform('tex0', textSrc);
    let offsetX = map(mouseX, 0, width, 0, 200);
    let offsetY = map(mouseY, 0, height, 0.001, 0.01);
    sineShader.setUniform('offset', [offsetX, offsetY]);
    sineShader.setUniform('time', frameCount * 0.025);
    shaderLayer.rect(0,0,width, height);
  }

  if(mode == 2){
    shaderLayer.shader(slidesShader);
    slidesShader.setUniform('tex0', textSrc);
    let offsetX = map(mouseX, 0, width, -50, 50);
    let offsetY = map(mouseY, 0, height, 0.001, 0.05);
    slidesShader.setUniform('offset', [offsetX, offsetY]);
    slidesShader.setUniform('time', frameCount * 0.025);
    shaderLayer.rect(0,0,width, height);

  }

  image(shaderLayer, 0, 0, width, height);
}


function updateText(){
  testText = input.value();
}

function chooseMode(){
  if(shaderSelect.value() == "Slides"){
    mode = 2;
  }
  if(shaderSelect.value() == "Wavy"){
    mode = 1;
  }
  if(shaderSelect.value() == "RGB Split"){
    mode = 0;
  }
}