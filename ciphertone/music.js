var reverb = new Tone.Freeverb({
  roomSize: 0.9,
  dampening: 0,
})
var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var pingPong2 = new Tone.PingPongDelay("16t", 0.1).toMaster();
var feedbackDelay = new Tone.FeedbackDelay("1n", 0.5).toMaster();

//some overall compression to keep the levels in check
var masterCompressor = new Tone.Compressor({
	"threshold" : -6,
	"ratio" : 3,
	"attack" : 0.5,
	"release" : 0.1
});

const synth = new Tone.Synth().toMaster()
synth.triggerAttackRelease("C4", "8n");

var meter = new Tone.Meter();

function findNote(c) {

  if (c.match(/a|h/i)) {
    return 'A'
  } else if (c.match(/o|v/i)) {
    return 'As'


  } else if (c.match(/b|i|p|w/i)) {
    return 'B'
  
  } else if (c.match(/c|j/i)) {
    return 'Cs'
  } else if (c.match(/q|x/i)) {
    return 'Cs'

  } else if (c.match(/d|k/i)) {
    return 'D'
  } else if (c.match(/r|y/i)) {
    return 'Ds'

  } else if (c.match(/e|l|s|z/i)) {
    return 'E'
  
  } else if (c.match(/f|m/i)) {
    return 'F'
  } else if (c.match(/t/i)) {
    return 'Fs'

  } else if (c.match(/g|n/i)) {
    return 'G'
  } else if (c.match(/u|./i)) {
    return 'Gs'
  }
  
}

function findDuration(c) {
  if (c.match(/a|b|c|d|e|f|g|Ã—/i)) {
    return "8n"
  } else if (c.match(/h|i|j|k|l|m|n/i)) {
    return "4n"
  } else if (c.match(/o|p|q|r|s|t|u/i)) {
    return "2n"
  } else if (c.match(/v|w|x|y|z|./i)) {
    return "1n"
  }
}

function findOctave(curNote, prevNote, curOct) {
  /* may need to limit the octave if it goes out of range of midi */
  if (curNote.match(/a|b/i)) {
    curNote = curNote.charCodeAt(0) - 88
  } else {
    curNote = curNote.charCodeAt(0) - 95
  }

  if (prevNote.match(/a|b/i)) {
    prevNote = prevNote.charCodeAt(0) - 88
  } else {
    prevNote = prevNote.charCodeAt(0) - 95
  }

  if (curNote === prevNote) {
    return curOct;
  } else if (curNote > prevNote) {
    let u = curNote - prevNote
    let v = prevNote + 7 - curNote /* change the 7 for chromatic version? */
    if (u < v) {
      return curOct
    } else {
      return curOct - 1
    }
  } else if (prevNote > curNote) {
    let u = prevNote - curNote
    let v = curNote + 7 - prevNote
    if (u < v) {
      return curOct
    } else {
      return curOct + 1
    }
  }
}

function processMessage(msg, curOct) {
  var track = []
  let len = msg.length
 
  let curNote = 'A' /* current note. z is just a filler */
  let prevNote = 'A'
  let curDur = '1n' /* one beat */
  let wait = 0 /* for handling rests */
  let times = []
  for (let i = 0; i < len; i++) {
    let c = msg.charAt(i)
    prevNote = curNote ? curNote : prevNote
    curNote = findNote(c)
    if (curNote) {
      curOct = findOctave(curNote, prevNote, curOct)
      curDur = findDuration(c)
       times.push(curDur)
       t = times.join("+")
       var velocity = random(0.4, 1)
       var volume = random(-30, 30)
      track.push({note:[`${curNote}${curOct}`], duration:curDur, time:t, velocity:velocity, volume:volume})
      wait = 0
    } else {
      /* if not a letter, we rest */
      /* one non-letter will rest for the same amount of time as previous note's length */
      wait += curDur;
    }
  }
  return track
}


function run(){
  specie = species[int(random(0, species.length-1))]
  specie = specie.toLowerCase().trim().replace("Ã—", " ")
  fill("#ffffff")
  
  doPiano(specie)
  doCello(specie)

}

