import { httpContract } from '@app/contracts/http.contract';
import {
  CalendarEvent,
  CalendarDay,
  CalendarRange,
  CalendarView,
} from '../types/calendar.types';
import { reservationsService } from './reservations.service';
import { RoomStatus } from '../types/enums';

export const calendarService = {
  async getCalendarEvents(range: CalendarRange): Promise<CalendarEvent[]> {
    try {
      const params = new URLSearchParams();
      params.append('startDate', range.startDate);
      params.append('endDate', range.endDate);

      const response = await httpContract.client.get<CalendarEvent[]>(
        `/hotel/calendar/events?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const reservations = await reservationsService.getReservations();
      const events: CalendarEvent[] = reservations.map((res) => ({
        id: `event-${res.id}`,
        reservationId: res.id,
        roomId: res.roomId,
        roomNumber: res.roomNumber || 'TBD',
        guestName: `${res.guest.firstName} ${res.guest.lastName}`,
        checkInDate: res.checkInDate,
        checkOutDate: res.checkOutDate,
        status: res.status,
        roomStatus: RoomStatus.RESERVED,
        isCheckInDay: res.checkInDate === new Date().toISOString().split('T')[0],
        isCheckOutDay: res.checkOutDate === new Date().toISOString().split('T')[0],
      }));
      return events;
    }
  },

  async getCalendarDays(range: CalendarRange): Promise<CalendarDay[]> {
    try {
      const params = new URLSearchParams();
      params.append('startDate', range.startDate);
      params.append('endDate', range.endDate);

      const response = await httpContract.client.get<CalendarDay[]>(
        `/hotel/calendar/days?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const events = await this.getCalendarEvents(range);
      const days: CalendarDay[] = [];

      const start = new Date(range.startDate);
      const end = new Date(range.endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const dayEvents = events.filter(
          (e) => dateStr >= e.checkInDate && dateStr < e.checkOutDate
        );

        days.push({
          date: dateStr,
          events: dayEvents,
          isToday: dateStr === new Date().toISOString().split('T')[0],
          isWeekend: d.getDay() === 0 || d.getDay() === 6,
        });
      }

      return days;
    }
  },

  generateDateRange(view: CalendarView, currentDate: string): CalendarRange {
    const date = new Date(currentDate);

    switch (view) {
      case CalendarView.DAY:
        return {
          startDate: currentDate,
          endDate: currentDate,
        };

      case CalendarView.WEEK: {
        const dayOfWeek = date.getDay();
        const start = new Date(date);
        start.setDate(date.getDate() - dayOfWeek);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        };
      }

      case CalendarView.MONTH: {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        };
      }
    }
  },
};
