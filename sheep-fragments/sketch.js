/*
Drop an image
Press any key to save
Click to reveal the image
*/

var img, img2
var img3 = null
var canvas

var N = 3; //Number of recursive steps
var theImage = null
var theImage2 = null

function preload() {
  //sheep flock_27.jpg
  //img = loadImage("sheep flock_27.jpg")
  img = loadImage("cameron.png")
  img2 = loadImage("Hog.jpg")
  //img = loadImage("cow.jpg")
}

function useImage(img){
  var theImage = new myImage(img, N)
  theImage.makeFragments()//create the fragments
  return theImage
}

function setup() {
  canvas = createCanvas(700, 700 );
  canvas.drop(gotFile);
  print(img)
  img2.resize(img.width, img.height)
  theImage = useImage(img)

  background(0)
  fill("white")
  //text("Drop an image here", width/2, height/2)
  noStroke()
  theImage.drawFragments()
//  noLoop()

}

function draw() {
  
}
