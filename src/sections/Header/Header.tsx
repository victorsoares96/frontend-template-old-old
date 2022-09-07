import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { repository, title } from '@/config';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNotifications } from '@/hooks/useNotifications';
import { open as openHotkeysDialog } from '@/store/hotkeys/hotkeys.slice';
import { toggle as toggleSidebar } from '@/store/sidebar/sidebar.slice';
import { toggle as toggleTheme } from '@/store/theme/theme.slice';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

function Header() {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useNotifications();

  function showNotification() {
    enqueueSnackbar({
      options: {
        content: (
          <Alert severity="info">
            <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
            {getRandomJoke()}
          </Alert>
        ),
      },
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={() => dispatch(toggleSidebar())}
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Button onClick={showNotification} color="info">
              {title}
            </Button>
          </FlexBox>

          <FlexBox>
            <FlexBox>
              <Tooltip title="Hot keys" arrow>
                <HotKeysButton
                  size="small"
                  variant="outlined"
                  aria-label="open hotkeys dialog"
                  onClick={() => dispatch(openHotkeysDialog())}
                >
                  alt + /
                </HotKeysButton>
              </Tooltip>
            </FlexBox>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="It's open source" arrow>
              <IconButton color="info" size="large" component="a" href={repository} target="_blank">
                <GitHubIcon />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={() => dispatch(toggleTheme())}
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
