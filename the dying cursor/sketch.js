var img
var imgW, imgH
var tintValue = 255;
function preload(){
  img = loadImage("Cursor.png")
  
}
function setup() {
  createCanvas(800, 800);
  imgW = img.width
  imgH = img.height
  
  imageMode(CENTER)
  
  
}

function draw() {
  background(100);
  if( mouseX - imgW/2>0 & mouseY - imgH/2 > 0 & mouseX <width -imgW/2  & mouseY < height -imgH/2){//topleft
    tintValue = 255
    tint(255, tintValue)
      image(img, mouseX, mouseY) 
  }else{
     tintValue -= 10
    if (tintValue < 10){
      tintValue = 10
    }
    tint(255, tintValue)
    image(img, mouseX, mouseY) 
    
  }
  
  
}