import { IconType } from 'react-icons';
import { AiFillBug, AiOutlineFileUnknown } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { BrowserRouter } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';
import i18n from '@/locales/i18n';
import { RoutePaths } from '@/utils/enums/routes';
import asyncComponentLoader from '@/utils/loader';
import { AnyProps } from '@/utils/loader/types';

import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes';

export type Route = {
  name: string;
  icon: IconType;
  path: RoutePaths;
  element: (props: AnyProps) => JSX.Element;
  private: boolean;
};

const Home = asyncComponentLoader(() => import('@/pages/Home'));
const Other = asyncComponentLoader(() => import('@/pages/Other'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));
const SignIn = asyncComponentLoader(() => import('@/pages/SignIn'));

const routes: Array<Route> = [
  {
    name: i18n.t('glossary:home'),
    icon: BiHomeAlt,
    path: RoutePaths.Home,
    element: Home,
    private: true,
  },
  {
    name: i18n.t('glossary:other'),
    icon: AiFillBug,
    path: RoutePaths.Other,
    element: Other,
    private: true,
  },
  {
    name: i18n.t('common:signIn'),
    icon: AiOutlineFileUnknown,
    path: RoutePaths.SignIn,
    element: SignIn,
    private: false,
  },
  {
    name: i18n.t('common:notFound'),
    icon: AiOutlineFileUnknown,
    path: RoutePaths.NotFound,
    element: NotFound,
    private: false,
  },
];

export const publicRoutes = routes.filter((route) => !route.private);
export const privateRoutes = routes.filter((route) => route.private);

export function Routes() {
  const authenticated = useAppSelector((state) => state.session.authenticated);
  return (
    <BrowserRouter>
      {authenticated ? (
        <PrivateRoutes routes={privateRoutes} />
      ) : (
        <PublicRoutes routes={publicRoutes} />
      )}
    </BrowserRouter>
  );
}
