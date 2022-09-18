import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

import { Avatar, IconButton, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { styled, useTheme } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useNotifications } from '@/hooks/useNotifications';
import { privateRoutes } from '@/routes/routes';
import { toggle as toggleSidebarAction } from '@/store/sidebar/sidebar.slice';
import isMobile from '@/utils/is-mobile';

import { getRandomJoke } from './utils';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: isMobile ? '100%' : `calc(100% - ${theme.spacing(10)} - 1px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header() {
  const { t } = useTranslation('common');

  const location = useLocation();

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);
  const user = useAppSelector((state) => state.session.user);

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

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };
  const CurrentRoute = privateRoutes.find((route) => route.path === location.pathname);
  return (
    <AppBar
      elevation={0}
      position="fixed"
      open={isSidebarOpen}
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton color="primary" onClick={toggleSidebar}>
              <HiMenuAlt2 color={theme.palette.secondary.main} />
            </IconButton>
          )}

          {!isMobile && CurrentRoute && (
            <CurrentRoute.Icon size={24} color={theme.palette.text.secondary} />
          )}

          <Typography
            variant="h6"
            noWrap
            component="div"
            color="text.secondary"
            fontWeight={700}
            fontSize="24px"
            marginLeft="16px"
          >
            {CurrentRoute?.name}
          </Typography>
        </Box>

        <Button variant="text" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src="https://github.com/victorsoares96.png"
            sx={{
              width: 32,
              height: 32,
              border: `1.2px solid ${theme.palette.secondary.dark}`,
            }}
          />

          {!isMobile && (
            <Typography
              variant="caption"
              color="text.secondary"
              marginLeft="12px"
              marginRight="6px"
            >
              {user?.name}
            </Typography>
          )}

          {!isMobile && <FiChevronDown size={16} color={theme.palette.text.secondary} />}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
