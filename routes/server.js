module.exports = function(io) {
//connection handler
    io.on('connection', function (socket) {
        // initialize chat variable
        socket.on('join', function(data) {
            if(!socket.username){
                socket.username = data.username;
                //socket.emit('message', {message: 'Welcome to the chat!' + socket.username});                
            } 
            io.sockets.emit('message', {message: socket.username + ' has joined the chat!'});            
        });   

        socket.on('disconnect', function (data) {
                io.sockets.emit('message', {message: socket.username + ' has left the chat.'});            
            });  

        // send message
        socket.on('send', function (data) {
             if(!socket.username){
            //     socket.emit('message', {message: 'Welcome to the chat!' + data.username})
                 socket.username = data.username;
             } //else {
                io.sockets.emit('message', { username: socket.username, message: data.message });
            //}
        });
    });
}
