import { ModuleDefinition } from '@app/utils/moduleRegistry';
import { hotelRoutes } from './routes/hotel.routes';

export const hotelModule: ModuleDefinition = {
  name: 'hotel',
  routes: hotelRoutes,
};
