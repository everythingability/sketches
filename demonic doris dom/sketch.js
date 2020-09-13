var filenames = []
let reverb
var vignette
var images = []
var sounds = []
var x = 0
var backing
var imageCounter = 0
var theImage
var buffer
var hasClicked = false
var playingSound
var score = 0

function mousePressed() {
   hasClicked = true
  var s = int(random(0, sounds.length))
  playingSound = sounds[s]

  playbackRate = random(0.8, 1.2)
  playbackRate = constrain(playbackRate, 0.8, 1.1); //slow a bit
  playingSound.rate(playbackRate);
  playingSound.play()
  //playingSound.disconnect()
  reverb.drywet(random(0.5, 1.0));
  reverb.process(playingSound, 3, 2);
  score += int(random(17, 319))

}


function changeImage() {

  imageCounter++
  x = 0
  if (imageCounter == images.length + 1) {
    imageCounter = 0
  }

  theImage = images[imageCounter]
  //print(imageCounter)
}

function preload() {
  backing = loadSound("boris_responsibly and legally.mp3")
  reverb = new p5.Reverb();
  sndNames = ["and I conclude.mp3",
    "and that is.mp3",
    "flouting.wav",
    "frankly_serious.mp3",
    "I can confirm that I do believe.wav",
    "i can tell you today.mp3",
    "i_believe.wav",
    "is_this_government.mp3",
    "no_alternative.mp3",
    "numbers.wav",
    "responsibly_and_legally.wav",
    "so.mp3",
    "stay_at_home.wav",
    "thereafter, palpably false.mp3",
    "with_integrity.mp3",
    "bj_now.mp3",
    "bj_colon.mp3",
    "bj_this.mp3",
    "bj_jizz.mp3"


  ]
  for (i = 0; i < sndNames.length; i++) {
    sounds.push(loadSound("sounds/" + sndNames[i]))
  }


  for (i = 1; i < 40; i++) {
    var theImage = loadImage("images/dom_" + nf(i, 3) + ".jpg")
    //theImage.resize(700, 900)
    images.push(theImage)
    //print(filenames[i], images.length)
  }
  shuffle(images, true)
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
  backing.play()
  //scale all images to fit the screen




  //setInterval(changeImage, 10500)
  frameRate(60)
}

var frame = 0

function draw() {
  if (hasClicked) {
    if (backing.isPlaying()) {
      try {
        drawBuffer()
        image(buffer, 0, 0)
      } catch (e) {}
      //save(buffer, nf(frame, 5) + ".jpg")//don't do this
      frame++

      text("Your score: " + score, width / 2, height / 2 + 200)
    } else {
      background(0)
      text("Whatever the score, you lose", width / 2, height / 2)
    }

  } else { //START SCREEN


    fill("yellow")
    textSize(32)
    textAlign(CENTER)
    text("Frankly, click to start", width / 2, height / 2)
    text("thereafter", width / 2, height / 2 + 50)
    text("keep clicking", width / 2, height / 2 + 100)
    text("with all your integrity", width / 2, height / 2 + 150)


  }
}

function drawBuffer() {
  buffer.tint(255, 255)

  buffer.image(theImage, width / 2, height / 2, iWidth * ratio, iHeight * ratio)


  buffer.tint(255, x)

  buffer.image(images[imageCounter + 1], width / 2, height / 2, iWidth * ratio, iHeight * ratio)


  x += 6
  if (x > 255) {
    x = 0
    changeImage()
  }

  //drawn vignette
  // buffer.tint(255, 180)
  //buffer.image(vignette, width/2, height/2, iWidth * ratio, iHeight * ratio)
  //print(x, imageCounter)
}