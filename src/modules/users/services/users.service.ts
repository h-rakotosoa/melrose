import { httpContract } from '@app/contracts/http.contract';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const usersService = {
  async getUsers(): Promise<UserData[]> {
    const response = await httpContract.client.get<UserData[]>('/users');
    return response.data;
  },

  async getUserById(id: string): Promise<UserData> {
    const response = await httpContract.client.get<UserData>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: Omit<UserData, 'id' | 'createdAt'>): Promise<UserData> {
    const response = await httpContract.client.post<UserData>('/users', data);
    return response.data;
  },

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData> {
    const response = await httpContract.client.put<UserData>(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await httpContract.client.delete(`/users/${id}`);
  },
};
