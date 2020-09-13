 
var textOutput; 
var lightOutput; 
var lightPulse = []; 
var t=0;
var l = 0;
var timerDuration = 2000;
var arrayOutPut
var word

var textInput = " Forgive them for they believe in what they are doing"; 
var currLetter = "" 
var letterInt = 0;
var font

function preload(){
  font = loadFont("HelveticaBlkIt.ttf")
}
function setup() { 
   createCanvas(1000, 750);
   background("yellow")  
   //textFont( font)
   textAlign(CENTER, CENTER);
   setInterval(doNext, timerDuration);
   currLetter = "" + textInput.charAt(letterInt)
  textSize(500)
}


function doNext(){
  letterInt ++
  currLetter = "" + textInput.charAt(letterInt)
  print(currLetter, letterInt)
  if (letterInt == textInput.length){
    letterInt = 0
  }
}



function draw() {
  background("#EDFF1E")  //https://www.sessions.edu/color-calculator/
  translate(width/2, height/2)
  
  
 
  fill("#1eff44")
  var char = letterToBraille(currLetter)
 
  text(char, 0, 0)
  
  //fill("red")
  var mChar = letterToMorse(currLetter)
  mChar = mChar.replace("/", "") // spaces not needed
  //print(mChar)
  text(mChar, 0, 230)
  
}

function drawBrailleChar(c){
  //⠽', '13456'
  
  
}

var morse = {"A":"· –","B":"– · · ·","C":"– · – ·","D":"– · ·","E":"·","F":"· · – ·","G":"– – ·","H":"· · · ·","I":"· ·","J":"· – – –","K":"– · –","L":"· – · ·","M":"– –","N":"– ·","O":"– – –","P":"· – – ·","Q":"– – · –","R":"· – ·","S":"· · ·","T":"–","U":"· · –","V":"· · · –","W":"· – –","X":"– · · –","Y":"– · – –","Z":"– – · ·","1":"· – – – –","2":"· · – – –","3":"· · · – –","4":"· · · · –","5":"· · · · ·","6":"– · · · ·","7":"– – · · ·","8":"– – – · ·","9":"– – – – ·","0":"– – – – –",".":"· – · – · –",",":"– – · · – –"," ":"/"}

function encodeMorseCodeAsArray(  in_string ) {
  var TextInput = in_string.toUpperCase(); 
  var words = TextInput.split(" ")

  var wordArray = []
  for (w=0; w< words.length; w++){
      var word = words[w]
      var morseArray = []; 
      for (i=0; i < word.length ; i++){
        var inputChar = "" + word.charAt(i)
        
        try{
          var morseChar = morse[inputChar]
          //print(inputChar, morseChar)
          morseArray.push( morseChar)
        }catch(e){
          print(e)
        }
       
      }
     wordArray.push(morseArray)
  }
  return wordArray; 
}

function encodeMorseCode(  in_string ) {
  var TextInput = in_string.toUpperCase(); 
  print(TextInput, TextInput.length)
  var morseStr = ""; 
  
  for (i=0; i < TextInput.length ; i++){
    var inputChar = "" + TextInput.charAt(i)
    try{
      var morseChar = morse[inputChar]
      morseStr += morseChar
    }catch(e){
      print(e)
    }
    }
  return morseStr; 
}


var  braille = {' ': [null, null],
    'a':['⠁', '1'],
'b':['⠃', '12'],
'c':['⠉', '14'],
'd':['⠙', '145'],
'e':['⠑', '15'],
'f':['⠋', '124'],
'g':['⠛', '1245'],
'h':['⠓', '125'],
'i':['⠊', '24'],
'j':['⠚', '245'],
'k':['⠅', '13'],
'l':['⠇', '123'],
'm':['⠍', '134'],
'n':['⠝', '1345'],
'o':['⠕', '135'],
'p':['⠏', '1234'],
'q':['⠟', '12345'],
'r':['⠗', '1235'],
's':['⠎', '234'],
't':['⠞', '2345'],
'u':['⠥', '136'],
'v':['⠧', '1236'],
'w':['⠺', '2456'],
'x':['⠭', '1346'],
'y':['⠽', '13456'],
'z':['⠵', '1356'],
'1':['⠼⠁', '568319'],
'2':['⠼⠃', '568654'],
'3':['⠼⠉', '3456 14'],
'4':['⠼⠙', '3456 145'],
'5':['⠼⠑', '3456 15'],
'6':['⠼⠋', '3456 124'],
'7':['⠼⠛', '3456 1245'],
'8':['⠼⠓', '3456 125'],
'9':['⠼⠊', '3456 24'],
'0':['⠼⠚', '3456 245'],
',':['⠂', '2'],
';':['⠆', '23'],
':':['⠒', '25'],
'.':['⠲', '256'],
'?':['⠦', '236'],
'!':['⠖', '235'],
'‘':['⠄', '3'],
'“':['⠄⠶', '166612'],
'“':['⠘⠦', '45 236'],
'”':['⠘⠴', '45 356'],
'‘':['⠄⠦', '3 236'],
'’':['⠄⠴', '3 356'],
'(':['⠐⠣', '5 126'],
')':['⠐⠜', '5 345'],
'/':['⠸⠌', '456 34'],
'\\':['⠸⠡', '456 16'],
'–':['⠤', '36'],
'–':['⠠⠤', '6 36'],
'—':['⠐⠠⠤', '13276']}



function letterToBraille(letter){
  //print (letter)
  letter = letter.toLowerCase()
  try{
  var item = braille[letter][0]
  //print(item)
  
  var brailleLetter = item[0]
  return brailleLetter
  }catch(e){
    //print (e, letter)
    return " "
  }
}

function letterToMorse(letter){
  return morse[letter.toUpperCase()]
}

function encodeBraille(in_string, return_type){
  in_string = in_string.toLowerCase()
  var rType = 1
  if (return_type == "dots"){
    rType =1
  }else{
    rType = 0
  }
  var brailleArray = []
 
  for (i=0;i < in_string.length;i++){
    try{
      var char = braille[in_string[i]][rType]
      brailleArray.push(char)
    }catch(e){
      print(e)
    }
    
  }
  return brailleArray; 
}
  
  function mousePressed(){
    
    saveCanvas("FORGIVE_THEM_" + int(random(0,100)) + ".jpg")
  }

