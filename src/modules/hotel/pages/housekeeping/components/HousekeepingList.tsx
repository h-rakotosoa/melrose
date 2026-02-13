import { HousekeepingTask } from '../../../types/housekeeping.types';
import { HousekeepingStatus } from '../../../types/enums';
import { StatusPill } from '../../../components/StatusPill';
import { Button } from '@app/contracts/ui.contract';

interface HousekeepingListProps {
  tasks: HousekeepingTask[];
  onUpdateStatus: (taskId: string, status: HousekeepingStatus) => void;
}

export const HousekeepingList = ({ tasks, onUpdateStatus }: HousekeepingListProps) => {
  const getNextStatus = (currentStatus: HousekeepingStatus): HousekeepingStatus | null => {
    switch (currentStatus) {
      case HousekeepingStatus.TO_CLEAN:
        return HousekeepingStatus.CLEANING;
      case HousekeepingStatus.CLEANING:
        return HousekeepingStatus.CLEANED;
      case HousekeepingStatus.CLEANED:
        return HousekeepingStatus.INSPECTED;
      default:
        return null;
    }
  };

  const getButtonText = (status: HousekeepingStatus): string => {
    switch (status) {
      case HousekeepingStatus.TO_CLEAN:
        return 'Commencer';
      case HousekeepingStatus.CLEANING:
        return 'Marquer nettoyé';
      case HousekeepingStatus.CLEANED:
        return 'Inspecter';
      default:
        return '';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Aucune tâche de nettoyage
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => {
        const nextStatus = getNextStatus(task.status);
        return (
          <div
            key={task.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Chambre {task.roomNumber}
                  </h3>
                  <StatusPill status={task.status} type="housekeeping" />
                  <StatusPill status={task.roomStatus} type="room" />
                </div>
                <div className="text-sm text-gray-600">
                  Étage {task.floor}
                  {task.building && ` - ${task.building}`}
                </div>
                {task.assignedToName && (
                  <div className="text-sm text-gray-600 mt-1">
                    Assigné à: {task.assignedToName}
                  </div>
                )}
                {task.notes && (
                  <div className="text-sm text-gray-600 mt-1">
                    Note: {task.notes}
                  </div>
                )}
              </div>
              {nextStatus && (
                <Button
                  onClick={() => onUpdateStatus(task.id, nextStatus)}
                  size="lg"
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  {getButtonText(task.status)}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
