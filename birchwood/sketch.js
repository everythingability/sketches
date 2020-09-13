let colors = "F2F2F2-C0C4C1-F0F0E8-FCF8F7-EDEBEB".split("-").map(a => "#" + a)
let sections = []

var img

function preload() {
    img = loadImage("birch_leaves.png")
}


function setup() {
    //frameRate(10)
    createCanvas(600, 600);
    background(50)
    //fill("#222");
    rectMode(CENTER)
    noStroke()
    //rect(0,0,width,height)
    drawBackgroundGradient()
    //drawingContext.shadowColor = color(30, 70, 80,235);
    drawingContext.shadowBlur =10;
    for (var i = 0; i < 2; i++)	
      generateNewTree()
}

function generateNewTree() {
    var args = {
        p: createVector(width/2 + random(-200, 200), height - random(-150, 200)),
        v: createVector(random(30, -30), random(-100, -200)),//vertical
        a: random(-10, 10),  //angle
        r: random(10, 20),//radius
        w: 100,//width when dead?? no idea
        color: color(random(colors))
    }

    let section = new TreeSection(args.p, args.v, args.a, args.r, args.w, args.color)

    /*
    if (random() < 0.5) {
        section.v.mult(1.6)
        section.r = section.r - random(50)
        section.child = true
        section.color = color("red")
    }*/
    sections.push(section)
}

function draw() {

    sections.forEach(section => {
        section.update()
        section.draw()
    })
    sections = sections.filter((section) => random() < 0.99 && !section.dead)
    /*
      if (frameCount%20==0){
          fill(0,1)
          rect(0,0,width,height)
          for(var i=0;i<2;i++) generateNewTree()
      }*/
    if (frameCount > 100) { noLoop(); }
}


class TreeSection {
    constructor(p, v, a, r, w, col) {
        this.p = p
        this.v = v
        this.a = a
        this.r = r
        this.w = w
        this.color = col
        this.child = false
        this.lastP = createVector(0, 0)

    }
    draw() {
        push()
            var x = this.p.x 
            var y =this.p.y 
            
            translate(x, y )

            fill(this.color)
            noStroke()
            rectMode(CORNER)
           
            rotate(this.v.heading() - PI * 1.5 + random(-0.1, 0.1)    )        
            rect(0 - this.r/2, 0,   this.r,   this.v.y     )
            
            beginShape()
                fill(color(255, 0, 0,100))
                let rw = this.v.y + random(-5, 5) * 2

                vertex(-this.r/2, 10);//top left
                vertex(-this.r/2, this.v.y);//  
                vertex(this.r/2, this.v.y);
                vertex(10, 10);
            endShape(CLOSE)//*/
            
            
            //rect(this.r/2,this.v.y,this.r+2,2)
            //rect(this.r/2,0,this.r+2,2)

            if (random() > 0.6) {
                let count = int(random(1, 2))//number of twigs

                for (var i = 0; i < count; i++) {
                    push()
                        var r = (i * 2 - 1) / 1.2 * this.v.heading() / (1 + random(2)) * random(-1, 1) + PI * 0.3
                        //draw leaves and branches

                        let ww = this.v.y + random(-5, 5) * 2
                        push()
                            //draw leaves and twigs
                            fill("orange") 
                            var branchW =  ww/1.3   
                            var branchH = ww     
                            imageMode(CORNER)
                            ellipse(0 , 0, 10, 10)
                            //translate(0-branchW/2 , 0)
                            rotate(random(-100,100))
                            image(img,0-branchW/2 , 0, branchW, branchH)

                            //draw a twig
                            strokeWeight(2)
                            stroke(this.color)
                            line(0, 0, ww / 2, 5)
                        pop()
                        /*
                        beginShape()
                            vertex(0,0)
                            curveVertex(ww/2,5)
                            vertex(ww,0)
                            curveVertex(ww/2,-5)
                        endShape(CLOSE)
                        */
                    pop()

            }
        }
        //Texture shading

			for(var o=0; o<this.r/3; o+=1){
				let c = color(random(colors))
				c.setAlpha(random(180))
				stroke(c)
				line(o,0,  o,  this.v.y)
            }
            
        fill("blue")
        print(x-20, y, 0, 0)
        ellipse(0, 0, 4, 4)

        pop()
    }
    update() {
        this.lastP = this.p.copy()
        this.p.add(this.v)
        this.v.add(this.a * 0.5)
        this.v.mult(0.99)
        if (this.p.y < -50) {
            this.dead = true
        }
        if (this.child) {
            this.r -= 2
            if (this.r < 1) {
                this.dead = true
            }
        }
    }

}



///////////////////////////////////////////////////////////////////


const Y_AXIS = 1;
const X_AXIS = 2;

function drawBackgroundGradient() {

    let b1, b2, c1, c2;
    b1 = color(255);
    b2 = color(0);
    c1 = color("#ADD5FC");
    c2 = color("#6BD17D");
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);

}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}


function mousePressed() {
    for (var i = 0; i < 5; i++) generateNewTree()
}

function keyPressed() {
    //save('pix.jpg');
}