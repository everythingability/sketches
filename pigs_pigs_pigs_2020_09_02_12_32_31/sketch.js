let bg
let system;
var sound
var pigface = "🐷"
var pig = "🐖"
var airplane = "✈️"
//var vid


function preload(){
  //Sound from: https://freesound.org/s/260640/
  sound = loadSound("260640__theacidromance__pig-squealing.mp3")
   //From: https://www.pexels.com/photo/air-atmosphere-beautiful-blue-531767/
  bg = loadImage("sky.jpg") 
  //vid = createVideo("https://www.youtube.com/embed/Lw-7tt_aP9g?autoplay=1&controls=0&showinfo=0&autohide=1", vidLoad)
  //vid.size(1000, 750);
 
}

function setup() {
  createCanvas(1000, 780);  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
 
  system = new ParticleSystem( createVector(width, height));
  
  sound.amp(0.3)
  sound.loop()
  fullscreen()  
}

function vidLoad() {
  vid.loop();
  vid.volume(0.4);
}

function draw() {
  background("#81BBFF")
  //image(vid, 0, 0, displayWidth, displayHeight)

  
  image(bg, 0,0, 1280, 720)
  noStroke();
  //print (frameCount % 20)
  if (frameCount % 5 ==0){
    system.addParticle();
  }
  system.run();
}

class Particle {
  constructor( position) {
    
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-25, -10), random(-5, 0));
    this.position = createVector(width, random(0,height))//Override the default
    this.lifespan = random(100, 500);
    
  }
  run() {
    this.update();
    this.display();
  }
  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 1;
  }
  // Method to display
  display() {
    //blendMode(BLEND)
    textSize(this.lifespan)
    text(pig, this.position.x, this.position.y)
  }
  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor( position) {
  
    this.origin = position.copy();
    this.particles = [];
  }
  addParticle() {
    
    //if (this.particles.length < 80){
    this.particles.push(new Particle(this.origin));
  //}
  }
  run() {
    this.particles = this.particles.filter(particle => {
      particle.run();
      return !particle.isDead();
    });
  }
}

/*
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
};*/

///* only takes the sketch
function mousePressed(){
  //saveCanvas("oink_" + int(random(0,1000)) + ".jpg")
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
 // var vid = select('#video-background')
  //print (vid)
  //vid.play()
}//*/





