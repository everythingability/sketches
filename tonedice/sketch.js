//See: https://www.youtube.com/watch?v=rrkhfTphhrQ
var synth = new Tone.Synth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.2
    },
    "envelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    }
}).toMaster();

var diceMax = 8
var numberOfDice = 6
var dice = []
var instrument

let rnn;
let storedMelodies;
let subDiv = 8;
let t =0;
let panini = {
 notes: [ 
   {pitch: 62, startTime: 0.0, endTime: 1.5 },
   {pitch: 64 , startTime: 1.5, endTime: 1.75 },
   {pitch: 59, startTime: 1.75, endTime: 3.0 },
   {pitch: 57, startTime: 3.0, endTime: 3.25 },
   {pitch: 55, startTime: 3.25, endTime: 4.0 },
   {pitch:  62, startTime: 4.0, endTime: 5.5 },
   {pitch: 64 , startTime: 5.5, endTime: 5.75 },
   {pitch:  59, startTime: 5.75, endTime: 6.0 },
   {pitch:  57, startTime: 6.0, endTime: 7.0 },
   {pitch:  55, startTime: 7.0, endTime: 8.0 }   
 ],
  totalTime: 8
};

rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
rnn.initialize();

function makeMelody() {
 const mel1 = mm.sequences.quantizeNoteSequence(panini, 4);
rnn.continueSequence(mel1, 32, 1.3)
.then((notes) => storedMelodies = notes)
.then(() => console.log(storedMelodies.notes))
 // .then(playMelody());
}

function triggerSynth(time) {
if(storedMelodies) {
  for (let i = 0; i < storedMelodies.notes.length; i++) {
    let midiNote = Tone.Frequency(storedMelodies.notes[i].pitch, 'midi');
    synth.triggerAttackRelease(midiNote,
      (storedMelodies.notes[i].quantizedEndStep - storedMelodies.notes[i].quantizedStartStep) / subDiv,
      time + (storedMelodies.notes[i].quantizedStartStep / subDiv));
  }
}
}

function playMelody() {
  Tone.Transport.bpm.value = 200;
  Tone.Transport.start();
  Tone.Transport.schedule(triggerSynth, t);
}

function keyTyped() {
  if(key == 'p') {
 playMelody(); 
  } 
  if(key == 'a') {
   makeMelody();
    console.log("Meldoy Made");
    Tone.Transport.position = 0;
  }
}

function makeInstrument() {

  const reverb = new Tone.Freeverb({
    roomSize: 0.98,
    dampening: 10000
  }).toMaster();

  instrument = new Instrument({
    note: "C2",
    chain: reverb
  })
}

function setup() {
  createCanvas(900, 400);
  fill("white")
  textSize(28)
  makeInstrument()
 //Tone.Transport.start();

 
}
var notes = ["C", "D", "E", "F", "G", "A" , "B", "C"]

function numToNote(n){
  var octaves = ["2", "3", "4"]
  var octave = octaves[int(random(0, octaves.length-1))]
  
  var flats = ["", "b"]//ok, adding random flats creates Cb. Nevermind.
  var flat = flats[ int( random(0, 2))]
  print(flat)
  return notes[n] + flat+ octave
}
  



function play(){
 Tone.Transport.stop();
  
  //pitch: 62, startTime: 0.0, endTime: 1.5 
  // create a new sequence with the synth and notes
  var beat = ["2n", "4n", "8n"][int(random(0,4))]
  const synthPart = new Tone.Sequence(
    
  function(time, note) {
    var durations = ["32","16", "8", "4", "2"]
    
    var dur = durations[int(random(0 , durations.length-1))]+"n"
    print(note, dur, time)
    synth.triggerAttackRelease(note, dur, time );
  },
  riff,
  beat
);
   
  synthPart.start();
  Tone.Transport.start();
}

var riff = []
function rollDice(){
  Tone.Transport.bpm = int(random(60, 140))
  dice = []
  riff = []
  for (i=0; i<numberOfDice; i++){
    var diceVal = int(random(0, diceMax))
    dice[i] = diceVal
    riff[i] = numToNote(diceVal)
  }
  print(dice)
  play()
}

function draw() {
   background(50)
  
  if(dice[0] ==null){
    text("Click to roll", 300, height/2)
  }else{
  for (i=0; i<numberOfDice; i++){
     text(dice[i], 200+ i*50, height/2) 
     text(riff[i], 180+ i*60, height/2 + 100)
  }
  }
}

function mousePressed(){
  if (riff != []){
   rollDice()
  }else{
    setup()
  }
}