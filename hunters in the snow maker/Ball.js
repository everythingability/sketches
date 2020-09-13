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
    noStroke();
    fill(this.cfill);
   
    image(img, this.x, this.y)
   
  }
}