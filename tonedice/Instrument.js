Tone.Transport.bpm.value = 120;

class Instrument {
	constructor({ note, chain }) {
		this.note = note;
		
		//this.chain = chain;
		this.fadeDirection = -1;

		this.fade = true;

		/*this.synth = new Tone.MonoSynth({
			frequency: 'C4',
			volume: -10,
			oscillator: {
				type: 'square'
			},
			envelope: {
				attack: 0.1,
				decay: 0.3,
				sustain: 0.2,
				release: 1
			},
			filterEnvelope: {
				attack: 0.06,
				decay: 0.1,
				sustain: 0.5,
				release: 1,
				baseFrequency: 130,
				octaves: 7,
				exponent: 1.2
			}
		}).chain(this.chain);
        */
      this.synth = new Tone.Synth().toMaster();
		
	}

	play(length) {
		this.synth.triggerAttackRelease(this.note, length);
	}
  	playNote(note, length) {
        
         //print("Playing:", note, length, c)
         //var vol = new Tone.Volume(-10);
         //this.synth.chain(vol, Tone.Master);
		 this.synth.triggerAttackRelease(note, length);
      
	}
    playSilence(note,  length) {
         var vol = new Tone.Volume(-60);
         this.synth.chain(vol, Tone.Master);
         print("Silence:", note, length)
		 this.synth.triggerAttackRelease(note, length);
	}

}


  
  
  