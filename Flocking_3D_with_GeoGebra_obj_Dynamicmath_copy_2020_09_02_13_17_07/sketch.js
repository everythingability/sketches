// Press the play button on the top left
// Press "A" to force them to the center
/*
	Original sketch by Sébastien Raynaud @Chopokopx, 11 December 2018 
  Largely inspired by Daniel Shiffman's coding challenge #124: Flocking Simulation
  	- Coding Challenge video: https://youtu.be/mhjuuHl6qHM
  In setup, a flock of boids is created with initial position and velocity
  After 40 frames, boids acquire perception, alignment, cohesion, and separation
  	- Preception: how far a boid can be from another boid to be considered neighbor
    - Alignment: steering behavior of a boid towards the average velocity of its neighbors
    - Cohesion: steering behavior of a boid towards the average location of its neighbors
    - Separation: steering behavior of boid to avoid too much proximity with its closest neighbors
  If a boid fly too high or too low, a force is applied to make it go to the average depth
  	- So that they tend to fly horizontally
  There is also a quad tree to minimize the cost distance calculation
  
3D object Flower made in GeoGebra by Debora Pereiro:

https://www.geogebra.org/m/scc5n9ab

Butterfly made in GeoGebra and adaptation of this sketch by Juan Carlos Ponce Campuzano:

https://www.geogebra.org/classic/qqsexk9c

https://jcponce.github.io/

28-Jul-2020

*/ 

const butterfly = []; //Array of butterflies
const flock = []; // Array of boids a.k.a. rainbow flowers

let depth = 800; // The Z location of the boid tend to stay between +depth/2 and -depth/2
let gap = 300; // Boids can go further than the edges, this further distance is the gap
let quadTree; // A quad tree to minimize the cost of distance calculation
let unitX, unitY, unitZ; // Unit vectors pointing in the X, Y, and Z directions
let cameraX, cameraY, cameraZ;

let useQuadTree = true; // Toogle the use of a quad tree
let showPerceptionRadius = false; // Toogle vizualization of perception radius
let goMiddle = false; // Pressing "a" toogle it, making all boids go to the center
let downloadCanvas = false; // Make it true to lower frameRate and download the canvas each 2 frames

let startingButterflies = 60; // Amount of boid at the start of the sketch
let startingBoids = 40; // Amount of boid at the start of the sketch
let startingPerception = 90; // Perception radius at the start of the sketch
let t = 0; // Counts the frame from the time boids go out of the middle of space

//Dat gui sliders
let Controls = function() {
  this.txt = 'to force them to the center';
  this.boidsSlider = startingBoids;
  this.buttSlider = startingButterflies;
  this.setView = false;
  this.perceptionSlider = startingPerception;
  this.alignmentSlider = 1;
  this.cohesionSlider = 1;
  this.separationSlider = 1.4;
};
let controls = new Controls();

//3D models from GeoGebra
let petals, stick, wings;

function preload() {
  petals = loadModel('petals.obj');
  stick = loadModel('stick.obj');
  wl = loadModel('wl.obj');
  wr = loadModel('wr.obj');
}

// SETUP FUNCTION ---------------------------------------------------
// Make the canvas, declare some variables, create the DOM elements and the initial boid population
function setup() {
  // Declaration of a canvas to allow canvas download
  let p5Canvas;
  if (downloadCanvas) {
    p5Canvas = createCanvas(800, 800, WEBGL);
    frameRate(5);
  } else {
    p5Canvas = createCanvas(windowWidth, windowHeight, WEBGL); // You can change the resolution here
  }
  depth = height;
  // Declaration of depth (z axis), unit vectors, and the fix camera

  unitX = createVector(1, 0, 0);
  unitY = createVector(0, 1, 0);
  unitZ = createVector(0, 0, 1);
  cameraX = 630 / 600 * width;
  cameraY = 140 / 500 * height;
  cameraZ = -270 / 500 * depth;
  //camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 0, 1);


  createUI();

  // Create an initial population of 100 boids
  for (let i = 0; i < controls.boidsSlider; i++) {
    pushRandomBoid();
  }

  // Create an initial population of 100 boids
  for (let i = 0; i < controls.buttSlider; i++) {
    pushRandomButterfly();
  }
}
// SETUP FUNCTION ENDS---------------------------------------------------

