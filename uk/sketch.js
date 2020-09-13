var font
var maskImage
var currImage
var buffer
let chars = "This Is The News".toUpperCase()

function preload(){
  font = loadFont("Franklin Gothic Heavy Italic.ttf")
  maskImage = loadImage("map-of-england.png")
}

function setup() {
	createCanvas(700,1000);
    buffer = createGraphics(width, height)
    buffer.textSize(300);
    buffer.textFont(font);

    buffer.textAlign(RIGHT);
    buffer.textStyle(BOLD);
    buffer.colorMode(HSB,50);
    buffer.angleMode(DEGREES);
    buffer.textSize(20);
    buffer.textFont(font);
}

let noiseScale=0.02
function draw() {
  background(50, 50, 50)
  var theImg = doWeather()
  image( theImg , 0, 0, width, height)
}

//function mousePressed(){

  //saveCanvas("THE_NEWS_" + ".jpg")
//}

function mousePressed() {
  /*
saveFrames("THIS_IS_THE_NEWS" + int(random(0,1000)),".jpg", 1, 100, data => {
  var i = 0
  print(data)
  for (var d in data){
    saveCanvas( "THIS_IS_THE_NEWS" + int(random(0,1000)),".jpg")
    i++
  }
});*/
}

function doWeather(){
    buffer.background("black")
    //buffer.translate(, height/2)
    buffer.fill("white")
    buffer.text("NO DEAL", width/2, height/2)
    buffer.fill("yellow")
    //buffer.rect(0, 0 , 300, 300)

  for(let i  = -20; i <= 60; i++){
        for(let j = -20; j <= 60; j++){
             buffer.translate(i*20,j*20)
            let noiseVal = noise(i*noiseScale, j*noiseScale, frameCount*0.009);

            let c = map(noiseVal,0,1,33,47);
           //print(c)
            let ch = chars.charAt(round(c));
            let ch2 = map(noiseVal,0,1,0,chars.length);
            let h = map(noiseVal,0,1,-70,100);

            let xo = map(noiseVal,0,1,-100,100);
            //let r = map(noiseVal,0,1,0,360);

             buffer.fill(h,100,100);
             buffer.text(chars[round(ch2)],0+xo,0-sin(frameCount)*140);
             buffer.resetMatrix();
        }
    }


  //return buffer
  var imgClone
   (imgClone = buffer.get() ).mask( maskImage.get() );

  //theImage.mask(maskImage)
  return imgClone

}
