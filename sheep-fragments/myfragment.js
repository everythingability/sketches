class myFragment {
  /*
  A rectangular section of a myImage.
  */

  constructor(img, x0, y0, x1, y1) {
    //print("FragmentImage:", img)
    this.img = img
    this.x0 = x0 //top left
    this.y0 = y0 //top left
    this.x1 = x1 //bottom right
    this.y1 = y1 //bottom right
    this.width = img.width
    this.height = img.height
    this.size = img.width * img.height

    var fRatio = 1.0; // Aspect ratio. May be useful for finding similar shaped rects
    if (this.width > this.height) fRatio = float(this.height) / float(this.width);
    if (this.width < this.height) fRatio = float(this.width) / float(this.height);

    this.ratio = fRatio
    this.brightness
    this.red
    this.green
    this.blue

  }

  drawImage() {
    //Just draw this fragment in its position
    image(this.img, this.x0, this.y0, this.width, this.height)
  }

  isClicked(x, y) {
    //when passed mouseX, mouseY
    var left = this.x0
    var top = this.y0
    var right = this.x1
    var bottom = this.y1

    if (x > left & x < left + right & y > top & y < top + bottom) {
      return true
    } else {
      return false
    }
    
  }





  calculate() {

    //Calculate brightness and r, g, b
    var index = 0;
    var rtot = 0;
    var gtot = 0;
    var btot = 0;
    var increment = 4; //has to be four!?
    var frameBright = 0;

    this.img.loadPixels()

    for ( var j = 0; j < this.img.height; j += increment) {
      for ( var i = 0; i < this.img.width; i += increment) {

        index = 4 * (j * 1 + i) //* width * 1 + (i * 1 + i));
        var r = this.img.pixels[index];
        var g = this.img.pixels[index + 1];
        var b = this.img.pixels[index + 2];
        var a = this.img.pixels[index + 3];

        var pixelVal = (r + g + b) / 3;
        var frameBright = pixelVal + frameBright;

        rtot = rtot + r;
        gtot = gtot + g;
        btot = btot + b;
        index++;
      }
    }

    var fBrightness = int(frameBright / (this.img.width * this.img.height));

    var fR = rtot / index;
    var fG = gtot / index;
    var fB = btot / index

    this.brightness = fBrightness
    this.red = fR
    this.green = fG
    this.blue = fB
    //print(fBrightness, fR, fG, fB);

  }



}



