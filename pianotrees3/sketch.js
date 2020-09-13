var currentSpecies = "" //Name
//var output

let pianoLoaded = false
var instruments
var piano
var allTracks = {} //the JSON that contains all the species and melodies
var msg = 'Loading...'

function loadedJSON(s){
  print("JSON LOADED")
  return s
}

var reverb = new Tone.Freeverb({
  roomSize: 0.8,
  dampening: 0,
})

function preload(){
  allTracks = loadJSON("allTracks.json", loadedJSON) 

  piano = new Tone.Sampler({
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
  }, function(){
    pianoLoaded = true
    piano.volume.value = 6
    console.log("Piano loaded!")
    Tone.Transport.bpm.value = 80
    console.log("Tempo set to " + Tone.Transport.bpm.value + " bpm!")
    Tone.Transport.loop = true
    console.log("Transport looped!")
    Tone.Transport.start()
    piano.triggerAttack("C3")
    console.log("Transport started!")
  }).toMaster();

  //attach a click listener to a play button


   
  
}
var speciesCounter = 0

var canvas 
function setup() {
  preloadRNN()//do this last
  canvas = createCanvas(windowWidth, windowHeight);
  textSize(60)
  n = int(random(0, species.length-1))
  msg = "Click to play..."
  //timer = setInterval(doRNN, 8000)
  //print(allTracks)
  //saveJSON(allTracks, "allTracks.json")//
}

function playRandom(){
  var n = int(random(0, species.length-1))
  play(n)
}
function doRNN(){
  var data = getSpecie(species[speciesCounter])
  currentSpecies = data.name
  
  var notes = data.french.tracks[0].notes
  //print("notes:", notes)
  let panini  = {notes:notes}
  var lastNote = notes[notes.length-1]
  var lastNoteTime = lastNote.time + lastNote.duration
  panini.totalTime = lastNoteTime
  console.log("lastNoteTime:", lastNoteTime)
  var melody = makeMelody(panini)
  

  
}

var celloMelody

function saveMelody(panini, melody){ //          CONVERTS RNN TO TONE.JS   /////
  //Convert this RNN melody into one like my Tone.js melody 
  //console.log(currentSpecies, "melody:", melody )
  var track = {notes:[]}
  
  for (n=0; n< melody.length; n++){
    var melodyNote = melody[n] //{pitch: 76, quantizedStartStep: 4, quantizedEndStep: 6}
    //print( melodyNote.quantizedStartStep)
    var note = { "name": midiNote(melodyNote.pitch),
        "time": melodyNote.quantizedStartStep/16,
        "velocity": 0.3,
        "duration": melodyNote.quantizedEndStep/4,
        "pitch": melodyNote.pitch, 
        "volume":-30
     }
     track.notes.push(note)

  }
   
  track.startTime = 0,
  track.duration = track.notes[track.notes.length-1].time + track.notes[track.notes.length-1].duration
  track.length = track.duration //last time + last duration
  celloMelody  = track
  play(speciesCounter)
   speciesCounter++

}



function draw() {
  background(50);
  fill("white")
  textSize(60)
  text(currentSpecies, 40, height/2)
  textSize(20)
  text(msg, 40, height/2 + 50)
}

Tone.start = function(){

  return Tone.context.resume();
  
  };

function touchStarted(){
  //fullscreen(true)
   
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    //Tone._audioContext = getAudioContext();
    Tone.start()
    
    
  }
  msg =  "AudioContext: " +  getAudioContext().state
 
 // n = int(random(0, species.length-1))
   
   doRNN()
}


function mousePressed(){
  //fullscreen(true)
 
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    Tone.start()
  }
  msg = "AudioContext: " +  getAudioContext().state
 
 // n = int(random(0, species.length-1))
   
   doRNN()
}





function getSpecie(name){

  var f = name.toLowerCase()
  var french = allTracks[f + "_french"]
  var chords = allTracks[f + "_chords"]
  var keyboard = allTracks[f + "_keyboard"]
  return {name:name, french:french, chords:chords, keyboard:keyboard}
}



