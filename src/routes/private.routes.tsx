import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';
import { getPageHeight } from '@/utils/get-page-height.util';
import asyncComponentLoader from '@/utils/loader';

const Page1 = asyncComponentLoader(() => import('@/pages/Page1'));
const Page2 = asyncComponentLoader(() => import('@/pages/Page2'));
const Page3 = asyncComponentLoader(() => import('@/pages/Page3'));
const Page4 = asyncComponentLoader(() => import('@/pages/Page4'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

export function PrivateRoutes() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Header />

      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to="/page-1" replace />} />
        <Route path="page-1" element={<Page1 />} />
        <Route path="page-2" element={<Page2 />} />
        <Route path="page-3" element={<Page3 />} />
        <Route path="page-4" element={<Page4 />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Box>
  );
}
