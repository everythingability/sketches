
let img;
let count = 300;
var n  = 0
var fname = "Boris_Johnson_AP.jpg"

function preload() {
  
	img = loadImage(fname);
}

function setup() {
	createCanvas(int(img.width), int(img.height));
	angleMode(DEGREES);
    blendMode(HARD_LIGHT) //SOFT_LIGHT
}

function keyPressed(){
  //draw()
}

function mousePressed(){
  saveCanvas("boris_" + int(random(0, 1000)) + ".jpg")
}

function draw() {
	 background(0);
	for (let i = 0; i < count; i++) {

		let src_width = random(img.width / 50, img.width / 3);
		let src_height = random(img.height / 50, img.height / 3);

		let src_x = random(0, img.width - src_width);
		let src_y = random(0, img.height - src_height);

		let step = random(img.width / 100, img.width / 20);

		let dist_x = src_x + random(-step, step);
		let dist_y = src_y + random(-step, step);

		
		let dist_scale = random(0.5, 1.33);
		let dist_width = src_width * dist_scale;
		let dist_height = src_height * dist_scale;

		drawingContext.shadowColor = color(255, 25 / 100 * 255);
		drawingContext.shadowBlur = max(dist_width, dist_height) / 2;

		// copy(img,src_x, src_y, src_width, src_height,
		//   dist_x, dist_y, dist_width, dist_height);

		let img_trim = img.get(src_x, src_y, src_width, src_height);

		push();
          translate(dist_x + dist_width / 2, dist_y + dist_height / 2);
          rotate(random(20) * (random(100) > 50 ? -1 : 1));
          shearX(random(40) / 10 * (random(100) > 50 ? -1 : 1));
          shearY(random(90) / 4 * (random(100) > 50 ? -1 : 1));
          imageMode(CENTER);
          tint(255, 180)
          image(img_trim, 0, 0, dist_width, dist_height);
		pop();

	}
	saveCanvas( "dom_" + nf( n, 3) + ".jpg")
  n++
}