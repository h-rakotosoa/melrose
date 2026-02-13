import { RoomType, BedType, RoomStatus, HousekeepingStatus } from './enums';

export interface RoomFeatures {
  airConditioning: boolean;
  fan: boolean;
  seaView: boolean;
  balcony: boolean;
  minibar: boolean;
  safe: boolean;
  tv: boolean;
  wifi: boolean;
}

export interface RoomPricing {
  dayUsePrice: number;
  nightlyPrice: number;
  weekendPrice?: number;
}

export interface OutOfOrderPeriod {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  floor: number;
  building?: string;
  type: RoomType;
  capacityAdults: number;
  capacityChildren: number;
  bedType: BedType;
  features: RoomFeatures;
  pricing: RoomPricing;
  taxesIncluded: boolean;
  status: RoomStatus;
  housekeepingStatus: HousekeepingStatus;
  outOfOrderPeriod?: OutOfOrderPeriod;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  number: string;
  floor: number;
  building?: string;
  type: RoomType;
  capacityAdults: number;
  capacityChildren: number;
  bedType: BedType;
  features: Partial<RoomFeatures>;
  pricing: RoomPricing;
  taxesIncluded?: boolean;
  photos?: string[];
}

export interface UpdateRoomInput {
  number?: string;
  floor?: number;
  building?: string;
  type?: RoomType;
  capacityAdults?: number;
  capacityChildren?: number;
  bedType?: BedType;
  features?: Partial<RoomFeatures>;
  pricing?: Partial<RoomPricing>;
  taxesIncluded?: boolean;
  status?: RoomStatus;
  housekeepingStatus?: HousekeepingStatus;
  outOfOrderPeriod?: OutOfOrderPeriod | null;
  photos?: string[];
}

export interface RoomFilters {
  status?: RoomStatus;
  type?: RoomType;
  floor?: number;
  building?: string;
  housekeepingStatus?: HousekeepingStatus;
  search?: string;
}
