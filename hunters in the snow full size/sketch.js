var img, bg;
var fire0, fire1, fire2, fire3
var points = []

function pointsLoaded(p){
   points = JSON.parse(p)
}

function preload() {
  bg = loadImage('hunters-in-the-snow_full_smaller.jpg');
 loadJSON("points.json", pointsLoaded)
}

function setup() {
  createCanvas(1000, 800);
  fire0 = loadAnimation('assets/fire0/fire0-1.png',
    'assets/fire0/fire0-2.png',
    'assets/fire0/fire0-3.png',
    'assets/fire0/fire0-4.png',
    'assets/fire0/fire0-5.png',
    'assets/fire0/fire0-6.png',
    'assets/fire0/fire0-7.png',
    'assets/fire0/fire0-8.png',
    'assets/fire0/fire0-9.png',
    'assets/fire0/fire0-10.png',
    'assets/fire0/fire0-11.png',
    'assets/fire0/fire0-12.png',
    'assets/fire0/fire0-13.png',
    'assets/fire0/fire0-14.png',
    'assets/fire0/fire0-15.png',
    'assets/fire0/fire0-16.png',
    'assets/fire0/fire0-17.png',
    'assets/fire0/fire0-18.png',
    'assets/fire0/fire0-19.png',
    'assets/fire0/fire0-20.png',
    'assets/fire0/fire0-21.png',
    'assets/fire0/fire0-22.png',
    'assets/fire0/fire0-23.png',
    'assets/fire0/fire0-24.png',
    'assets/fire0/fire0-25.png',
    'assets/fire0/fire0-26.png',
    'assets/fire0/fire0-27.png',
    'assets/fire0/fire0-28.png',
    'assets/fire0/fire0-29.png',
    'assets/fire0/fire0-30.png',
    'assets/fire0/fire0-31.png',
    'assets/fire0/fire0-32.png',
    'assets/fire0/fire0-33.png',
    'assets/fire0/fire0-34.png',
    'assets/fire0/fire0-35.png',
    'assets/fire0/fire0-36.png',
    'assets/fire0/fire0-37.png',
    'assets/fire0/fire0-38.png',
    'assets/fire0/fire0-39.png',
    'assets/fire0/fire0-40.png',
    'assets/fire0/fire0-41.png',
    'assets/fire0/fire0-42.png',
    'assets/fire0/fire0-43.png',
    'assets/fire0/fire0-44.png',
    'assets/fire0/fire0-45.png',
    'assets/fire0/fire0-46.png',
    'assets/fire0/fire0-47.png',
    'assets/fire0/fire0-48.png',
    'assets/fire0/fire0-49.png',
    'assets/fire0/fire0-50.png',
    'assets/fire0/fire0-51.png',
    'assets/fire0/fire0-52.png',
    'assets/fire0/fire0-53.png',
    'assets/fire0/fire0-54.png',
    'assets/fire0/fire0-55.png',
    'assets/fire0/fire0-56.png',
    'assets/fire0/fire0-57.png',
    'assets/fire0/fire0-58.png',
    'assets/fire0/fire0-59.png',
    'assets/fire0/fire0-60.png',
    'assets/fire0/fire0-61.png',
    'assets/fire0/fire0-62.png',
    'assets/fire0/fire0-63.png',
    'assets/fire0/fire0-64.png',
    'assets/fire0/fire0-65.png',
    'assets/fire0/fire0-66.png',
    'assets/fire0/fire0-67.png',
    'assets/fire0/fire0-68.png',
    'assets/fire0/fire0-69.png',
    'assets/fire0/fire0-70.png',
    'assets/fire0/fire0-71.png')

  fire1 = loadAnimation('assets/fire1/fire1-1.png',
    'assets/fire1/fire1-2.png',
    'assets/fire1/fire1-3.png',
    'assets/fire1/fire1-4.png',
    'assets/fire1/fire1-5.png',
    'assets/fire1/fire1-6.png',
    'assets/fire1/fire1-7.png',
    'assets/fire1/fire1-8.png',
    'assets/fire1/fire1-9.png',
    'assets/fire1/fire1-10.png',
    'assets/fire1/fire1-11.png',
    'assets/fire1/fire1-12.png')

  fire3 = loadAnimation('assets/fire3/fire3-0.png',
    'assets/fire3/fire3-1.png',
    'assets/fire3/fire3-2.png',
    'assets/fire3/fire3-3.png',
    'assets/fire3/fire3-4.png',
    'assets/fire3/fire3-5.png',
    'assets/fire3/fire3-6.png',
    'assets/fire3/fire3-7.png',
    'assets/fire3/fire3-8.png',
    'assets/fire3/fire3-9.png',
    'assets/fire3/fire3-10.png',
    'assets/fire3/fire3-11.png',
    'assets/fire3/fire3-12.png',
    'assets/fire3/fire3-13.png',
    'assets/fire3/fire3-14.png',
    'assets/fire3/fire3-15.png',
    'assets/fire3/fire3-16.png');

  fire2 = loadAnimation('assets/fire2/fire2-1.png',
    'assets/fire2/fire2-2.png',
    'assets/fire2/fire2-3.png',
    'assets/fire2/fire2-4.png',
    'assets/fire2/fire2-5.png',
    'assets/fire2/fire2-6.png',
    'assets/fire2/fire2-7.png',
    'assets/fire2/fire2-8.png',
    'assets/fire2/fire2-9.png',
    'assets/fire2/fire2-10.png',
    'assets/fire2/fire2-11.png',
    'assets/fire2/fire2-12.png')

}

function mousePressed(){
  //points.push([mouseX, mouseY])
 // print (points)
  saveCanvas("Hunters in the Snow.jpg")
}
function keyPressed(){
  //save(JSON.stringify(points), "points.json")
}

function draw() {
  image(bg, 0, 0, width, height);
  /*
  animation(fire3, 340, 400);
  animation(fire3, 270, 320);
  animation(fire1, 835, 700)
  animation(fire0, 700, 430)
  animation(fire2, 40, 390)
  */
  
  
    for (i=23; i <points.length; i++){
     var x = points[i][0]
     var y = points[i][1]
     print(x, y)
     animation(fire0, x, y-10);
  }
  
    for (i=13; i <23; i++){
     var x = points[i][0]
     var y = points[i][1]
     print(x, y)
     animation(fire1, x, y-50);
  }
  
    for (i=4; i <13; i++){
     var x = points[i][0]
     var y = points[i][1]
     print(x, y)
     animation(fire2, x, y-120);
  }
  
  for (i=0; i <3; i++){
     var x = points[i][0]
     var y = points[i][1]
     print(x, y)
     a = animation(fire3, x, y-140);
     //var l = fire3.getLastFrame()
     //fire3.goToFrame( int(random(0, l)) )
  }
  
 
}

// function imageLoaded(img) {
//   image(img, 0, 0);
// }