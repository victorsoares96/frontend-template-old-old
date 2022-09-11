import { useRef } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DefaultIcon from '@mui/icons-material/Deblur';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  close as closeSidebarAction,
  open as openSidebarAction,
  toggle as toggleSidebarAction,
} from '@/store/sidebar/sidebar.slice';
import isMobile from '@/utils/is-mobile';

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
  const toggleSidebar = () => dispatch(toggleSidebarAction());

  return (
    <Drawer variant="permanent" open={isSidebarOpen} sx={{ position: 'relative' }}>
      <DrawerHeader>
        <IconButton onClick={closeSidebar}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              display: 'flex',
              minHeight: 48,
              justifyContent: isSidebarOpen ? 'space-between' : 'unset',
              alignItems: 'center',
              padding: isSidebarOpen ? '0 32px' : '0 12px',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginLeft={isSidebarOpen ? 'unset' : 'auto'}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? '8px' : 'auto',
                }}
              >
                <BiHomeAlt size={24} color={theme.palette.text.secondary} />
              </ListItemIcon>

              {isSidebarOpen && (
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontWeight: 400,
                    fontSize: '14px',
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </Box>

            <Box
              display="flex"
              alignSelf="center"
              width="4px"
              height="38px"
              borderRadius="2px"
              bgcolor="primary.light"
              marginLeft="auto"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: 'flex-start',
              padding: '0 32px',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? '8px' : 'auto',
              }}
            >
              <BiHomeAlt size={24} color={theme.palette.text.secondary} />
            </ListItemIcon>

            <ListItemText
              primary="Home"
              primaryTypographyProps={{
                fontWeight: 400,
                fontSize: '14px',
                color: theme.palette.text.secondary,
              }}
              sx={{ opacity: isSidebarOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ margin: isSidebarOpen ? '0 32px' : '0 12px' }} />

      <Button
        variant="outlined"
        sx={{
          display: 'flex',
          border: '1.2px solid #E1E0E7',
          height: '48px',
          margin: isSidebarOpen ? '40px 32px' : '40px 12px',
          // padding: isSidebarOpen ? '12px 0' : '5px 5px',
          // margin: isSidebarOpen ? '40px 34px' : '40px 5px',
        }}
      >
        <IoIosLogOut size={24} color="#677E77" />

        {isSidebarOpen && (
          <Typography letterSpacing="0.02em" marginLeft="8px" fontSize="14px" color="#677E77">
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
