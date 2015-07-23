var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var usernames = [];

io.sockets.on('connection', function(socket) {
  //New User
  socket.on('new user', function(data, cb) {
    if(usernames.indexOf(data) != -1) {
      cb(false);
    } else {
      cb(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
  });

  function updateUsernames() {
    io.sockets.emit('usernames', usernames);
  }

  // Send message
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {
      msg: data,
      user: socket.username
    });
  });

  // Disconnect
  socket.on('disconnect', function(data) {
    if(!socket.username)
      return;
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  });
});

server.listen(process.env.PORT || 3000);