import { createElement } from 'react';
import { LoginPage } from '../pages/login/LoginPage';
import { RouteObjectWithMeta, RouteMeta } from '@app/contracts/types.contract';
import { routePaths } from '../../../routes/routePaths';

export const authRoutes: RouteObjectWithMeta[] = [
  {
    path: routePaths.login,
    element: createElement(LoginPage),
    meta: {
      title: 'Login',
      requiresAuth: false,
      showInMenu: false,
      order: 0,
    } as RouteMeta,
  },
];
