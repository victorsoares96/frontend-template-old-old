import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Routes from '@/routes';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

function App() {
  return (
    <Container sx={{ height: '100vh' }}>
      <CssBaseline />

      <Notifications />

      <HotKeys />

      <SW />

      <Routes />
    </Container>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
