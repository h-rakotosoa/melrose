import { httpContract } from '@app/contracts/http.contract';
import {
  HousekeepingTask,
  UpdateHousekeepingTaskInput,
  HousekeepingStats,
} from '../types/housekeeping.types';
import { HousekeepingStatus, RoomStatus } from '../types/enums';

let mockTasks: HousekeepingTask[] = [
  {
    id: '1',
    roomId: '3',
    roomNumber: '201',
    floor: 2,
    status: HousekeepingStatus.TO_CLEAN,
    roomStatus: RoomStatus.OCCUPIED,
    priority: 'high',
    notes: 'Guest checked out this morning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    roomId: '4',
    roomNumber: '202',
    floor: 2,
    status: HousekeepingStatus.CLEANING,
    roomStatus: RoomStatus.CLEANING,
    assignedTo: '1',
    assignedToName: 'Maria Garcia',
    priority: 'medium',
    startedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    roomId: '2',
    roomNumber: '102',
    floor: 1,
    status: HousekeepingStatus.CLEANED,
    roomStatus: RoomStatus.RESERVED,
    assignedTo: '1',
    assignedToName: 'Maria Garcia',
    priority: 'high',
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const housekeepingService = {
  async getTasks(): Promise<HousekeepingTask[]> {
    try {
      const response = await httpContract.client.get<HousekeepingTask[]>(
        '/hotel/housekeeping/tasks'
      );
      return response.data;
    } catch (error) {
      console.log('Using mock data for housekeeping tasks');
      return mockTasks;
    }
  },

  async getTask(id: string): Promise<HousekeepingTask> {
    try {
      const response = await httpContract.client.get<HousekeepingTask>(
        `/hotel/housekeeping/tasks/${id}`
      );
      return response.data;
    } catch (error) {
      const task = mockTasks.find((t) => t.id === id);
      if (!task) throw new Error('Task not found');
      return task;
    }
  },

  async updateTask(
    id: string,
    data: UpdateHousekeepingTaskInput
  ): Promise<HousekeepingTask> {
    try {
      const response = await httpContract.client.put<HousekeepingTask>(
        `/hotel/housekeeping/tasks/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const index = mockTasks.findIndex((t) => t.id === id);
      if (index === -1) throw new Error('Task not found');

      const now = new Date().toISOString();
      const updates: Partial<HousekeepingTask> = {
        ...data,
        updatedAt: now,
      };

      if (data.status === HousekeepingStatus.CLEANING && !mockTasks[index].startedAt) {
        updates.startedAt = now;
      }
      if (data.status === HousekeepingStatus.CLEANED && !mockTasks[index].completedAt) {
        updates.completedAt = now;
      }
      if (data.status === HousekeepingStatus.INSPECTED && !mockTasks[index].inspectedAt) {
        updates.inspectedAt = now;
        updates.inspectedBy = '1';
      }

      mockTasks[index] = { ...mockTasks[index], ...updates };
      return mockTasks[index];
    }
  },

  async getStats(): Promise<HousekeepingStats> {
    try {
      const response = await httpContract.client.get<HousekeepingStats>(
        '/hotel/housekeeping/stats'
      );
      return response.data;
    } catch (error) {
      const tasks = await this.getTasks();
      return {
        toClean: tasks.filter((t) => t.status === HousekeepingStatus.TO_CLEAN).length,
        cleaning: tasks.filter((t) => t.status === HousekeepingStatus.CLEANING).length,
        cleaned: tasks.filter((t) => t.status === HousekeepingStatus.CLEANED).length,
        inspected: tasks.filter((t) => t.status === HousekeepingStatus.INSPECTED).length,
        total: tasks.length,
      };
    }
  },
};
