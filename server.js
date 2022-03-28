'use strict';
const {instrument} = require('@socket.io/admin-ui')
const io = require('socket.io')(3000,{
    cors:{
       origin: ['http://localhost:8080','https://admin.socket.io'] 
    }
});
console.log('working');

const userIn = io.of('/user');

userIn.on('connection',socket=>{
    console.log('connected to namespace user  '+socket.username);
})
// if you want to use token and auth with socket to get user info using that token
userIn.use((socket,next)=>{
    if (socket.handshake.auth.token) {
        socket.username = getUsernameFromToken(socket.handshake.auth.token)
        next()
    }
    else {
        next(new Error("please send Token"))
    }
})
function getUsernameFromToken(token){
return token
}


//run every time the client connect to server
io.on('connection',socket=>{
    console.log(socket.id);

    socket.on('send-msg',(message,room)=>{
        if(room === ''){
            socket.broadcast.emit('recive-msg',message);
           
        }else{
            socket.to(room).emit('recive-msg',message);
        }
    })
    socket.on('join-room',(room,cb)=>{
        socket.join(room);
        cb(`Joinned successfully to ${room}`)
    })
    socket.on('ping',n=>console.log(n))
})

instrument(io,{auth:false})
