import { Button } from '@app/contracts/ui.contract';
import { RefreshCw } from 'lucide-react';
import { HousekeepingStats } from '../../../types/housekeeping.types';

interface HousekeepingToolbarProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  stats: HousekeepingStats | null;
}

export const HousekeepingToolbar = ({
  onRefresh,
  isRefreshing,
  stats,
}: HousekeepingToolbarProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Housekeeping</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gérer le nettoyage des chambres
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{stats.toClean}</div>
            <div className="text-sm text-red-800">À nettoyer</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-600">{stats.cleaning}</div>
            <div className="text-sm text-amber-800">En cours</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.cleaned}</div>
            <div className="text-sm text-blue-800">Nettoyées</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stats.inspected}</div>
            <div className="text-sm text-green-800">Inspectées</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.total}</div>
            <div className="text-sm text-gray-800">Total</div>
          </div>
        </div>
      )}
    </div>
  );
};
