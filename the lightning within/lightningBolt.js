var canvasSize;
var center;
var effectSize;
var steps;
var discharges;
var maxsteps = 80;


function Discharge(center,pos, v0, childrenSpawnProbability) {
  this.center = center
  this.v0 = v0;
  this.pos = [pos.copy()];
  this.children = [];
  this.childrenSpawnProbability = childrenSpawnProbability;

  this.update = function(stepi) {
    let p0 = this.pos[this.pos.length - 1];
    
    for (let i = 0; i < stepi; ++i) {
      let p1 = p5.Vector.add(p0, p5.Vector.mult(v0, 7));
      v0.add(p5.Vector.random2D().mult(0.34));
      v0.normalize();

      this.pos.push(p1);
      p0 = p1;
      //print(p0,this.pos, i)
      let chSpawnProb = this.childrenSpawnProbability * (0.25 + 0.75 * this.pos.length / maxsteps);
      if (random(0.0, 1.0) < chSpawnProb){
        let d = new Discharge(this.center,p0.copy(), v0.copy(), chSpawnProb);
        this.children.push(d);
      }
    }
    
    for (let i = 0; i < this.children.length; ++i){
      this.children[i].update(stepi);
    }
  }
  
  this.draw = function() {
    print("drawing")
    for (let i = 1; i < this.pos.length; ++i) {
      let p0 = this.pos[i - 1];
      let p1 = this.pos[i];
      
      let u = p0.dist(this.center) / effectSize;
      
      strokeWeight(3-2*u);
	  line(p0.x, p0.y, p1.x, p1.y);
    }
    
    for (let i = 0; i < this.children.length; ++i){
      this.children[i].draw();
    }
        //saveCanvas("LIGHTNING_" + int(random(0,100)) + ".jpg")

  }
  
  this.done = function() {
    return this.pos.length > maxsteps || this.pos[this.pos.length - 1].dist(this.center) > effectSize;
  }
}

function setupLightning() {
  
  //center = p5.Vector.div(canvasSize, 2);
  effectSize = width*2;
  discharges = [];

  
  noSmooth();
  strokeCap(SQUARE);
}


function drawLightning(c) {
  
  if (random(0.0, 1.0) < 0.01){
    background("white")
    //print("boom!",c.x, c.y)
    let d = new Discharge(p5.Vector.random2D(),c.copy(),   p5.Vector.random2D(), 0.1);
    discharges.push(d);
  }
  //print(discharges.length)
  discharges = discharges.filter(elem => !elem.done());

  for (let i = 0; i < discharges.length; ++i){
    discharges[i].update(8 -i % 4);
  }
  
  
  background(0, 0, 0, 15);
  stroke(255, 255, 255, 100);
  
  for (let i = 0; i < discharges.length; ++i){
    discharges[i].draw();
  }
  //saveCanvas("LIGHTNING_" + int(random(0,100)) + ".jpg")

}