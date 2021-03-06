var socket= io.connect('http://localhost:3000');

var message= document.getElementById('message'),
    handle= document.getElementById('handle'),
    btn= document.getElementById('send'),
    output= document.getElementById('output'),
    feedback= document.getElementById('feedback'),
    adduser= document.getElementById('adduser'),
    chat_box= document.getElementById('chat-box'),
    user= document.getElementById('user'),
    useronline= document.getElementById('useronline');

//making event listiner

adduser.addEventListener('click', function(){
    socket.emit('useradded', handle.value);
    chat_box.style.display="block";
    user.style.display="none";
});

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value= "";
});

message.addEventListener('keydown', function(){
    socket.emit('typing', handle.value);
});

message.addEventListener('keyup', function(){
    
    setTimeout(function(){
        socket.emit('nottyping');
    },1000);
    
    
});


//listening to events

socket.on('chat', function(data){
    output.innerHTML+='<p><strong>' + data.handle + ':</strong>' + data.message+'</p>';
    feedback.innerHTML= '';
});

socket.on('typing', function(data){
    feedback.innerHTML='<p>'+ data+ ' is typing a message...</p>';
});

socket.on('nottyping', function(data){
    feedback.innerHTML='';
});

socket.on('updateUser', function(data){
    useronline.innerHTML='';
    for(var i=0; i<data.length; i++)
    {
        if(data[i]==handle.value)
        continue;

        useronline.innerHTML+='<p>'+ data[i].username +'</p>';
    }
});
