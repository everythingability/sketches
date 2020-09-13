class myImage {

  constructor(img, N) {
    this.img = img;
    this.depth = N
    this.img = img;

    this.width = this.img.width;
    this.height = this.img.height;
    this.rects = []; // An array of arrays so one might be able to replicate a myImage's grid, onto anothers... creating a collection of similarly sized rects and then evaluating which one fits best based on colours/brightness.
    this.fragments = [] //List of <myFragments>

  }

  drawFragments() {

    for (var i = 0; i < this.fragments.length; i++) {
      var fragment = this.fragments[i]
      
      fill(fragment.red, fragment.green, fragment.blue, 255)
      //print(  fragment.red, fragment.green, fragment.blue)
      rect(fragment.x0, fragment.y0, fragment.width, fragment.height);
      fill("white")
      text(int(fragment.red) + "," + int(fragment.green) + "," + int(fragment.blue), fragment.x0 + 8, fragment.y0 + 14)

    }

  }
  
  useOtherImageRects(otherImage){
    otherImage.rects = this.rects
    
    for (var x in this.rects){
      var rect = this.rects[x]
      var x0 = rect[0]
      var y0 = rect[1]
      var x1 = rect[2]
      var y1 = rect[3]
      
      var fragmentImage = otherImage.img.get(x0, y0, x1 - x0, y1 - y0);
      var fragment = new myFragment(fragmentImage, x0, y0, x1 - x0, y1 - y0)
      fragment.calculate()

      otherImage.fragments.push(fragment)
      print(x)
    }
    
    return otherImage
    
  }
  
  getClicked(x, y) {
    //Figures out WHICH fragment has been clicked

    var frags = [] // a temp list of found fragments
    for (var i = 0; i < this.fragments.length; i++) {
      var fragment = theImage.fragments[i]
      if (fragment.isClicked(x, y) == true) {
        frags.push(fragment)
      }

    }
    //return frags[frags.length-1]//the last one

    //sort the frags by size. Surely the smallest wins?
    var fragsSorted = frags.sort((a, b) => (a.size < b.size))
    print(fragsSorted)
    return fragsSorted[0]
  }

  makeFragments() {
    //iteratively chop the picture into fragments
    this.chop(this.img, 0, 0, this.img.width, this.img.height, N)
  }

  chop(img, x0, y0, x1, y1, N) {
    /*

    */


    if (x1 - x0 < 4 | y1 - y0 < 4) { ///HACK...Need to fix finding zero-sized rects because it knackers any image calls later
    } else {



      if (N == 0) {
        //the last one
        this.rects.push([x0, y0, x1, y1])
        var fragmentImage = this.img.get(x0, y0, x1 - x0, y1 - y0);
        var fragment = new myFragment(fragmentImage, x0, y0, x1 - x0, y1 - y0)
        fragment.calculate()

        this.fragments.push(fragment)

      } else {
        //recursively break  current rectangle into 4 new random rectangles
        var i = int(random(x0, x1)); //random x inside the current rectangle
        var j = int(random(y0, y1)); //random y inside the current rectangle

        this.chop(img, x0, y0, i, j, N - 1); // Recurse on upper left rectangle
        this.chop(img, i, y0, x1, j, N - 1); // Recurse on upper right rectangle
        this.chop(img, x0, j, i, y1, N - 1); // Recurse on lower left rectangle
        this.chop(img, i, j, x1, y1, N - 1); // Recurse on lower right rectangle
      }
    }

  }

}