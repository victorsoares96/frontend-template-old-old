import { IoIosLogOut } from 'react-icons/io';

import { Button, Typography, useTheme } from '@mui/material';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/store/session/session.slice';

function Logout() {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{
        display: 'flex',
        height: '48px',
        margin: isSidebarOpen ? '40px 32px' : '40px 12px',
      }}
      onClick={() => dispatch(logout())}
    >
      <IoIosLogOut size={24} color={theme.palette.primary.dark} />

      {isSidebarOpen && (
        <Typography letterSpacing="0.02em" marginLeft="8px" fontSize="14px" color="primary.dark">
          Sair
        </Typography>
      )}
    </Button>
  );
}

export default Logout;
