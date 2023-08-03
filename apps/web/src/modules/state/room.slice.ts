import { Room } from '@doodle-together/types';
import { create } from 'zustand';

export interface RoomSliceState {
  room: Room | null;
  setRoom: (room: Room) => void;
  resetRoom: () => void;
}

export const useRoomStore = create<RoomSliceState>((set) => ({
  room: null,
  setRoom: (room: Room) => set((state) => ({ room, resetRoom: state.resetRoom, setRoom: state.setRoom })),
  resetRoom: () => set((state) => ({ room: null, resetRoom: state.resetRoom, setRoom: state.setRoom })),
}));
