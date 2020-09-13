// P_2_2_5_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * pack as many cirlces as possible together
 *
 * MOUSE
 * press + position x/y : move area of interest
 *
 * KEYS
 * 1                    : show/hide circles
 * 2                    : show/hide lines
 * 3                    : show/hide svg modules
 * arrow up/down        : resize area of interest
 * f                    : freeze process. on/off
 * s                    : save png
 */
'use strict';

var circles = [];

var minRadius = 3;
var maxRadius = 100;

// for mouse and up/down-arrow interaction
var mouseRect = 15;
var kpopImages =[]
var freeze = false;
// style selector, hotkeys 1, 2, 3
var showCircle = true;
var showLine = false;
var showSVG = true;

var kpops=`FAVPNG_btob-k-pop-logo-korean-language-move_rcENb31i.png
FAVPNG_exo-k-pop-logo-korean-idol-overdose_94V4JvSi.png
kisspng-b-a-p-logo-0-k-pop-pop-5ace9cd2364516.7567474815234900022223 copy.png
kisspng-b-a-p-logo-0-k-pop-pop-5ace9cd2364516.7567474815234900022223.png
kisspng-count-dooku-exo-k-pop-logo-mama-independent-5b26b275869789.9196349615292627095513.png
kisspng-exo-k-power-k-pop-logo-exo-k-pop-5b2bec11f145e2.0471550215296051379883.png
kisspng-exo-power-k-pop-logo-sm-town-go-joonhee-5b05f1cadc4322.9500318015271162349022.png
kisspng-exo-power-mama-k-pop-exotic-wind-5ade74309b9482.2249269715245281766373.png
kisspng-exo-xoxo-k-pop-logo-growl-5b2ba6d9f29056.6578608115295874179936.png
kisspng-infinite-k-pop-logo-infinity-symbol-evolution-infinite-glove-5b45e6f1564610.7641338015313077613534.png
WM_Entertainment_logo.png`.split("\n")
//kisspng-f-x-k-pop-logo-red-light-s-m-entertainment-monsta-x-logo-5b2378d171d324.0043531315290513454662.png

// svg vector import

var naziImages =[]
var nazis =`cb0bffaa3e6fc8e798c3bd5170e0618d97fa6b83-620x416.png
crossed-grenades-1.png
Flag_of_the_British_Union_of_Fascists.png
life-rune-1.png
main-qimg-f4d9fee78be0158748f35130f02b2e21.png
Neo-Nazi_celtic_cross_flag.svg.png
ss-bolts-1.png
sturmabteilung-1.png
swastika-1.png
BlackSun.svg`.split("\n")
var module1;
var module2;



function preload() {
  module1 = loadImage('data/stern_farbe.svg');
  module2 = loadImage('data/stern2_farbe.svg');
  for (var i=0;i<kpops.length;i++){
    try{
    var fname =kpops[i]
    var path = 'data/kpops/' + fname
    print(path)
    kpopImages.push(loadImage(path))
    }catch(e){
      print(e,path)
    }
  }
  for (i=0;i<nazis.length;i++){
    try{
    var fname =nazis[i]
    var path = 'data/nazis/' + fname
    print(path)
    naziImages.push(loadImage(path))
    }catch(e){
      print(e, path)

    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  print(kpopImages.length,naziImages.length )
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  imageMode(CENTER);
}

function draw() {
  background("red");

  // Choose a random or the current mouse position
  var newX = random(maxRadius, width - maxRadius);
  var newY = random(maxRadius, height - maxRadius);
  if (mouseIsPressed && mouseButton == LEFT) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  // Try to fit the largest possible circle at the current location without overlapping
  for (var newR = maxRadius; newR >= minRadius; newR--) {
    var intersection = circles.some(function(circle) {
      return dist(newX, newY, circle.x, circle.y) < circle.r + newR;
    });
    if (!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  // Draw all circles
  circles.forEach(function(circle) {
   

    // Draw the circle itself.
    circle.draw();

    if (showLine) {
      // Try to find an adjacent circle to the current one and draw a connecting line between the two
      var closestCircle = circles.find(function(otherCircle) {
        return dist(circle.x, circle.y, otherCircle.x, otherCircle.y) <= circle.r + otherCircle.r + 1;
      });
      if (closestCircle) {
        stroke("red");
        stroke("yellow")
        strokeWeight(4);
        line(circle.x, circle.y, closestCircle.x, closestCircle.y);
        circle.draw();
      }
    }
  });

  // Visualise the random range of the current mouse position
  if (mouseIsPressed && mouseButton == LEFT) {
    stroke(100, 230, 100);
    strokeWeight(2);
    rect(mouseX, mouseY, mouseRect, mouseRect);
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.rotation = random(TAU);
  this.imageNum = int(random(0,naziImages.length-1 ))

  Circle.prototype.draw = function() {
    if (showCircle) {
      stroke(0);
      strokeWeight(4);
      fill("white")
      ellipse(this.x, this.y, this.r, this.r);
    }

    if (showSVG) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      if (this.r == maxRadius) {
        //image(module1, 0, 0, this.r * 2, this.r * 2);
        image(kpopImages[this.imageNum], 0, 0, this.r * 1.35, this.r * 1.35)
      } else {
        image(naziImages[this.imageNum],0, 0, this.r * 1.35, this.r * 1.35)
      }
      pop();
    }
   
  };
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode == UP_ARROW) mouseRect += 4;
  if (keyCode == DOWN_ARROW) mouseRect -= 4;

  // toggle freeze drawing
  if (key == 'f' || key == 'F') {
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }

  // toggle style
  if (key == '1') showCircle = !showCircle;
  if (key == '2') showLine = !showLine;
  if (key == '3') showSVG = !showSVG;
}
