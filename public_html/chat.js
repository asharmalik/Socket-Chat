/**
 * Created by Ashar Malik on 2/26/2015.
 */

var socket = io();

document.getElementById("messageform").addEventListener("submit", function (e) {
    e.preventDefault();

    socket.emit('chat', document.getElementById("msg").value);
    document.getElementById("msg").value = '';
}, false);

socket.on('chat', function(msg){
    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    ul.appendChild(li);
});

socket.on('join', function (num) {
    document.getElementById('numUsers').innerHTML = num+" Users";
});