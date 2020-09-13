
//var theText = "Voting Tory will cause your wife to have bigger breasts and increase your chances of owning a BMW M3".toUpperCase()
var font
let song;
let scalar = 0.8; //a made up number for each font
var asc //textAscention size
var spaceWidth //how big is a space?
var img
var fontSize = 30
var leading
var rectWidth 
var rectHeight
var borisX = -790
var ride
var angle = 0

function preload() {
  font = loadFont("Roboto-BoldCondensed-webfont.ttf ") 
  img = loadImage("boris_zipwire.png")
 // camShader = loadShader('effect.vert', 'effect.frag');
  song = loadSound('cheers.wav');
  ride = loadSound('boris_ride.mp3');
}

var quoteNum = 0;
var xpos
function reCalculate(){
   xpos= random(10, width-rectWidth+10)
  //Define your rect
  song.play()
  theText = quotes[quoteNum].toUpperCase()
   rectWidth = int(random(600, 900))
  rectHeight = int(random(200, 300))
  var startingFontSize = 10 //purely arbitrary, can tweak to match destination to speed up.
 
  fontSize = calculateFontSize(theText, rectWidth, rectHeight, font, startingFontSize)
  
  
  print("the fontSize for that text is: " ,fontSize, textLeading())
 
  textSize(fontSize)
  quoteNum ++
  if (quoteNum ==quotes.length-1){
    quoteNum = 0
  }
}

function setup() {
  createCanvas(1200, 600);
  strokeWeight(0)
  //stroke("yellow")
  rectMode(CENTER)
  
  //Define all the fonts stuff you want to be measured
  img.filter(GRAY)
  textFont(font)
  textSize(30)
  reCalculate()//get a new quote
  setInterval(reCalculate, 9000)
  textAlign(CENTER, BASELINE)
  ride.loop()
  fullscreen()
}


function draw() {
  fill(random(50,80), random(1, 50))
  rect(width/2, height/2, width, height)
 
   fill(240, 0, 50)
  rect(width/2 - random(4), (height-rectHeight/2)-20 -random(4) , rectWidth , rectHeight +4)//hack
  
  push()
   let h = map(sin(angle), -1, 1, 0, 600);
  blendMode(DARKEST)
  
  //scale(h);
  var bounce = map(h,0,1300, 0, 20)
  var s = map(h,0,1300, 0.9, 1)
  //print(h, bounce)
  scale(s)
  image(img, borisX, 0 +bounce, width, height)
  angle += 0.1;
  pop()
  
  blendMode(BLEND)
  fill("white")
  strokeWeight(0)
  textSize(fontSize  )
  textLeading(leading) //fudge
  textAlign(CENTER, CENTER)
  
  push()
  
  text(theText,width/2 -random(2), (height-rectHeight/2) -20 -random(2) , rectWidth , rectHeight)
  pop()
 
  borisX += 0.5
  if (borisX > width ){
    borisX = -790
  }
  var pan = map(borisX, -790, width, -1, 1)
  ride.pan(pan)
  var d = dist(borisX,0, width/2, 0)
 
  var vol =map( d, -700,1300, 1, 0.0)
  print (d, vol)
  ride.amp(vol)
}
  
function calculateFontSize(theText, w, h, font, tSize){
  var p = 0 //iterator to see how many times it took to "fill the space"

  //let scalar = 0.7; //a made up number for each font
  asc = textAscent() * scalar; // Calc ascent 
  var spaceWidth //the width of space char
  //var gutterSize = 4
  var words = theText.split(" ");
  print(words.length, "words")
 
var y = 0
  while( y < h){
    var x = 0
    var currentOffset = 0; //rightwards value
    y = 0
     var lineNum = 0;
      
      for (var j = 0; j < words.length; j++) {
        textSize(tSize);
        leading = textLeading() * 0.75
        
        spaceWidth = textWidth(" ")
        var wordWidth = textWidth(words[j]);
        asc = textAscent() * scalar; // Calc ascent 
        
        x = spaceWidth + currentOffset  //xpos
        var rightEdge = x + wordWidth
        
        if (rightEdge > w - spaceWidth){
          //print("rightEdge", rightEdge, x, j)
          currentOffset = 0
          x = wordWidth + currentOffset //xpos
          lineNum ++
          
        }
        y = lineNum * tSize + leading  //+ asc
         if (currentOffset == 0){
          spaceWidth = textWidth(" ")
        }else{
          spaceWidth = textWidth(" ")
        }       
       
        //fill("yellow")
        //print(x, y, wordWidth, tSize)
        //rect(x, y , wordWidth, tSize)
        //fill("red")
        //text(words[j], x, y , wordWidth, tSize);///don't draw

        // four pixels between words
        currentOffset += wordWidth + spaceWidth; 
      
    }
        
    if (y - tSize  > h -tSize ){
       print ("this took",p, "times")
      //print( x, y, w, h - tSize, tSize )
       
       textSize(tSize);
       return tSize 
    }else{
      
      textSize(tSize);
    
    }
   tSize += 0.5 //change this to reduce/increase the number of iterations
    //and speed  to calculate
   p++  
  }
    
  return tSize 
  
}
function mousePressed(){
  saveCanvas(theText.substring(0,10) +"_"+ int(random(0,1000)+".jpg"))
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

///////////////////////// DATA ///////////////////////

var theText = "It is said that the Queen has come to love the Commonwealth, partly because it supplies her with regular cheering crowds of flag-waving piccaninnies.".toUpperCase()

var quotes = ["No doubt the AK47s will fall silent and the pangas will stop their hacking of human flesh and the tribal warriors will all break out in watermelon smiles to see the big white chief touch down in his big white British taxpayer-funded bird.",
              
              "They have got a brilliant vision to turn Sirte into the next Dubai. The only thing they have got to do is clear the dead bodies away.",
              
       
              "Voting Tory will cause your wife to have bigger breasts",
              
              "tank-topped bumboys",
              
              "I would go further and say that it is absolutely ridiculous that people should choose to go around looking like letter boxes.",
              "Islam is the problem",
              
              "I saw no reason in principle why a union should not be consecrated between three men, as well as two men, or indeed three men and a dog.",
              
      "The unanimous opinion is that what has been called the 'Tottymeter' reading is higher than at any Labour Party conference in living memory",
              
              "It is said that the Queen has come to love the Commonwealth, partly because it supplies her with regular cheering crowds of flag-waving piccaninnies.",
              
      "Women are turning to Labour because of their natural 'fickleness'",
              
              
              "Watermelon smiles",
      
              "World King",
  "For ten years we in the Tory Party have become used to Papua New Guinea-style orgies of cannibalism and chief-killing.",
  "She's got dyed blonde hair and pouty lips, and a steely blue stare, like a sadistic nurse in a mental hospital.",
              
  "Ample bosoms",
              
"Despite looking a bit like Dobby the House Elf, he is a ruthless and manipulative tyrant",
              
"Napoleon, Hitler, various people tried this out, and it ends tragically. The EU is an attempt to do this by different methods.",
              
  "Labour's appalling agenda, encouraging the teaching of homosexuality in schools, and all the rest of it.",
              
              "£350 million a week for the NHS",
              "That country",
              
              "A pound spent in Croydon is far more of value to the country than a pound spent in Strathclyde.",
              
              "Pat her on the bottom and send her on her way",
              
              "The continent may be a blot, but it is not a blot upon our conscience. The problem is not that we were once in charge, but that we are not in charge any more.",
              
"A Titanic success"
              
              ]