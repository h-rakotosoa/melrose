import { createElement } from 'react';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { RouteObjectWithMeta, RouteMeta } from '@app/contracts/types.contract';
import { routePaths } from '../../../routes/routePaths';

export const dashboardRoutes: RouteObjectWithMeta[] = [
  {
    path: routePaths.dashboard,
    element: createElement(DashboardPage),
    meta: {
      title: 'Dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true,
      showInMenu: true,
      order: 1,
    } as RouteMeta,
  },
];
