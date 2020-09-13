var mov;
var img;
var slices = 12;
var angle ;
var angle2 ;
var radius;
var shape;
var offset = 0;
var factor ;
var shape2;
var movie;
var isMovieLoaded = false;
function movieLoaded(){
  
}
function preload(){
  img = loadImage("sheep_alone_small.png");
  mov = createVideo(["1.mp4"]);
  isMovieLoaded = true
}

function setup() {
  createCanvas(500, 500, WEBGL);	
  
  factor = 2; //QUARTER_PI/0.8 //HALF_PI // 2.181
  angle = PI/slices;
  angle2 = PI/slices;
  radius = min(width, height);//2*4.9;
  //angleMode(RADIANS);
  imageMode(CENTER);
  
  movie = createGraphics(width, height); // Create offscreen 
  shape = createGraphics(width, height, WEBGL); // Create offscreen 
  shape2 = createGraphics(width, height, WEBGL); // Create offscreen 
  textSize(100);
  // print(angle);
}


function draw() {
  offset += PI/180; //sort of equals speed...
  
  movie.image(mov, 0, 0, width, height);
  img = movie;
  
  shape.beginShape(TRIANGLES);
  //shape.translate(0, 0);
  shape.texture(movie);
  shape.noStroke();
  shape.imageMode( CENTER);
  
  shape.vertex(0, 0, img.width/2, img.height/2);
  //shape.ellipse(0,0, 20, 20);
  shape.vertex(cos(angle)*radius, sin(angle)*radius, cos(angle+offset)*radius+img.width/2, sin(angle+offset)*radius+img.height/2);
  shape.vertex(cos(-angle)*radius, sin(-angle)*radius, cos(-angle+offset)*radius+img.width/2, sin(-angle+offset)*radius+img.height/2);
  shape.endShape(CLOSE);
  
  
  //I tried making another shape to see if that was it?
  shape2.beginShape(TRIANGLES);
  //shape2.translate(0, 0);
  shape2.texture(img);
  shape2.noStroke();
  shape2.imageMode( CENTER);   
  shape2.vertex(0, 0, img.width/2, img.height/2);
  //shape2.ellipse(0,0, 20, 20);
  shape2.vertex(cos(angle)*radius, sin(angle)*radius, cos(angle+offset)*radius+img.width/2, sin(angle+offset)*radius+img.height/2);
  shape2.vertex(cos(-angle)*radius, sin(-angle)*radius, cos(-angle+offset)*radius+img.width/2, sin(-angle+offset)*radius+img.height/2);
  shape2.endShape(CLOSE);//*/
  
  
  
  
  translate(0,0);
  for (var i = 0; i < slices; i++) {
    if(i % 2 == 1){//odd numbers     
      var a = map(angle, 0, 0.2617, 0, 360*7 );
      shape.rotate(a  );
      scale(-1,1);    
      shape.fill("cyan");   
      image(shape, 0,0);  
      print("odd") ;
    }else{//even numbers
      var b = map(angle, 0, 0.2617,  0, 360*7);
      shape2.rotate(b);
      scale(1,-1);      
      shape2.fill("yellow");
      image(shape2, 0,0); 
      print("even")  ;
    }     
  }
  
  //factor += 0.1;
  
  
}

function mousePressed(){
  //print(factor)
  factor += 0.17;
  isMovieLoaded = true
  mov.hide();
  mov.loop();
}
