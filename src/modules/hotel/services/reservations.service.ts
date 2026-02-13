import { httpContract } from '@app/contracts/http.contract';
import {
  Reservation,
  CreateReservationInput,
  UpdateReservationInput,
  ReservationFilters,
  AvailabilityCheck,
  AvailabilityResult,
  ReservationExtra,
} from '../types/reservation.types';
import { ReservationStatus, PaymentStatus, ExtraType, ReservationSource } from '../types/enums';

let mockReservations: Reservation[] = [
  {
    id: '1',
    hotelId: '1',
    guest: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      nationality: 'US',
    },
    roomId: '2',
    roomNumber: '102',
    adults: 2,
    children: 1,
    source: ReservationSource.BOOKING,
    checkInDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    status: ReservationStatus.CONFIRMED,
    paymentStatus: PaymentStatus.DEPOSIT,
    extras: [
      {
        id: '1',
        type: ExtraType.BREAKFAST,
        quantity: 2,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        price: 15,
      },
    ],
    totalAmount: 450,
    paidAmount: 150,
    notesInternal: 'VIP client',
    auditTrail: [
      {
        action: 'Created',
        timestamp: new Date().toISOString(),
        userId: '1',
        userName: 'System User',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
    updatedBy: '1',
  },
  {
    id: '2',
    hotelId: '1',
    guest: {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1987654321',
      email: 'jane.smith@example.com',
    },
    roomId: '3',
    roomNumber: '201',
    adults: 1,
    children: 0,
    source: ReservationSource.EMAIL,
    checkInDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    status: ReservationStatus.CHECKED_IN,
    paymentStatus: PaymentStatus.PAID,
    extras: [],
    totalAmount: 240,
    paidAmount: 240,
    auditTrail: [
      {
        action: 'Created',
        timestamp: new Date().toISOString(),
        userId: '1',
        userName: 'System User',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
    updatedBy: '1',
  },
];

export const reservationsService = {
  async getReservations(filters?: ReservationFilters): Promise<Reservation[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
      if (filters?.source) params.append('source', filters.source);
      if (filters?.roomId) params.append('roomId', filters.roomId);
      if (filters?.checkInFrom) params.append('checkInFrom', filters.checkInFrom);
      if (filters?.checkInTo) params.append('checkInTo', filters.checkInTo);
      if (filters?.checkOutFrom) params.append('checkOutFrom', filters.checkOutFrom);
      if (filters?.checkOutTo) params.append('checkOutTo', filters.checkOutTo);
      if (filters?.search) params.append('search', filters.search);

      const response = await httpContract.client.get<Reservation[]>(
        `/hotel/reservations?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.log('Using mock data for reservations');
      let filtered = [...mockReservations];

      if (filters?.status) {
        filtered = filtered.filter((r) => r.status === filters.status);
      }
      if (filters?.paymentStatus) {
        filtered = filtered.filter((r) => r.paymentStatus === filters.paymentStatus);
      }
      if (filters?.source) {
        filtered = filtered.filter((r) => r.source === filters.source);
      }
      if (filters?.roomId) {
        filtered = filtered.filter((r) => r.roomId === filters.roomId);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.guest.firstName.toLowerCase().includes(search) ||
            r.guest.lastName.toLowerCase().includes(search) ||
            r.guest.email.toLowerCase().includes(search) ||
            (r.roomNumber && r.roomNumber.toLowerCase().includes(search))
        );
      }

      return filtered;
    }
  },

  async getReservation(id: string): Promise<Reservation> {
    try {
      const response = await httpContract.client.get<Reservation>(
        `/hotel/reservations/${id}`
      );
      return response.data;
    } catch (error) {
      const reservation = mockReservations.find((r) => r.id === id);
      if (!reservation) throw new Error('Reservation not found');
      return reservation;
    }
  },

  async createReservation(data: CreateReservationInput): Promise<Reservation> {
    try {
      const response = await httpContract.client.post<Reservation>(
        '/hotel/reservations',
        data
      );
      return response.data;
    } catch (error) {
      const newReservation: Reservation = {
        id: (mockReservations.length + 1).toString(),
        hotelId: '1',
        ...data,
        status: ReservationStatus.PENDING,
        paymentStatus: data.paymentStatus || PaymentStatus.UNPAID,
        extras: data.extras?.map((e, i) => ({ ...e, id: `${i + 1}` })) || [],
        totalAmount: 0,
        paidAmount: 0,
        auditTrail: [
          {
            action: 'Created',
            timestamp: new Date().toISOString(),
            userId: '1',
            userName: 'System User',
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '1',
        updatedBy: '1',
      };
      mockReservations.push(newReservation);
      return newReservation;
    }
  },

  async updateReservation(
    id: string,
    data: UpdateReservationInput
  ): Promise<Reservation> {
    try {
      const response = await httpContract.client.put<Reservation>(
        `/hotel/reservations/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const index = mockReservations.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Reservation not found');

      mockReservations[index] = {
        ...mockReservations[index],
        ...data,
        guest: { ...mockReservations[index].guest, ...data.guest },
        updatedAt: new Date().toISOString(),
        updatedBy: '1',
      };

      mockReservations[index].auditTrail.push({
        action: 'Updated',
        timestamp: new Date().toISOString(),
        userId: '1',
        userName: 'System User',
        changes: data as Record<string, unknown>,
      });

      return mockReservations[index];
    }
  },

  async checkAvailability(check: AvailabilityCheck): Promise<AvailabilityResult> {
    try {
      const response = await httpContract.client.post<AvailabilityResult>(
        '/hotel/reservations/check-availability',
        check
      );
      return response.data;
    } catch (error) {
      const conflicts = mockReservations.filter((r) => {
        if (check.excludeReservationId && r.id === check.excludeReservationId) {
          return false;
        }
        if (r.roomId !== check.roomId) return false;
        if (r.status === ReservationStatus.CANCELLED || r.status === ReservationStatus.NO_SHOW) {
          return false;
        }

        const checkIn = new Date(check.checkInDate);
        const checkOut = new Date(check.checkOutDate);
        const resCheckIn = new Date(r.checkInDate);
        const resCheckOut = new Date(r.checkOutDate);

        return !(checkOut <= resCheckIn || checkIn >= resCheckOut);
      });

      return {
        available: conflicts.length === 0,
        conflictingReservations: conflicts.length > 0 ? conflicts : undefined,
      };
    }
  },

  async addExtra(reservationId: string, extra: Omit<ReservationExtra, 'id'>): Promise<Reservation> {
    try {
      const response = await httpContract.client.post<Reservation>(
        `/hotel/reservations/${reservationId}/extras`,
        extra
      );
      return response.data;
    } catch (error) {
      const index = mockReservations.findIndex((r) => r.id === reservationId);
      if (index === -1) throw new Error('Reservation not found');

      const newExtra: ReservationExtra = {
        ...extra,
        id: (mockReservations[index].extras.length + 1).toString(),
      };

      mockReservations[index] = {
        ...mockReservations[index],
        extras: [...mockReservations[index].extras, newExtra],
        updatedAt: new Date().toISOString(),
      };

      return mockReservations[index];
    }
  },

  async removeExtra(reservationId: string, extraId: string): Promise<Reservation> {
    try {
      const response = await httpContract.client.delete<Reservation>(
        `/hotel/reservations/${reservationId}/extras/${extraId}`
      );
      return response.data;
    } catch (error) {
      const index = mockReservations.findIndex((r) => r.id === reservationId);
      if (index === -1) throw new Error('Reservation not found');

      mockReservations[index] = {
        ...mockReservations[index],
        extras: mockReservations[index].extras.filter((e) => e.id !== extraId),
        updatedAt: new Date().toISOString(),
      };

      return mockReservations[index];
    }
  },

  async deleteReservation(id: string): Promise<void> {
    try {
      await httpContract.client.delete(`/hotel/reservations/${id}`);
    } catch (error) {
      const index = mockReservations.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Reservation not found');
      mockReservations.splice(index, 1);
    }
  },
};
