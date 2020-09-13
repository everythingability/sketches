/* Reference
See: https://github.com/djipco/webmidi
https://webaudiodemos.appspot.com/midi-synth/index.html
https://jcra.ncsu.edu/resources/photographs/botanical-name-listing.php

TO - DO
TAKE A LOOK AT: https://github.com/tonaljs/tonal
Melody continuation with MusicRNN

https://editor.p5js.org/tom.smith/sketches/eip4DzEkV
*/

function processTracks(){
  // Pre-process all the tracks so that they will also
  //work with the Magenta melody player. 

  for (var t in allTracks){
    var notes = allTracks[t].tracks[0].notes
    for (n in notes){
       
        var note = notes[n]
        console.log(note)
        var noteName = note.name
        var freq = Tone.Frequency(noteName).toFrequency()
        print(noteName, freq)

       allTracks[t].tracks[0].notes[n].frequency = freq
       var midi = allTracks[t].tracks[0].notes[n].midi
       midi = constrain(midi, 12, 76) //https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
       
       allTracks[t].tracks[0].notes[n].pitch = midi

       var startTime = allTracks[t].tracks[0].notes[n].time
       allTracks[t].tracks[0].notes[n].startTime = startTime

       var startTime = allTracks[t].tracks[0].notes[n].time
       allTracks[t].tracks[0].notes[n].startTime = startTime

       var duration = allTracks[t].tracks[0].notes[n].duration
       allTracks[t].tracks[0].notes[n].endTime = startTime  + duration
    }
  }
}