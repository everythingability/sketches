
var filenames = []

var vignette 
var images = []
var x = 0

var imageCounter = 0
var theImage
var buffer

function mousePressed(){
  saveCanvas("Demonic_Cummings_" + frameCount + "_of_666.jpg")
}

function changeImage(){
  
  imageCounter ++
  x = 0
  if (imageCounter == images.length){
    imageCounter = 0
    exit()
  }
   theImage = images[imageCounter]
  //print(imageCounter)
}
function preload(){
  for (i=1; i< 40; i++){
    var theImage = loadImage("images/dom_"+nf(i, 3)+".jpg")
    //theImage.resize(700, 900)
    images.push( theImage )
    //print(filenames[i], images.length)
  }
  vignette = loadImage("vignette.png")
  
}
var w, h, ratio
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  w = width
  h = height
  
  buffer = createGraphics(w, h);

  buffer.imageMode(CENTER)
  smooth()
  theImage = images[imageCounter]
  
  iWidth = theImage.width
  iHeight = theImage.height
  
  ratio = h / iHeight
  
  //scale all images to fit the screen
 
  
  
  
  //setInterval(changeImage, 10500)
  frameRate(60)
}

var frame = 0
function draw(){
  
  drawBuffer( )
  //save(buffer, nf(frame, 5) + ".jpg")//don't do this
  frame++
  image(buffer, 0, 0)
}

function drawBuffer() {
  buffer.tint(255, 255)
  
  buffer.image(theImage, width/2, height/2, iWidth * ratio, iHeight * ratio)
  
  
  buffer.tint(255, x) 
  try{
     buffer.image(images[imageCounter+1], width/2, height/2, iWidth * ratio, iHeight * ratio)
  }catch(e){
     buffer.image(images[0], width/2, height/2, iWidth * ratio, iHeight * ratio)
  }
  
  x +=6
  if (x >255){
    x = 0
    changeImage()
  }
  
  //drawn vignette
  buffer.tint(255, 180)
  buffer.image(vignette, width/2, height/2, iWidth * ratio, iHeight * ratio)
  print(x)
}