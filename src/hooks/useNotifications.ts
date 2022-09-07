import { useCallback, useMemo, useState } from 'react';

import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

import { notifications as notificationsDefaults } from '@/config';

interface Notification {
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
}

type Actions = {
  push: (notification: Partial<Notification>) => SnackbarKey;
  close: (key: SnackbarKey, dismissAll?: boolean) => void;
  remove: (key: SnackbarKey) => void;
};

function useNotifications(): [Notification[], Actions] {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = useCallback(
    (notification: Partial<Notification>) => {
      // TODO (Suren): use uuid
      const id = Math.random().toString();
      setNotifications((notifications): Notification[] => [
        // TODO (Suren): use immer
        ...notifications,
        {
          ...notification,
          message: notification.message,
          dismissed: false,
          options: {
            ...notificationsDefaults.options,
            ...notification.options,
            key: id,
          },
        },
      ]);

      return id;
    },
    [setNotifications],
  );

  const close = useCallback(
    (key: SnackbarKey, dismissAll = !key) => {
      setNotifications((notifications) =>
        notifications.map((notification) =>
          dismissAll || notification.options.key === key
            ? { ...notification, dismissed: true }
            : { ...notification },
        ),
      );
    },
    [setNotifications],
  );

  const remove = useCallback(
    (key: SnackbarKey) => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.options.key !== key),
      );
    },
    [setNotifications],
  );

  const actions = useMemo(() => ({ push, close, remove }), [push, close, remove]);

  return [notifications, actions];
}

export default useNotifications;
