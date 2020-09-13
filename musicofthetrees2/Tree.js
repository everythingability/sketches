function transpx(x){
  return x + width/2
}
function transpy(y){
  return y + height/2
}

let scaleArray = [51, 52, 54, 59,60, 62, 64, 65, 67, 69, 71, 72, 74].reverse();

function spawnTrees(num){
  for(var i =0; i <num ; i++){
      
    var tree = new Tree(random(width), random(height), random(10,30), random(1, 5), "Oak")
    
      

     //pitch, amp, offset
    
     var pitch = map(tree.lat, 0, width, 200, 600)
     print(pitch, tree.lat)
     var amp =  map(tree.y,width,0.0, 0.5, 1.0)
      var offset = nextLoop - millis()
    
       let midiValue = scaleArray[tree.notei];
    let freqValue = midiToFreq(midiValue);
    //osc.freq(freqValue)
      
      var inst = new Instrument(freqValue, amp, offset)
      
      //instrument.push( inst ) ; 
      
      tree.synth = inst
      
      trees.push(tree);
  //instrument[instrument.length-1].play();
    
  }
  
}

function Tree(x, y, w, h, species){
  //set any properties
  this.lat = x; 	     //x position
  this.lng = y;		//y position
    
  this.w = w;		//circle size
  this.h = h;
  this.hit = false;
  this.species = species;
  this.colour = color( "yellow" )
  this.playing  = false;
  this.ring = 0;
  this.alpha = 255
    
  this.synth

    
     //calculate variations
    this.ring  = int(map(this.w, 10, 30, 5, 0))
   
   this.distance = dist(  width/2,height/2, this.lat, this.lng)
    //based on distance which note should I play?
   notes = ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb']
   this.notei = int(map(this.distance, 0, width/2, 0, notes.length-1))
   this.note = notes[this.notei] + this.ring


   
  this.draw = function(){
    fill(this.colour)
    ellipse(this.lat, this.lng, this.w,this.w) 
  }
  
  this.check = function(){  
   
    this.hit = collidePointLine(this.lat,this.lng,width/2,height/2,transpx(t2.x),transpy(t2.y), 0.1);
    
  
    if (this.hit){  
        if (this.playing == false){

           this.playing = true;
          

          circles.push(new Circle(this.lat,this.lng, 10))
          this.colour = color("red")

          //based on width how long does the note play R=release.
          //and what octave ...
          var ring = int(map(this.w, 10, 30, 5, 0))
          this.alpha = map(ring, 5, 1, 255, 30)
            
          var distance = dist(  width/2,height/2, this.lat, this.lng)
          this.distance = distance
            
          //based on distance which note should I play?
          notes = ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb']
          var notei = int(map(distance, 0, width/2, 0, notes.length-1))
          var note = notes[notei] + ring

          
          // build custom adsr
          var a = map(distance, 0, width/2, 0.5, 0)
          var d = map(distance, 0, width/2, 1, 0)
          var s = map(distance, 0, width/2, 2, 0)
          var r = map(distance, 0, width/2, 1, 0)
          //console.log( this )
         
            this.synth.play()
        
        }
     }else{
       this.playing = false
         //print(this.colour, this.alpha)
         //var colour = color(200,3, 100)
         //colour.setAlpha(this.alpha)
       // this.synth.triggerRelease("2n")
         try{
             
         
            // print ("disposed")
         }catch(e){
             
         }
       this.colour= color(200,3, 100, this.alpha)
     }        
  }
  

    
}