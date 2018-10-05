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
        user.push({username: data, id: socket.id});
        console.log('user added: ', data);
        updateUsersnames();
    }); 

    socket.on('disconnect', function(data){
        console.log(socket.id);
        user.splice( user.indexOf({id: socket.id}), 1 );
        console.log(user);
        updateUsersnames();
    });

    function updateUsersnames(){
        io.sockets.emit('updateUser', user);
    }

    socket.on('chat', function(data){
        io.sockets.emit('chat', data); //sending recieved data to all connected clients
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);  //to send to all the clients except the sender client
    });

    socket.on('nottyping', function(data){
        socket.broadcast.emit('nottyping');  //to send to all the clients except the sender client
    });

    
});

