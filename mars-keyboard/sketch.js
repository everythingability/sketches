let osc, envelope, fft, reverb, reverb2, delay
var table
var audio
var data ={}
var miditable 
var midi = {}//lookup obj
var midi2 = {}
var img

var source_file; // sound file
var src_length; // hold its duration

var peaks; // an array of peaks for the visual
var pg;

var voices = []; // an array of voices
var num_voices = 50;
var poly_counter = 0;

var grainDur = 1; // length of the grain

function preload() {
  miditable = loadTable("midi.csv", 'csv', 'header')
  
  table = loadTable("mars_notes - mars_notes.csv", 'csv', 'header')
  audio = loadSound("Holst The Planets, 'Mars' - BBC Proms.mp3")
  img = loadImage("mars-methane.jpg")
  fft = new p5.FFT();
}

function midiToNote(m){
    let freqValue = midiToFreq(m);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.1);
    //note = (note + 1) % scaleArray.length;
  osc.start()
  return midi2[m]
  
}

function setup() {
  createCanvas(innerWidth, innerHeight
              );
  //print(table.getRowCount() + ' total rows in table');
  //print(table.getColumnCount() + ' total columns in table');
  var tableAsObject = table.getObject()
  var midi = miditable.getObject()
  for(m in midi){
    row = midi[m]
    midi2[row.midi] = row.notename
  }
  
  for (var n in tableAsObject) {
    var row = tableAsObject[n]
    //print(row.note)
    var note = row.note.toString()
    //var newRow = {note:int(row.note), start:float(row.start), end:float(row.end)}
    if (data.hasOwnProperty(note)) {
      data[note].push({
        start: float(row.start),
        end: float(row.end)
      })
    } else {
      data[note] = [{
        start: float(row.start),
        end: float(row.end)
      }]
    }

  }

  source_file = audio
  src_length = source_file.duration(); // store the sound duration
  peaks = source_file.getPeaks(); // get an array of peaks

  //create a buffer
  pg = createGraphics(width, height / 2);
  pg.image(img, 0, 0, width, height);
  pg.translate(0, height / 2);
  pg.noFill();
  pg.stroke("blue");
  for (var i = 0; i < peaks.length; i++) {
    var x = map(i, 0, peaks.length, 0, width);
    var y = map(peaks[i], 0, 1, 0, height);
    pg.line(x, 0, x, y);
    pg.line(x, 0, x, -y);
  }

  // build an array of granular voices 
  for (var i = 0; i < num_voices; i++) {
    var voice = new GranularVoice(source_file, grainDur); // duration half a second per voice
    voices.push(voice);

  }
  
  osc = new p5.TriOsc();

  // Instantiate the envelope
  envelope = new p5.Envelope();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.7, .3, 0.3, 1.0);
  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  //osc.start();
  
    reverb = new p5.Reverb();
  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  reverb.process(osc, 2, 0.1);
  reverb.amp(1); // turn it up!
  
  reverb2 = new p5.Reverb();
  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  reverb2.process(audio, 2, 0.1);
  reverb2.amp(4); // turn it up!
  
    delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(audio, .9, .4, 4000);
  
}