function play(n){
  if (!pianoLoaded){
    console.log("Not ready yet")
    return
  }

  //console.log("PLAYING", species[n])
  var data = getSpecie(species[n])
  currentSpecies = data.name

  // Get chord and do stuff with it.
  const chords = data.chords
  var chordNotes = chords.tracks[0].notes
  //console.log("chordNotes:", chordNotes)
  // Find the maximal offtime.
  const chordMaxOff = mu.max_argmax(chordNotes.map(function(e){
    return e.time + e.duration
  }))
  //console.log("chord max offtime and index of max offtime:", chordMaxOff)

  // Get french melody and do stuff with it.
  const french = data.french
  var frenchNotes = french.tracks[0].notes
  //console.log("frenchNotes:", frenchNotes)
  // Find the maximal offtime.
  const frenchMelMaxOff = mu.max_argmax(frenchNotes.map(function(e){
    return e.time + e.duration
  }))
 //console.log("french melody max offtime and index of max offtime:", frenchMelMaxOff)

  // Get keyboard melody and do stuff with it.
  const keyboard = data.keyboard
  var keyboardNotes = keyboard.tracks[0].notes
  //console.log("keyboardNotes:", keyboardNotes)
  // Find the maximal offtime.
  const keyboardMelMaxOff = mu.max_argmax(keyboardNotes.map(function(e){
    return e.time + e.duration
  }))
  //console.log("keyboard melody max offtime and index of max offtime:", keyboardMelMaxOff)
  
  chelloMelMaxOff = 0
  if (celloMelody != undefined){
   
    var chelloMelMaxOff = mu.max_argmax(celloMelody.notes.map(function(e){
      return e.time + e.duration
    }))
  }

  // ////////////////////////////////////Set up THE loop.
  const pauseTime = 2
  const overallOfftime = chordMaxOff[0] + frenchMelMaxOff[0] + keyboardMelMaxOff[0] + pauseTime
  console.log( "Loop time:", overallOfftime)
  // Convert note's start time to measure and beat etc. as per Tone.js
  // representation.
  Tone.Transport.loopEnd = "0:0:" + (4*overallOfftime).toString()


  // Cancel everything that was scheduled so far.
  Tone.Transport.cancel()

  // Put chord and shortMel on the Transport.
  chordNotes.map(function(e){
    // Convert note's start time to measure and beat etc. as per Tone.js
    // representation.
    const startTime = "0:0:" + (8*(e.time + 0.05)).toString() //HACKED TO SLOW DOWN!
    const duration = "0:0:" + (16*e.duration).toString()
    Tone.Transport.schedule(function(time){
      //print( e.name, duration, time)
      piano.triggerAttackRelease(
        e.name,
        duration ,
        time,
        e.velocity
      );
    }, startTime)
  })

  frenchNotes.map(function(e){
    // Convert note's start time to measure and beat etc. as per Tone.js
    // representation.
    const startTime = "0:0:" + (4*(frenchMelMaxOff[0] + e.time + 0.05)).toString()
    const duration = "0:0:" + (4*e.duration).toString()
    
    Tone.Transport.schedule(function(time){
      piano.triggerAttackRelease(
        e.name,
        duration,
        time,
        e.velocity
      );
    }, startTime)
  })

  keyboardNotes.map(function(e){
    // Convert note's start time to measure and beat etc. as per Tone.js
    // representation.
    const startTime = "0:0:" + (4*(keyboardMelMaxOff[0] + e.time + 0.05)).toString()
    const duration = "0:0:" + (4*e.duration).toString()
    //console.log( "keyboard", startTime,e.name, e.time, duration);
    Tone.Transport.schedule(function(time){
      piano.triggerAttackRelease(
        e.name,
        duration,
        time,
        e.velocity
      );
    }, startTime)
  })

  
  if (celloMelody != undefined){
   
    //print("celloMelody:",celloMelody)
    var lastNote = celloMelody.notes[celloMelody.notes.length-1]
    var lastNoteTime = lastNote.time + lastNote.duration
    console.log( lastNoteTime )
      celloMelody.notes.map(function(e){
        // Convert note's start time to measure and beat etc. as per Tone.js representation.
        var trackLength = chelloMelMaxOff[0]
        var mappedTime = map( e.time  , 0.0, lastNoteTime , 0.05  , trackLength)
        const startTime = "+0:0:" + nf (   chelloMelMaxOff[0] +   mappedTime   ,2).toString()
        const duration = "+0:0:" +   nf((chelloMelMaxOff[0] +   mappedTime + e.duration),2).toString()
        console.log("trackLength:", trackLength )
        console.log("lastNoteTime:", lastNoteTime)
        console.log( "mappedTime:" , mappedTime   )

        console.log( "cello", e.name, startTime, e.time, duration,  e.velocity);
        console.log("------------------------------------------------------")
        
        Tone.Transport.schedule(function(time){
      
          cello.triggerAttackRelease(
            e.name,
            duration,
            e.time,
            e.velocity
          );
        }, startTime)
      })

    }
 


  // Go back to the start of the transport.
  Tone.Transport.position = "0:0:0"

}




