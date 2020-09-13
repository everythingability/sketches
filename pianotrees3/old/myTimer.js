////////////////////// SEMI RANDOM TIMER //////////////////
function randRange(data) {
  var newTime = data[Math.floor(data.length * Math.random())];
  return newTime;
}

function toggleSomething() {
  var timeArray = new Array(20000, 30000, 15000, 25000, 200000, 300000, 1000, 150000);
  
  var n = int(random(0, species.length-1))
  play(n)

  clearInterval(timer);
  timer = setInterval(toggleSomething, randRange(timeArray));
}

var timer 
//////////////////////////////////////////////////////