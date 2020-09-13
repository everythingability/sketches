class myImage {

  constructor(path) {
    this.path = path;
    this.img = loadImage(this.path);
    this.width = this.img.width;
    this.height = this.img.height;
    this.rects = [];
    this.fragments = []
  }

  createFragments() {
    //
  }  
}

class myFragment{
  
  constructor(img, x0,y0, x1, y1){
    this.img
    this.x0
    this.y0
    this.x1
    this.y1
    this.width
    this.height
    this.ratio 
    this.brightness
    this.red
    this.green
    this.blue
    
    
    
  }
  
}





function piet(x0, y0, x1, y1, N) {
  if (N == 0) {

    var fragment = img.get(x0, y0, x1 - x0, y1 - y0);
    //var fragmentPath = fragmentsPath + random(0, 100) + "_" + N+ ".jpg";

    calculate(fragment); //does brightness and r, g, b
     fill(fR, fG,fB)
    rect(x0, y0, x1 - x0, y1 - y0);
    var fRatio = 1.0;
    if (fragment.width > fragment.height) fRatio = float(fragment.height) / float(fragment.width);
    if (fragment.width < fragment.height) fRatio = float(fragment.width) / float(fragment.height);
    fragments.push(fragment)

  } else {
    //Recursive step -- recursively break the current rectangle into 4 new random rectangles
    var i = int(random(x0, x1)); //Pick a random x coordinate inside the current rectangle
    var j = int(random(y0, y1)); //Pick a random y coordinate inside the current rectangle

    var fragment = img.get(x0, y0, x1 - x0, y1 - y0);
    

    calculate(fragment); //does brightness and r, g, b
   
    var fRatio = 1.0;
    if (fragment.width > fragment.height) fRatio = float(fragment.height) / float(fragment.width);
    if (fragment.width < fragment.height) fRatio = float(fragment.width) / float(fragment.height);
     
    fragments.push(fragment)



    piet(x0, y0, i, j, N - 1); // Recurse on upper left rectangle
    piet(i, y0, x1, j, N - 1); // Recurse on upper right rectangle
    piet(x0, j, i, y1, N - 1); // Recurse on lower left rectangle
    piet(i, j, x1, y1, N - 1); // Recurse on lower right rectangle
  }
}

var fBrightness, fR,fG, fB

function calculate(img) {

  //Calculate brightness and r, g, b
  var index = 0;
  var rtot = 0;
  var gtot = 0;
  var btot = 0;
  var increment = 10;
  var frameBright = 0;
  img.loadPixels()
  
  for (var j = 0; j < img.height; j += increment) {
    for (var i = 0; i < img.width; i += increment) {
      
      index = 4 * (j * 1 + i) //* width * 1 + (i * 1 + i));
      print( index ) 
      r = img.pixels[index];
      g = img.pixels[index + 1];
      b = img.pixels[index + 2];
      a = img.pixels[index + 3];
      print(r,g,b)
      var pixelVal = (r + g + b) / 3;
      frameBright = pixelVal + frameBright;

      rtot = rtot + r;
      gtot = gtot + g;
      btot = btot + b;
      index++;
    }
  }

  fBrightness = int(frameBright / (img.width * img.height));
  //float SineFrameBright = sine.freq(frameBright);
  fR = rtot / index;
  fG = gtot / index;
  fB = btot / index;

  print(fBrightness, fR, fG, fB);

}