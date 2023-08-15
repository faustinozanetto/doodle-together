import { RoomWithUsers } from '@doodle-together/shared';
import { RefObject } from 'react';
import { create } from 'zustand';

export type RoomSliceState = {
  room: RoomWithUsers | null;
  canvasRef: RefObject<HTMLCanvasElement>;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;
};

export type RoomSliceActions = {
  setRoom: (room: RoomWithUsers) => void;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;
};

export const useRoomStore = create<RoomSliceState & RoomSliceActions>((set) => ({
  room: null,
  canvasRef: { current: null },
  setRoom: (room) => {
    set({ room });
  },
  setCanvasRef: (canvasRef) => {
    set({ canvasRef });
  },
}));
