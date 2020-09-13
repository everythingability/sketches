let first = true;
let w;
let columns;
let rows;
var cells;
let board;
let next;
let isDrawing;
let img;
let imgPixels;
let leastAmount
var bgColor
var foreColor

function preload(){
  //img = loadImage("apple.png")
  img = loadImage("refugee-1.jpg")
}


function setup() {
  createCanvas(windowWidth-18, windowHeight-18);
  img.resize(width, height)
  img.filter(THRESHOLD)
  img.loadPixels()
  bgColor = "#f5005b"//red
  foreColor = "#1870f6" //blue

  isDrawing = false;
  w = width / 100;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  cells = rows * columns
  //alert(cells+ " cells")
  leastAmount = cells / 10
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  imgPixels = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    imgPixels[i] = new Array(rows)
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }

  init();
  resetBoard()
  setInterval(generate, 200)
  //saveCanvas(int(random(1000))+"_life.jpg")
}

function draw() {
  background(bgColor);

  var blackPixels = 0
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)){
        fill(foreColor);
        blackPixels++
      }else{
        fill(bgColor);
      }
      noStroke()
      //stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }
  //fill(foreColor,100)
  //rect(0, 0, width, height)
  ///print(blackPixels)
  //filter(INVERT)
  if (blackPixels < leastAmount){
    resetBoard()
  }

  if (first){
    //saveCanvas(int(random(1000))+"_first_life.jpg")
    first = false
  }

}

function setPoint(x, y){

   var xCol = int(x / w)
   var yRow = int(y/w)

   if (board[xCol][yRow] == 0){

     board[xCol][yRow] = 1

   }
  //print(  imgPixels[xCol][yRow]  )
}

// reset board when mouse is pressed


function mouseReleased(){
  isDrawing = false
}

function mousePressed() {

  setPoint(mouseX, mouseY)
  isDrawing = true;
}

function mouseDragged() {
  setPoint(mouseX, mouseY)
  isDrawing = true;

}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      board[i][j] = 0
      next[i][j] = 0;
      imgPixels[i][j] = 0
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      var pixel =  img.get(i*w,j*w)
      imgPixels[i][j]  = map(pixel[0], 0, 255, 1, 0)

    }
  }

}

// The process of creating the new generation
function generate() {
 if (isDrawing == false){
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns-1 ; x++) {
    for (let y = 1; y < rows-1 ; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          try{
              neighbors += board[x+i][y+j];
          }catch(e){
          }
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life

      if ((x == 1 && y != 1) | (x == 1 && y==1)  |( y==rows-1) |(x == columns-1 )                ){ //the edges
         board[x][y] = 0
         next[x][y] = 0
        /* Loneliness
          if      ( (neighbors <  2)){ //Loneliness
            next[x][y] = 0;
            console.log(x, y, board[x][y],neighbors, "Lonely")

          }else if ((neighbors >  3)){
            next[x][y] = 0;  // Overpopulation
            console.log(x, y, board[x][y],neighbors, "Overpopulation")

          }else if ((board[x][y] == 0) && (neighbors ==1)){
            next[x][y] = 0;   // Reproduction
            console.log(x, y, board[x][y],neighbors, "Reproduce")
        //Same
          }else{
            next[x][y] = 0//board[x][y]; // Stasis
            console.log(x, y, board[x][y],neighbors, "Statis")
               }
        */

      }else{
          // Loneliness
          if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;
        // Overpopulation
          else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;
        // Reproduction
          else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
        //Same
          else               next[x][y] = board[x][y]; // Stasis
        }
    }
  }

  // Swap!d
  let temp = board;
  board = next;
  next = temp;
 }
}

function resetBoard(){

     //print("hello")
      var blackCount = 0
     for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          blackCount += imgPixels[i][j]
          if (imgPixels[i][j] == 1){ //transfer rtaher than stomp
          board[i][j] = 1
          }
        }
     }
      //print("Black pixels =", blackCount)

}
function keyPressed(){
  print(key)
  if (key == "s"){
      saveCanvas(int(random(1000))+"_life.jpg")

  //board = imgPixels.slice(0)
}
}
