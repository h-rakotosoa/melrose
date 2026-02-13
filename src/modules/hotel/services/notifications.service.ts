import { httpContract } from '@app/contracts/http.contract';
import { Reservation } from '../types/reservation.types';
import { reservationsService } from './reservations.service';
import { ReservationStatus } from '../types/enums';

export interface UpcomingArrival {
  reservation: Reservation;
  daysUntilArrival: number;
}

export const notificationsService = {
  async getUpcomingArrivals(daysAhead: number = 3): Promise<UpcomingArrival[]> {
    try {
      const response = await httpContract.client.get<UpcomingArrival[]>(
        `/hotel/notifications/upcoming-arrivals?daysAhead=${daysAhead}`
      );
      return response.data;
    } catch (error) {
      const reservations = await reservationsService.getReservations();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming: UpcomingArrival[] = [];

      for (const reservation of reservations) {
        if (
          reservation.status !== ReservationStatus.CONFIRMED &&
          reservation.status !== ReservationStatus.PENDING
        ) {
          continue;
        }

        const checkInDate = new Date(reservation.checkInDate);
        checkInDate.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor(
          (checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff >= 0 && daysDiff <= daysAhead) {
          upcoming.push({
            reservation,
            daysUntilArrival: daysDiff,
          });
        }
      }

      upcoming.sort((a, b) => a.daysUntilArrival - b.daysUntilArrival);
      return upcoming;
    }
  },

  async sendArrivalReminder(reservationId: string): Promise<void> {
    try {
      await httpContract.client.post(
        `/hotel/notifications/send-arrival-reminder/${reservationId}`
      );
    } catch (error) {
      console.log(`Mock: Sending arrival reminder for reservation ${reservationId}`);
    }
  },
};
