import EmailIcon from '@mui/icons-material/Email';
import RestartIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { email, messages } from '@/config';
import resetApp from '@/utils/reset-app';

function AppErrorBoundaryFallback() {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
    >
      <Paper
        sx={{
          p: 5,
          m: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h3">
          {messages.app.crash.title}
        </Typography>

        <Button
          color="secondary"
          startIcon={<EmailIcon />}
          variant="outlined"
          target="_blank"
          rel="noreferrer"
          href={`mailto: ${email}`}
          sx={{ my: 3 }}
        >
          {messages.app.crash.options.email}
        </Button>

        <Typography component="h6">or</Typography>

        <Button
          color="secondary"
          startIcon={<RestartIcon />}
          sx={{ mt: 3 }}
          variant="outlined"
          onClick={resetApp}
        >
          {messages.app.crash.options.reset}
        </Button>
      </Paper>
    </Box>
  );
}

export default AppErrorBoundaryFallback;
