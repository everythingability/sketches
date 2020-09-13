function keyPressed(){

  if (key == 's'){
  saveCanvas("sheep_wat_" + int(random(0,1000)) + ".jpg")
  }

  if (key = "i"){
    var otherImage =  new myImage(img3, N)
    theImage = theImage.useOtherImageRects(otherImage)
    print(theImage)
  }

  //setup()
}

function mousePressed(){
  print("Clicked:", mouseX, mouseY)
  var fragment = theImage.getClicked(mouseX, mouseY)
  fragment.drawImage( )
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function gotFile(file) {
 //Doesn't bloody work!!!
  //text('received file:', width/2, height/2);

  img3  = loadImage(file.data )
  sleep(5000).then(() => {
    theImage2 = new myImage(img3, N)//image(img3,0,0)
    print (theImage2.img3.width, theImage2.img3.height)
    print( theImage2.img)
    theImage = theImage.useOtherImageRects(theImage2)
  });




}
