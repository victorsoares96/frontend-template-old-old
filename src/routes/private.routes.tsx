import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';
import { DrawerHeader } from '@/sections/Sidebar/Sidebar';
import { RoutePaths } from '@/utils/enums/routes';

import type { Route as RouteProp } from './routes';

export function PrivateRoutes({ routes }: { routes: Array<RouteProp> }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Routes>
          <Route path="/" element={<Navigate to={RoutePaths.Home} replace />} />
          <Route path="*" element={<Navigate to={RoutePaths.Home} replace />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
