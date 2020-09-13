function preload(){
  sh = loadShader('shader_vert.txt', 'shader_frag.txt');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  g = createGraphics(width, height, WEBGL);
  g.noStroke();
}

function draw() {
  p = pixelDensity();
  sh.setUniform("smp", g);
  sh.setUniform("time", millis() / 10000.0);
  sh.setUniform("mouse", [mouseX*p, mouseY*p]);
  sh.setUniform("resolution", [width*p, height*p]);

  g.shader(sh);
  g.rect(0, 0, width, height);
  image(g, 0, 0);
}
