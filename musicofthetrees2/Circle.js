function spawnCircle(){
   circles.push(new Circle(width/2, height/2, 10));
}

//class for making circles
function Circle(x, y, s){
  //set any properties
  this.x = x; 	//x position
  this.y = y;		//y position
  this.s = s;		//circle size
  this.hit = false;
  
  this.r = random(30);
  this.g = random(55);
  this.b = random(100, 200);
  this.c = color(this.r,this.g,this.b, 50)
  this.old_c = this.c
  this.distance = 10000
  
  
  //give each circle a lifespan
  this.lifespan = 200;
  
  //define methods 
  
  //this draws the ellipse
  this.ellipse = function(){
    //define visual propoerties of the ellipse
    fill(this.c, 100);
    noStroke();
    
    //draw the ellipse
    ellipse(this.x, this.y, this.s);
    fill("white")
    ///text(int(this.distance - this.s/2) + " " + int(this.s), this.x, this.y)
  }
  
  //this makes it grow
  this.update = function(){
    this.s = this.s + 3;
    if (this.s > width){
      this.lifespan = 1
    }
    this.lifespan--;
  }
  
  this.check = function(x,y){

  }
  
  
}