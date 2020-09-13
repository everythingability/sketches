var button
////var initialInput;
var submitButton;
var playButton;
var importButton
var img = null;


function playStop(){ 
    //alert( xAmount )
    if (xAmount == 0.25 ){
        playButton.html = "Start"
        xAmount = 0
    }else{
        playButton.html = "Stop"
        img = null
        xAmount = 0.25
    }
    console.log(xAmount)
}


function clearImage(){
    console.log("clear")
    img = null;
}

var imageRatio
function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);    
    img.hide();
  } else {
    img = null;
  }
}
    
function createInterface(){  
    importButton = createFileInput(handleFile);
    importButton.position(360, 40);
    
    playButton = select("#startStop")
    playButton.mousePressed(playStop)
    
    saveButton = select("#saveButton")
    saveButton.mousePressed(saveDrawing)
    
    clearButton = select("#clearButton")
    clearButton.mousePressed(clearDrawing)
    
    clearImageButton = select("#clearImage")
    clearImageButton.mousePressed(clearImage)
    
}


function dropped(file) {
 // background(0);
    print("dropped2")
    print("file")
   img = createImg(file.data)
  //image(img, 0, 0, width, height);
  img.hide();
}

function gotFile(file) {
  print("file")
   img = createImg(file.data)
  //image(img, 0, 0, width, height);
  img.hide();

}



