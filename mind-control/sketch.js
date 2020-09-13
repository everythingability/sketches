// See patent: http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=6,506,148.PN.&OS=PN/6,506,148&RS=PN/6,506,148
let angle = 0;
let angle2 = 10
let inc1 = 1
let inc2 = 0.3
let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier

let analyzer; // we'll use this visualize the waveform

// the carrier frequency pre-modulation
let carrierBaseFreq = 40;

// min/max ranges for modulator
let modMaxFreq = 10;
let modMinFreq = 1;
let modMaxDepth = 300;
let modMinDepth = -300;

function setup() {
  let cnv = createCanvas(800, windowHeight);
  noFill();

  carrier = new p5.Oscillator('sine');
  carrier.amp(0); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  carrier.start(); // start oscillating
   carrier.amp(1.0, 0.01);
  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new p5.Oscillator('square');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);

  // create an FFT to analyze the audio
  analyzer = new p5.FFT();

  // fade carrier in/out on mouseover / touch start
  toggleAudio(cnv);
}

function draw() {
  fill(255,0 , 100, 100)
  
  rect(0, 0, width, height)
   carrier.freq(map(mouseX, 0, mouseY, 0 , carrierBaseFreq))
  // map mouseY to modulator freq between a maximum and minimum frequency
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  
  let h = map(sin(angle), 0, width, modMinFreq, modMaxFreq); // 100 maxheight
  modFreq = h
  modulator.freq(h);
  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  //
  let i = map(sin(angle2), 0, width, modMinDepth, modMaxDepth); // 100 maxheight
  
  let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modDepth = i
  modulator.amp(i);

  // analyze the waveform
  waveform = analyzer.waveform();

  // draw the shape of the waveform
  stroke(0, 200, 200);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();

  strokeWeight(1);
  // add a note about what's happening
  text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
  text(
    'Modulator Amplitude (Modulation Depth): ' + modDepth.toFixed(3),
    20,
    40
  );
  text(
    'Carrier Frequency (pre-modulation): ' + carrierBaseFreq + ' Hz',
    width / 2,
    20
  );
  angle++
  angle2 += 0.4
}

// helper function to toggle sound
function toggleAudio(cnv) {
  cnv.mouseOver(function() {
    carrier.amp(1.0, 0.01);
  });
  cnv.touchStarted(function() {
    carrier.amp(1.0, 0.01);
  });
  cnv.mouseOut(function() {
    //carrier.amp(0.0, 1.0);
  });
}
