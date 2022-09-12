import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';

import Image from '@/components/Image';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { privateRoutes } from '@/routes/routes';
import { logout } from '@/store/session/session.slice';
import {
  close as closeSidebarAction,
  toggle as toggleSidebarAction,
} from '@/store/sidebar/sidebar.slice';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Sidebar() {
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const closeSidebar = () => dispatch(closeSidebarAction());
  const toggleSidebar = () => dispatch(toggleSidebarAction());

  return (
    <Drawer variant="permanent" open={isSidebarOpen} sx={{ position: 'relative' }}>
      <DrawerHeader>
        <Image src="https://github.com/microsoft.png" style={{ width: '92px', height: '92px' }} />
      </DrawerHeader>

      <List>
        {privateRoutes.map(({ path, icon: Icon, name }) => (
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate(path)}>
            <ListItemButton
              sx={{
                display: 'flex',
                minHeight: 58,
                alignItems: 'center',
                paddingLeft: '32px',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSidebarOpen ? '8px' : 'auto',
                  }}
                >
                  <Icon
                    size={24}
                    color={
                      location.pathname === path
                        ? theme.palette.secondary.light
                        : theme.palette.text.secondary
                    }
                  />
                </ListItemIcon>

                {isSidebarOpen && (
                  <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === path ? 700 : 400,
                      fontSize: '14px',
                      color:
                        location.pathname === path
                          ? theme.palette.secondary.light
                          : theme.palette.text.secondary,
                    }}
                  />
                )}
              </Box>

              <Box
                display="flex"
                alignSelf="center"
                width="4px"
                sx={{
                  transition: 'height 0.1s ease-in-out',
                }}
                height={location.pathname === path ? '38px' : '0px'}
                borderRadius="2px"
                bgcolor="primary.light"
                marginLeft="auto"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ margin: isSidebarOpen ? '0 32px' : '0 12px' }} />

      <Button
        variant="outlined"
        color="primary"
        sx={{
          display: 'flex',
          border: '1.2px solid #E1E0E7',
          height: '48px',
          margin: isSidebarOpen ? '40px 32px' : '40px 12px',
        }}
        onClick={() => dispatch(logout())}
      >
        <IoIosLogOut size={24} color={theme.palette.primary.main} />

        {isSidebarOpen && (
          <Typography letterSpacing="0.02em" marginLeft="8px" fontSize="14px" color="primary.main">
            Sair
          </Typography>
        )}
      </Button>

      <List style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={toggleSidebar}>
          <ListItemButton
            sx={{
              minHeight: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              {!isSidebarOpen && (
                <BsArrowRightCircle size={24} color={theme.palette.secondary.main} />
              )}
              {isSidebarOpen && (
                <BsArrowLeftCircle size={24} color={theme.palette.secondary.main} />
              )}
            </ListItemIcon>

            <ListItemText
              primary="Recolher menu"
              primaryTypographyProps={{ variant: 'caption', fontSize: '14px' }}
              sx={{
                opacity: isSidebarOpen ? 1 : 0,
                color: theme.palette.secondary.main,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