function doPiano(specie){
  
  var oct = int ( random(0, 7))
  console.log("piano", specie, oct)
  var melody = processMessage(specie, oct) 
  console.log(melody)

  var base_url = "samples/piano/"
  var pianoSamples = new Tone.Buffers({
    A0: base_url +"A0.mp3",
    A1: base_url +"A1.mp3",
    A2: base_url +"A2.mp3",
    A3: base_url +"A3.mp3",
    A4: base_url +"A4.mp3",
    A5: base_url +"A5.mp3",
    A6: base_url +"A6.mp3",
    As0: base_url +"As0.mp3",
    As1: base_url +"As1.mp3",
    As2: base_url +"As2.mp3",
    As3: base_url +"As3.mp3",
    As4: base_url +"As4.mp3",
    As5: base_url +"As5.mp3",
    As6: base_url +"As6.mp3",
    B0: base_url +"B0.mp3",
    B1: base_url +"B1.mp3",
    B2: base_url +"B2.mp3",
    B3: base_url +"B3.mp3",
    B4: base_url +"B4.mp3",
    B5: base_url +"B5.mp3",
    B6: base_url +"B6.mp3",
    C0: base_url +"C0.mp3",
    C1: base_url +"C1.mp3",
    C2: base_url +"C2.mp3",
    C3: base_url +"C3.mp3",
    C4: base_url +"C4.mp3",
    C5: base_url +"C5.mp3",
    C6: base_url +"C6.mp3",
    C7: base_url +"C7.mp3",
    Cs0: base_url +"Cs0.mp3",
    Cs1: base_url +"Cs1.mp3",
    Cs2: base_url +"Cs2.mp3",
    Cs3: base_url +"Cs3.mp3",
    Cs4: base_url +"Cs4.mp3",
    Cs5: base_url +"Cs5.mp3",
    Cs6: base_url +"Cs6.mp3",
    D0: base_url +"D0.mp3",
    D1: base_url +"D1.mp3",
    D2: base_url +"D2.mp3",
    D3: base_url +"D3.mp3",
    D4: base_url +"D4.mp3",
    D5: base_url +"D5.mp3",
    D6: base_url +"D6.mp3",
    Ds0: base_url +"Ds0.mp3",
    Ds1: base_url +"Ds1.mp3",
    Ds2: base_url +"Ds2.mp3",
    Ds3: base_url +"Ds3.mp3",
    Ds4: base_url +"Ds4.mp3",
    Ds5: base_url +"Ds5.mp3",
    Ds6: base_url +"Ds6.mp3",
    E0: base_url +"E0.mp3",
    E1: base_url +"E1.mp3",
    E2: base_url +"E2.mp3",
    E3: base_url +"E3.mp3",
    E4: base_url +"E4.mp3",
    E5: base_url +"E5.mp3",
    E6: base_url +"E6.mp3",
    F0: base_url +"F0.mp3",
    F1: base_url +"F1.mp3",
    F2: base_url +"F2.mp3",
    F3: base_url +"F3.mp3",
    F4: base_url +"F4.mp3",
    F5: base_url +"F5.mp3",
    F6: base_url +"F6.mp3",
    Fs0: base_url +"Fs0.mp3",
    Fs1: base_url +"Fs1.mp3",
    Fs2: base_url +"Fs2.mp3",
    Fs3: base_url +"Fs3.mp3",
    Fs4: base_url +"Fs4.mp3",
    Fs5: base_url +"Fs5.mp3",
    Fs6: base_url +"Fs6.mp3",
    G0: base_url +"G0.mp3",
    G1: base_url +"G1.mp3",
    G2: base_url +"G2.mp3",
    G3: base_url +"G3.mp3",
    G4: base_url +"G4.mp3",
    G5: base_url +"G5.mp3",
    G6: base_url +"G6.mp3",
    Gs0: base_url +"Gs0.mp3",
    Gs1: base_url +"Gs1.mp3",
    Gs2: base_url +"Gs2.mp3",
    Gs3: base_url +"Gs3.mp3",
    Gs4: base_url +"Gs4.mp3",
    Gs5: base_url +"Gs5.mp3",
    Gs6: base_url +"Gs6.mp3"}, function(){
                play(melody);
            });

            //connect(feedbackDelay).connect(pingPong)
            var player = new Tone.Player({
                retrigger : true
            }).connect(reverb).connect(feedbackDelay).connect(pingPong).toMaster();

            function triggerNote(noteName, duration, time){
                player.buffer = pianoSamples.get(noteName);
                player.start(time, 0, duration);
            }
            function play(melody) {
              
                var melodyPart = new Tone.Part(function(time, value){
                    for (var index=value.note.length-1;index>=0;index--) {
                        triggerNote(value.note[index], value.duration, time);
                    }
                }, melody ).start();

            }

}

Tone.Transport.bpm.value = 80;
Tone.Transport.start("+0.5");

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 4.1,
  decay: 4.2,
  sustain: 4.0,
  release: 4.8
})


function findChordNote(c) {
  if (c.match(/B|C|D/i)) {
    return "C"
  } else if (c.match(/A/i)) {
    return "Cs"
  } else if (c.match(/F|G|H/i)) {
    return "D"
  } else if (c.match(/E/i)) {
    return "Ds"
  } else if (c.match(/J|K|L/i)) {
    return "E"
  } else if (c.match(/M|N|P/i)) {
    return "F"
  } else if (c.match(/I/i)) {
    return "Fs"
  } else if (c.match(/Q|R|S/i)) {
    return "G"
  } else if (c.match(/O/i)) {
    return "Gs"
  } else if (c.match(/T|V|W/i)) {
    return "A"
  } else if (c.match(/U/i)) {
    return "As"
  } else if (c.match(/X|Y|Z|./i)) {
    return "B"
  }else{
    return "C"
  }
}

