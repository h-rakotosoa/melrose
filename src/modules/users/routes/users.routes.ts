import { createElement } from 'react';
import { UsersPage } from '../pages/users/UsersPage';
import { RouteObjectWithMeta, RouteMeta } from '@app/contracts/types.contract';
import { routePaths } from '../../../routes/routePaths';

export const usersRoutes: RouteObjectWithMeta[] = [
  {
    path: routePaths.users,
    element: createElement(UsersPage),
    meta: {
      title: 'Users',
      icon: 'Users',
      requiresAuth: true,
      showInMenu: true,
      order: 2,
    } as RouteMeta,
  },
];
