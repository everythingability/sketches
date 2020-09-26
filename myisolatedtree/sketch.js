window.Settings = {
  branchColor: '#000000', // black
  nest: 4,
  startBranchLength: 100,
  rightBranchMagnificationRate:  [0.4, 0.5], // [min, max]
  centerBranchMagnificationRate: [0.8, 0.9], // [min, max]
  leftBranchMagnificationRate:   [0.4, 0.5], // [min, max]
  rightRotation: Math.PI / 3,
  leftRotation:  Math.PI / 3,
  rotationCenter:    [-0.2, 0.2], // [min, max]
  rightRotationRate: [0.6, 0.9],  // [min, max]
  leftRotationRate:  [0.6, 0.9],  // [min, max]
}

var img
var tex
function preload(){
 img = loadImage("birch_leaves.png")
 tex = loadImage("bark.png")
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  drawBackgroundGradient()
  // drawingContext.shadowColor = color(30, 30, 30,100);
  //drawingContext.shadowBlur =10;
  
  makeForest()
  print("ready")
}

function mouseClicked() {
      drawTree(mouseX,  mouseY);
}

function makeForest() {
  //translate(-width/2, -height/2)

  for (y=100; y<height; y+= 5 ){ 

    let yValue = map(y, height/2, 0, 0, 200);
    let f =  int(exp(yValue));
    for (n =f; n>0; n--){}
      print("rate:",f, " y:",y,  " n:", n)
      x = random(-100, width+ 100)

       /*   //draw widespead short grass behind
        for (var i = 0; i < 150; i++) {
          var gX =  x + random(-200, 200);
          var gY = y //+ random(-50, -70);
          stroke(41, random(100,180), 0, 200);
          line(gX, gY, gX+random(-20, 20), gY+random(-10,-20)); 
          
        }//*/
      drawTree(x,  y);

      /*//draw some clumps in front
      for (var i = 0; i < 150; i++) {
        var gX =  x + random(-50, 50);
        var gY = y + random(10, 30);
        stroke(41, random(100,180), 0, 200);
        line(gX, gY, gX+random(-20, 20), gY+random(-50,-100)); 
        
      }//*/
    }
}
  

 


function drawTree(x, y) {
 
  //noStroke()
  fill("#fff")
  translate(x, y);
  rotate(PI + random( -0.06 , .06));

  //stroke(Settings.branchColor);
  var s = map(y, height, 0, 400, 50)
  //print(int(x), int(y), int(s))
        
  branch(0, 0, s, int(random(4,7)));
  resetMatrix() 
   translate(x,y)
    //draw widespead short grass behind
    for (var i = 0; i <100; i++) {
      stroke(194, random(232,180), 132, 200);
      var gX =  0 + random(-50, 50);
      var gY = random(-20, -49);//the behindness
      
      line(gX, gY, gX+random(-10, 10), gY+ random(s* 0.2)); 
      
    }//*/
    resetMatrix()

  /*//Do the shade thang
  fill(0, 2)
  rect(0, 0, width, height)//*/
  //filter(BLUR)

}

