import { Navigate, Route, Routes } from 'react-router-dom';

import asyncComponentLoader from '@/utils/loader';

const SignIn = asyncComponentLoader(() => import('@/pages/SignIn'));

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}
