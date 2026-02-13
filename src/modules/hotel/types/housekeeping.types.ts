import { HousekeepingStatus, RoomStatus } from './enums';

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNumber: string;
  floor: number;
  building?: string;
  status: HousekeepingStatus;
  roomStatus: RoomStatus;
  assignedTo?: string;
  assignedToName?: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  startedAt?: string;
  completedAt?: string;
  inspectedAt?: string;
  inspectedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateHousekeepingTaskInput {
  status?: HousekeepingStatus;
  assignedTo?: string;
  notes?: string;
}

export interface HousekeepingStats {
  toClean: number;
  cleaning: number;
  cleaned: number;
  inspected: number;
  total: number;
}