function branch(beginX, beginY, length, nest) {
  // --- decrement nest ---
  //translate(-width/2, -height/2)
  if (nest === undefined) nest = 10;
  if (nest === 0) return;

  if (length <= 0.01) return;

  // --- draw line ---
  var endX = beginX;
  var endY = beginY + length;
  
  ////////////////////////////
  var d = dist(beginX, beginY, endX, endY)
  let v1 = createVector(beginX, beginY);
  let v2 = createVector(endX, endY);
  let angle = v1.angleBetween(v2);
  
  push()
    translate(beginX, beginY)
    rotate(angle)
   
    noStroke();
    //rect(0,0, nest*10, d)
    
     w = length/30
    /*
     beginShape();
      //texture(tex);
      vertex(-w * 0.8, 0);
      vertex(w * 0.8, 0);
      vertex(w * 0.65, d * 1.03);
     vertex(-w * 0.65, d * 1.03);
    endShape(CLOSE);*/

    image(tex, (-w * 0.8)/2, 0 ,w*2 , d * 1.03 )
  //*/
  pop()
  
  
  
  
  ///////////////////////////////
  //line(beginX, beginY, endX, endY);



  if (nest === 1){
    //draw some twigs and branches, last one? 
    push()
      translate(endX, endY);

     

      rotate(rotateRight);
       
        
      image(img, 0, 0, nest * 70,nest * 70)//draw leaves
    pop()
    return;
  }

  

  // --- new branch (recursion) ---
  var rotateRight  =  Settings.rightRotation * random.apply(null, Settings.rightRotationRate);
  var rotateCenter =  random.apply(null, Settings.rotationCenter);
  var rotateLeft   = -Settings.leftRotation  * random.apply(null, Settings.leftRotationRate);

  translate(endX, endY);

  
  if(random() >.5){
    rotate(rotateRight);
    push()
      rotate(random(-0.5, 0.5))
      for (var i = 0; i < 1; i++) {
        strokeWeight(1)
        stroke(255, 255, 255, 200);
        /*fill("red")
        ellipse(0,0, 10,10)
        fill("yellow")
        ellipse(eX, eY, 10,10)//*/
        eX = random(-10,10)
        eY = 0-random(-10,-length* 0.7)
        line(0, 0, 0, eY);   
      }
    pop()
    branch(0, 0, length * random.apply(null, Settings.rightBranchMagnificationRate), nest - 1);
    rotate(-rotateRight);
  }

  if(random() >.05){
    rotate(rotateCenter);
    push()
      rotate(random(-0.5, 0.5))
      for (var i = 0; i < 1; i++) {
        strokeWeight(1)
        stroke(255, 255, 255, 200);
        /*fill("red")
        ellipse(0,0, 10,10)
        fill("yellow")
        ellipse(eX, eY, 10,10)//*/
        eX = random(-10,10)
        eY = 0-random(-10,-length* 0.7)
        line(0, 0, 0, eY);   
      }
    pop()

    
    
    branch(0, 0, length * random.apply(null, Settings.centerBranchMagnificationRate), nest - 1);
    rotate(-rotateCenter);
  }

  if(random() >.5){
    rotate(rotateLeft);
    push()
      rotate(random(-0.5, 0.5))
      for (var i = 0; i < 1; i++) {
        strokeWeight(1)
        stroke(255, 255, 255, 200);
        /*fill("red")
        ellipse(0,0, 10,10)
        fill("yellow")
        ellipse(eX, eY, 10,10)//*/
        eX = random(-10,10)
        eY = 0-random(-10,-length* 0.7)
        line(0, 0, 0, eY);   
      }
    pop()

    branch(0, 0, length * random.apply(null, Settings.leftBranchMagnificationRate), nest - 1);
    rotate(-rotateLeft);
  }

  translate(-endX, -endY);
}

function keyPressed(){
  if (key == 's'){
    saveCanvas("trees.jpg")
  }else if (key == ' '){
    makeForest()
  }else if (key == 'r'){
    drawBackgroundGradient()
    makeForest()
  
}else if (key == 'b'){
  background(50)
  //makeForest()
}
  
}

const Y_AXIS = 1;
const X_AXIS = 2;

function drawBackgroundGradient() {

    let b1, b2, c1, c2;
    b1 = color(255);
    b2 = color(0);
    c1 = color("#ADD5FC");
    c2 = color("#6BD17D");
    setGradient(0, 0, width, height/2, c1,  c2, Y_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    //translate(-width/2, -height/2)

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <=  h; i++) {
            let inter = map(i, y, h-y, 0, 1);
            let c = lerpColor(c1,color(0),  inter);
            stroke(c);
            print(x, i, x + w, i)
            line(x, i, x + w, i);
        }
        print("next")
        
        for (let i = h; i <= h+h; i++) {
          let inter = map(i, h, h+h, 0, 1);
          let c = lerpColor(color(0), c2, inter);
          stroke(c);
          print(x, i, x + w, i)
          line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
