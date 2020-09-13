const express = require('express')
const app = express()
app.use(express.static('public'))
app.disable('view cache');

const http = require('http')
var os = require("os");


console.log( "Starting...")


var port = 3004;
var server = app.listen(port, listening)

function listening(){
    console.log("Listening..")
     console.log(new Date() + " " + "http://localhost:" + port)
}

app.use(express.static('website'))
