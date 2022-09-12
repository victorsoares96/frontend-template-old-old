import { useTranslation } from 'react-i18next';

import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';

import { FlexBox } from '@/components/styled';
import { repository, title } from '@/config';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useNotifications } from '@/hooks/useNotifications';
import { open as openHotkeysDialog } from '@/store/hotkeys/hotkeys.slice';
import { toggle as toggleSidebar } from '@/store/sidebar/sidebar.slice';
import { toggle as toggleTheme } from '@/store/theme/theme.slice';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${theme.spacing(8)} - 1px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header() {
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const { enqueueSnackbar } = useNotifications();

  const showNotification = () => {
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
  };

  return (
    <AppBar elevation={0} position="fixed" open={isSidebarOpen} color="default">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
