import { DataTable } from '@app/contracts/ui.contract';
import { Room } from '../../../types/room.types';
import { StatusPill } from '../../../components/StatusPill';
import { RoomCapacityBadge } from '../../../components/RoomCapacityBadge';
import { Edit2, Trash2, Ban } from 'lucide-react';

interface RoomsTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onBlock: (room: Room) => void;
}

export const RoomsTable = ({
  rooms,
  onEdit,
  onDelete,
  onBlock,
}: RoomsTableProps) => {
  return (
    <DataTable
      data={rooms}
      columns={[
        {
          key: 'number',
          label: 'N° Chambre',
          render: (_value, room: Room) => (
            <div>
              <div className="font-medium text-gray-900">{room.number}</div>
              <div className="text-xs text-gray-500">
                Étage {room.floor}
                {room.building && ` - ${room.building}`}
              </div>
            </div>
          ),
        },
        {
          key: 'type',
          label: 'Type',
          render: (_value, room: Room) => (
            <span className="capitalize text-sm text-gray-700">{room.type}</span>
          ),
        },
        {
          key: 'capacity',
          label: 'Capacité',
          render: (_value, room: Room) => (
            <RoomCapacityBadge
              adults={room.capacityAdults}
              children={room.capacityChildren}
            />
          ),
        },
        {
          key: 'pricing',
          label: 'Prix Nuit',
          render: (_value, room: Room) => (
            <div className="text-sm font-medium text-gray-900">
              ${room.pricing.nightlyPrice}
            </div>
          ),
        },
        {
          key: 'status',
          label: 'Statut',
          render: (_value, room: Room) => (
            <div className="flex flex-col gap-1">
              <StatusPill status={room.status} type="room" />
              <StatusPill status={room.housekeepingStatus} type="housekeeping" />
            </div>
          ),
        },
        {
          key: 'actions',
          label: 'Actions',
          render: (_value, room: Room) => (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(room)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Modifier"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onBlock(room)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                title="Bloquer"
              >
                <Ban className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(room)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        },
      ]}
      keyExtractor={(room) => room.id}
      mobileVariant="cards"
    />
  );
};
