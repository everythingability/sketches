//var defaultProject - defined in index.html
var defaultProject;
var slogansDB


function initDB(){  
    defaultProject = firebase.initializeApp(firebaseConfig);
    
    console.log(defaultProject)
    slogansDB = defaultProject.firebase_.database().ref("slogans")
    slogansDB.on('value', gotSloganData, errSlogan)    
}

function saveSlogan(){
    var slogan = output.value()
    console.log("saving:", slogan)
    var data = {name:"Tom", slogan: slogan}
    
    var result = slogansDB.push(data, dataSent)
    //console.log( result.key )
    function dataSent(err,status){
        if(err){
            console.log(status)
        }
    }   
}

function oneSlogan(data){
 
    var slogan = data.val()
    console.log( slogan)
    x =0;
    //drawing = dbdrawing.drawing;
    
}

function showSlogan(key){
    try{ //kind of errors when you build the interface...
        var id = sel.value();
        //console.log(id)
        var ref = defaultProject.firebase_.database().ref("slogans/" + id)
        ref.on('value', oneSlogan, errData)
    }catch(e){
        console.log("Not now")
    }
    
}

var sel
function gotSloganData(data){
    var slogans = data.val()
    if (slogans){
        var keys = Object.keys(slogans)

        //add to interface somehow
        for (k in keys){
            var key = keys[k]
           //


        }
}
}

function errSlogan(err){
    console.log(err)
    
}
