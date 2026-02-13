import { RoomStatus, ReservationStatus, PaymentStatus, HousekeepingStatus } from '../types/enums';
import clsx from 'clsx';

interface StatusPillProps {
  status: RoomStatus | ReservationStatus | PaymentStatus | HousekeepingStatus;
  type: 'room' | 'reservation' | 'payment' | 'housekeeping';
}

const statusConfig = {
  room: {
    free: { label: 'Libre', color: 'bg-green-100 text-green-800' },
    reserved: { label: 'Réservée', color: 'bg-blue-100 text-blue-800' },
    occupied: { label: 'Occupée', color: 'bg-amber-100 text-amber-800' },
    cleaning: { label: 'Nettoyage', color: 'bg-cyan-100 text-cyan-800' },
    maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-800' },
    out_of_service: { label: 'Hors service', color: 'bg-red-100 text-red-800' },
  },
  reservation: {
    pending: { label: 'En attente', color: 'bg-gray-100 text-gray-800' },
    confirmed: { label: 'Confirmée', color: 'bg-green-100 text-green-800' },
    checked_in: { label: 'Check-in', color: 'bg-blue-100 text-blue-800' },
    checked_out: { label: 'Check-out', color: 'bg-slate-100 text-slate-800' },
    cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
    no_show: { label: 'No-show', color: 'bg-orange-100 text-orange-800' },
  },
  payment: {
    unpaid: { label: 'Non payé', color: 'bg-red-100 text-red-800' },
    deposit: { label: 'Acompte', color: 'bg-amber-100 text-amber-800' },
    paid: { label: 'Payé', color: 'bg-green-100 text-green-800' },
    pay_on_arrival: { label: 'Paiement sur place', color: 'bg-blue-100 text-blue-800' },
  },
  housekeeping: {
    to_clean: { label: 'À nettoyer', color: 'bg-red-100 text-red-800' },
    cleaning: { label: 'En cours', color: 'bg-amber-100 text-amber-800' },
    cleaned: { label: 'Nettoyée', color: 'bg-blue-100 text-blue-800' },
    inspected: { label: 'Inspectée', color: 'bg-green-100 text-green-800' },
  },
};

export const StatusPill = ({ status, type }: StatusPillProps) => {
  let config: { label: string; color: string } | undefined;

  const statusStr = status as string;
  const typeConfig = statusConfig[type] as Record<string, { label: string; color: string }>;

  if (typeConfig && typeConfig[statusStr]) {
    config = typeConfig[statusStr];
  }

  if (!config) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {status}
      </span>
    );
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.color
      )}
    >
      {config.label}
    </span>
  );
};
