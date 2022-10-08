const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log('token', token);
    next();
  });


app.get('/', (req, res) => {
    res.send('Hello Server!');
    
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
      io.emit('my broadcast', ` ${msg}`);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

