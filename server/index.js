const { SENDER_TYPE } = require('./Message');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const ioOptions = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
};
const io = socketIO(server, ioOptions);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log(name);
    console.log(room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.emit('sendMessage', messagesDummyData);
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log('Received message:', message); // Add this line

    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5001, () => console.log('Server has started.'));