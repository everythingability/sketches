// Butterfly class with flocking behavior
class Butterfly {
  constructor(pos, vel) {
    this.pos = pos; // Position
    this.vel = vel; // Velocity
    this.acc = createVector(0, 0, 0); // Acceleration
    this.maxForce = 0.1; // Maximum steering force for alignment, cohesion, separation
    this.maxSpeed = 3; // Desired velocity for the steering behaviors
    this.r = random(0, 255); // red color of the boid
    this.g = random(0, 255); // green color of the boid
    this.b = random(0, 255); // blue color of the boid
    
    this.rotX = random(0.008, 0.027);
  }
  
  // Alignment rule
  // Steering to average neighbors velocity
  alignment(neighbors) {
    let steering = createVector();
    for (let other of neighbors) steering.add(other.vel); // Sum of neighbor velocities 
    if (neighbors.length > 0) {
      steering.div(neighbors.length); // Average neighbors velocity
      steering.setMag(this.maxSpeed); // Desired velocity
      steering.sub(this.vel); // Actual steering
      steering.limit(this.maxForce); // Steering limited to maxForce
    }
  	return steering;
  }
  
  // Cohesion rule
  // Steering to the average neighbors position
  cohesion(neighbors) {
    let steering = createVector();
    for (let other of neighbors) steering.add(other.pos); // Sum of neighbor positions
    if (neighbors.length > 0) {
      steering.div(neighbors.length); // Average neighbors position
      steering.sub(this.pos); // Orientation of the desired velocity
      steering.setMag(this.maxSpeed); // Desired velocity
      steering.sub(this.vel); // Actual steering
      steering.limit(this.maxForce); // Steering limited to maxForce
    }
    return steering;
  }
  
  // Separation rule
  // Steering to avoid proximity of the neighbors
  separation(neighbors) {
    let steering = createVector();
    for (let other of neighbors) {
      let diff = p5.Vector.sub(this.pos, other.pos); // Vector from other boid to this boid
      let d = max(other.distance, 0.01); // Distance between other boid and this boid
      steering.add(diff.div(d)); // Magnitude inversely proportional to the distance
    }
    if (neighbors.length > 0) {
      steering.div(neighbors.length); // Orientation of the desired velocity
      steering.setMag(this.maxSpeed); // Desired velocity
      steering.sub(this.vel); // Actual steering
      steering.limit(this.maxForce); // Steering limited to maxForce
    }
  	return steering;
  }
  
  // Application of the rules
  flock(boids, quadTree) {
    // Go to the middle if goMiddle is true
    // Create a large force towards the middle, apply it to the boid, and "return" to not apply other forces
    if (goMiddle) {
      let force = createVector(-this.pos.x, -this.pos.y, -this.pos.z);
      force.setMag(this.maxForce * 20);
      this.acc.add(force);
      return;
    }
    
    let radius = controls.perceptionSlider; // Max distance of a neighbor
    let neighbors = [];
    
    if (useQuadTree == true) {
      // VERSION WITH QUADTREE
      // Make an array of neighbors, i.e. all boids closer than the perception radius
      // The array will be passed to the different flocking behaviors
      let range = new Cube(this.pos.x, this.pos.y, this.pos.z, radius, radius, radius);
      let maybeNeighbors = quadTree.query(range);
      for (let other of maybeNeighbors) {
        let distance = this.pos.dist(other.pos);
        if (other != this && distance < radius) {
          other.distance = distance; // Record the distance so it can be used later
          neighbors.push(other); // Put this neighbor in the "neighbors" array
        }
      }
    } else {
      // VERSION WITHOUT QUADTREE
      // Make an array of neighbors, i.e. all boids closer than the perception radius
      // The array will be passed to the different flocking behaviors
      for (let other of boids) {
        let distance = this.pos.dist(other.pos);
        if (other != this && distance < radius) {
          other.distance = distance; // Record the distance so it can be used later
          neighbors.push(other); // Put this neighbor in the "neighbors" array
        }
      }
    }
    

    
    // Calculate the force of alignments and apply it to the boid
    let alignment = this.alignment(neighbors);
    alignment.mult(controls.alignmentSlider);
    this.acc.add(alignment);
    
    // Calculate the force of cohesion and apply it to the boid
    if (t > 40) { // No cohesion in the first 40 frames
      let cohesion = this.cohesion(neighbors);
      cohesion.mult(controls.cohesionSlider);
      this.acc.add(cohesion);
    }
    
    // Calculate the force of separation and apply it to the boid
    let separation = this.separation(neighbors);
    separation.mult(controls.separationSlider);
    this.acc.add(separation);
    
    // If the boid is flies too high or too low, apply another force to make it fly around the middle of space's depth
    if (this.pos.z < -depth/8 || this.pos.z > depth/8) {
      let force = createVector(0, 0, -this.pos.z / depth * this.maxForce * 2);
      this.acc.add(force);
    }
    
    // If the boid has no neighbor, apply random forces so it can go find other boids
    if (neighbors.length == 0) {
      let force = p5.Vector.random3D().mult(this.maxForce/4);
      force.z = 0; // Only go find other in an XY plane
      this.acc.add(force);
    }
  }
  
  // Update position, velocity, and acceleration
  update(gap) {
    // Apply physics
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.999); // Some friction
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    
    // Teleport to opposite side if the boid goes further than a side of space (X and Y axis)
    // Except for the Z axis, as there is already a force keeping the boid from getting too far
    if (this.pos.x > width/2 + gap) this.pos.x -= width + 1.7 * gap;
    if (this.pos.x < -(width/2 + gap)) this.pos.x += width + 1.7 * gap;
    if (this.pos.y > height/2 + gap) this.pos.y -= height + 1.7 * gap;
    if (this.pos.y < -(height/2 + gap)) this.pos.y += height + 1.7 * gap;
  }
  
  // Show the butterfly on screen
  show() {
    
    noStroke();
    ambientLight(150);
    ambientMaterial(this.r, this.g, this.b);
    
    let v = createVector(this.vel.x, this.vel.y, this.vel.z);
    let fc = frameCount * 8;
    
    //Right wing
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotate(v.heading());
    rotateY(0.5);
    rotateX(PI/2 * cos(fc * this.rotX));
    model(wr);
    pop();
    
    //Left wing
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotate(v.heading());
    rotateY(0.5);
    rotateX(-PI/2 * cos(fc * this.rotX));
    model(wl);
    pop();
    
    // Show perception radius, all circles are drawn at z = 0
    if (showPerceptionRadius) {
      stroke(255, 255, 255, 100);
      noFill();
      strokeWeight(1);
      let perception = controls.perceptionSlider * 2;
      ellipse(this.pos.x, this.pos.y, perception, perception);
    }
  }
}