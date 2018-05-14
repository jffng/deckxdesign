'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/motion_tracking/index.html');
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('coords', function(data){
    let slices = [];
    for (var i = 0; i < 12; i++){
      slices.push([]);
    }

    data.forEach(function(d){
      let index = Math.floor(d.x / 100);
      slices[index] ? slices[index].push(Math.floor(d.x / 100)) : slices[index] = [Math.floor(d.x / 100)]
    })

    slices = slices.map(s => {
      // if there are more than 2 coordinates where motion has been detected in a single slice, trigger it as active
      return s.length > 2
    });

    // TODO: emit slices array to the client
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
