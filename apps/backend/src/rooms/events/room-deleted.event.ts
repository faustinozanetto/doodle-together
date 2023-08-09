export class RoomDeletedEvent {
  private readonly roomId: string;

  constructor(roomId: string) {
    this.roomId = roomId;
  }
}
