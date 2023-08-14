import { SendNotificationSocketPayload, SocketNames, SocketNotificationType } from '@doodle-together/shared';
import { useEffect } from 'react';
import { meState } from '@modules/state/me.slice';
import { socketState } from '@modules/state/socket.slice';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { Toast } from '@modules/ui/components/toasts/types/toasts.types';

const getNotificationLevel = (notificationType: SocketNotificationType): Toast['variant'] => {
  switch (notificationType) {
    case 'user-joined':
    case 'user-left':
    case 'user-kicked-except':
      return 'info';
    case 'user-kicked-self':
      return 'danger';
    default:
      return 'info';
  }
};

export const useRoomNotifications = () => {
  const { toast } = useToast();

  useEffect(() => {
    socketState.socket?.on(SocketNames.SEND_NOTIFICATION, (data: SendNotificationSocketPayload) => {
      const { type, broadcast, userId, content } = data;

      const level = getNotificationLevel(type);

      let toastCondition = true;
      if (broadcast === 'self') {
        toastCondition = (meState.me && meState.me.id === userId) ?? false;
      } else if (broadcast === 'except') {
        toastCondition = (meState.me && meState.me.id !== userId) ?? false;
      }

      if (toastCondition) toast({ variant: level, content });
    });

    return () => {
      socketState.socket?.off(SocketNames.SEND_NOTIFICATION);
    };
  }, []);
};
