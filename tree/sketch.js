var trees = []

function createTrees() {
 
  var tree = new Tree()
  
  //create its sections, define the defaults.
  var parent = null

  var y
  var w
  var h = 240
  var angle = 0
  var c =  c = color(255, 0, 0, 100)
  var img = null
  
  for (var i = 0; i <4; i++) { //Create the sections
    y = height - i * h
    w = 20
    h = h * 0.85
    var x = width/2 + random(-200,200)
    var section = new Section( i, x, y, w, h, angle, c, parent, img)
    
    section.parent = parent
    parent = Object.assign({}, section) //shallow copy {...section} //previous details for chaining
    tree.sections.push( section) 
    
  }//end create sections
  trees.push(tree)
  print(tree.sections.length, "tree sections")
  print(tree.sections)


}

function setup() {
  createCanvas(900, 700);
  angleMode(DEGREES)
  strokeWeight(3)
  createTrees()



}

function draw() {
  background(10);

  for (t in trees) {
    var tree = trees[t]
    for (s in tree.sections) {
      var section = tree.sections[s]
      section.update( )
      section.draw( )

    }

  }
}