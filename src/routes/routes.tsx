import { Box } from '@mui/material';

import { useAppSelector } from '@/hooks/useAppSelector';

import { getPageHeight } from '../utils/get-page-height.util';
import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes';

export function Routes() {
  const authenticated = useAppSelector((state) => state.session.authenticated);
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      {authenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </Box>
  );
}
