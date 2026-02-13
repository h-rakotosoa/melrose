import { ReservationStatus, RoomStatus } from './enums';

export enum CalendarView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface CalendarEvent {
  id: string;
  reservationId: string;
  roomId: string;
  roomNumber: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
  roomStatus: RoomStatus;
  isCheckInDay: boolean;
  isCheckOutDay: boolean;
}

export interface CalendarDay {
  date: string;
  events: CalendarEvent[];
  isToday: boolean;
  isWeekend: boolean;
}

export interface CalendarRange {
  startDate: string;
  endDate: string;
}

export interface CalendarFilters {
  roomType?: string;
  status?: ReservationStatus;
  source?: string;
}
