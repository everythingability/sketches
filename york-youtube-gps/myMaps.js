/*
https://en.wikipedia.org/wiki/Geographic_coordinate_system

https://www.google.com/maps/d/u/0/edit?mid=18mdimZg2kjGaG7lyIYZP3VrjsM80GOVC&ll=54.12305160803656%2C-1.1936381499999698&z=16
*/

let xml;
var points = []
var numOfPoints = 0
var children
var currLat
var currLng

//54.1194678, -1.193327
var mostLeft = 90 //lng
var mostTop = 180 //lat
var mostRight = -90 //lng
var mostBottom = -180 //lat
//
var mapWidth
var mapHeight


function loadKML() {

  children = xml.getChildren('Placemark');
  print(children.length, "items in the map")
  for (let i = 0; i < children.length; i++) {
    var child = children[i]
    //print(i) //child.listChildren()

    var name = child.getChildren("name")[0].getContent()
   // print(name)

    var desc = ""
    try {
      desc = child.getChildren("description")[0].getContent()
    } catch (e) {

    }
    //print(desc)


    //LAT/LNG

    var latlng = child.getChildren("Point")[0].getContent().trim().split(",")
    var lat = float(latlng[2])
    if (lat < mostTop) mostTop = lat
    if (lat > mostBottom) mostBottom = lat


    var lng = float(latlng[1])
    if (lng < mostLeft) mostLeft = lng
    if (lng > mostRight) mostRight = lng


    //print(lat, lng)

    var youtube = null
    try {
      youtube = child.getChildren("ExtendedData")[0].getChildren("value")[0].getContent()
    } catch (e) {}

    if (youtube) {
      var point = new PointOfInterest(name, desc, lat, lng, youtube)

      points.push(point)
    }

  }
  numOfPoints = points.length

  mapWidth = mostRight - mostLeft
  mapHeight = mostBottom - mostTop
  
  //Add a border of 10%
  var borderWidth = mapWidth/10
  var borderHeight = mapHeight/10
  //Adjust 
  mostLeft = mostLeft - borderWidth
  mostRight = mostRight + borderWidth
  mostTop = mostTop - borderHeight
  mostBottom = mostBottom + borderHeight
  
  mapWidth = mostRight - mostLeft
  mapHeight = mostBottom - mostTop
  
  //print(mostLeft, mostRight, mapWidth) //the difference between them
  //print(mostTop, mostBottom, mapHeight) //the difference between them
  
  


}