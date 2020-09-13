/* 
See:   https://github.com/tensorflow/tfjs-models/tree/master/posenet
See:   https://github.com/auduno/clmtrackr
See:   https://freesound.org/people/kev_durr/sounds/396511/#

MEDUSA'S SELFIE. Art that is meant to not be looked at.

When this detects that someone is "there" but can't see
their face, the plasma effect is displayed where it thinks
you are. It knows where you live.

So in theory, it only comes alive when your face is obscured
or your back is turned and you are taking a selfie, or you
are visible but deliberately hiding your face.


Tom Smith https://everythingability.com/
*/

let video;
let poseNet;
let faces = []
let poses = [];
let sound, font
let hasStarted = false

var theShader, gl
let buffer
var tMouseX = 0
var tMouseY = 0
var currCounter = 0


//face recognition
let tracker
let msg = "NO FACE"

function modelReady() {
  print("Loaded")
}

function preload() {
  sound = loadSound("396511__kev-durr__arc-welding.wav")
  font = loadFont("Franklin Gothic Heavy Italic.ttf")
  
}

function setBuffer(msg, msg2) {
  //print(msg)
  buffer.background("black")
  buffer.textSize(50)
  var textLength = buffer.textWidth(msg) / 2
  var x = (width / 2) - textLength
  //print(x, textLength)
  
  buffer.text(msg, x, height / 2)
  
  if (msg2){
    buffer.textSize(30)
    textLength = buffer.textWidth(msg2) / 2
    x = (width / 2) - textLength
    buffer.text(msg2, x, height / 2 + textSize() * 4)
  }

}

function mousePressed(){
  hasStarted = true
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  fullscreen(!fullscreen())
}

var w, h
function windowResized() {
  sizeCanvas()
  resizeCanvas(w, h);
  print( "w: ", w, "h: ", h, "pixelDensity:", pixelDensity() )
}
function sizeCanvas() {
  w = displayWidth // pixelDensity()
  h = displayHeight // pixelDensity()
  
}




function setup() {
  sizeCanvas()
  createCanvas(w, h, WEBGL);
  //frameRate(10)
  textFont(font)

  buffer = createGraphics(w, h);
  buffer.background("black")
  //buffer.translate(0,0)
  buffer.textFont(font)
  buffer.textSize(50)
  buffer.textAlign(LEFT)
  buffer.fill("white")
  setBuffer("CLICK TO START")

  video = createCapture(VIDEO);
  video.size(w, h);
  video.hide()

  gl = this.canvas.getContext('webgl'); //? It doesn't work without 
  gl.disable(gl.DEPTH_TEST); //these two lines


  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    //print(poses.length)
    poses = results;
  });


  tracker = new clm.tracker();
  tracker.init(pModel, modelReady);
  tracker.start(video.elt);

  //theShader = loadShader(vert, frag)//this doesn't WORK!
  theShader = new p5.Shader(this._renderer, vert, frag); //THIS DOES!
  shader(theShader); //shaders are applied	
  theShader.setUniform("iResolution", [w, h]); //pass some values to the shader

  strokeWeight(4);
  angleMode(DEGREES);
  //strokeJoin(ROUND); //Errors in WEBGL

  //fullscreen(!fullscreen())
}



function draw() {
  translate(-width / 2, -height / 2) // WEBGL's centre is central.
  
  if (!hasStarted) {  // Used to force a click to start
    setBuffer("CLICK TO START")
    image(buffer, 0, 0, w, h)
    
  } else {
     var face = false 
     tMouseX = -width * 2 //set the plasma point way off screen somewhere
     tMouseY = -height * 2
    
     faces = tracker.getCurrentPosition();

    if (faces.length > 0) {
      stroke("crimson")
      //setBuffer("I CAN SEE YOU")
      face = true
    } else {
      //setBuffer("I CAN'T SEE YOU")
      stroke("yellow")
      face = false
    }


    //DO THE LOGIC
    if (poses.length == 0 | poses == false & face == false) {
      //Nobody home
      currCounter = 0
      sound.stop()
      //NO FACE AND A BODY
      setBuffer("I CAN'T SEE ANYONE", "AT ALL")
      //image(video, 0, 0, w, h); // nobody, nothing
      image(buffer, 0, 0, w, h); // nobody, nothing
    } else if (poses.length > 0 && face == false) { 
      // MEDUSA TIME
      ///We can see at least one body, AND we can't see faces
      currCounter++
      
      if (currCounter > 20) { /// so we're really sure you're there
        //print(currCounter)
        let pose = poses[0].pose; //get the first
        // https://github.com/tensorflow/tfjs-models/tree/master/posenet
        let keypoint = pose.keypoints[4]; //rightEar //5:leftShoulder
        let targetX = keypoint.position.x;
        let targetY = keypoint.position.y;
        
        tMouseX = width - targetX //so video flips so let's do this...
        tMouseY = targetY
        
        if (keyIsDown(CONTROL)){
          image(video, 0, 0, w, h)
          print(tMouseX, tMouseY)
          ellipse(tMouseX, tMouseY, 20, 20)
        }else{
          theShader.setUniform("iResolution", [w, h]); //pass some values to the shader
          theShader.setUniform("iTime", millis() * 0.001);
          theShader.setUniform('iMouse', [tMouseX * pixelDensity(), tMouseY])
          shader(theShader);
          strokeWeight(20)
          rect(0, 0, w, h);
        }

        if (sound.isPlaying() == false) { //don't start if already playing
          sound.loop()
        }
      }

    } else if (face == true) {
      currCounter = 0
      sound.stop()

      setBuffer("I CAN SEE YOU", "COVER YOUR EYES")
      image(buffer, 0, 0, w, h);
    }


  }
}













/*push();//This is needed to flip the video... if we don't show the video we don't need it
    translate(width, 0);
    scale(-1, 1);
    image(video, width / 2, -height / 2, width, height);
pop()*/
//CHECK POSITIONS