
var clips = []

function preload(){
}

class SoundClip {
  constructor( path,  x,  y) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.sound = loadSound(path);
    this.playing = false;
    this.color = color(random(233), 0, random(100))
  }

   play() {
    //print("Playing:", this.path);
    //sound.loop();
     this.sound.rate(0.5)


       this.playing = true;

       this.sound.loop();


  

  }
   stop() {
    this.sound.stop();
    this.playing = false;
  }
 draw() {
    stroke(this.playing ? color(0, 255, 0) : this.color);
    fill(this.playing ? color(0, 255, 0) : this.color);
    ellipse(this.x * width, this.y * height, 10, 10);
  }

}

function setupData() {



  print(data.length);
  for (var i = 0; i < data.length; i++) {
    var entry = data[i];

    var point = entry["point"];
    var x = point[0];
    var y = point[1];
    var path = entry["path"];
    path =  "assets/" + path; //hack
    //print(i, path);
    try{
       var clip = new SoundClip(path, x, y);
        clips.push(clip);
     }catch ( e){
      print(i, e);
    }
  }
  print(clips.length, "sounds loaded.")
}


function drawClips() {
  background(0);
  stroke(255);
  //print(clips.length)
  for(var i = 0; i < clips.length - 1; i++) {
    //print(i)
    clips[i].draw();
  }
}

function mouseMoved() {
  var distance = 80
  for(var i = 0; i < clips.length - 1; i++) {
    var dx = mouseX - clips[i].x * width;
    var dy = mouseY - clips[i].y * height;
    var distToMouse = dx*dx + dy*dy;
    if (distToMouse < distance && !clips[i].playing) {
      clips[i].play();
    } else if (distToMouse > distance && clips[i].playing) {
      clips[i].stop();
    }
  }
}

function setup() {
  createCanvas(600, 600);

  setupData()

   ///
}

function mousePressed(){
  print("Clicked", getAudioContext().state)

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();


  }

}

function draw() {

  drawClips()
}
