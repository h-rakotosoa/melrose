import { ModuleDefinition } from '@app/utils/moduleRegistry';
import { dashboardRoutes } from './routes/dashboard.routes';

export const dashboardModule: ModuleDefinition = {
  name: 'dashboard',
  routes: dashboardRoutes,
};
