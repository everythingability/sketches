
var filenames = ["black.png","IMG_20170310_184220~2-01.jpg",
"IMG_20170312_092511.jpg",
"IMG_20170312_092522.jpg",
"IMG_20170312_133720-01.jpg",
"IMG_20170317_165832.jpg",
"IMG_20170327_164235_815.jpg",
"IMG_20170508_080235.jpg",
"IMG_20170508_182103.jpg",
"IMG_20170625_070957-01.jpg",
"IMG_20170625_204320_097.jpg",
"IMG_20170702_091822-01.jpg",
"IMG_20170702_092704_903.jpg",
"IMG_20170714_075252_206.jpg",
"IMG_20170725_125253.jpg",
"IMG_20171223_183750.jpg",
"IMG_20181027_093026.jpg",
"IMG_20181028_092052.jpg",
"IMG_20190502_151037.jpg",
"IMG_20190502_151042.jpg",
"IMG_20190506_092120.jpg",
"IMG_20190507_112031.jpg",
"IMG_20190602_091405__01.jpg",
"IMG_20190926_155845.jpg",
"tmpImage1557428072879.jpg"]

var vignette
var images = []
var x = 0

var imageCounter = 0
var theImage
var buffer

function changeImage(){

  imageCounter ++
  x = 0
  if (imageCounter == images.length){
    imageCounter = 0
  }
   theImage = images[imageCounter]
  //print(imageCounter)
}
function preload(){
  for (i=0; i< filenames.length; i++){
    var theImage = loadImage('media/'+filenames[i])
    //theImage.resize(700, 900)
    images.push( theImage )
    //print(filenames[i], images.length)
  }
  vignette = loadImage("media/vignette.png")

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

function draw(){

  drawBuffer( )
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
