var express= require('express');
var socket= require('socket.io');

var app= express();

var server= app.listen(3000, function(){
    console.log('Listining to 3000');
});

app.use(express.static('public')); //static files setup

var io= socket(server); // socket setup

var user=[];

io.on('connection', function(socket){
    console.log('made socket connection '+ socket.id);
    //console.log(socket);

    socket.on('useradded', function(data){
        user.push(data);
        console.log('user added: ', data);
        socket.broadcast.emit('useradd', user);
    });
    

    socket.on('chat', function(data){
        io.sockets.emit('chat', data); //sending recieved data to all connected clients
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);  //to send to all the clients except the sender client
    });

    socket.on('disconnect', function(){
        console.log('Disconnected'+socket.id);
    });
});

