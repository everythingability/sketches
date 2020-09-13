class Tree {
  constructor() {
    this.sections = []
  }
  grow() {

  }
}

class Section {
  constructor(i, x, y, w, h, a, c, parent, img) {
    this.i = i
    this.x = x
    this.y = y

    this.width = w
    this.height = h
    this.angle = a
    this.color = c
    this.img = img

    this.parent = parent

    if (this.parent != null) { //stump  
      translate(this.x, this.y)
      //var start = createVector(0, 0)
      var end = createVector(0, this.height) //how long?
      var r = this.angle
      end.rotate(-180 + r)//where should my end be?
      this.end = end

      this.x = this.end.x
      this.y = this.end.y

    } else {
      translate(this.x, this.y)
      //var start = createVector(0, 0)
      var end = createVector(0, this.height) //how long?
      var r = this.angle
      end.rotate(-180 + r)//where should my end be?
      this.end = end

    }
  }


  draw() {
    push()
    fill("red")
    ellipse(this.x, this.y, 10, 10)

    if (this.parent == null) {
      stroke("cyan")
      line(this.x, this.y, this.end.x, this.end.y)
    } else {
      stroke("yellow")
      line(this.x, this.y, this.end.x, this.end.y)
    }

    pop()
  }


  update() {
    if (typeof this != 'undefined') {
      push()
      if (this.parent != null) { //stump  
        this.x = this.end.x
        this.y = this.end.y

        translate(this.x, this.y)
        var start = createVector(0, 0)
        var end = createVector(0, this.height) //how long?
        var r = this.angle
        end.rotate(-180 + r)//where should my end be?
        this.end = end


        //calculate where my end is...



        this.angle = this.angle + random(-1, 1)
        pop()
      }

    }
  }
}

function pointToRotatedPoint(x, y, len, rot) {
  push()
  translate(x, y)

  var start = createVector(0, 0)
  var end = createVector(0, len)
  var r = rot
  end.rotate(-180 + r)
  //print(start.x, start.y, end.x, end.y)

  fill("red")
  ellipse(start.x, start.y, 10, 10)
  stroke("cyan")
  line(start.x, start.y, end.x, end.y)
  pop()
  return end

}
