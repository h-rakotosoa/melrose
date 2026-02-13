import { ReservationFilters } from '../../../types/reservation.types';
import { ReservationStatus, PaymentStatus, ReservationSource } from '../../../types/enums';

interface ReservationsFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
}

export const ReservationsFiltersComponent = ({ filters, onFiltersChange }: ReservationsFiltersProps) => {
  return (
    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value as ReservationStatus || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {Object.values(ReservationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paiement
          </label>
          <select
            value={filters.paymentStatus || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, paymentStatus: e.target.value as PaymentStatus || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {Object.values(PaymentStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            value={filters.source || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, source: e.target.value as ReservationSource || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes</option>
            {Object.values(ReservationSource).map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
