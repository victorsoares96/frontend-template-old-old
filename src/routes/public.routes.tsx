import { Navigate, Route, Routes } from 'react-router-dom';

import { RoutePaths } from '@/utils/enums/routes';

import type { Route as RouteProp } from './routes';

export function PublicRoutes({ routes }: { routes: Array<RouteProp> }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={RoutePaths.SignIn} replace />} />
      <Route path="*" element={<Navigate to={RoutePaths.SignIn} replace />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
