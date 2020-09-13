var itick = 0; // simulation time
var paused = true; // simulation run/pause status
var wrapped = false; // boundary conditions (wrapped or solid)
var img, snd
var trailWidth = 30
var wanderNoise = 0.1

var balls = []; // an array to hold ball objects
const NBALLS = 20;
var hasClicked = false

function preload() {
  img = loadImage("World-Map-PNG-Photos_small.png")
  snd = loadSound("dads_army.mp3")

}

function setup() {

  simSetup()
  textAlign(CENTER)
  textSize(100)
  for (let b of balls) b.wanderNoise = wanderNoise;


}

function mousePressed() {
  hasClicked = true

  paused = false;
  snd.loop()
}

function draw() {
  if (hasClicked == true) {
    image(img, 0, 0, width, height)
    simStep()
    simDraw();
  } else {
    background("#10bfeb")
    fill("#fff")
    text("Click to play", width / 2, height / 2)

  }
}

function simDraw() { // visual display of simulation state

  for (let b of balls) {
    b.trail.display();
    b.display();
  }

  // other info
  textSize(14);
  noStroke();
  fill('lightGray');
  text(itick, 10, 15); // tick count
  fill('darkOrange')
  text(wrapped ? 'wrapped' : 'solid', 10, 30); // wrapped status 
}

function simIsDone() { // return true if done, false otherwise
  return false;
}

function simReset() { // reset simulation to initial state
  itick = 0;
  for (let b of balls) {
    b.reset();
    b.trail.reset();
  }
}

function simSetup() { // called once at beginning to setup simulation
  var canvas = createCanvas(img.width, img.height)
  canvas.parent("#child")
  for (let i = 0; i < NBALLS; i++) {
    let ball = new Ball();
    ball.trail = new Trail(300, ball.cfill);
    balls.push(ball);
  }
  simReset();
}

function simStep() { // executes a single time step (tick)
  itick++;
  for (let b of balls) {
    b.update();
    b.trail.update(b.x, b.y);
  }
}

//==================================
// Nothing below here should change
// unless you add new UI elements
//==================================