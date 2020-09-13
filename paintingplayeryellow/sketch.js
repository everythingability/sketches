
var x = 0
var xAmount = 0
var canvas

function setup() {

    myCrimson = "#EF0049"
    myBlue = "#1050EE"
    myRed = "#FC3507"
    myPurple = "#A800FF"

    let density = displayDensity();
    pixelDensity(density);
    canvas = createCanvas( window.innerWidth -20  , window.innerHeight -80 );

    fullscreen()

    canvas.mousePressed(startPath)
    canvas.mouseReleased(endPath)
    canvas.parent("main")
    canvas.drop(dropped);

    noStroke()
    stroke( myBlue )
    noFill()
    textSize(100)
    background( myCrimson );
    stroke( myBlue );

    strokeW = 8;
    strokeCap(ROUND);

    smooth();
    rectMode(CENTER)
    textAlign(CENTER, CENTER)

    initDB()


    xRedOffset = randomChoice(-2, 2)
    yRedOffset = randomChoice(-2, 2)

    xPurpleOffset = -xRedOffset
    yPurpleOffset = -yRedOffset

    var params = getURLParams()
    if (params.id){
     showDrawing(params.id)
    }
    createInterface()

     yellowsetup();

}


function draw() {
    background(myCrimson)

    if (img != null){
        push()
        translate(width/2, height/2)
        imageMode(CENTER);
        if (img.width > img.height){
            image(img, 0, 0, width, img.height*width/img.width)
        }else{
             image(img, 0, 0, img.width*height/img.height, height)
        }
        //image( img, 0,0)
        pop()
    }

    strokeWeight(strokeW)

    if (isDrawing){
        var offsetAmount = 2
        var point = {x:mouseX -x, y:mouseY}

        point.xRedOffset = xRedOffset
        point.yRedOffset  = yRedOffset

        point.xPurpleOffset =  xPurpleOffset
        point.yPurpleOffset =  yPurpleOffset

        currentPath.push( point )
        if (mouseX <0 |mouseX > width|mouseY<0|mouseY>height){
            endPath()
            isDrawing = false
        }
    }

    /*
    for( d in drawing){ //DO THE RED
         var path = drawing[d]

        beginShape()
        stroke( myRed )

        for (p in path){
            var point = path[p]
            curveVertex( point.x + point.xRedOffset +x, point.y + point.yRedOffset )
        }

        endShape()

    }


    for( d in drawing){// DO DE POIPLE
        var path = drawing[d]

        beginShape()
        stroke( myPurple )
        for (p in path){
            var point = path[p]
            curveVertex( point.x + point.xPurpleOffset +x, point.y+ point.yPurpleOffset )
        }

        endShape()
    }



    for( d in drawing){// DO DE BLUE
        var path = drawing[d]


        beginShape()
        stroke( myBlue )
        for (p in path){
            var point = path[p]
            curveVertex( point.x +x, point.y )
        }
        endShape()
    }

  */

    animate()

     x += -xAmount


}

/*
function keyPressed(){
    print( key, keyCode)
    if (keyCode == 187){
        strokeW ++
    }else if( keyCode == 189 ){
         strokeW --
    }

    if (key == 'z'){
        drawing.pop() //delete the last path
    }

       if (key == '.'){
       xAmount = xAmount+1
    }
        if (key == ','){
       xAmount = xAmount-1
    }

    print( strokeW )
}
*/
