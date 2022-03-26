'use strict';
import {io} from 'socket.io-client';
const jionRoomBtn = document.getElementById('room-button');
const msgInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

//use socket.io to connect the server with the client (front-end)
const socket = io('http://localhost:3000')

const userSocket = io('http://localhost:3000/user',{auth:{token:"Test"}});

userSocket.on('connect-error',error=>{
    displayMessage(error);
})
socket.on('connect',()=>{
    displayMessage(`You connected ${socket.id}`)
})


socket.on('recive-msg', message=>{
   displayMessage(message); 
})
form.addEventListener('click',e=>{
    e.preventDefault();
    const msg = msgInput.value;

    if(msg==='')return
     displayMessage(msg);
    socket.emit('send-msg',msg,roomInput)

    msgInput.value='';
})

jionRoomBtn.addEventListener('click',()=>{
    const room = roomInput.value;  
    socket.emit('join-room',room,message=>{ 
        displayMessage(message);
    })
})

function displayMessage(message){
    const div = document.createElement('div');
    div.textContent=message;
    document.getElementById('message-container').append(div);
}
// let count = 0;
// setInterval(() => {
//     // volatile if you can't send any msg delete it , without it you'll resend the messages after you reconnect to server
//     socket.volatile.emit('ping',++count)
// },1000);
// handling connecting and disconnecting when pressing c key or d key in keyboard and all the messages will be saved
// document.addEventListener('keydown',e=>{
//     if(e.target.matches('input'))return
//     if(e.key=== 'c') socket.connect();
//     if(e.key=== 'd') socket.disconnect()
// })


