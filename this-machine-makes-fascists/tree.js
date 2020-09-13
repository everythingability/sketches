var sketchWidth = 1000;
var sketchHeight = 500;
var currentTime;
var sliderTimer
var sliderBranchAngle;
 
 
function branch(x, y, w, a){
  strokeWeight(w * .07);
  a+=radians(1.1*random(-50,50));
  var newx = x+cos(a)*w
  var newy = y+sin(a)*w;
  line(x,y,newx,newy);
  if(w > 3){
    for(var i = 0; i < random(1,2); i++){
      
      branch(newx, newy, w*(random(0.15,0.75)), a+radians(random(0,a))); //make this user changable
      branch(newx, newy, w*(random(0.15,0.75)), a-radians(random(0,a)));
    }
  }
}
 
function makeTree(x, y, angle, radius){
  var c = color(pixelColor)
   
   stroke(c, 100);
   branch(x, y, random( 20, 70) ,angle);
}