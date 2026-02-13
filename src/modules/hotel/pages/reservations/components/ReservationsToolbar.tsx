import { Button } from '@app/contracts/ui.contract';
import { Plus, RefreshCw } from 'lucide-react';

interface ReservationsToolbarProps {
  onRefresh: () => void;
  onAdd: () => void;
  isRefreshing?: boolean;
}

export const ReservationsToolbar = ({ onRefresh, onAdd, isRefreshing }: ReservationsToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
        <p className="text-sm text-gray-600 mt-1">Gérer les réservations de l'hôtel</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>
    </div>
  );
};
