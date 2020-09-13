var drawingsDB

//Persistence
function initDB(){
    defaultProject = firebase.initializeApp(firebaseConfig);
    drawingsDB = defaultProject.firebase_.database().ref("drawings")
    drawingsDB.on('value', gotDrawingData, errDrawing)
}

function saveDrawing(){

    var data = {name:"Tom", drawing:drawing}
    var result = drawingsDB.push(data, dataSent)
    //console.log( result.key )
    function dataSent(err,status){
        if(err){
            console.log(status)
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
