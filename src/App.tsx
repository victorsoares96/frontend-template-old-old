import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Routes from '@/routes';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

function App() {
  return (
    <Box sx={{ height: '100vh' }}>
      <CssBaseline />

      <Notifications />

      <HotKeys />

      <SW />

      <Routes />
    </Box>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
