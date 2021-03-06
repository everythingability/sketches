// noprotect

const photo = [
	["images/EdciJ8AWAAIdqkG.jpg",200],
	//["images/Boris_Johnson_on_13_August_2019.jpg",200],
]

let imgs = [];
let bg;
var canvas

var hasDropped = false
var img; //my main image
var raw // the temp img
var otherImg // a grabbed fragment of img
var buffer //rather than drawing to canvas I draw here
var drawOnce = true // this is just so I can apply blends once, not over and over.
let slider;
//var svgCanvas

function preload(){
	for(let i = 0; i <photo.length; i++)imgs[i] = loadImage(photo[i][0]);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  normalMaterial();
  //svgCanvas = createCanvas(windowWidth, windowHeight, SVG);
  canvas.drop(gotFile);
  buffer = createGraphics(width, height);
  
  bg = createGraphics(width, height);
  bg.noStroke();
  
  for (let i = 0; i < 300000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01)*2;
    bg.fill(240, 20);
    //bg.rect(x, y, s, s);
  } 
  slider = createSlider(0, 400, 100);
  slider.position(10, 10);
  slider.style('width', '680px');
  
  textAlign(CENTER)
  textSize(18)
  //noLoop();
}

function keyTyped() {
  draw()
  var x = width  - img.width
  var y = height - img.height
  print(x, y, img.width, img.height, width, height)
  var exportImage  = get(x/2, y/2, img.width , img.height)
  if (key === 's'){
     save("Stained_glass_" + int(random(0,1000))+ 'svg');
  }else if (key === 'j'){
    exportImage.save("Stained_glass_" + int(random(0,1000)), 'jpg');
  }else if (key === 'p'){
    exportImage.save("Stained_glass_" + int(random(0,1000)), 'png');
  }
    
  
}
function mouseClicked(){
	draw();
}


function draw(){
  
  let val = slider.value();
  print(val)
    background(255);
	const index = 0// int(random(imgs.length));
	
	let img = imgs[index];
	const ratio = min(width*0.9/img.width,height*0.9/img.height);
	img.resize(img.width*ratio, img.height*ratio);
	
	let points = getEdgePoints(img,max(img.width,img.height)*0.005,val);
	let triangles = Delaunay.triangulate(points);
	
	
	push();
	  translate( -img.width/2,  -img.height/2 );
  
      for (let i = 0; i < triangles.length; i += 3) {
            noStroke();
            //strokeWeight(2)
            const cPosX = (points[triangles[i]][0] + points[triangles[i+1]][0] + points[triangles[i+2]][0])/3;
            const cPosY = (points[triangles[i]][1] + points[triangles[i+1]][1] + points[triangles[i+2]][1])/3;
            let c = img.get(cPosX,cPosY);
            fill(c);
            //stroke(0);
            beginShape(TRIANGLE_STRIP);
              vertex(points[triangles[i]][0], points[triangles[i]][1], random(10));
              vertex(points[triangles[i+1]][0], points[triangles[i+1]][1], random(10));
              vertex(points[triangles[i+2]][0], points[triangles[i+2]][1], random(10));
            endShape(CLOSE);
      }
	pop();
	//image(bg,0,0);//texture
  if (hasDropped == false){
  text("Drop an image onto me. Type 's' to save", width/2, height-40)
  }
  //rotateY(frameCount)
}



function getEdgePoints(img,span,threshold){
	let points = [];
	points.push([0,0]);
	points.push([img.width,0]);
	points.push([img.width,img.height]);
	points.push([0,img.height]);
	for(let y = 0; y < img.height; y+=span){
		for(let x = 0; x <img.width; x += span){
			if(x > img.width-span || y > img.height-span)continue;
			let currentCol = img.get(x,y);
			let nextCol = img.get(x+span,y);
			let underCol = img.get(x,y+span);
          
			if(getColDist(currentCol,nextCol) > threshold || getColDist(currentCol,underCol) > threshold){
				points.push([x,y]);
			}
		}
	}
	return points;
}

function getColDist(col1,col2){
	return dist(col1[0],col1[1],col1[2],col2[0],col2[1],col2[2]);
}

function gotFile(file) {
  print(file)
  raw = new Image();
  raw.src = file.data

  raw.onload = function() {
    img = createImage(raw.width, raw.height);
    //print("huh?")
    //blendMode(DARKEST)
    buffer.drawingContext.drawImage(raw, 0, 0, width, height); //what does this do? If I don't do it, stuff doesn't work?
    
    //NOTE! Without the following line img doesn't work? But does/can draw to screen...
    img = buffer.get() //does this *force* it to be p5.Image... dunno?
    //does drawing to canvas somehow make the img kosher?
    
    print("eh?")

    print(img, img.width, img.height) //this seems to be a good measure of whether
    //or not the image has loaded...
    
    //Grab a random part of the image and make a new image...
    var x = random(0, width / 2)
    var y = random(0, height / 2)
    randX = x
    randY = y
    print(randX, randY)
    var right = random(width / 2, width)
    var bottom = random(height / 2, height)

    otherImg = buffer.get(x, y, right - x, bottom - y)
    
    //blendMode(BLEND)
    //image(otherImg, 0, 0)
    print(otherImg)
    imgs[0] = img
    drawOnce = true
    
    hasDropped = true
    draw()
  }


}


