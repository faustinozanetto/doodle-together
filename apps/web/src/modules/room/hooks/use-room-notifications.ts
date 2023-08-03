import { SendNotificationSocketPayload, SocketNotificationType } from '@doodle-together/types';
import { meState } from '@modules/state/me.slice';
import { roomState } from '@modules/state/room.slice';
import { socketState } from '@modules/state/socket.slice';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { Toast } from '@modules/ui/components/toasts/types/toasts.types';
import { useEffect } from 'react';

const getNotificationLevel = (notificationType: SocketNotificationType): Toast['variant'] => {
  switch (notificationType) {
    case 'user-joined':
    case 'user-left':
    case 'user-kicked-except':
      return 'info';
    case 'user-kicked-self':
      return 'danger';
  }
};

export const useRoomNotifications = () => {
  const { toast } = useToast();

  useEffect(() => {
    socketState.socket?.on('send_notification', (data: SendNotificationSocketPayload) => {
      const { me } = meState;
      const { room } = roomState;
      const { type, broadcast, userId, content } = data;

      const level = getNotificationLevel(type);

      let toastCondition = true;
      if (broadcast === 'self') {
        toastCondition = (me && me.userId === userId) ?? false;
      } else if (broadcast === 'except') {
        console.log('NOTIFACION EXCEPT');

        toastCondition = (me && me.userId !== userId) ?? false;
      }

      if (toastCondition) toast({ variant: level, content });
    });

    return () => {
      socketState.socket?.off('send_notification');
    };
  }, [meState.me, roomState.room]);
};
