let instrumentLoaded = false
const piano = new Tone.Sampler({
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
  instrumentLoaded = true
  console.log("Instrument loaded!")
  Tone.Transport.bpm.value = 140
  console.log("Tempo set to " + Tone.Transport.bpm.value + " bpm!")
  Tone.Transport.loop = true
  console.log("Transport looped!")
  Tone.Transport.start()
  console.log("Transport started!")
}).toMaster();

function setup(){

}

function mousePressed(){
  console.log("Mouse pressed!")
  console.log("species.length:", species.length)
  const n = Math.floor(species.length*Math.random())
  console.log("n:", n)
  play(n)
}

function play(n){
  if (!instrumentLoaded){
    return
  }
  console.log("species[n]:", species[n])
  // Get chord and do stuff with it.
  const chord = species[n].chord
  console.log("chord:", chord)
  // Find the maximal offtime.
  const chordMaxOff = mu.max_argmax(chord.map(function(e){
    return e[0] + e[2]
  }))
  console.log("chord max offtime and index of max offtime:", chordMaxOff)

  // Get short melody and do stuff with it.
  const shortMel = species[n].shortMelody
  console.log("shortMel:", shortMel)
  // Find the maximal offtime.
  const shortMelMaxOff = mu.max_argmax(shortMel.map(function(e){
    return e[0] + e[2]
  }))
  console.log("short melody max offtime and index of max offtime:", shortMelMaxOff)

  // Set up a loop.
  const pauseTime = 4
  const overallOfftime = chordMaxOff[0] + shortMelMaxOff[0] + pauseTime
  // Convert note's start time to measure and beat etc. as per Tone.js
  // representation.
  Tone.Transport.loopEnd = "0:0:" + (4*overallOfftime).toString()

  // Cancel everything that was scheduled so far.
  Tone.Transport.cancel()
  // Put chord and shortMel on the Transport.
  chord.map(function(e){
    // Convert note's start time to measure and beat etc. as per Tone.js
    // representation.
    const startTime = "0:0:" + (4*(e[0] + 0.05)).toString()
    const duration = "0:0:" + (4*e[2]).toString()
    Tone.Transport.schedule(function(time){
      piano.triggerAttackRelease(
        e[1],
        duration,
        time,
        0.8
      );
    }, startTime)
  })
  shortMel.map(function(e){
    // Convert note's start time to measure and beat etc. as per Tone.js
    // representation.
    const startTime = "0:0:" + (4*(chordMaxOff[0] + e[0] + 0.05)).toString()
    const duration = "0:0:" + (4*e[2]).toString()
    Tone.Transport.schedule(function(time){
      piano.triggerAttackRelease(
        e[1],
        duration,
        time,
        0.8
      );
    }, startTime)
  })

  // Go back to the start of the transport.
  Tone.Transport.position = "0:0:0"
}
