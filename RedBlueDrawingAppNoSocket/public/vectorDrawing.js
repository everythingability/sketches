var drawing = []
var currentPath
var isDrawing;

function setupVectorDrawing(){
  xRedOffset = randomChoice(-2, 2)
  yRedOffset = randomChoice(-2, 2)
}

function drawVectorDrawing(){

  if (isDrawing){
      var point = {x:mouseX -xDiff , y:mouseY}

      currentPath.push( point )
      if (mouseX <0 |mouseX > width|mouseY<0|mouseY>height){
            endPath()
           isDrawing = false
      }
  }

  buffer.clear()
  for( d in drawing){ //DO THE RED
       var path = drawing[d]

      buffer.beginShape()
      for (p in path){
          var point = path[p]
          buffer.vertex( point.x  , point.y  )
      }
      buffer.endShape()

  }
}

function startPath(){
    console.log("startPath")
    isDrawing = true
    currentPath = []
    buffer.noFill()
    drawing.push(currentPath)

}


function endPath(){
   isDrawing = false
   currentPath = []
}

function clearDrawing(){
    x = 0;
    drawing = []
}
