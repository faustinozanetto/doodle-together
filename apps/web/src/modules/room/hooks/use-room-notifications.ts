import { SendNotificationSocketPayload, SocketNotificationType } from '@doodle-together/types';
import { state } from '@modules/state/store';
import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { Toast } from '@modules/ui/components/toasts/types/toasts.types';
import { useEffect } from 'react';
import { useRoomMe } from './use-room-me';

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
  const me = useRoomMe();
  const { toast } = useToast();

  useEffect(() => {
    state.socket?.on('send_notification', (data: SendNotificationSocketPayload) => {
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
      state.socket?.off('send_notification');
    };
  }, [state.room]);
};
