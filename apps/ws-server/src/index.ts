import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { JoinRoomSocketData } from 'types/server.types';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
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

server.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
