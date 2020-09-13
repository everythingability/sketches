var showVideo = true;
var player;
var hasClicked = false
var playingDefault = false
var isMobile = false
var heading
var defaultVideoId = 'Yqc2t4C8pxY'

function preload() {
  print("Loading...")
  xml = loadXML('Easingwold Transplant.kml.txt');
  setupDrag()
  isMobile = isMobileDevice()
  print("Is mobile:", isMobile )


}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  loadKML()
  print(points.length)
  playDefault()

}






function draw() {

  if (hasClicked == false) {
    textSize(50)
    text("CLICK TO START!", width / 2 - textSize(), height / 2)
  } else {
    
    navigator.geolocation.getCurrentPosition(
      // Success callback
      function(position) {
        //image(logo, 0,0, width, height)
        background(255)
        fill("black")
        textSize(18)

        var x = map( position.coords.longitude,  mostLeft,mostRight, 0, width)
        var y = map(position.coords.latitude, mostBottom,mostTop,  0, height)

        text("longitude: " + position.coords.longitude, 5, height - 20);
        text("latitude: " + position.coords.latitude, width / 2, height - 20);


        currLat = position.coords.latitude
        currLng = position.coords.longitude
        //print(position.coords.heading)

        for (var p in points) {
          var point = points[p]
          if (isMobile){
            point.updateDistance()
          }else{
          point.updateDistanceFromDrag() //measures in metres
          }
            point.draw()
        }

        // sort the objects to find the nearest
        var sortedPoints = points.sort(function(a, b) {
          return a.distance - b.distance;
        })

        if (sortedPoints.length > 0) {
          var nearestPoint = sortedPoints[0]
          //print( nearestPoint.name, nearestPoint.distance, nearestPoint.youtube )
          nearestPoint.check()
          fill("red")
          textSize(60)
          text(nearestPoint.distance + "m", x, y)
          textSize(40)

          text(triggerDistance + "m", x, y + 60)
        }
        //print("drawing...")
        //
        /*
        position is an object containing various information about
        the acquired device location:

        position = {
            coords: {
                latitude - Geographical latitude in decimal degrees.
                longitude - Geographical longitude in decimal degrees.
                altitude - Height in meters relative to sea level.
                accuracy - Possible error margin for the coordinates in meters.
                altitudeAccuracy - Possible error margin for the altitude in meters.
                heading - The direction of the device in degrees relative to north.
                speed - The velocity of the device in meters per second.
            }
            timestamp - The time at which the location was retrieved.
        }
        */

      },

      // Optional error callback
      function(error) {
           print("gps error",error.code)
        /*
        In the error object is stored the reason for the failed attempt:

        error = {
            code - Error code representing the type of error
                    1 - PERMISSION_DENIED
                    2 - POSITION_UNAVAILABLE
                    3 - TIMEOUT

            message - Details about the error in human-readable format.
        }
        */

      }
    );
  }

  drawDrag()

}
