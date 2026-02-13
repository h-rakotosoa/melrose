import { create } from 'zustand';
import { Room, RoomFilters } from '../types/room.types';
import { Reservation, ReservationFilters } from '../types/reservation.types';
import { CalendarEvent, CalendarDay, CalendarRange } from '../types/calendar.types';
import { HousekeepingTask, HousekeepingStats } from '../types/housekeeping.types';
import { HotelSettings } from '../types/settings.types';
import { roomsService } from '../services/rooms.service';
import { reservationsService } from '../services/reservations.service';
import { calendarService } from '../services/calendar.service';
import { housekeepingService } from '../services/housekeeping.service';
import { settingsService } from '../services/settings.service';

interface HotelState {
  rooms: Room[];
  reservations: Reservation[];
  calendarEvents: CalendarEvent[];
  calendarDays: CalendarDay[];
  housekeepingTasks: HousekeepingTask[];
  housekeepingStats: HousekeepingStats | null;
  settings: HotelSettings | null;

  roomsLoading: boolean;
  reservationsLoading: boolean;
  calendarLoading: boolean;
  housekeepingLoading: boolean;
  settingsLoading: boolean;

  roomsError: string | null;
  reservationsError: string | null;
  calendarError: string | null;
  housekeepingError: string | null;
  settingsError: string | null;

  fetchRooms: (filters?: RoomFilters) => Promise<void>;
  fetchReservations: (filters?: ReservationFilters) => Promise<void>;
  fetchCalendarEvents: (range: CalendarRange) => Promise<void>;
  fetchCalendarDays: (range: CalendarRange) => Promise<void>;
  fetchHousekeepingTasks: () => Promise<void>;
  fetchHousekeepingStats: () => Promise<void>;
  fetchSettings: () => Promise<void>;

  clearErrors: () => void;
}

export const useHotelStore = create<HotelState>((set) => ({
  rooms: [],
  reservations: [],
  calendarEvents: [],
  calendarDays: [],
  housekeepingTasks: [],
  housekeepingStats: null,
  settings: null,

  roomsLoading: false,
  reservationsLoading: false,
  calendarLoading: false,
  housekeepingLoading: false,
  settingsLoading: false,

  roomsError: null,
  reservationsError: null,
  calendarError: null,
  housekeepingError: null,
  settingsError: null,

  fetchRooms: async (filters?: RoomFilters) => {
    set({ roomsLoading: true, roomsError: null });
    try {
      const rooms = await roomsService.getRooms(filters);
      set({ rooms, roomsLoading: false });
    } catch (error) {
      set({
        roomsError: error instanceof Error ? error.message : 'Failed to fetch rooms',
        roomsLoading: false,
      });
    }
  },

  fetchReservations: async (filters?: ReservationFilters) => {
    set({ reservationsLoading: true, reservationsError: null });
    try {
      const reservations = await reservationsService.getReservations(filters);
      set({ reservations, reservationsLoading: false });
    } catch (error) {
      set({
        reservationsError:
          error instanceof Error ? error.message : 'Failed to fetch reservations',
        reservationsLoading: false,
      });
    }
  },

  fetchCalendarEvents: async (range: CalendarRange) => {
    set({ calendarLoading: true, calendarError: null });
    try {
      const calendarEvents = await calendarService.getCalendarEvents(range);
      set({ calendarEvents, calendarLoading: false });
    } catch (error) {
      set({
        calendarError:
          error instanceof Error ? error.message : 'Failed to fetch calendar events',
        calendarLoading: false,
      });
    }
  },

  fetchCalendarDays: async (range: CalendarRange) => {
    set({ calendarLoading: true, calendarError: null });
    try {
      const calendarDays = await calendarService.getCalendarDays(range);
      set({ calendarDays, calendarLoading: false });
    } catch (error) {
      set({
        calendarError:
          error instanceof Error ? error.message : 'Failed to fetch calendar days',
        calendarLoading: false,
      });
    }
  },

  fetchHousekeepingTasks: async () => {
    set({ housekeepingLoading: true, housekeepingError: null });
    try {
      const housekeepingTasks = await housekeepingService.getTasks();
      set({ housekeepingTasks, housekeepingLoading: false });
    } catch (error) {
      set({
        housekeepingError:
          error instanceof Error
            ? error.message
            : 'Failed to fetch housekeeping tasks',
        housekeepingLoading: false,
      });
    }
  },

  fetchHousekeepingStats: async () => {
    set({ housekeepingLoading: true, housekeepingError: null });
    try {
      const housekeepingStats = await housekeepingService.getStats();
      set({ housekeepingStats, housekeepingLoading: false });
    } catch (error) {
      set({
        housekeepingError:
          error instanceof Error
            ? error.message
            : 'Failed to fetch housekeeping stats',
        housekeepingLoading: false,
      });
    }
  },

  fetchSettings: async () => {
    set({ settingsLoading: true, settingsError: null });
    try {
      const settings = await settingsService.getSettings();
      set({ settings, settingsLoading: false });
    } catch (error) {
      set({
        settingsError:
          error instanceof Error ? error.message : 'Failed to fetch settings',
        settingsLoading: false,
      });
    }
  },

  clearErrors: () => {
    set({
      roomsError: null,
      reservationsError: null,
      calendarError: null,
      housekeepingError: null,
      settingsError: null,
    });
  },
}));
