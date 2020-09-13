var points = []
var currLat
var currLng

var triggerDistance = 50 //in metres. How close to a point do you have to be?
// in metres

class PointOfInterest {
  /*
  A pin on a Google MyMap with an attached Youtube video
  */
  constructor(name, desc, lat, lng, youtube) {
    playingDefault = false
    this.playCount = 0
    this.name = name
    this.desc = desc
    this.lat = lat
    this.lng = lng

    // URL jiggery pokery
    youtube = youtube.replace("https://www.youtube.com/watch?v=", "")
    this.youtube = youtube
    this.playlist = youtube.replace("https://www.youtube.com/embed/", "")//hack to achieve looping

    this.isplaying = false
    this.color = color(random(100, 101), random(255), 0)
    this.distance = triggerDistance * 20 // all start outside
    this.nearest = false
  }

  updateDistance() {
    var d = int(distance(this.lat, this.lng, currLat, currLng, "K") * 1000)
    this.distance = d
    return d
  }

  updateDistanceFromDrag() {
    //print(this.lat, this.lng, dragLat, dragLng)
    var d = int(distance(this.lat,this.lng , dragLat, dragLng, "K") * 1000)
    this.distance = d

    return d
  }

  draw() {
    var x = map(this.lng,  mostLeft,mostRight, 0, width)
    var y = map(this.lat, mostBottom,mostTop,  0, height)

    fill(this.color)
    ellipse(x, y, 20, 20)
    text(this.distance + "m " + this.name + " " , x-50, y+30)
    //print (this.distanceFromMe(currLat, currLng))
  }

  check() { //checks only the closest one
    //print(this.distance < triggerDistance)
    if (this.distance < triggerDistance) {
      if (this.isplaying == false) { //so it only "starts" once...
        //$('canvas').fadeOut(); // hide this sketch...
        print("triggered", this.distance)
        this.playCount = 1

        try {
          this.color = color(255, 0, 200)
          // replace the player
          $('#video').YTPlayer({
            fitToBackground: true,
            videoId: this.playlist,
            repeat: 0,
            mute:false,

            callback: function() {
                var player = $('#video').data('ytPlayer').player;
                player.addEventListener('onStateChange', function(event) {
                  //console.log("Player State Change", event);
                  if (event.data === 0) {
                    console.log('video ended');
                    playDefault()
                  } else if (event.data === 2) {
                    //console.log('paused');
                  }
                });
             },

            playerVars: {
              modestbranding: 0,
              autoplay: 1,
              controls: 1,
              showinfo: 0,
              branding: 0,
              rel: 0,
              autohide: 0,
            }
          })

          navigator.vibrate([500]);
        } catch (e) {
          print(e)
        }

        this.isplaying = true
        playingDefault = false
      }


    } else {
      //  $('canvas').fadeIn(); //show the map and interface...
      // THE DEFAULT MOVIE
      if (playingDefault == false){//do this only once
        playDefault() //play the splash screen...
        playingDefault = true
      }

    } //end if

  } //end check
} //end class


// General distance between two lat/lng points
function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist;
  }
}
