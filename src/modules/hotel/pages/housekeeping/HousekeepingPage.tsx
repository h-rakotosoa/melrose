import { useEffect, useState } from 'react';
import { Card, Loader } from '@app/contracts/ui.contract';
import { HousekeepingToolbar } from './components/HousekeepingToolbar';
import { HousekeepingList } from './components/HousekeepingList';
import { housekeepingService } from '../../services/housekeeping.service';
import {
  HousekeepingTask,
  HousekeepingStats,
} from '../../types/housekeeping.types';
import { HousekeepingStatus } from '../../types/enums';

export const HousekeepingPage = () => {
  const [tasks, setTasks] = useState<HousekeepingTask[]>([]);
  const [stats, setStats] = useState<HousekeepingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [tasksData, statsData] = await Promise.all([
        housekeepingService.getTasks(),
        housekeepingService.getStats(),
      ]);
      setTasks(tasksData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load housekeeping data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadData();
  };

  const handleUpdateStatus = async (
    taskId: string,
    status: HousekeepingStatus
  ) => {
    try {
      await housekeepingService.updateTask(taskId, { status });
      await loadData();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div>
      <HousekeepingToolbar
        onRefresh={handleRefresh}
        isRefreshing={isLoading}
        stats={stats}
      />

      <Card>
        {isLoading ? (
          <Loader />
        ) : (
          <HousekeepingList tasks={tasks} onUpdateStatus={handleUpdateStatus} />
        )}
      </Card>
    </div>
  );
};
