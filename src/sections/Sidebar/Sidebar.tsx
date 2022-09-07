import { Link } from 'react-router-dom';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import routes from '@/routes';
import { close as closeSidebar, open as openSidebar } from '@/store/sidebar/sidebar.slice';

function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => dispatch(closeSidebar)}
      onOpen={() => dispatch(openSidebar)}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {Object.values(routes)
          .filter((route) => route.title)
          .map(({ path, title, icon: Icon }) => (
            <ListItem sx={{ p: 0 }} key={path}>
              <ListItemButton onClick={() => dispatch(closeSidebar)} component={Link} to={path}>
                <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>

                <ListItemText>{title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </SwipeableDrawer>
  );
}

export default Sidebar;
