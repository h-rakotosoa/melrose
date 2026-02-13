export enum RoomType {
  STANDARD = 'standard',
  DELUXE = 'deluxe',
  SUITE = 'suite',
  FAMILY = 'family',
  EXECUTIVE = 'executive',
  PENTHOUSE = 'penthouse',
}

export enum BedType {
  SINGLE = 'single',
  DOUBLE = 'double',
  QUEEN = 'queen',
  KING = 'king',
  TWIN = 'twin',
  BUNK = 'bunk',
}

export enum RoomStatus {
  FREE = 'free',
  RESERVED = 'reserved',
  OCCUPIED = 'occupied',
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
}

export enum HousekeepingStatus {
  TO_CLEAN = 'to_clean',
  CLEANING = 'cleaning',
  CLEANED = 'cleaned',
  INSPECTED = 'inspected',
}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  DEPOSIT = 'deposit',
  PAID = 'paid',
  PAY_ON_ARRIVAL = 'pay_on_arrival',
}

export enum ReservationSource {
  EMAIL = 'email',
  PHONE = 'phone',
  BOOKING = 'booking',
  AIRBNB = 'airbnb',
  DIRECT = 'direct',
  OTHER = 'other',
}

export enum ExtraType {
  BREAKFAST = 'breakfast',
  AIRPORT_TRANSFER_IN = 'airport_transfer_in',
  AIRPORT_TRANSFER_OUT = 'airport_transfer_out',
  LAUNDRY = 'laundry',
  DRINKS = 'drinks',
  EXTRA = 'extra',
}

export enum UserRole {
  ADMIN = 'admin',
  RECEPTION = 'reception',
  HOUSEKEEPING = 'housekeeping',
  MANAGER = 'manager',
}
