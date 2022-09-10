import { BrowserRouter } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';

import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes';

export function Routes() {
  const authenticated = useAppSelector((state) => state.session.authenticated);
  return <BrowserRouter>{authenticated ? <PrivateRoutes /> : <PublicRoutes />}</BrowserRouter>;
}
