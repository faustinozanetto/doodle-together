import { SendNotificationSocketPayload, SocketNames, SocketNotificationType } from '@doodle-together/shared';
import { useEffect } from 'react';

import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { Toast } from '@modules/ui/components/toasts/types/toasts.types';

import { useMeStore } from '@modules/state/me.slice';
import socket from '@modules/socket/lib/socket.lib';

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
  const { me } = useMeStore();

  useEffect(() => {
    socket.on(SocketNames.SEND_NOTIFICATION, (data: SendNotificationSocketPayload) => {
      const { type, broadcast, userId, content } = data;

      const level = getNotificationLevel(type);

      let toastCondition = true;
      if (broadcast === 'self') {
        toastCondition = (me && me.id === userId) ?? false;
      } else if (broadcast === 'except') {
        toastCondition = (me && me.id !== userId) ?? false;
      }

      if (toastCondition) toast({ variant: level, content });
    });

    return () => {
      socket.off(SocketNames.SEND_NOTIFICATION);
    };
  }, [me]);
};
