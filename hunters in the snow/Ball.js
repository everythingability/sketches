var theX = 0
var theY = 0

class Ball {

  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.speed = 6.0;
    this.heading = random(TWO_PI);
    this.r = random(5.0, 30.0);
    this.cfill = color(random(100, 200), random(100, 200), random(100, 200), 200);
    this.wanderNoise = 0.3;
    
  }

  update() {
    // change heading based on value of wanderNoise
    this.heading += this.wanderNoise * random(-1, 1);
    
    // update position
    this.x += this.speed * cos(this.heading);
    this.y += this.speed * sin(this.heading);

    // boundary conditions
    if (wrapped) {
      this.x = (this.x + width) % width;
      this.y = (this.y + height) % height
    } else {
      // solid walls
      this.x = constrain(this.x, -img.width/2 + width, img.width/2 - width);
      this.y = constrain(this.y,-img.height/2 + height,  img.height/2 - height);
      
      
    }
  }

  display() {
    textSize(60)
    noFill()
    stroke("red")
    strokeWeight(6)
    image(img, this.x, this.y)
    //text( int(this.x) + ","  + int( this.y), 50, 100)
    
    for (var p=0; p<points.length;  p++){
      var thePoint = points[p]
      
      var pointX =   thePoint[0]  + this.x -(img.width/2)
      var pointY =   thePoint[1]  + this.y - (img.height/2) 
      var pointW =   thePoint[2]
      var pointH =   constrain(thePoint[3], 5, 50)
      
      if ( dist(pointX, pointY,  width/2, height/2) < 700  ){
          //print("yay!", thePoint)
         
          //ellipse( pointX, pointY, 20, 20)
          //var sp = sprites[p]
          
          sprites[p].position.x = pointX + pointW/2
          sprites[p].position.y = pointY - pointH*1.2
          print( pointX, pointY)
          //animation(fire2,pointX, pointY-50)
         // rect(  pointX, pointY, pointW, pointH )
          //sprites[p].attractionPoint(0.5,  pointX, pointY)
          sprites[p].visible = true
          sprites[p].update( )
          sprites[p].display()
          
          
        
        
        }else{
          sprites[p].visible =false
          sprites[p].update()
        }
     }
  }
  
  
  
}
