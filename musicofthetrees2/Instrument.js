var metronomeSound; // sound object
var metronomeEnv; // envelope object

var bpm;
var beatDivisions; // clicks will be rounded to this number of beat divisions. (probably ~16)
var beatLength; // in milliseconds
var loopLength; // in beats
var nextLoop;  // in millis()
var loopCount;
var nextClick; // time for next metronome click

var instrument = [];
var metronomeOn;

var reverb, delay
var cVerb

function playClick() {  
  fill( 200, 50, 50 );
  ellipse( width/2, height/2, 50 );
  metronomeEnv.setADSR(0.01, 0.05, 0.1, 0.15);
  metronomeEnv.play();  
}



/* classes */


function Instrument(pitch, amp, offset) {
  
    this.pitch = pitch;
    this.env = new p5.Envelope();
    this.env.setRange(amp,0);
    this.sound = new p5.Oscillator("sine");
    this.sound.amp(this.env);
    this.sound.freq(this.pitch);
    
   
    
    
    this.sound.start();
    let beatError = offset % beatLength/beatDivisions; // timing error from "maximum error" allowed
    if( beatError > beatLength/beatDivisions/2 ) { offset += beatLength/beatDivisions - beatError; } else { offset -= beatError; } // round up or down to align note to beat division
    this.loopOffset = offset; // milliseconds *from END of loop*
    this.loopIndex = 0;
    this.x = mouseX;
    this.y = mouseY;
    print(offset);


  
  this.play = function() {
    print("playing", this.pitch)
    this.env.setADSR(0.01, 0.05, 0.1, 0.15);
    
    //Add effects
    reverb.process(this.sound)
    delay.process(this.sound, 0.5, 0.5, 1000);

    
    this.env.play();
    this.loopIndex = loopCount;
  }
  
  this.draw = function() {
      fill( 250 );
      //circle( this.x, this.y, 30 );
  }

}