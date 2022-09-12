import { Fragment } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Routes from '@/routes';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

function App() {
  return (
    <Fragment>
      <CssBaseline />

      <Notifications />

      <HotKeys />

      <SW />

      <Routes />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
