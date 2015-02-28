var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatApp = {};

chatApp.numUsers = 0;

app.get('/', function(req, res){
    res.sendFile('public_html/index.html', { root: __dirname });
});

app.get('/chat.js', function(req, res){
    res.sendFile('public_html/chat.js', { root: __dirname });
});

app.get('/stylesheet.css', function(req, res){
    res.sendFile('public_html/stylesheet.css', { root: __dirname });
});

io.on('connection', function(socket){
    //user sent message
    socket.on('chat', function(msg){
        io.emit('chat', msg);
    });

    //user disconnected
    socket.on('disconnect', function(){
        chatApp.numUsers-=1;
    });

    chatApp.numUsers+=1;
    io.emit('join', chatApp.numUsers);
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});