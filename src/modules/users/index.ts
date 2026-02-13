import { ModuleDefinition } from '@app/utils/moduleRegistry';
import { usersRoutes } from './routes/users.routes';

export const usersModule: ModuleDefinition = {
  name: 'users',
  routes: usersRoutes,
};
