var synth, mic

var theX = 100
var theY = 100
var angle = 0;
var circles = [];		//array to hold all circles
var arcs = [];
var trees =[];
hit = false
let t1
let t2 
let t3 
var rotateSpeed = .5

function preload(){
  
}


function setup() { 
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

    createCanvas( window.innerWidth, window.innerHeight );
    let density = displayDensity();
    pixelDensity(density);
    fullscreen()
    

    setInterval(spawnCircle, 1000);
   
   // E = Euclid
    //Clock.rate = 0.5
  
  
  //triangle
   t1 = createVector( 0, 0);
   t2 = createVector( width -20, 0);
   t3 = createVector(width +20, 0);
  
  //frameRate(40)
    
  metronomeOn = true;
  bpm = 60;
  beatDivisions = 16;
  beatLength = 60/bpm * 1000;
  nextClick = 0;
  loopLength = 4 * 60/bpm * 1000; // in milliseconds
  nextLoop = 0;
  loopCount = 0;
  
  // a bunch of stuff to set up the sound fx
  metronomeEnv = new p5.Envelope();
 
  metronomeEnv.setRange(1, 0);
  metronomeSound = new p5.Oscillator("triangle");
   metronomeEnv.scale(0.2) //? Does this make it quieter?
  metronomeSound.phase(0.9) //? What does this do...?
  metronomeSound.amp(metronomeEnv);
  metronomeSound.freq(30);
  

  metronomeSound.start();
  
  reverb = new p5.Reverb()
  delay = new p5.Delay();
    
  spawnTrees(20) //Create some random trees
} 

function drawTriangle(t1,t2, t3, myColor) {//The radar wipe
  push();
      stroke(myColor);
      strokeWeight(3);
      fill(myColor);
      translate(width/2, height/2);

      t2.rotate(radians(rotateSpeed))
      t3.rotate(radians(rotateSpeed))  
      line(t1.x, t1.x,t2.x, t2.y)


      var transX = theX-width/2
      var transY = theY -height/2

      //hit = collideLineCircle(t1.x, t1.x,t2.x, t2.y,transX,transY,50);
      //if (hit) print (hit)
  pop();
}

function draw() {    
  //update and display our circles everytime draw loops
    fill(50, 50)
    rect(0,0,width, height)
  for(var i= 0; i<circles.length; i++){
     
    circles[i].update();
    circles[i].check();
    circles[i].ellipse();   
    //console.log(circles.length);
    
    //is circle has reached it's lifespan, then delete it
    if(circles[i].lifespan <= 0){
      circles.splice(i, 1);
    }
  }
  
  drawTriangle(t1, t2, t3, "cyan")
  
   for(var i= 0; i<trees.length; i++){
     var tree = trees[i]
     tree.draw()
     tree.check()
   }
  angle += 0.015;
 
  if( millis() > nextClick ) {
      if( metronomeOn) { playClick(); }
      nextClick = nextClick + beatLength;
   }
  
   if( millis() > nextLoop ) {
      nextLoop = nextLoop + loopLength; 
      fill( 200, 50, 50 );
       
       push()
         translate(width/2, height/2)
        ellipse(0, 0 , 90 );
       pop()
       
      loopCount++;
   }
  
   var currentLoopTime = nextLoop + millis();
    
   instrument.forEach( function( arrayItem ) {
       if( millis() > nextLoop - arrayItem.loopOffset && arrayItem.loopIndex < loopCount ) {
       //arrayItem.play();
       arrayItem.draw();
     } } );
  
}

//add a circle whenever the mouse is clicked
function mouseClicked(){
  rotateSpeed = 1.5
   if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  
}




window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  //resizeCanvas(w,h);
  width = w;
  height = h;
};
