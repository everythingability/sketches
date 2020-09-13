
  let rnn;
  var musicRNNIsLoaded = false
  let storedMelodies;
  let subDiv = 6;
  let t =0;
  var cello
  let celloLoaded = false




  function preloadRNN(){
    try{
      rnn = new mm.MusicRNN('my_checkpoints');
      rnn.initialize();
      musicRNNIsLoaded = true
    }catch(e){
      console.log(e)
    }

    //See this: https://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/
    cello = new Tone.Sampler({
    
          /*

The highlighted ones report 404s in the console
          */
          //"A0" : "samples/cello/A0.mp3",
          //"C1" : "samples/cello/C1.mp3",
        // "D#1" : "samples/cello/Ds1.mp3",
          //"F#1" : "samples/cello/Fs1.mp3",
          //"A1" : "samples/cello/A1.mp3",
          "C2" : "samples/cello/C2.mp3",
          "D#2" : "samples/cello/Ds2.mp3",
          //"F#2" : "samples/cello/Fs2.mp3",
          "A2" : "samples/cello/A2.mp3",
          "C3" : "samples/cello/C3.mp3",
          "D#3" : "samples/cello/Ds3.mp3",
          "F#3" : "samples/cello/Fs3.mp3",
          "A3" : "samples/cello/A3.mp3",
          "C4" : "samples/cello/C4.mp3",
          "D#4" : "samples/cello/Ds4.mp3",
          "F#4" : "samples/cello/Fs4.mp3",
          "A4" : "samples/cello/A4.mp3",
          "C5" : "samples/cello/C5.mp3",
          //"D#5" : "samples/cello/Ds5.mp3",
        // "F#5" : "samples/cello/Fs5.mp3",
        // "A5" : "samples/cello/A5.mp3",
        // "C6" : "samples/cello/C6.mp3",
          //"D#6" : "samples/cello/Ds6.mp3",
          //"F#6" : "samples/cello/Fs6.mp3",
          //"A6" : "samples/cello/A6.mp3",
        // "C7" : "samples/cello/C7.mp3",
        // "D#7" : "samples/cello/Ds7.mp3",
          //"F#7" : "samples/cello/Fs7.mp3",
          //"A7" : "samples/cello/A7.mp3",
          //"C8" : "samples/cello/C8.mp3"
        }, function(){
          try{
              cello.volume.value = -10
              //cello.source.volume.value = -16;
               cello.attack = 1.0
              cello.curve = "exponential"
              //cello.release = 3.0
              
              celloLoaded = true
              cello.triggerAttack("A3")
              console.log("Cello loaded!")
          }catch(e){
            console.log("Cello error:", e)
          }
    })
    cello.volume.value = -10
    var gainNode = Tone.context.createGain();
    var env = new Tone.Envelope({
      "attack" : 2.0,
      "decay" : 2.0,
      "sustain" : 2.0,
      "release" : 2.0,
    });
    //cello.connect(gainNode.gain);

    // create effects
    var effect1 = new Tone.FeedbackDelay();
    effect1JSON = {
      "delayTime" : "4n", 
      "feedback" : 0.7,
        "wet": 0.5
    };
    effect1.set(effect1JSON).toMaster();


    // make connections
    cello.connect(effect1);
    //effect1.connect(Tone.Master);
    cello.toMaster();
  }

  function makeMelody(panini) {
   //console.log("panini", panini)
   for (i=0; i< panini.notes.length; i++){
    let midiNote = Tone.Frequency(panini.notes[i].pitch, 'midi')['_val'];//convert
   // print(midiNote)
    panini.notes[i].pitch  = constrain(midiNote, 48, 83) //errors if gets a 47 etc
   }

    const mel1 = mm.sequences.quantizeNoteSequence(panini, 4);

    rnn.continueSequence(mel1, 32, 1.3)
      .then((notes) => storedMelodies = notes)
      .then( () =>  saveMelody(panini, storedMelodies.notes)            )
      
  }
    

  function toneNoteToMidi(note){
    return Tone.Frequency(note).toFrequency()['_val']
  }


  function midiNote(midi){
    //Converts midi notes frequencies to Tone A2, C3 notes
    var CHROMATIC = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ]
    if (isNaN(midi) || midi < 0 || midi > 127) return null
    var name = CHROMATIC[midi % 12]
    var oct = Math.floor(midi / 12) - 2
    return name + oct
  }