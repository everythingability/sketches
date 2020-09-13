// drawing ttf fonts with opentype.js and p5js commands.
// note that this ONLY works with ttf fonts, which provide
// the shapes of counters (i.e., the hole in 'O') in
// counter-clockwise order. I use this in the code below
// with the beginContour()/endContour() functions in p5js
// to draw the shapes accordingly.

let font;
let fontData;

// groups a list of opentype.js vector commands by contour
function groupByContour(cmds) {
  contours = [];
  current = [];
  for (let cmd of cmds) {
    current.push(cmd);
    if (cmd.type == 'Z') {
      contours.push(current);
      current = [];
    }
  }
  return contours;
}

// determines if a list of commands specify a path in clockwise
// or counter-clockwise order
function clockwise(cmds) {
  let sum = 0;
  for (let i = 0; i < cmds.length - 1; i++) {
    let a = cmds[i];
    let b = cmds[i+1];
    if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
      continue;
    }
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum < 0;
}

function centeredBoundingBox(cmds) {
  let maxx = max(cmds.filter(cmd => cmd.x).map(cmd => cmd.x));
  let maxy = max(cmds.filter(cmd => cmd.y).map(cmd => cmd.y));
  let minx = min(cmds.filter(cmd => cmd.x).map(cmd => cmd.x));
  let miny = min(cmds.filter(cmd => cmd.y).map(cmd => cmd.y));
  let center = [(minx + maxx) / 2, (miny + maxy) / 2];
  let newCmds = [];
  for (let cmd of cmds) {
    let cmdp = {
      type: cmd.type
    };
    for (let prop of ['x', 'x1', 'x2']) {
      cmdp[prop] = cmd[prop] - center[0];
    }
    for (let prop of ['y', 'y1', 'y2']) {
      cmdp[prop] = cmd[prop] - center[1];
    }
    newCmds.push(cmdp);
  }
  return [center, newCmds];
}

// draws contours grouped by groupByContour(). uses clockwise()
// to determine if this contour should be a p5js shape or a p5js
// contour (i.e., cutout of a shape)
function drawContours(contours) {
  let inShape = false;
  for (let i = 0; i < contours.length; i++) {
    if (clockwise(contours[i])) {
      beginShape();
      drawContour(contours[i]);
      endShape(CLOSE);
    }
    else {
      let [center, newCmds] = centeredBoundingBox(contours[i]);
      //console.log(contours[i], center, newCmds);
      push();
      noStroke();
      //stroke(0);
      fill(240);
      //ellipse(center[0], center[1], 5, 5);
      translate(center[0], center[1]);
      rotate(mouthAngle + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25));
      scale(mouthWidth + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25),
            mouthHeight + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25));
      beginShape();
      drawContour(newCmds);
      endShape();
      pop();
    }
  }
}

// draws an individual contour
function drawContour(cmds) {
  for (let i = 0; i < cmds.length; i++) {
    cmd = cmds[i];
    switch (cmd.type) {
      case 'M':
      case 'Z':
        break;
      case 'L':
        vertex(cmd.x, cmd.y);
        break;
      case 'C':
        bezierVertex(
          cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
		}    
  }
}

function preload() {
  fontData = loadBytes('Roboto-Black.ttf');
}

let path;
let videoInput;
let ctracker;

let fsize = 175;

// letters with counters:
// ABDOPQRabdegopq
function setup() {
	createCanvas(800, 800);
  
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("Rapid", 0, 0, fsize);
  path.commands = path.commands.concat(
    font.getPath("foxes", 0, fsize * 0.9, fsize).commands);
  path.commands = path.commands.concat(
    font.getPath("quoted", 0, 2 * fsize * 0.9, fsize).commands);
  path.commands = path.commands.concat(
    font.getPath("Borges", 0, 3 * fsize * 0.9, fsize).commands);
	//path = path.concat(font.getPath("opqrstu", 0, 200, 100));
  //path = path.concat(font.getPath("vwxyz", 0, 300, 100));
  videoInput = createCapture();
  videoInput.size(400, 300);
  videoInput.hide();
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput.elt);
}

// applies a transformation to the x/y coordinates of each opentypejs
// command you pass to it, according to the callback, which will be
// given the x/y coordinates as parameters and should return an array
// in the form of [x, y]
function commandTransform(cmds, callback) {
  let transformed = [];
	for (let cmd of cmds) {
    let newCmd = {type: cmd.type}
    for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
      if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
        let result = callback(cmd[pair[0]], cmd[pair[1]]);
        newCmd[pair[0]] = result[0];
        newCmd[pair[1]] = result[1];
      }
    }
    transformed.push(newCmd);
  }
  return transformed;
}

let mouthWidth = 0;
let mouthHeight = 0;
let mouthAngle = 0;

function draw() {
  background(240);
  fill(40);
  noStroke();
  push();
  translate(25, fsize);
  drawContours(
    groupByContour(
      commandTransform(path.commands, function(x, y) {
        let newX = x;
        let newY = y;
        return [newX, newY];
      })
    )
  );
  pop();
  
  let positions = ctracker.getCurrentPosition();
  if (positions.length > 0) {
    fill(255);
    stroke(0);
    mouthWidth = pow(map(
      (positions[50][0] - positions[44][0]),
      0, positions[32][0] - positions[27][0],
      0, 1.5), 2);
    mouthHeight = pow(abs(map(
      (positions[57][1] - positions[60][1]),
      0, positions[62][1] - positions[33][1],
      0, 1.5)), 2);
    let slope = (positions[50][1] - positions[44][1]) / 
        (positions[50][0] - positions[44][0]);
    mouthAngle = atan(slope) * -1;
  }
  
  translate(width,
    height - 150);
  scale(-0.5, 0.5);
  image(videoInput, 0, 0);
  if (positions.length > 0) {
    fill(255, 128);
    noStroke();
    ellipse(positions[50][0], positions[50][1], 10, 10);
    ellipse(positions[44][0], positions[44][1], 10, 10);
    ellipse(positions[60][0], positions[60][1], 10, 10);
    ellipse(positions[57][0], positions[57][1], 10, 10);
  }

}