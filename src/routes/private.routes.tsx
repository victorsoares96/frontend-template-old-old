import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';
import { RoutePaths } from '@/utils/enums/routes';
import { getPageHeight } from '@/utils/get-page-height.util';

import type { Route as RouteProp } from './routes';

export function PrivateRoutes({ routes }: { routes: Array<RouteProp> }) {
  return (
    <Box component="main" sx={{ backgroundColor: 'red', flexGrow: 1, p: 3 }}>
      <Header />

      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to={RoutePaths.Home} replace />} />
        <Route path="*" element={<Navigate to={RoutePaths.Home} replace />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </Box>
  );
}
