/* THE LONG AND THE SHORT OF IT - YOU ARE BEING LIED TO
Tom Smith - http://everythingability.com



*/
let camShader;
let cam;
let theImg;
var img
var timer
var timerValue = 500;
var currStartTime = 0;


var textInput;
var textOutput;
var lightOutput;
var lightPulse = [];
var t = 0;
var t_max;
var font;

var instrument

function preload() {
  img = loadImage("kisspng-palace-of-westminster-parliament.png")
  //font= loadFont("Roboto.ttf")
  font = loadFont("Franklin Gothic Heavy Italic.ttf")

}

function Timer(timerLength) {

  this.savedTime = timerLength;
  this.totalTime = timerLength

  this.getTime = function() {
    //print(this.duration)
    this.passedTime = millis() - this.savedTime
  }

  this.start = function() {
    this.savedTime = millis();
  }
  this.isFinished = function() {

    this.passedTime = millis() - this.savedTime

    if (this.passedTime > this.totalTime) {
      return true;
    } else {
      return false;
    }
  }

}

function setup() {
  createCanvas(displayWidth * 0.9, 800);
  smooth();
  makeInstrument()
  textFont(font)
  textSize(600);

  textAlign(CENTER, CENTER);
  textInput = " YOU ARE BEING LIED TO  ";
  textOutput = encodeMorseCode(textInput);
  lightOutput = encodeMorseCodeLight(textInput);
  print("Text input: " + textInput);
  print("Morse code: " + textOutput);
  print("Morse light code: " + lightOutput);

  t_max = lightOutput.length;
  t = 0;

  lightPulse = new Array(t_max);
  for (var i = 0; i < t_max; i++) {
    lightPulse[i] = lightOutput.charAt(i);
  }
  morse_space()
  timer = new Timer(5000)
  timer.start()

  c = "" + textOutput.charAt(t);
  print("Starting with letter:" + [c])



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


function morse_dash() {
  background("red");
  var e = select("body")
  e.addClass("red")
  e.removeClass("white")
  e.removeClass("black")

  fill("white")
  text("DASH", width / 2, height / 2);

}

function morse_dot() {
  background(255);
  var e = select("body")
  e.addClass("white")
  e.removeClass("red")
  e.removeClass("black")
  fill("red")
  text("DOT", width / 2, height / 2);

}

function morse_space() {
  background(0);


  imageMode(CENTER)
  image(img, width / 2, height / 2)
  var e = select("body")
  e.addClass("black")
  e.removeClass("white")
  e.removeClass("red")
  //filter(INVERT)

}

var firstRun = true

function draw() {

   textSize(600);


  c = "" + textOutput.charAt(t);
  if (timer.isFinished() == true) {

    print(c)

    if (c == '.') {
      firstRun = true
      timer = new Timer(500)
      timer.start()


    } else if (c == '_') {
      firstRun = true
      timer = new Timer(3000)
      timer.start()

    } else { //space
      firstRun = true
      timer = new Timer(1000)
      timer.start()
    }

    t++; //move the letter on one

  } else {
    if (c == '.') {
      if (firstRun) {
        instrument.playNote("C2", "32n", c)
        firstRun = false
      }
      morse_dot();
    } else if (c == '_') {
      if (firstRun) {
        instrument.playNote("C2", "4n", c)
        firstRun = false
      }
      morse_dash();
    } else {
      morse_space()
    }

  }

  if (t > textOutput.length) {
    t = 0;
    print("beginning")
  }

  
  if (getAudioContext().state !== 'running') {
    textSize(50);

   fill("#FFFF0A")
    
    text('click to start audio', width/2, height-100);
  } else {
    //text('audio is enabled', width/2, height/2);
  }





}


function encodeMorseCode(in_string) {
  var TextInput = in_string.toLowerCase();
  var MorseCode = new String();
  var AlphabetArray = [" ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1"];
  var MorseCodeArray = [" ", "._", "_...", "_._.", "_..", ".", ".._.", "__.", "....", "..", ".___", "_._", "._..", "__",
    "_.", "___", ".__.", "__._", "._.", "...", "_", ".._", "..._", ".__", "_.._", "_.__", "__..", "_____", ".____"
  ];

  for (var i = 0; i < TextInput.length; i++) {
    for (var j = 0; j < AlphabetArray.length; j++) {
      if ("" + TextInput.charAt(i) == AlphabetArray[j]) {
        MorseCode += MorseCodeArray[j] + " ";
      }
    }
  }
  return MorseCode;
}

function encodeMorseCodeLight(in_string) {
  var TextInput = in_string.toLowerCase();
  var MorseCodeLight = new String();
  var AlphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", ",", ".", "!", "?", ";", "-"];
  var MorseCodeLightArray = ["101110", "1110101010", "111010111010", "11101010", "10", "1010111010", "1110111010", "10101010", "1010", "10111011101110", "1110101110", "1011101010", "11101110",
    "111010", "111011101110", "101110111010", "11101110101110", "10111010", "101010", "1110", "10101110", "1010101110", "1011101110", "111010101110",
    "11101011101110", "111011101010", "000000", "", "", "", "", "", ""
  ];

  for (var i = 0; i < TextInput.length; i++) {
    for (var j = 0; j < AlphabetArray.length; j++) {
      if ("" + TextInput.charAt(i) == AlphabetArray[j]) {
        MorseCodeLight += MorseCodeLightArray[j];
      }
    }
  }
  return MorseCodeLight;
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  var synth = new p5.MonoSynth();
  synth.play('C3', 0.5, 0, 0.2);
}

 