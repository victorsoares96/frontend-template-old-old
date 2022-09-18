import { Fragment, useCallback, useEffect, useRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { useNotifications } from '@/hooks/useNotifications';

function SW() {
  const { enqueueSnackbar, closeSnackbar } = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      closeSnackbar(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, closeSnackbar]);

  useEffect(() => {
    if (offlineReady) {
      enqueueSnackbar({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App is ready to work offline.</Alert>,
        },
      });
    } else if (needRefresh) {
      notificationKey.current = enqueueSnackbar({
        message: 'New content is available, click on reload button to update.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <Fragment>
              <Button color="inherit" onClick={() => updateServiceWorker(true)}>
                Reload
              </Button>
              <Button color="inherit" onClick={close}>
                Close
              </Button>
            </Fragment>
          ),
        },
      });

      console.log(notificationKey.current);
    }
  }, [close, enqueueSnackbar, needRefresh, offlineReady, updateServiceWorker]);

  return null;
}

export default SW;
