/*
https://molleindustria.github.io/p5.play/

*/

let particle_texture = null;
// variable holding our particle system
let ps = null;
var plumes = []

var itick = 0; // simulation time
var paused = false; // simulation run/pause status
var wrapped = false; // boundary conditions (wrapped or solid)

var balls = []; // an array to hold ball objects
const NBALLS = 1;
var img
var fire2
var sprites = []
var fImg

var points
var buffer


function jsonLoaded(p){
  points = p
  print(points.length, "points")
  
 
}

function createPS(){
    ps = new ParticleSystem(0, createVector(x, y), particle_texture);
}

function preload(){
  img = loadImage("hunters-in-the-snow_full_smaller.jpg") //w 6819 h 4853
  loadJSON("points.json", jsonLoaded)
  
  fire2 = loadAnimation('assets/fire2/fire2-1.png',
    'assets/fire2/fire2-2.png',
    'assets/fire2/fire2-3.png',
    'assets/fire2/fire2-4.png',
    'assets/fire2/fire2-5.png',
    'assets/fire2/fire2-6.png',
    'assets/fire2/fire2-7.png',
    'assets/fire2/fire2-8.png',
    'assets/fire2/fire2-9.png',
    'assets/fire2/fire2-10.png',
    'assets/fire2/fire2-11.png',
    'assets/fire2/fire2-12.png')

  fImg = loadImage("assets/fire2/fire2-4.png")
   particle_texture = loadImage("assets/particle_texture.png")

}



function simReset() { // reset simulation to initial state
  itick = 0;
  for (let b of balls) {
    b.reset(); 
  }
}


function simStep() { // executes a single time step (tick)
  itick++;
  for (let b of balls) {
    b.update();
  }
}

//==================================
// Nothing below here should change
// unless you add new UI elements
//==================================

function setup() {
  createCanvas(windowWidth, windowHeight).parent("#canvas");
  buffer = createGraphics(fImg.width, fImg.height)
  
  print(img.width, img.height)
  
  for (let i = 0; i < NBALLS; i++) {
    let ball = new Ball();
    balls.push(ball);
  }
  
   for(p=0; p<points.length; p++){
    var thePoint = points[p]
    sp = createSprite(100, 100, thePoint[2], thePoint[3] );
    var sc  = map(thePoint[2], 0, 200, 0.3, 2)
    sp.scale = sc
    sp.visible = false
    sp.addAnimation('fire', fire2)
    sprites[p]= sp
    //plumes[p] = new ParticleSystem(0, createVector(thePoint[0], thePoint[1]), particle_texture);
    
  }
  
  print(sprites)
  imageMode(CENTER)
  
}

let wind
function draw() {
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  wind = createVector(dx, 0);
 
  
  simStep();
  for (let b of balls) {
    b.display();
  }
  
}