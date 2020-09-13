/*eslint-disable*/
var agents = [];
var nottouched = true;
var once = false;
var col = null;

function setup() {
   let density = displayDensity();
    pixelDensity(density);
    canvas = createCanvas( window.innerWidth -20  , window.innerHeight -20 );
    
    fullscreen()
    
  //canvas.parent('sketch');
  colorMode(HSB);
  stroke("#14A2FB")
  //noStroke()
  col = color('#0F80FF');
}

function draw() {
    
  if(nottouched == true){
   background('#F5005A');
    textAlign(CENTER);
    text('draw here and hit "s" to save an image', width/2, height/2);

  }
    
  if(once == false && nottouched == false){
    background('#F5005A')
    once = true;
  }
    
  for (var i = agents.length-1; i >0 ; i--) {
      try{
        if ( agents[i].age > 400){
             stroke("#14A2FB");
            fill("#14A2FB")
          delete  agents[i]
        }else{
      
            agents[i].run();
        }
    }catch(e){
              
          }
      
  
  
    
}
}

function touchMoved() {
   nottouched = false;
   agents.push(new Particle(mouseX, mouseY));
return false
}

function mouseDragged() {
  nottouched = false;
  agents.push(new Particle(mouseX, mouseY));
}

function keyPressed (){
  // console.log(keyCode);
  if(keyCode === 83 || keyCode === 16){
    // lower case and upper case s
    saveCanvas(canvas, 'out','png');
  }
}

function Particle(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.color = col;
  this.age = 0
    
  this.display = function() {
    fill(this.color);
    push();
        translate(this.x, this.y);
        ellipse(0, 0, 10, 10);
    pop();
  };
    
  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y += random(-1, 1);

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    this.age = this.age +=1
    
        
    
  };
    
  this.run = function() {
      
    this.display();
    this.move();
    
  };
}
// END OF CLASS