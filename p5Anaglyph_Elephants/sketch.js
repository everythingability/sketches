//Based on work in 2013 by Miguel Grinberg in Pyprocessing. Thanks Miguel!
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
var shiftX = 10
var shiftY = 10

var trees, treesAnaglyph
var smallCow, smallCowAnaglyph
//var raptors, raptorsAnaglyph ..cos this ia jpg it draws as white square
var elephant, elephantAnaglyph
var mouse, mouseAnaglyph

function preload(){
    print("loading")

    smallCow = loadImage("small_cow.png")
    //raptors = loadImage("raptors.jpg")
    trees= loadImage("trees.jpg")
    elephant = loadImage("elephant.png")
    mouse = loadImage("mouse.png")
  
}


function setup(){  
  createCanvas(window.innerWidth , displayHeight) 
  
  print("anaglyphing");
  treesAnaglyph = buildSplitImages(trees,10, 10)
  //smallCowAnaglyph = buildSplitImages(smallCow, 40, 10)
  
  
  elephantAnaglyphWide = buildSplitImages(elephant, 20, 20)
  elephantAnaglyphMid = buildSplitImages(elephant, 10, 10)
  elephantAnaglyph = buildSplitImages(elephant, 5, 5)
  //mouseAnaglyph = buildSplitImages(mouse, 4, 4)
  
  
  noLoop()
}

function draw(){
  background(255)
  image(treesAnaglyph, 0, 0, width, window.innerHeight)
  var w = 380
  var h = 300
  var y = 480
  var unit = width/6

   
  image(elephantAnaglyphWide, (unit-w/2)/2, y+h/4, w*0.8, h*0.8)
  image(elephantAnaglyphWide, (width-unit), y+h/4, w*0.8, h*0.8)
  
  image(elephantAnaglyphMid, unit*2 - w, y, w*1.5, h*1.4)
  image(elephantAnaglyphMid, width/2 + (unit*2) - w , y, w*1.4, h*1.4)
  
   //front and centre
  image(elephantAnaglyph, width/2 -w, y-h/2, w*2.3, h*2.3)
}          

function buildSplitImages(leftImage, shiftX, shiftY){
  
    var buffer =  createGraphics(leftImage.width + shiftX,  leftImage.height +shiftY)  
    buffer.image(leftImage, 0, 0)
    var leftBuffer = buffer.get()
    leftBuffer.loadPixels()
  
  var buffer2 =  createGraphics(leftImage.width+ shiftX,  leftImage.height +shiftY)
  buffer2.image(leftImage, 0+shiftX, 0+shiftY)//Move it to the right and down a bit
  var rightBuffer = buffer2.get()
  rightBuffer.loadPixels()
  
   var newImage = make_anaglyph(leftBuffer, rightBuffer)
  return newImage
  
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
  return leftBuffer
}

function mousePressed(){
 saveCanvas ("anaglyph_" + int(random(0, 1000)) + ".png"); 
  
}
    
    

    



