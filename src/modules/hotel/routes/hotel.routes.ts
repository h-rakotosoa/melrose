import { createElement } from 'react';
import { RoomsPage } from '../pages/rooms/RoomsPage';
import { ReservationsPage } from '../pages/reservations/ReservationsPage';
import { CalendarPage } from '../pages/calendar/CalendarPage';
import { HousekeepingPage } from '../pages/housekeeping/HousekeepingPage';
import { HotelSettingsPage } from '../pages/settings/HotelSettingsPage';
import { RouteObjectWithMeta, RouteMeta } from '@app/contracts/types.contract';

export const hotelRoutes: RouteObjectWithMeta[] = [
  {
    path: '/hotel/rooms',
    element: createElement(RoomsPage),
    meta: {
      title: 'Chambres',
      icon: 'BedDouble',
      requiresAuth: true,
      showInMenu: true,
      order: 10,
    } as RouteMeta,
  },
  {
    path: '/hotel/reservations',
    element: createElement(ReservationsPage),
    meta: {
      title: 'Réservations',
      icon: 'ClipboardList',
      requiresAuth: true,
      showInMenu: true,
      order: 11,
    } as RouteMeta,
  },
  {
    path: '/hotel/calendar',
    element: createElement(CalendarPage),
    meta: {
      title: 'Calendrier',
      icon: 'CalendarDays',
      requiresAuth: true,
      showInMenu: true,
      order: 12,
    } as RouteMeta,
  },
  {
    path: '/hotel/housekeeping',
    element: createElement(HousekeepingPage),
    meta: {
      title: 'Housekeeping',
      icon: 'Sparkles',
      requiresAuth: true,
      showInMenu: true,
      order: 13,
    } as RouteMeta,
  },
  {
    path: '/hotel/settings',
    element: createElement(HotelSettingsPage),
    meta: {
      title: 'Paramètres Hôtel',
      icon: 'Settings',
      requiresAuth: true,
      showInMenu: true,
      order: 14,
    } as RouteMeta,
  },
];
