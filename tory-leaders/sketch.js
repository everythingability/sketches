var data;
var images;
var names;
var c = 0;


function preload(){
  data = loadTable("tories.csv", 'csv', 'header') 
  print( data.getRowCount())
  
}

function setup() {
  createCanvas(480, 640);
  background("blue")
  fill("yellow")
  textSize(100);
 
  images = []
  names = []
  
 for (i = 0; i< data.getRowCount(); i++){
    var name = data.getString(i, "name");
    var src = data.getString(i, "wikipediaimage");
    //print ("src:",src)
    var img = loadImage (src );
   
    images.push(img);
    names.push( name)
  }
  
  print(images.length)
  print(names.length)
   
}

function draw() {
  //background("blue");
  tint(0,100, 200, 20)
  image(images[int(random(images.length))], 0,0, width, height)
  //text(names[c], width/2, height/2)
  c++;
  
  //saveCanvas(random(0,1000) + nf(c, 2), 'evil.jpg', 'jpg');
  if (c == images.length-1) c = 0;
  
}