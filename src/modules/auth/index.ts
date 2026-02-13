import { ModuleDefinition } from '@app/utils/moduleRegistry';
import { authRoutes } from './routes/auth.routes';

export const authModule: ModuleDefinition = {
  name: 'auth',
  routes: authRoutes,
};
