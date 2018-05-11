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
    console.log(data);
    io.sockets.emit('data', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
