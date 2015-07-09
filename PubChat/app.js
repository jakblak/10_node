var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  // Send message
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {
      msg: data
    });
  });
});

server.listen(process.env.PORT || 3000);