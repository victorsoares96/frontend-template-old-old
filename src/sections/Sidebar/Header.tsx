import { Box, Typography } from '@mui/material';

import { useAppSelector } from '@/hooks/useAppSelector';
import isMobile from '@/utils/is-mobile';

import { DrawerHeader } from './styled';

function Header() {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);
  return (
    <DrawerHeader>
      <Box display="flex" justifyContent="center" width="100%" margin="44px 0">
        <Typography variant="h4" color="primary.main" fontWeight={600}>
          {isMobile || isSidebarOpen ? 'be' : 'b'}
        </Typography>
        <Typography variant="h4" color="secondary.main" marginTop="5px" fontWeight={600}>
          {isMobile || isSidebarOpen ? 'he' : 'h'}
        </Typography>
      </Box>
    </DrawerHeader>
  );
}

export default Header;
