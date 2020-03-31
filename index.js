var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//HTTP-Request-Respone
app.get('/', function(req, res) {
    //Render a view with ejs
    res.render('index.ejs');
});

//A connection from server to client and reverse
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🟢 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '⚫ <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
});

//Server running port
var server = http.listen(8080, function() {
    console.log('listening on *:8080');
});