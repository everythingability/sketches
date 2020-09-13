let angle = 0
var barrel
let capture;
var imgW
var shot
var blood
var hasShot = false
let h
var hasTapped = false;

function preload() {
  barrel = loadImage("barrel.png") //An image with a mask "hole" in it.
  capture = createCapture(VIDEO);//Connect to camera
  song = loadSound("no.mp3") //Dr No.
  shot = loadSound("shot.wav") //A bullet sound when you click
  capture.size(640, 640); //The camera size, small is quicker but you can use the whole screen.
  blood = loadImage("blood.png")// The drippy image, also has transparent bg.
  capture.hide()//Don't show the RAW capture image.

}

function setup() {
  createCanvas(640, 480);
  angle = width / 2
  textSize(50)
  imageMode(CENTER)
  imgW = barrel.width
  song.loop() //start the song.
  // BUT because of security restrictions, it NEEDS a click before it can play
}

function draw() {
  if (!hasTapped) {
    fill("red")//This is where we get the click
    text("TAP to start, then tap to take picture", 50, 300, 300, 400)
  } else {
    background(255)
    h = map(sin(angle), -1, 1, 0, width / 3); //make a nice X value
    translate(width / 2, height / 2) // go to the middle of the screen

    image(capture, h / 3, 0)//display the camera
    filter(THRESHOLD)//black and white it

    //filter(OPAQUE)//do I need this?
    image(barrel, h - 100, 0, imgW * 0.75, barrel.height * 0.75)//draw the barrel on top.
    angle += 0.055 //update the angle
    if (hasShot) {
      animateBlood()
      //tint(255,0,0, i)
    }


  }
}
var y = 0;
function animateBlood() {
  //tint(255, 0, 0,  100); //Nope too slow 
  image(blood, 0, y - blood.height)

  y += 15 

  if (y > 200) {
    hasShot = false
    y = 0
    saveCanvas("secret_" + int(random(0, 1000)) + ".jpg")
  }

}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume(); //This KICK STARTS the audio permission.
  }

  if (hasTapped == false) {//have they clicked yet?
    hasTapped = true//Yay! The FIRST CLICK... set this boolean so we know to show animation in draw()
  } else {
    hasShot = true//Now we're in the animation
    shot.play()//Bang!
  }

}