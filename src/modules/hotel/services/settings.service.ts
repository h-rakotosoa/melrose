import { httpContract } from '@app/contracts/http.contract';
import {
  HotelSettings,
  UpdateHotelSettingsInput,
} from '../types/settings.types';
import { RoomType, ReservationSource, ExtraType } from '../types/enums';

let mockSettings: HotelSettings = {
  id: '1',
  hotelId: '1',
  hotelName: 'Melrose Hotel',
  timezone: 'America/New_York',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  currency: 'USD',
  taxRate: 10,
  availableSources: [
    { source: ReservationSource.EMAIL, name: 'Email', enabled: true },
    { source: ReservationSource.PHONE, name: 'Phone', enabled: true },
    { source: ReservationSource.BOOKING, name: 'Booking.com', enabled: true },
    { source: ReservationSource.AIRBNB, name: 'Airbnb', enabled: true },
    { source: ReservationSource.DIRECT, name: 'Direct', enabled: true },
    { source: ReservationSource.OTHER, name: 'Other', enabled: true },
  ],
  availableRoomTypes: [
    { type: RoomType.STANDARD, name: 'Standard', enabled: true },
    { type: RoomType.SUITE, name: 'Suite', enabled: true },
    { type: RoomType.DELUXE, name: 'Deluxe', enabled: true },
    { type: RoomType.FAMILY, name: 'Family', enabled: true },
    { type: RoomType.EXECUTIVE, name: 'Executive', enabled: true },
    { type: RoomType.PENTHOUSE, name: 'Penthouse', enabled: false },
  ],
  availableExtras: [
    {
      type: ExtraType.BREAKFAST,
      name: 'Breakfast',
      defaultPrice: 15,
      enabled: true,
    },
    {
      type: ExtraType.AIRPORT_TRANSFER_IN,
      name: 'Airport Transfer (Arrival)',
      defaultPrice: 50,
      enabled: true,
    },
    {
      type: ExtraType.AIRPORT_TRANSFER_OUT,
      name: 'Airport Transfer (Departure)',
      defaultPrice: 50,
      enabled: true,
    },
    {
      type: ExtraType.LAUNDRY,
      name: 'Laundry Service',
      defaultPrice: 20,
      enabled: true,
    },
    {
      type: ExtraType.DRINKS,
      name: 'Drinks Package',
      defaultPrice: 30,
      enabled: true,
    },
    {
      type: ExtraType.EXTRA,
      name: 'Other Extras',
      defaultPrice: 0,
      enabled: true,
    },
  ],
  notificationSettings: {
    emailEnabled: true,
    smsEnabled: false,
    whatsappEnabled: false,
    upcomingArrivalsDays: 3,
  },
  updatedAt: new Date().toISOString(),
  updatedBy: '1',
};

export const settingsService = {
  async getSettings(): Promise<HotelSettings> {
    try {
      const response = await httpContract.client.get<HotelSettings>(
        '/hotel/settings'
      );
      return response.data;
    } catch (error) {
      console.log('Using mock data for settings');
      return mockSettings;
    }
  },

  async updateSettings(data: UpdateHotelSettingsInput): Promise<HotelSettings> {
    try {
      const response = await httpContract.client.put<HotelSettings>(
        '/hotel/settings',
        data
      );
      return response.data;
    } catch (error) {
      mockSettings = {
        ...mockSettings,
        ...data,
        notificationSettings: {
          ...mockSettings.notificationSettings,
          ...data.notificationSettings,
        },
        updatedAt: new Date().toISOString(),
        updatedBy: '1',
      };
      return mockSettings;
    }
  },
};
