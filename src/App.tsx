import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Routes from '@/routes';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';

function App() {
  return (
    <Fragment>
      <CssBaseline />

      <Notifications />

      <HotKeys />

      <SW />

      <BrowserRouter>
        <Header />

        <Sidebar />

        <Routes />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
