var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket)=>{
    console.log('a user connected');
    
    socket.on('disconnect',()=>{
        io.emit("broadcast","user disconnected")
        console.log('user disconnected');})

    socket.on('chat message',(msg)=>{
        io.emit('chat message', msg);
        
        console.log('message:'+msg)
    })
});

http.listen(5500, function(){
  console.log('listening on *:5500');
});