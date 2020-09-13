function justOffscreen() {

  var r = int(random(0, 5))
  
  var am = 300
  var x = -am
  var y = -am
  
  
  
  switch (r) {
    case 1: //left
      x = -am
      y = random(height)
      break;
    case 2://top
      x = random(width)
      y = -am
      break;
    case 3://right
      x = width + am
     y = random(height)
      break
    case 4:
      x = random(width)
      y = height + am
      break;
    case 5:
      x = random(width)
      y = height + am
      break;
  }
  print(r, x, y)
  return createVector(x, y)
}
  



class Ball {

  constructor() {
    this.reset();
  }

  reset() {
    var pos = justOffscreen()
    this.x = pos.x
    this.y = pos.y
    this.speed = 1.0;
    this.heading = random(TWO_PI);
    this.r = 30;
    this.cfill = color("#ffffff") //color(random(100, 200), random(100, 200), random(100, 200), 200);
    this.wanderNoise = 0.1;
    this.previousX = pos.x
    this.previousY =pos.y
    this.angle = random(0, 360)
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
      this.x = constrain(this.x, -400, width + 400);
      this.y = constrain(this.y, -400, height + 400);
    }
  }

  display() {
    noStroke();
    fill(this.cfill);
    //ellipse(this.x, this.y, 2 * this.r);

    push() //start new drawing state


    // this code is to make the arrow point

    var x1 = createVector(this.x, this.y); //random position to the upper left
    var x2 = createVector(this.previousX, this.previousY); //random position to the lower right

    var angle = atan2(x1.y - x2.y, x1.x - x2.x); //gets the angle of the line

    translate(x1.x, x1.y); //translates to the destination vertex
    //rotate(angle-270); //rotates the arrow point

    line(this.x, this.y, this.previousX, this.previousY); //draw a line beetween the vertices
    //angle = this.heading 
    var one = createVector(0 - trailWidth, 60) // THE POINT
    one.rotate(angle)
    fill("yellow")
    //ellipse(one.x, one.y, 10, 10)

    var two = createVector(20, 0)
    fill("pink")
    two.rotate(angle)
    //ellipse(two.x, two.y, 10, 10)

    var three = createVector(0 - trailWidth, -60);
    three.rotate(angle)
    fill("cyan")
    //ellipse(three.x, three.y, 10, 10)


    fill("white")
    triangle(one.x, one.y,
      two.x, two.y,
      three.x, three.y); //the point
    pop();


    this.previousX = this.x
    this.previousY = this.y
   //print(this.x, this.y)

  }
}