import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';
import { DrawerHeader } from '@/sections/Sidebar/styled';
import { RoutePaths } from '@/utils/enums/routes';

import type { Route as RouteProp } from './routes';

export function PrivateRoutes({ routes }: { routes: Array<RouteProp> }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `radial-gradient(circle, rgba(21,21,24,1) 0%, rgba(21,21,24,1) 82%, rgba(28,27,27,1) 100%)`
              : theme.palette.background.default,
        }}
      >
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
