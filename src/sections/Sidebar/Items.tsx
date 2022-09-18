import { useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { privateRoutes } from '@/routes/routes';
import { close as closeSidebarAction } from '@/store/sidebar/sidebar.slice';
import isMobile from '@/utils/is-mobile';

function Items() {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const closeSidebar = () => dispatch(closeSidebarAction());
  return (
    <List>
      {privateRoutes.map(({ path, Icon, name }) => (
        <ListItem
          key={path}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => {
            navigate(path);
            if (isMobile) closeSidebar();
          }}
        >
          <ListItemButton
            sx={{
              display: 'flex',
              minHeight: 58,
              alignItems: 'center',
              paddingLeft: '32px',
              backgroundColor:
                // eslint-disable-next-line no-nested-ternary
                location.pathname === path
                  ? theme.palette.mode === 'dark'
                    ? 'rgba(251, 250, 246, 0.08)'
                    : '#FBFAF6'
                  : 'transparent',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? '8px' : 'auto',
                }}
              >
                <Icon size={24} color={theme.palette.text.secondary} />
              </ListItemIcon>

              {isSidebarOpen && (
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === path ? 700 : 400,
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
              sx={{
                transition: 'height 0.15s ease-in-out',
              }}
              height={location.pathname === path ? '38px' : '0px'}
              borderRadius="2px"
              bgcolor="secondary.light"
              marginLeft="auto"
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default Items;
