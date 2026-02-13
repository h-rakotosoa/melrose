import { RoomFilters } from '../../../types/room.types';
import { RoomStatus, RoomType, HousekeepingStatus } from '../../../types/enums';

interface RoomsFiltersProps {
  filters: RoomFilters;
  onFiltersChange: (filters: RoomFilters) => void;
}

export const RoomsFiltersComponent = ({ filters, onFiltersChange }: RoomsFiltersProps) => {
  return (
    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value as RoomStatus || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {Object.values(RoomStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, type: e.target.value as RoomType || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {Object.values(RoomType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Étage
          </label>
          <input
            type="number"
            placeholder="Tous"
            value={filters.floor || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, floor: e.target.value ? parseInt(e.target.value) : undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Housekeeping
          </label>
          <select
            value={filters.housekeepingStatus || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, housekeepingStatus: e.target.value as HousekeepingStatus || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {Object.values(HousekeepingStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
