import { BiHomeAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DefaultIcon from '@mui/icons-material/Deblur';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Divider, IconButton } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  close as closeSidebarAction,
  open as openSidebarAction,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
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

  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const openSidebar = () => dispatch(openSidebarAction());
  const closeSidebar = () => dispatch(closeSidebarAction());

  return (
    <Drawer variant="permanent" open={isSidebarOpen}>
      <DrawerHeader>
        <IconButton onClick={closeSidebar}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isSidebarOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <BiHomeAlt size={24} />
            </ListItemIcon>

            <ListItemText primary="Item Text" sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
    </Drawer>
  );
  /* return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => dispatch(closeSidebar())}
      onOpen={() => dispatch(openSidebar())}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton onClick={() => dispatch(closeSidebar())} component={Link} to="/not-found">
            <ListItemIcon>
              <DefaultIcon />
            </ListItemIcon>

            <ListItemText>NotFound Route</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  ); */
}

export default Sidebar;
