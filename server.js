//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');

var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.get('/:date', function(req, res){
 res.type('text/html');
 res.send(getDates(req.params.date) );
});

function getDates(str){
  
  var dates = new Object;
  
  if(parseInt(str) == str){
    str = parseInt(str);
    var date = new Date(str*1000);
    dates.unix = parseInt(str);
  }else{
    var date = new Date(str);
    dates.unix = date.getTime()/1000;
  }
  if(date.toDateString() == "Invalid Date"){
    dates.natural = null;
  }else{
    dates.natural = date.toDateString();  
  }
  
  return JSON.stringify(dates);
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
