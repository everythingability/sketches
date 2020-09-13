/* Reference
See: https://github.com/djipco/webmidi
https://webaudiodemos.appspot.com/midi-synth/index.html
https://jcra.ncsu.edu/resources/photographs/botanical-name-listing.php

TO - DO
TAKE A LOOK AT: https://github.com/tonaljs/tonal
Melody continuation with MusicRNN

https://editor.p5js.org/tom.smith/sketches/eip4DzEkV
*/

var log2, btn
var player;
var playing = false;
var currentSpecies = ""
var output

var piano = new Tone.Sampler({
      "A0" : "piano/A0.mp3",
      "C1" : "piano/C1.mp3",
      "D#1" : "piano/Ds1.mp3",
      "F#1" : "piano/Fs1.mp3",
      "A1" : "piano/A1.mp3",
      "C2" : "piano/C2.mp3",
      "D#2" : "piano/Ds2.mp3",
      "F#2" : "piano/Fs2.mp3",
      "A2" : "piano/A2.mp3",
      "C3" : "piano/C3.mp3",
      "D#3" : "piano/Ds3.mp3",
      "F#3" : "piano/Fs3.mp3",
      "A3" : "piano/A3.mp3",
      "C4" : "piano/C4.mp3",
      "D#4" : "piano/Ds4.mp3",
      "F#4" : "piano/Fs4.mp3",
      "A4" : "piano/A4.mp3",
      "C5" : "piano/C5.mp3",
      "D#5" : "piano/Ds5.mp3",
      "F#5" : "piano/Fs5.mp3",
      "A5" : "piano/A5.mp3",
      "C6" : "piano/C6.mp3",
      "D#6" : "piano/Ds6.mp3",
      "F#6" : "piano/Fs6.mp3",
      "A6" : "piano/A6.mp3",
      "C7" : "piano/C7.mp3",
      "D#7" : "piano/Ds7.mp3",
      "F#7" : "piano/Fs7.mp3",
      "A7" : "piano/A7.mp3",
      "C8" : "piano/C8.mp3"
  });

function createSynth() {
  Tone.Transport.bpm.value = 50

  var reverb = new Tone.Freeverb({
    roomSize: 0.3,
    dampening: 0,
  })
  //theSynth.connect(reverb).toMaster();
  piano.connect(reverb).toMaster()
}

WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
    console.log("WebMidi enabled!");
    output = WebMidi.outputs[0];
  }

});


function preload(){
  for (var s in species){
    var specie = species[s]
  }
  print(species.length , "species")
  //fname = "pinus radiata_french.mid"
}

var player, player1, player2
var relTime = 0
function setup() {
  createCanvas(800, 400);
  createSynth()
  Tone.Transport.start();
  Tone.Transport.seconds.toFixed(2)
  //piano= new Piano({velocities: 5})

  player = new MidiPlayer(); //French player, the main tune
  player.addCallback('noteOn', function (event) {
   var num = event.note
   num = num +12
   var note = midiNote(num)
   var channel = event.channel
   var time = "+" + event.timestamp
   var velocity = event.velocity
   var duration = event['length']
   var opts = {time: time, velocity:velocity, duration:duration}
   //output.playNote(note, 16, opts)
   var tonetime = int(duration - random(13, 99)) //+ "n"
    //print(note, channel ,time, velocity, duration,tonetime)
   //theSynth.triggerAttackRelease(note, tonetime)
   print(note, tonetime)
    piano.triggerAttackRelease(note, tonetime)
  });

  player.addCallback('noteOff', function (event) {/* handle noteOff event */
     print(player._playedEvents.length)

  });

  player1 = new MidiPlayer(); //chords player
  player1.addCallback('noteOn', function (event) {
    player1._speed =0.2 //ooh seems to work
   var num = event.note
   num = int(num*3)
   var note = midiNote(num)
   var channel = event.channel
   var time = "+" + event.timestamp
   var velocity = event.velocity
   var duration = event['length']
   var opts = {time: time, velocity:velocity, duration:duration}
   var tonetime = int(duration) //+ "n"
    piano.triggerAttackRelease(note, tonetime)
    //piano.triggerAttackRelease(note, tonetime*2 + tonetime)

  });

  player2 = new MidiPlayer(); //keyboards player
  player2.addCallback('noteOn', function (event) {
   var num = event.note
   num = num-12
   var note = midiNote(num)
   var channel = event.channel
   var time = "+" + event.timestamp
   var velocity = event.velocity
   var duration = event['length']
    var opts = {time: time, velocity:velocity, duration:duration}
    var tonetime = int(duration / 20) //+ "n"
   print(note, tonetime, duration)
    piano.triggerAttackRelease(note, tonetime)


   //piano.keyDown('C4', '+1')
  });

  textSize(60)
  n = int(random(0, species.length-1))
}


function mousePressed(){
  n = int(random(0, species.length-1))
  play(n)
}

function play(n){
  currentSpecies = species[n]

  var f = currentSpecies.toLowerCase()//play the melody
  fname = "midis/"+ f + "_french.mid"
  player.loadFromRelativeUrl(fname).then(function() {
    //print("player", player._duration)
    player.play();
   });

  fname = "midis/"+ f + "_chords.mid"
  player1.loadFromRelativeUrl(fname).then(function() {
    //player1.speed(0.5)
    print("player1", player1._duration)
    player1.play();
  });

  fname = "midis/"+ f + "_keyboard.mid"
  player2.loadFromRelativeUrl(fname).then(function() {
    print("player2", player2._duration)
    print ( player2 )
    player2.play();
   });
}


function draw() {
  background(50);
  fill("white")
  text(currentSpecies, 40, height/2)

  /*if (player._playing == false){ //it's done
    print("done", player._playedEvents.length)
  }*/
}

function report(s) {
  return function() {
    //log2.innerHTML = s;
    console.log(s)
  };
}

function clear2() {
  if (player) player.stop();
  playing = false;
  //log2.innerHTML = 'please wait...';
  //btn.innerHTML = 'Play';
  //btn.disabled = true;
}



function playStop() {
  if (playing) {
    player.stop();
    playing = false;
    //btn.innerHTML = 'Play';
  }
  else {
    player.play();
    playing = true;
    //btn.innerHTML = 'Stop';
  }
}
/*
function load(data, name) {
  try {
    player.onEnd = function() {
      playing = false;
      //btn.innerHTML = 'Play';
    }

    playing = true;
    player.play();
    //player.speed(0.5)
    //log2.innerHTML = name;
    //btn.innerHTML = 'Stop';
    //btn.disabled = false;
  }
  catch (e) {
    //log2.innerHTML = e;
  }
}

function loaded(file){
  var bytes = file.bytes
  var data = ""

  for (var i = 0; i < bytes.length; i++) {
        data += String.fromCharCode(bytes[i]);
  }

  load(data, currentSpecies);
}*/
function midiNote(midi){
  var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ]
  if (isNaN(midi) || midi < 0 || midi > 127) return null
  var name = CHROMATIC[midi % 12]
  var oct = Math.floor(midi / 12) - 1
  return name + oct
}
