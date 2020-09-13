var img
var s = 0
var radius
var minRadius
var bgColor ;
var blobWidth
var centreX 
var centreY
var seconds = 60

function preload(){
  img = loadImage("All The Together.png")
 
}

function setup() {
  createCanvas(1200, 900);
  
  img.resize(width,height)
  bgColor = color(255,255, 255)
  bgcolor = "black"
  //frameRate(14)
  background("white");
  noStroke()
  fill(255,0)
  ellipseMode(CENTER)
  smooth();
  imageMode(CENTER)
  image(img, width/2, height/2)
  
  radius = width/3
  minRadius = 10
  blobWidth = 8
   
   sliderTimer = 0
  centreX = width/2
  centreY = height/2
 
}



function draw() {
  sliderBranchAngle = random(80, 950)
  translate(centreX, centreY)
  
   push() ///SECOND HAND
       
       
       s = s % 59
       slice = 2 * Math.PI / seconds //seconds
       angle = (slice * s)

        //centre, + radius + angle
        newX = ( radius)  * Math.cos(angle)
        newY = ( radius) * Math.sin(angle)
         
   
  pixelColor =get(width/2 + newX ,height/2 + newY)
  
  /*
  print("red", red(pixelColor))
  print( "blue",blue(pixelColor))
  print( "green",green(pixelColor))*/
  
  
  
 picX = 0+ newX 
   picY = 0 + newY
 
  
   
     if (  (red(pixelColor) >200 &             green(pixelColor)<200 &       blue(pixelColor)<150) |
        (red(pixelColor) <200 &             green(pixelColor)<200 &       blue(pixelColor)>150)
        
        
        
        
        ) {
        
        //fill("yellow");
         //ellipse(picX, picY, blobWidth, blobWidth)
         x = random(0,4)
         if (x <1 ){
           if (radius > minRadius){
            makeTree(picX, picY, angle, 100)
           }
         }
      }else{
        //fill("black")
      ellipse(picX, picY, blobWidth, blobWidth)
      }
  pop()

      
  s ++
      
 if (s == 59){
   radius = radius - blobWidth

 }
  
}

function mousePressed(){
 
  print(red(get(mouseX, mouseY)))
  print(green(get(mouseX, mouseY)))
  print(blue(get(mouseX, mouseY)))
  
  saveCanvas(s + ".png")
}