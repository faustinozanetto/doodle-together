import { RoomToolSize } from '@doodle-together/shared';

export const getToolSizeToWidth = (size: RoomToolSize) => {
  switch (size) {
    case 'small':
      return 2;
    case 'medium':
      return 4;
    case 'large':
      return 8;
    case 'extra-large':
      return 14;
    default:
      return 2;
  }
};