// DRAW FUNCTION ---------------------------------------------------
function draw() {
  // Background and lightning
  background(102, 204, 255);
  directionalLight(160, 160, 160, 1, 1, -5);
  ambientLight(180);

  // Draw the corners of a box showing the space where flowers and butterflies can fly
  push();
  stroke(80);
  strokeWeight(8);
  noFill();
  box(width + gap / 2, height + gap / 2, depth + gap / 2);
  pop();
  
  //Draw base of box
  push();
  noStroke();
  fill(102, 102, 153, 150);
  translate(0,0, height/2 + gap / 4);
  rect(- width / 2 - gap/4, - depth / 2 - gap /4, width + gap / 2, depth + gap / 2);
  pop();

  // Make the quad tree
  let boundary = new Cube(0, 0, 0, width + 2 * gap, height + 2 * gap, depth + 2 * gap);
  quadTree = new QuadTree(boundary, 4);
  for (let boid of flock) {
    quadTree.insert(boid);
  }
  for (let butt of butterfly) {
    quadTree.insert(butt);
  }


  //Let's get the first boid to set a moving view point
  let follow = flock[0];
  let pos = follow.pos.copy();
  let v = follow.vel.copy();

  if (pos.mag() < 2 && goMiddle === true) {
    goMiddle = !goMiddle; // Toogles goMiddle, forcing the boids to go to the middle or releasing them
    t = 0; // Resets t so that boids do not have cohesion in the next 40 frames
  }

  if (controls.setView === false) {
    camera(pos.x, pos.y, pos.z, v.x, v.y, v.z, 0, 0, 1);
  } else {
    camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 0, 1);
  }

  // Each boid determines its acceleration for the next frame
  for (let boid of flock) {
    boid.flock(flock, quadTree);
  }
  // Each boid updates its position and velocity, and is displayed on screen
  for (let boid of flock) {
    boid.update(gap);
    boid.show();
  }

  // Each boid determines its acceleration for the next frame
  for (let butt of butterfly) {
    butt.flock(butt, quadTree);
  }
  // Each boid updates its position and velocity, and is displayed on screen
  for (let butt of butterfly) {
    butt.update(gap);
    butt.show();
  }

  // Adjust the amount of boids on screen according to the slider value
  let maxBoids = controls.boidsSlider;
  let difference = flock.length - maxBoids;
  if (difference < 0) {
    for (let i = 0; i < -difference; i++) {
      pushRandomBoid(); // Add boids if there are less boids than the slider value
    }
  } else if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      flock.pop(); // Remove boids if there are more boids than the slider value
    }
  }

  // Adjust the amount of butterflies on screen according to the slider value
  let maxButterflies = controls.buttSlider;
  let differenceButt = butterfly.length - maxButterflies;
  if (differenceButt < 0) {
    for (let i = 0; i < -differenceButt; i++) {
      pushRandomButterfly(); // Add butterflies if there are less butterflies than the slider value
    }
  } else if (differenceButt > 0) {
    for (let i = 0; i < differenceButt; i++) {
      butterfly.pop(); // Remove butterflies if there are more butterflies than the slider value
    }
  }


  t++; // t counts the number of frames, it is used to not have cohesion in the first 40 frames
  // Download the current state of the canvas as .png
  if (downloadCanvas && frameCount % 2 == 1) download(canvas, 'Flocking_' + frameCount + '.png');
}
// DRAW FUNCTION ENDS---------------------------------------------------


/*
Auxiliary functions
*/

function createUI() {
  // create gui (dat.gui)
  let gui = new dat.GUI({
    width: 295
  });
  gui.close();
  gui.add(controls, 'txt').name("Press A");
  gui.add(controls, 'boidsSlider', 10, 130).name("Num Flowers").step(1);
  gui.add(controls, 'buttSlider', 0, 150).name("Num Butterflies").step(1);
  gui.add(controls, 'setView').name("Fixed view");
  gui.add(controls, 'perceptionSlider', 0, 1000).name("Perception").step(1);
  gui.add(controls, 'alignmentSlider', 0, 2).name("Alignment").step(0.1);
  gui.add(controls, 'cohesionSlider', 0, 2).name("Cohesion").step(0.1);
  gui.add(controls, 'separationSlider', 0, 2).name("Separation").step(0.1);
  gui.add(this, 'infoBoids').name("Boids Info");
  gui.add(this, 'backHome').name("Visit my site");
}

function infoBoids() {
  window.open(
    'https://www.red3d.com/cwr/boids/',
    '_blank' // <- This is what makes it open in a new window.
  );
}


function backHome() {
  window.open(
    'https://jcponce.github.io/',
    '_blank' // <- This is what makes it open in a new window.
  );
}

// Go to the middle
function keyPressed() {

  if (keyCode == 65) {
    goMiddle = !goMiddle; // Toogles goMiddle, forcing the boids to go to the middle or releasing them
    t = 0; // Resets t so that boids do not have cohesion in the next 40 frames
  }

}

// Make a new boid
function pushRandomBoid() {
  //let pos = createVector(random(width), random(height), random(-depth/2, depth/2)); // Uncomment and comment next line to create boids at random position
  let pos = createVector(0, 0, 0); // Create a boid at the center of space
  let vel = p5.Vector.random3D().mult(random(0.5, 3)); // Give a random velocity
  let boid = new Boid(pos, vel); // Create a new boid
  flock.push(boid); // Add the new boid to the flock
}

// Make a new butterfly
function pushRandomButterfly() {
  //let pos = createVector(random(width), random(height), random(-depth / 2, depth / 2)); // Uncomment and comment next line to create butterflies at random position
  let pos = createVector(0, 0, 0); // Create a butterfly at the center of space
  let vel = p5.Vector.random3D().mult(random(0.5, 3)); // Give a random velocity
  let butt = new Butterfly(pos, vel); // Create a new butterfly
  butterfly.push(butt); // Add the new butterfly to the flock
}

// Canvas Donwload to make the gif
// Taken from Jose Quintana: https://codepen.io/joseluisq/pen/mnkLu
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'),
    e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
      0, 0, 0, 0, 0, false, false, false,
      false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cameraX = 630 / 600 * width;
  cameraY = 140 / 500 * height;
  cameraZ = -270 / 500 * depth;
}