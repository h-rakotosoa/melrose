import { RouteObject, useRoutes, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@app/components/common/ProtectedRoute';
import { AppLayout } from '@app/layouts/AppLayout';
import { moduleRegistry } from '@app/utils/moduleRegistry';
import { authModule } from '@modules/auth';
import { dashboardModule } from '@modules/dashboard';
import { usersModule } from '@modules/users';
import { hotelModule } from '@modules/hotel';

moduleRegistry.registerLocalModule('auth', authModule);
moduleRegistry.registerLocalModule('dashboard', dashboardModule);
moduleRegistry.registerLocalModule('users', usersModule);
moduleRegistry.registerLocalModule('hotel', hotelModule);

export const AppRouter = () => {
  const allRoutes = moduleRegistry.getAllRoutes();

  const publicRoutes: RouteObject[] = [];
  const privateRoutes: RouteObject[] = [];

  allRoutes.forEach((route) => {
    const meta = route.meta;
    if (meta?.requiresAuth) {
      privateRoutes.push(route);
    } else {
      publicRoutes.push(route);
    }
  });

  const routes: RouteObject[] = [
    ...publicRoutes,
    {
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </ProtectedRoute>
      ),
      children: privateRoutes,
    },
  ];

  return useRoutes(routes);
};
