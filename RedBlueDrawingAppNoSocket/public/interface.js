var rSlider, colorPicker
let inp1, inp2
var img

function setupInterface(){
  inp1 = createColorPicker('#ff0082');
  inp1.position(80, 40)
  inp1.input(setPaintColor);

  inp2 = createColorPicker('#008cff');
  inp2.position(80, 70)
  inp2.input(setBgColor);

 rSlider = createSlider(0, 100, 4);
 rSlider.position(80, yDiff);

  input = createFileInput(gotFile);
  input.position(80, yDiff + 40);


button = createButton('Download Image');
button.position(80, yDiff + 100);
button.mousePressed(download);
}

function download(){

	var outputBuffer = createGraphics(buffer.width, buffer.height)
	//var img = createImage(buffer.width, buffer.height);
	var img = get(xDiff, 0, buffer.width, buffer.height)
	outputBuffer.image(img, 0, 0, buffer.width, buffer.height)


//Argh! This buggers with the mouseClicked() and makes a mess
   /*var answer = prompt("Save as", "Red-blue.jpg");

   if (answer != null) {
    saveCanvas(outputBuffer,  answer )
    }
    */
    saveCanvas(outputBuffer,  new Date() + ".jpg" )
  return null

}

function gotFile(file) {

  raw = new Image();
  raw.src = file.data

  raw.onload = function() {

		var maxWidth = w
          var maxHeight = h
          var width = raw.width
          var height = raw.height

          if(width>height){
            if(width > maxWidth){
              ratio = maxWidth / width;   // get ratio for scaling image
              var newHeight = height * ratio;  // Scale height based on ratio
              var newWidth = width * ratio;    // Reset width to match scaled image
            }else if(width < maxWidth){
             ratio = maxWidth / width;
						 var newHeight = height * ratio;  // Scale height based on ratio
						 var newWidth = width * ratio;
						}
          }else{
            // Check if current height is larger than max
            if(height > maxHeight){
              ratio = maxHeight / height; // get ratio for scaling image
                var newWidth = width * ratio;    // Reset width to match scaled image
              var newHeight =height * ratio;    // Reset height to match scaled image
            }else if (height > maxHeight){
							ratio = maxHeight / height; // get ratio for scaling image
                var newWidth =width * ratio;    // Reset width to match scaled image
              var newHeight =height * ratio;
						}
            //End Do Image
          }

    img = createImage(newWidth, newHeight);

    //blendMode(DARKEST)
		backgroundBuffer.imageMode(CENTER)
    var newY = (h-newHeight)/2
    backgroundBuffer.drawingContext.drawImage(raw, w/2 - newWidth/2, newY, newWidth, newHeight); //what does this do? If I don't do it, stuff doesn't work?
    backgroundBuffer.translate(0, 0)
    //NOTE! Without the following line img doesn't work? But does/can draw to screen...
    img = backgroundBuffer.get() //does this *force* it to be p5.Image... dunno?
    //does drawing to canvas somehow make the img kosher?

    //backgroundBuffer.image(img, 0, 0)
    print("Image got")
    print(img, img.width, img.height) //this seems to be a good measure of whether
    //or not the image has loaded...

    drawOnce = true

		removeButton = createButton('Remove Image');
	  removeButton.position(80, yDiff + 70);
	  removeButton.mousePressed(removeBGImage);
  }


}

function removeBGImage(){
	backgroundBuffer.background(theBackgroundColor)
}
