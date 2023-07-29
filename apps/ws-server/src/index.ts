import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import {
  DrawPointSocketData,
  JoinRoomSocketData,
  RoomJoinedSocketData,
  UpdateCanvasSocketData,
} from 'types/server.types';

require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ENDPOINT,
  })
);

type User = { userId: string; username: string; roomId: string };

let users: User[] = [];

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_ENDPOINT,
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`Connected ${socket.id}`);

  io.on('join-room', (data: JoinRoomSocketData) => {
    socket.join(data.roomId);

    const roomJoinedData: RoomJoinedSocketData = {
      roomId: data.roomId,
      userId: socket.id,
      username: data.username,
    };
    users.push({ roomId: data.roomId, userId: socket.id, username: data.username });

    const roomUsers = users.filter((u) => u.roomId === data.roomId);
    io.emit('room-joined', roomJoinedData);

    io.to(data.roomId).emit('update-users', { roomUsers });
  });

  io.on('draw-point', (data: DrawPointSocketData) => {
    const updateCanvasData: UpdateCanvasSocketData = {
      point: data.point,
    };

    io.to(data.roomId).emit('canvas-update', updateCanvasData);
  });

  io.on('disconnect', () => {
    console.log('Disconnected');
    io.emit('disconnected');
    const user = users.find((u) => u.userId === socket.id);
    if (!user) return;

    socket.leave(user.roomId);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
