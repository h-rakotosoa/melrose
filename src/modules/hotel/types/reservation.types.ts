import { ReservationStatus, PaymentStatus, ReservationSource, ExtraType } from './enums';

export interface Guest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationality?: string;
  documentId?: string;
}

export interface ReservationExtra {
  id: string;
  type: ExtraType;
  quantity: number;
  date: string;
  time?: string;
  price: number;
  notes?: string;
}

export interface AuditEntry {
  action: string;
  timestamp: string;
  userId: string;
  userName: string;
  changes?: Record<string, unknown>;
}

export interface Reservation {
  id: string;
  hotelId: string;
  guest: Guest;
  roomId: string;
  roomNumber?: string;
  adults: number;
  children: number;
  source: ReservationSource;
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  extras: ReservationExtra[];
  totalAmount: number;
  paidAmount: number;
  notesInternal?: string;
  notesGuest?: string;
  auditTrail: AuditEntry[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateReservationInput {
  guest: Guest;
  roomId: string;
  adults: number;
  children: number;
  source: ReservationSource;
  checkInDate: string;
  checkOutDate: string;
  paymentStatus?: PaymentStatus;
  extras?: Omit<ReservationExtra, 'id'>[];
  notesInternal?: string;
  notesGuest?: string;
}

export interface UpdateReservationInput {
  guest?: Partial<Guest>;
  roomId?: string;
  adults?: number;
  children?: number;
  source?: ReservationSource;
  checkInDate?: string;
  checkOutDate?: string;
  status?: ReservationStatus;
  paymentStatus?: PaymentStatus;
  paidAmount?: number;
  notesInternal?: string;
  notesGuest?: string;
  extras?: ReservationExtra[];
}

export interface ReservationFilters {
  status?: ReservationStatus;
  paymentStatus?: PaymentStatus;
  source?: ReservationSource;
  roomId?: string;
  checkInFrom?: string;
  checkInTo?: string;
  checkOutFrom?: string;
  checkOutTo?: string;
  search?: string;
}

export interface AvailabilityCheck {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  excludeReservationId?: string;
}

export interface AvailabilityResult {
  available: boolean;
  conflictingReservations?: Reservation[];
}
