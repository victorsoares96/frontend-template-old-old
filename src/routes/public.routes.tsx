import { Navigate, Route, Routes } from 'react-router-dom';

import asyncComponentLoader from '@/utils/loader';

const Welcome = asyncComponentLoader(() => import('@/pages/Welcome'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}
