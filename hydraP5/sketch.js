const core = () => {

  // create a new hydra-synth instance. makeGlobal is set to false,
  // so that commands can be directed to a specific canvas.
  // const h0 = new Hydra({
  //   canvas: document.getElementById("myCanvas0"),
  //   makeGlobal: true
  // }).synth;

  // h0.s0.initCam()
  // h0.src(h0.s0).out(h0.o0) // src(s0).out() is the same as saying src(s0).out(o0)

  // // to render an oscillator to output buffer o1:
  // h0.osc(20, 0.1, 0.6).out(h0.o1)
  // h0.src(h0.o0)
  //   .diff(h0.o1)
  //   .kaleid(7)
  //   .out(h0.o2)
  // h0.render(h0.o2) // show all four outputs o0, o1, o2, o3


  // h1.s0.init({ src: p1.canvas })
  // // h1.s0.initCam();

  // h1.src(h1.s0)
  //   .saturate(0.7)
  //   .colorama([0.005, 0.33, 0.66, 1.0].fast(5))
  //   // .pixelate(10, 15)
  //   .invert()
  //   .posterize([1, 5, 15, 30], 0.5)
  //   .kaleid(10)
  //   .repeat(3, 3)
  //   .scale(2)
  //   .repeat(5, 5, ({time}) => Math.sin(time), ({time}) => Math.sin(time/2))
  //   .rotate( ({time}) => time%360, ({time}) => Math.sin(time*0.1)*0.05 )
  //   // .repeat()
  //   .out(h1.o0)

  // h1.s0.initCam();
  // h1.src(h1.s0).repeat().out(h1.o0)

  // // // send oscillator to buffer o2
  // h1.osc(
  //   60, 0.1, 0
  // ).out(h1.o2);

  // // // take buffer o0
  // // // blend it using diff
  // // // send to buffer o1
  // h1.src(h1.o0)
  //   .diff(
  //     h1.o2, 1
  //   )
  //   .out(h1.o1);

  // // // render buffer o1
  // h1.render(h1.o1);

  // create a second hydra-synth instance
  var h1 = new Hydra({
    canvas: document.getElementById("myCanvas1"),
    makeGlobal: true
  }).synth;

  const p1 = new P5({ width: 400, height: 400 })
  p1.setup = () => {
    p1.createCanvas(400, 400)
    p1.background("yellow")
  }
  p1.draw = () => {

    var c1 = p1.map(p1.mouseX, 0, 400, 100, 255)
    var c2 = p1.map(p1.mouseY, 0, 400, 100, 255)
    p1.fill(c1, c2, 255, c2)
    p1.rect(p1.mouseX, p1.mouseY, 30, 30)
  }

  p1.setup()
  h1.s0.init({ src: p1.canvas })

  h1.osc(20, 0.1, 0.6).out(h1.o1)
  // src(o0)
  //   .diff(o1)
  //   .kaleid(7)
  //   .out(o2)
  // render(o2) // show all four outputs o0, o1, o2, o3

  h1
    .src(h1.s0)
    .diff(h1.o1) // ONLY WORKS WITH GLOBAL MODE
    .kaleid(7)
    .scrollY(-0.1)
    .diff(h1.s0)
    .scrollX(0.125)
    .rotate(2, 0.8)
    .out()

}

core()