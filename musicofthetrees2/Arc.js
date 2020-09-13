

function spawnArc(l, a){
   arcs.push(new Arc(l, a));
}



function Arc(len, ang){
  this.len = len
  this.ang = ang
  this.colour = "lime"
  this.hit = false
  this.distance = 10000
  
  
  this.draw = function(){
     push()
       rotate(radians(angle));
       
       strokeWeight(48);
        stroke(this.colour)
        arc(0, 0, this.len, this.len, 0, radians(this.ang));
        text(this.distance, 0, 0)
    pop()
  }
  
  this.check = function(x,y){
    var distance = dist(width/2, height/2, theX, theY) -this.len;
    //print ("distance", distance)
    this.distance = distance
    this.hit =  collidePointArc(theX, theY, width / 2, height / 2, this.len, angle,this.ang);
    
   // this.hit = collidePointCircle(theX,theY,width/2,height/2,this.s)
    print( this.len,  distance, this.hit )
	if(this.hit  ){ //change color!
        //print("hit")
		this.colour = 'purple'
	}else{
		this.colour = 'lime'
	}
  }
  
}
