import { httpContract } from '@app/contracts/http.contract';
import {
  Room,
  CreateRoomInput,
  UpdateRoomInput,
  RoomFilters,
} from '../types/room.types';
import { RoomStatus, HousekeepingStatus, RoomType, BedType } from '../types/enums';

let mockRooms: Room[] = [
  {
    id: '1',
    hotelId: '1',
    number: '101',
    floor: 1,
    type: RoomType.STANDARD,
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: BedType.DOUBLE,
    features: {
      airConditioning: true,
      fan: false,
      seaView: false,
      balcony: false,
      minibar: true,
      safe: true,
      tv: true,
      wifi: true,
    },
    pricing: {
      dayUsePrice: 50,
      nightlyPrice: 80,
      weekendPrice: 100,
    },
    taxesIncluded: false,
    status: RoomStatus.FREE,
    housekeepingStatus: HousekeepingStatus.INSPECTED,
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    hotelId: '1',
    number: '102',
    floor: 1,
    type: RoomType.SUITE,
    capacityAdults: 3,
    capacityChildren: 2,
    bedType: BedType.KING,
    features: {
      airConditioning: true,
      fan: false,
      seaView: true,
      balcony: true,
      minibar: true,
      safe: true,
      tv: true,
      wifi: true,
    },
    pricing: {
      dayUsePrice: 100,
      nightlyPrice: 150,
      weekendPrice: 180,
    },
    taxesIncluded: false,
    status: RoomStatus.RESERVED,
    housekeepingStatus: HousekeepingStatus.CLEANED,
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    hotelId: '1',
    number: '201',
    floor: 2,
    type: RoomType.DELUXE,
    capacityAdults: 2,
    capacityChildren: 1,
    bedType: BedType.QUEEN,
    features: {
      airConditioning: true,
      fan: false,
      seaView: true,
      balcony: true,
      minibar: true,
      safe: true,
      tv: true,
      wifi: true,
    },
    pricing: {
      dayUsePrice: 80,
      nightlyPrice: 120,
      weekendPrice: 140,
    },
    taxesIncluded: false,
    status: RoomStatus.OCCUPIED,
    housekeepingStatus: HousekeepingStatus.TO_CLEAN,
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    hotelId: '1',
    number: '202',
    floor: 2,
    type: RoomType.FAMILY,
    capacityAdults: 4,
    capacityChildren: 3,
    bedType: BedType.TWIN,
    features: {
      airConditioning: true,
      fan: false,
      seaView: false,
      balcony: false,
      minibar: true,
      safe: true,
      tv: true,
      wifi: true,
    },
    pricing: {
      dayUsePrice: 90,
      nightlyPrice: 130,
      weekendPrice: 150,
    },
    taxesIncluded: false,
    status: RoomStatus.CLEANING,
    housekeepingStatus: HousekeepingStatus.CLEANING,
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const roomsService = {
  async getRooms(filters?: RoomFilters): Promise<Room[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.floor) params.append('floor', filters.floor.toString());
      if (filters?.building) params.append('building', filters.building);
      if (filters?.housekeepingStatus) params.append('housekeepingStatus', filters.housekeepingStatus);
      if (filters?.search) params.append('search', filters.search);

      const response = await httpContract.client.get<Room[]>(
        `/hotel/rooms?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.log('Using mock data for rooms');
      let filtered = [...mockRooms];

      if (filters?.status) {
        filtered = filtered.filter((r) => r.status === filters.status);
      }
      if (filters?.type) {
        filtered = filtered.filter((r) => r.type === filters.type);
      }
      if (filters?.floor) {
        filtered = filtered.filter((r) => r.floor === filters.floor);
      }
      if (filters?.building) {
        filtered = filtered.filter((r) => r.building === filters.building);
      }
      if (filters?.housekeepingStatus) {
        filtered = filtered.filter((r) => r.housekeepingStatus === filters.housekeepingStatus);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.number.toLowerCase().includes(search) ||
            r.type.toLowerCase().includes(search)
        );
      }

      return filtered;
    }
  },

  async getRoom(id: string): Promise<Room> {
    try {
      const response = await httpContract.client.get<Room>(`/hotel/rooms/${id}`);
      return response.data;
    } catch (error) {
      const room = mockRooms.find((r) => r.id === id);
      if (!room) throw new Error('Room not found');
      return room;
    }
  },

  async createRoom(data: CreateRoomInput): Promise<Room> {
    try {
      const response = await httpContract.client.post<Room>('/hotel/rooms', data);
      return response.data;
    } catch (error) {
      const newRoom: Room = {
        id: (mockRooms.length + 1).toString(),
        hotelId: '1',
        ...data,
        features: {
          airConditioning: false,
          fan: false,
          seaView: false,
          balcony: false,
          minibar: false,
          safe: false,
          tv: false,
          wifi: false,
          ...data.features,
        },
        taxesIncluded: data.taxesIncluded ?? false,
        status: RoomStatus.FREE,
        housekeepingStatus: HousekeepingStatus.INSPECTED,
        photos: data.photos || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockRooms.push(newRoom);
      return newRoom;
    }
  },

  async updateRoom(id: string, data: UpdateRoomInput): Promise<Room> {
    try {
      const response = await httpContract.client.put<Room>(
        `/hotel/rooms/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const index = mockRooms.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Room not found');

      const updated: Room = {
        ...mockRooms[index],
        ...data,
        features: { ...mockRooms[index].features, ...data.features },
        pricing: { ...mockRooms[index].pricing, ...data.pricing },
        outOfOrderPeriod: data.outOfOrderPeriod === null ? undefined : (data.outOfOrderPeriod || mockRooms[index].outOfOrderPeriod),
        updatedAt: new Date().toISOString(),
      };
      mockRooms[index] = updated;

      return mockRooms[index];
    }
  },

  async deleteRoom(id: string): Promise<void> {
    try {
      await httpContract.client.delete(`/hotel/rooms/${id}`);
    } catch (error) {
      const index = mockRooms.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Room not found');
      mockRooms.splice(index, 1);
    }
  },
};
