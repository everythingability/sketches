//Based on work by # Copyright (c) 2013 by Miguel Grinberg in Pyprocessing. Thanks Miguel!
var matrices = {
    'true': [ [ 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0.299, 0.587, 0.114 ] ],
    'mono': [ [ 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114 ] ],
    'color': [ [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 1 ] ],
    'halfcolor': [ [ 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 1 ] ],
    'optimized': [ [ 0, 0.7, 0.3, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 1 ]]}
  
var leftImage
var rightImage

var leftBuffer
var rightBuffer
var shiftX = 5
var shiftY = 5


function preload(){
    print("loading")
    filename = "female_cow.jpg"
    leftImage = loadImage(filename)
    rightImage = loadImage(filename)
}
function setup(){  
  createCanvas(leftImage.width+ shiftX,  leftImage.height +shiftY)   
   noLoop()
}

function draw(){
  
   
    image(leftImage, 0, 0)
    leftBuffer = get()
    leftBuffer.loadPixels()
  
    image(rightImage, 0+shiftX, 0+shiftY)//Move it to the right and down a bit
    rightBuffer = get()
    rightBuffer.loadPixels()
  
  
    make_anaglyph(leftBuffer, rightBuffer)
    //print( leftBuffer)
    image(leftBuffer,0,0 )
   // text("hello", width/2 , height/2)
    
}          

    
    
function make_anaglyph(leftBuffer, rightBuffer){
    print("starting...")
    leftBuffer.loadPixels()
    rightBuffer.loadPixels()
    m = matrices['optimized']

        for (x =0; x <leftBuffer.pixels.length; x+=4){
            r1 = leftBuffer.pixels[x]
            g1 = leftBuffer.pixels[x+1]
            b1 = leftBuffer.pixels[x+2]
          
            r2 = rightBuffer.pixels[x]
            g2 = rightBuffer.pixels[x+1]
            b2 = rightBuffer.pixels[x+2]

           leftBuffer.pixels[x]   = int( r1*m[0][0] + g1*m[0][1] + b1*m[0][2] + r2*m[1][0] + g2*m[1][1] + b2*m[1][2] )
            leftBuffer.pixels[x+1] = int( r1*m[0][3] + g1*m[0][4] + b1*m[0][5] + r2*m[1][3] + g2*m[1][4] + b2*m[1][5])
            leftBuffer.pixels[x+2]  =int( r1*m[0][6] + g1*m[0][7] + b1*m[0][8] + r2*m[1][6] + g2*m[1][7] + b2*m[1][8] )
        }
      //print( ".")
    
  leftBuffer.updatePixels()
}
    
    

    



