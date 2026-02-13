import { RoomType, ReservationSource, ExtraType } from './enums';

export interface ExtraConfig {
  type: ExtraType;
  name: string;
  defaultPrice: number;
  enabled: boolean;
}

export interface RoomTypeConfig {
  type: RoomType;
  name: string;
  enabled: boolean;
}

export interface SourceConfig {
  source: ReservationSource;
  name: string;
  enabled: boolean;
}

export interface HotelSettings {
  id: string;
  hotelId: string;
  hotelName: string;
  timezone: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
  taxRate: number;
  availableSources: SourceConfig[];
  availableRoomTypes: RoomTypeConfig[];
  availableExtras: ExtraConfig[];
  notificationSettings: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    whatsappEnabled: boolean;
    upcomingArrivalsDays: number;
  };
  updatedAt: string;
  updatedBy: string;
}

export interface UpdateHotelSettingsInput {
  hotelName?: string;
  timezone?: string;
  checkInTime?: string;
  checkOutTime?: string;
  currency?: string;
  taxRate?: number;
  availableSources?: SourceConfig[];
  availableRoomTypes?: RoomTypeConfig[];
  availableExtras?: ExtraConfig[];
  notificationSettings?: Partial<HotelSettings['notificationSettings']>;
}