function findChordDuration(c) {
  if (c.match(/a|b|c|d|e|f|g|Ã—/i)) {
    return "1"
  } else if (c.match(/h|i|j|k|l|m|n/i)) {
    return "2"
  } else if (c.match(/o|p|q|r|s|t|u/i)) {
    return "3"
  } else if (c.match(/v|w|x|y|z|./i)) {
    return "4"
  }
}

function findChordOctave(curNote, prevNote, curOct) {
  if (curNote === prevNote) {
    return curOct + 1
  } else if (curNote > prevNote) {
    return curOct
  } else if (prevNote > curNote) {
    return curOct + 1
  }
}

function processChord(msg) {
  let track = []
  let len = msg.length
  let curOct = 3; /* current octave */
  let curNote = "C"  /* current note. z is just a filler */
  let prevNote = "C"
  let chord = []
  let times = []
  let notes = []

  for (let i = 0; i < len; i++) {
    let c = msg.charAt(i)
    prevNote = curNote
    curNote = findChordNote(c)
    curDur = findChordDuration(c)
    times.push(curDur)

    if (c == " " |notes.length > 2){     
      var obj = {'time': t, 'note': notes, 'duration': curDur+"m"}
      track.push(obj)
      notes = []
    }else{
      notes.push(`${curNote}${curOct}`)
    }    
    t = times.join("n+")   
  }
  var obj = {'time': t, 'note': notes, 'duration': curDur+"m"}
  track.push(obj) 
  return track
}


/////////////////////////////////////////////////////////////

function doCello(specie){
 
  var oct = int ( random(2, 5))
  console.log("cello", specie, oct)
  var melody = processChord(specie) //processMessage(specie, oct) 

  console.log(melody)

  var base_url = "samples/cello/"
  var celloSamples = new Tone.Buffers({
   
    "A3":base_url +"A3.mp3",
    "A2":base_url +"A2.mp3",
    "A4":base_url +"A4.mp3",
    "As2":base_url +"As2.mp3",
    "As3":base_url +"As3.mp3",
    "As4":base_url +"As4.mp3",
    "B2":base_url +"B2.mp3",
    "B3":base_url +"B3.mp3",
    "B4":base_url +"B4.mp3",
    "C2":base_url +"C2.mp3",
    "C3":base_url +"C3.mp3",
    "C4":base_url +"C4.mp3",
    "C5":base_url +"C5.mp3",
    "Cs3":base_url +"Cs3.mp3",
    "Cs4":base_url +"Cs4.mp3",
    "D2":base_url +"D2.mp3",
    "D3":base_url +"D3.mp3",
    "D4":base_url +"D4.mp3",
    "Ds2":base_url +"Ds2.mp3",
    "Ds3":base_url +"Ds3.mp3",
    "Ds4":base_url +"Ds4.mp3",
    "E2":base_url +"E2.mp3",
    "E3":base_url +"E3.mp3",
    "E4":base_url +"E4.mp3",
    "Fs2":base_url +"F2 v2.mp3",
    "F2":base_url +"F2.mp3",
    "F3":base_url +"F3.mp3",
    "F4":base_url +"F4.mp3",
    "Fs3":base_url +"Fs3.mp3",
    "Fs4":base_url +"Fs4.mp3",
    "Gs2":base_url +"G2 v2.mp3",
    "G2":base_url +"G2.mp3",
    "G3":base_url +"G3.mp3",
    "G4":base_url +"G4.mp3",
    "Gs2":base_url +"Gs2.mp3",
    "Gs3":base_url +"Gs3.mp3",
    "Gs4":base_url +"Gs4.mp3",

  }, function(){
                play(melody);
            });

            var params = {
              pan : 0.25 ,
              volume : -12 ,
              mute : false ,
              solo : false
              }
            //var channel = new Tone.Channel(params)
            var player = new Tone.Player({
                retrigger : true,
                volume: -12
            }).connect(reverb).connect(ampEnv).toMaster();

            function triggerNote(noteName, duration, time){
                player.buffer = celloSamples.get(noteName);
                player.start(time, 0, duration);
            }
            function play(melody) {
              
                var melodyPart = new Tone.Part(function(time, value){
                    for (var index=value.note.length-1;index>=0;index--) {
                        triggerNote(value.note[index], value.duration, time);
                    }
                }, melody ).start();

            }

}