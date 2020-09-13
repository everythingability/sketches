var offset = -5
var offset2 = 5

var isDrawing;
var strokeW = 8;
var myCrimson;
var myBlue;
var myRed
var myPurple

var defaultProject
var drawingsDB

var drawing = []
var currentPath

function initDB(){
    defaultProject = firebase.initializeApp(firebaseConfig);   
    drawingsDB = defaultProject.firebase_.database().ref("drawings")
    drawingsDB.on('value', gotDrawingData, errDrawing)    
}

var xRedOffset
var yRedOffset

var xPurpleOffset
var yPurpleOffset

function startPath(){   
    console.log("do this")
    isDrawing = true
    currentPath = []
    offSetAmount = 3
    xRedOffset = randomChoice(-offSetAmount, offSetAmount)
    yRedOffset = randomChoice(-offSetAmount, offSetAmount)
    
    xPurpleOffset = -xRedOffset
    yPurpleOffset = -yRedOffset
    console.log(xRedOffset, yRedOffset,xPurpleOffset , yPurpleOffset )
    
    drawing.push(currentPath)   
    
       
}


function endPath(){
  
   isDrawing = false
}


function saveDrawing(){
    saveCanvas( "red_blue_" + random(0, 1000)  +    ".jpg")
    var data = {name:"Tom", drawing:drawing}
    var result = drawingsDB.push(data, dataSent)
    //console.log( result.key )
    function dataSent(err,status){
        if(err){
            console.log(status)
        }
    }   
}

function clearDrawing(){
    x = 0;
    drawing = []
}

function oneDrawing(data){
 
    var dbdrawing = data.val()
    //console.log( dbdrawing)
    x =0;
    thedrawing = dbdrawing.drawing;
   
    
    for( d in thedrawing){// DO DE BLUE
        var path = thedrawing[d]
        createGesture(path[0].x, path[0].y)
        for (var p = 1; p<path.length; p++){
            var point = path[p]
            addToGesture( point.x, point.y )
        }
    }
    
}

function showDrawing(key){
    try{ //kind of errors when you build the interface...
        var id = sel.value();
        //console.log(id)
        var ref = defaultProject.firebase_.database().ref("drawings/" + id)
        ref.on('value', oneDrawing, errData)
    }catch(e){
        console.log("Not now")
    }
    
}

var sel
function gotDrawingData(data){
    var drawings = data.val()
    var keys = Object.keys(drawings)   
    var drawingsLI = selectAll('.drawinglist li')
    
    for (s in drawingsLI){
        drawingsLI[s].remove()
    }
    
     //sel =createSelect()
     sel = select("#drawings")
     sel.position(10, 10);
    // sel.addClass("drawinglist")
     sel.changed(showDrawing);
    
    for (k in keys){
        var key = keys[k]
       // console.log( key)
        sel.option(key);
        //li.parent("drawinglist")
        
    }
}
function errDrawing(err){
    console.log(err)
    
}


function errData(err){
    console.log(err)
}

