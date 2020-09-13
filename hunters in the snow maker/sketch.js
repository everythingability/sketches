let bx;
let by;
let bw
let bh;

let locked = false;


var points= []
var img

function jsonLoaded(s){
  points = s
  
}


function preload(){
  loadJSON("points.json", jsonLoaded)
  img = loadImage("hunters-in-the-snow_full_even_smaller.jpg") 
 
}


function mousePressed() {
    locked = true;
    noFill()
    strokeWeight(2)
    bx = mouseX ;
    by = mouseY ;
}
function mouseDragged() {
  if (locked) {
    bw = mouseX - bx;
    bh = mouseY - by;
  }
}

function mouseReleased() {
  locked = false;
  points.push([int(bx), int(by), int(bw), int(bh) ])
  print ("Saving", points.length, "points")
  //saveJSON(points, "points.json")
  //save(JSON.stringify(points), "points.json")
}

  

function keyPressed(){
  saveJSON(points, "points.json")
}


function setup() {
  createCanvas(img.width, img.height).parent("#canvas");
  noFill()
  textSize(18)
  print( points.length, "points")
}

function draw() {
  image(img, 0, 0)
  for(p in points){
    stroke("red")
    rect(points[p][0], points[p][1], points[p][2], points[p][3])
    text (p, points[p][0], points[p][1])
  }
}