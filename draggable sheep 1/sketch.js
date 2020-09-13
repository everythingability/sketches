// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>
let drag;
let mainImage;
let draggables = []
let fragments = []
let numberOfchunks = 4
let img
var w, h

function imageLoaded(img){
  
  w = img.width / numberOfchunks
  h = img.height / numberOfchunks
  print( "loaded", w, h)

}

function preload() {
  console.clear()
  img = loadImage("sheep_alone_small.png",imageLoaded );
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  
  createDraggables()
  for (y = 0; y < numberOfchunks; y++) {
    for (x = 0; x < numberOfchunks; x++) {
      var thisX = w * x
      var thisY = h * y
      print( thisX, thisY, thisX + w, thisY + h )
      var theFragment = img.get(thisX, thisY, thisX + w, thisY + h)
      //save(theFragment, "jpg")
      fragments.push(theFragment)
    }
    print("\r")
  }
  print(fragments.length, "fragments")

  textureMode(NORMAL);
  imageMode(CORNER)
  print(img.width, img.height, w, h)

  //noLoop()

}

function draw() {
  background("red")
  translate(-width / 2, -height / 2)
  makeShapesAndDisplay()

  for (d in draggables) {

    draggables[d].update();
    draggables[d].over();
    draggables[d].show();
  }

}

function mousePressed() {
  for (d in draggables) {
    draggables[d].pressed();
  }
}

function mouseReleased() {
  // Quit dragging
  if (currentDragIndex) {
    draggables[currentDragIndex].dragging = false
  }
}

function createDraggables() {
  var i = 0
  for (y = 0; y <= img.height; y += h) { //ha! ha! y first
    for (x = 0; x <= img.width; x += w) {
      drag = new Draggable(i, x, y)
      draggables.push(drag)
      i++
    }
  }
  print(draggables.length, "draggables")
  print (draggables)

}

function makeShapesAndDisplay() {

  var i = 0 // the 5s
  var t = 0
  for (y = 0; y <= numberOfchunks + 1; y++) {
    for (x = 0; x <= numberOfchunks + 1; x++) {

      if (y == numberOfchunks | x == numberOfchunks) {
         print("!Don't do: ", i, x, y) 
         
      }else if   (y == numberOfchunks+1|x==numberOfchunks+1)  { //5, 10 etc
        print("!Don't do: ", i, x, y) 
        i++  
      } else {
        print("#######" + i + "#########" + y) 
        
        p1i= i
        p2i = i+1
        p3i = i + numberOfchunks+1     
        p4i = i + numberOfchunks+2
        print (p1i+","+ p2i+","+ p3i+","+ p4i)
        
        try{
          p1 = draggables[p1i]
          p2 = draggables[p2i]      
          p3 = draggables[p4i]
          p4 = draggables[p3i]
          
          if (t < fragments.length){
          let imgFragment = fragments[t]
         
          if (imgFragment != 'undefined'){
            print(imgFragment, t, fragments.length)
            beginShape()
                texture(imgFragment);
                vertex(p1.x, p1.y, 0, 0);
                vertex(p2.x , p2.y, 1, 0);       
                vertex(p3.x , p3.y , 1, 1);  
                vertex(p4.x, p4.y , 0, 1);
                print("t", t, "    ", p1.x+","+p1.y+"  "+p2.x +","+ p2.y+"  "+p3.x +","+ p3.y + "  " +p4.x+","+ p4.y )
            endShape(CLOSE)
            
            stroke("yellow")
            strokeWeight(0)
            rect(p1.x , p1.y, p3.x , p3.y)
            
          }
          } 
        }catch(e){
          print(e)
        }
        
        
        t++
        i++
        }
      

    }

  }





}