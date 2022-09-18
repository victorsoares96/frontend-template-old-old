import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggle as toggleSidebarAction } from '@/store/sidebar/sidebar.slice';

function Footer() {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const toggleSidebar = () => dispatch(toggleSidebarAction());
  return (
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
              <BsArrowRightCircle size={24} color={theme.palette.text.secondary} />
            )}
            {isSidebarOpen && <BsArrowLeftCircle size={24} color={theme.palette.text.secondary} />}
          </ListItemIcon>

          <ListItemText
            primary="Recolher menu"
            primaryTypographyProps={{ variant: 'caption', fontSize: '14px' }}
            sx={{
              opacity: isSidebarOpen ? 1 : 0,
              color: theme.palette.text.secondary,
            }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default Footer;
