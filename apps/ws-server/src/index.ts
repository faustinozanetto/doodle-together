import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { JoinRoomSocketData } from 'types/server.types';

require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ENDPOINT,
  })
);

const server = http.createServer(app);
const io = new SocketServer(server);

app.get('/ping', (req, res) => {
  console.log('Ping detected');
  res.send('pong');
});

io.on('connection', (socket) => {
  console.log('Connected');

  socket.on('join-room', (socket: JoinRoomSocketData) => {
    console.log('Received join room');

    console.log({ socket });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
    socket.emit('disconnected');
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
