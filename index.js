const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const ON_RECEIVE_MESSAGE_EVENT = 'message';
const EMIT_SEND_MESSAGE_EVENT = 'add message';

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

users = [];
connections = [];

io.on('connection', (socket) => {
    connections.push(socket);

    console.log('Успешное подключение');

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);

        console.log('Отключились');
    });

    socket.on(ON_RECEIVE_MESSAGE_EVENT, (data) => {
        io.emit(EMIT_SEND_MESSAGE_EVENT, { message: data.message, name: data.name, className: data.className })
    });
});