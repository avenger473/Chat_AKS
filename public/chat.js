var socket= io.connect('http://localhost:3000');

var message= document.getElementById('message'),
    handle= document.getElementById('handle'),
    btn= document.getElementById('send'),
    output= document.getElementById('output'),
    feedback= document.getElementById('feedback');

// //making event listiner

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value= "";
 });

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// //listening to events
socket.on('chat', function(data){
    output.innerHTML+='<p><strong>' + data.handle + ':</strong>' + data.message;
    feedback.innerHTML= '';
});

socket.on('typing', function(data){
    feedback.innerHTML='<p>'+ data+ ' is typing a message...</p>';
});