function draw() {
  background("white");

  if (mouseIsPressed) {
    if (mouseY < height / 2) {
      var start_play = map(mouseX, 0, width, 0, src_length); // map mouseX to position in the source
      var pitch = map(mouseY, 0, height, 0.5, 1.5); // map mouseY to the rate the sound will be played
      //pitch =1
      // which voice to play
      poly_counter += 1;
      poly_counter = poly_counter % num_voices;
      //play it
      voices[poly_counter].playGrain(start_play, pitch);
    } else {
      try {
        var chunk = width / Object.keys(data).length - 1
        var key = int(mouseX / chunk)
        var realKey = Object.keys(data)[key]
        //print("realKey", realKey)
        //print( Object.keys(data) )

        var rows = data[realKey]
        for (i = 0; i<rows.length;i++){ //PLAY ALL OF THEM
          
              //var i = int(random(0, rows.length - 1))
              var randNote = rows[i]
              var dur = randNote.end - randNote.start + 1
              //print( randNote.start, dur)
              audio.play(0, 1, 1, randNote.start, dur)
              print(rows.length,realKey,midiToNote(realKey), randNote.start, dur )
                //draw ehere that section is
              fill("red")
              rect(randNote.start * chunk, 0, chunk, height/2)
        }
      } catch (e) {
        print(e)
      }

    }

  }


  image(pg, 0, 0); // display our waveform representation
  // draw playhead position 
  fill(255, 255, 180, 150);
  noStroke();
  rect(mouseX, 0, map(grainDur, 0, src_length, 0, width), height / 2);

  fill(0);
  text('Grain Duration : ' + grainDur, 5, 25);

  //draw a "keyboard"
  var numberOfNotes = Object.keys(data).length
  //print("numberOfNotes:", numberOfNotes)
  var chunk = width / numberOfNotes

  stroke("black")
  fill("white")
  //46 to 112
  for (d = 0; d < numberOfNotes; d++) {
    fill(255,100)
    rect(d * chunk, height / 2, chunk, height / 2)
    fill("black")
    text(d, d * chunk + 4, height - 30)
    

  }

  
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height/2);
    rect(x, height, spectrum.length / 200, -h);
  }
}

function keyPressed() {


  if (keyCode === DOWN_ARROW) {
    grainDur -= 0.05;
  } else if (keyCode === UP_ARROW) {
    grainDur += 0.05;
  }

  grainDur = constrain(grainDur, 0.1, 25);
  var newatt = grainDur * 1 / 5;
  var newrel = grainDur * 1 / 5;

  for (var i = 0; i < voices.length; i++) {
    voices[i].setGrainDuration(grainDur);
  }





}


function GranularVoice(src, grLength) {
  // load a copy of our source in the main buffer
  this.sound = src;
  this.sound.playMode('sustain'); // we want polyphonic playing

  this.amp = 0.5;

  // compute defaut parameters 
  this.attack = 0.049;
  this.release = 0.049;
  this.grainDur = grLength - (this.attack + this.release);
}

GranularVoice.prototype.playGrain = function(start, rate) {
  var now = getAudioContext().currentTime; // get the time

  // play the grain
  this.sound.play(0, rate, 1, start, this.grainDur + 1); // we need to play longer than grainDur because of the rate

  // acess the gain node to control it with ramps
  if (this.sound.source) {
    this.sound.source.gain.gain.cancelScheduledValues(now);
    this.sound.source.gain.gain.setValueAtTime(0.0, now); // start at zero
    this.sound.source.gain.gain.linearRampToValueAtTime(this.amp, now + this.attack); // go to amp during attack
    this.sound.source.gain.gain.linearRampToValueAtTime(this.amp, now + (this.attack + this.grainDur)); // stay during grain duration
    this.sound.source.gain.gain.linearRampToValueAtTime(-0.0, now + (this.attack + this.grainDur + this.release)); // fo to zero for release  
  }

}

GranularVoice.prototype.setAmp = function(newamp) {
  this.amp = newamp;
}


GranularVoice.prototype.setAttack = function(newattack) {
  if (this.grainDur > (newattack + this.release)) {
    this.attack = newattack;
  } else {
    throw 'new attack value out of range';
  }
}

GranularVoice.prototype.setRelease = function(newrelease) {
  if (this.grainDur > (this.attack + newrelease)) {
    this.release = newrelease;
  } else {
    throw 'new release value out of range';
  }
}

GranularVoice.prototype.setGrainDuration = function(newgraindur) {
  if (newgraindur > (this.attack + this.release)) {
    this.grainDur = newgraindur;
  } else {
    throw 'new grain duration out of range';
  }
}