import { DataTable } from '@app/contracts/ui.contract';
import { Reservation } from '../../../types/reservation.types';
import { StatusPill } from '../../../components/StatusPill';
import { RoomCapacityBadge } from '../../../components/RoomCapacityBadge';
import { Edit2, Trash2, CheckSquare, XSquare } from 'lucide-react';

interface ReservationsTableProps {
  reservations: Reservation[];
  onEdit: (reservation: Reservation) => void;
  onCancel: (reservation: Reservation) => void;
  onCheckIn: (reservation: Reservation) => void;
  onCheckOut: (reservation: Reservation) => void;
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR');
};

export const ReservationsTable = ({
  reservations,
  onEdit,
  onCancel,
  onCheckIn,
  onCheckOut,
}: ReservationsTableProps) => {
  return (
    <DataTable
      data={reservations}
      columns={[
        {
          key: 'guest',
          label: 'Client',
          render: (_value, res: Reservation) => (
            <div>
              <div className="font-medium text-gray-900">
                {res.guest.firstName} {res.guest.lastName}
              </div>
              <div className="text-xs text-gray-500">{res.guest.email}</div>
            </div>
          ),
        },
        {
          key: 'roomNumber',
          label: 'Chambre',
          render: (_value, res: Reservation) => (
            <div className="font-medium text-gray-900">{res.roomNumber || 'TBD'}</div>
          ),
        },
        {
          key: 'dates',
          label: 'Dates',
          render: (_value, res: Reservation) => (
            <div className="text-sm">
              <div>{formatDate(res.checkInDate)}</div>
              <div className="text-gray-500">→ {formatDate(res.checkOutDate)}</div>
            </div>
          ),
        },
        {
          key: 'capacity',
          label: 'Pers.',
          render: (_value, res: Reservation) => (
            <RoomCapacityBadge adults={res.adults} children={res.children} />
          ),
        },
        {
          key: 'status',
          label: 'Statut',
          render: (_value, res: Reservation) => (
            <div className="flex flex-col gap-1">
              <StatusPill status={res.status} type="reservation" />
              <StatusPill status={res.paymentStatus} type="payment" />
            </div>
          ),
        },
        {
          key: 'amount',
          label: 'Montant',
          render: (_value, res: Reservation) => (
            <div className="text-sm">
              <div className="font-semibold text-gray-900">${res.totalAmount}</div>
              <div className="text-gray-500">Payé: ${res.paidAmount}</div>
            </div>
          ),
        },
        {
          key: 'actions',
          label: 'Actions',
          render: (_value, res: Reservation) => (
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(res)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Modifier"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              {res.status === 'confirmed' && (
                <button
                  onClick={() => onCheckIn(res)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                  title="Check-in"
                >
                  <CheckSquare className="h-4 w-4" />
                </button>
              )}
              {res.status === 'checked_in' && (
                <button
                  onClick={() => onCheckOut(res)}
                  className="p-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                  title="Check-out"
                >
                  <XSquare className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => onCancel(res)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Annuler"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        },
      ]}
      keyExtractor={(res) => res.id}
      mobileVariant="cards"
    />
  );
};
